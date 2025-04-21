import { type NextRequest, NextResponse } from "next/server"
import { getAssignments, saveAssignment, deleteAssignment, type Assignment } from "@/lib/data"

// GET /api/assignments/[id]
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const assignments = await getAssignments()
    const assignment = assignments.find((a) => a.id === params.id)

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }

    return NextResponse.json(assignment)
  } catch (error) {
    console.error("Error fetching assignment:", error)
    return NextResponse.json({ error: "Failed to fetch assignment" }, { status: 500 })
  }
}

// PUT /api/assignments/[id]
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const assignment = (await request.json()) as Assignment

    // Ensure ID in body matches URL
    assignment.id = params.id

    const savedAssignment = await saveAssignment(assignment)
    return NextResponse.json(savedAssignment)
  } catch (error) {
    console.error("Error updating assignment:", error)
    return NextResponse.json({ error: "Failed to update assignment" }, { status: 500 })
  }
}

// DELETE /api/assignments/[id]
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = await deleteAssignment(params.id)

    if (!success) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting assignment:", error)
    return NextResponse.json({ error: "Failed to delete assignment" }, { status: 500 })
  }
}
