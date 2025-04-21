import { type NextRequest, NextResponse } from "next/server"
import { getTemplateById, saveTemplate, deleteTemplate, type Template } from "@/lib/data"

// GET /api/templates/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const template = await getTemplateById(params.id)

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error("Error fetching template:", error)
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 })
  }
}

// PUT /api/templates/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const template = (await request.json()) as Template

    // Ensure ID in body matches URL
    template.id = params.id

    const savedTemplate = await saveTemplate(template)
    return NextResponse.json(savedTemplate)
  } catch (error) {
    console.error("Error updating template:", error)
    return NextResponse.json({ error: "Failed to update template" }, { status: 500 })
  }
}

// DELETE /api/templates/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteTemplate(params.id)

    if (!success) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting template:", error)
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 })
  }
}
