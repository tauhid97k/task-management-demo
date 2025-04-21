import { type NextRequest, NextResponse } from "next/server"
import {
  getAssignments,
  getAssignmentsByTemplate,
  getAssignmentsByClient,
  saveAssignment,
  type Assignment,
} from "@/lib/data"

// GET /api/assignments
// GET /api/assignments?templateId=template1
// GET /api/assignments?clientId=client1
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const templateId = searchParams.get("templateId")
    const clientId = searchParams.get("clientId")

    if (templateId) {
      const assignments = await getAssignmentsByTemplate(templateId)
      return NextResponse.json(assignments)
    } else if (clientId) {
      const assignments = await getAssignmentsByClient(clientId)
      return NextResponse.json(assignments)
    } else {
      const assignments = await getAssignments()
      return NextResponse.json(assignments)
    }
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 })
  }
}

// POST /api/assignments
export async function POST(request: NextRequest) {
  try {
    const assignment = (await request.json()) as Assignment

    // Generate ID if not provided
    if (!assignment.id) {
      assignment.id = `assignment-${Date.now()}`
    }

    // Set assigned date if not provided
    if (!assignment.assignedAt) {
      assignment.assignedAt = new Date().toISOString()
    }

    const savedAssignment = await saveAssignment(assignment)
    return NextResponse.json(savedAssignment, { status: 201 })
  } catch (error) {
    console.error("Error creating assignment:", error)
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 })
  }
}
