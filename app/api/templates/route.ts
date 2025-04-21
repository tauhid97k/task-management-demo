import { type NextRequest, NextResponse } from "next/server"
import { getTemplates, getTemplatesByPackage, saveTemplate, type Template } from "@/lib/data"

// GET /api/templates
// GET /api/templates?packageId=DFP90
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const packageId = searchParams.get("packageId")

    if (packageId) {
      const templates = await getTemplatesByPackage(packageId)
      return NextResponse.json(templates)
    } else {
      const templates = await getTemplates()
      return NextResponse.json(templates)
    }
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}

// POST /api/templates
export async function POST(request: NextRequest) {
  try {
    const template = (await request.json()) as Template

    // Generate ID if not provided
    if (!template.id) {
      template.id = `template-${Date.now()}`
    }

    const savedTemplate = await saveTemplate(template)
    return NextResponse.json(savedTemplate, { status: 201 })
  } catch (error) {
    console.error("Error creating template:", error)
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
  }
}
