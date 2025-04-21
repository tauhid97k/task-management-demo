import { type NextRequest, NextResponse } from "next/server"
import { getClients, getClientById, saveClient, type Client } from "@/lib/data"

// GET /api/clients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("id")

    if (clientId) {
      const client = await getClientById(clientId)

      if (!client) {
        return NextResponse.json({ error: "Client not found" }, { status: 404 })
      }

      return NextResponse.json(client)
    } else {
      const clients = await getClients()
      return NextResponse.json(clients)
    }
  } catch (error) {
    console.error("Error fetching clients:", error)
    return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 })
  }
}

// POST /api/clients
export async function POST(request: NextRequest) {
  try {
    const client = (await request.json()) as Client

    // Generate ID if not provided
    if (!client.id) {
      client.id = `client-${Date.now()}`
    }

    const savedClient = await saveClient(client)
    return NextResponse.json(savedClient, { status: 201 })
  } catch (error) {
    console.error("Error creating client:", error)
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}
