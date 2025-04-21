"use client"

import { useState } from "react"
import { Check, Loader2, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Client {
  id: string
  name: string
  email: string
  company: string
  avatar: string
  status: "active" | "inactive" | "pending"
}

interface AssignTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: string
  templateName: string
  packageId: string
}

export function AssignTemplateModal({
  isOpen,
  onClose,
  templateId,
  templateName,
  packageId,
}: AssignTemplateModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [clientFilter, setClientFilter] = useState("all")

  // Mock client data - in a real app, you'd fetch this from your API
  const clients: Client[] = [
    {
      id: "client1",
      name: "John Smith",
      email: "john@example.com",
      company: "Birds Of Eden Corporation",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "client2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      company: "TechStart Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "client3",
      name: "Michael Brown",
      email: "michael@example.com",
      company: "Global Retail Solutions",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "inactive",
    },
    {
      id: "client4",
      name: "Jennifer Wilson",
      email: "jennifer@example.com",
      company: "Eco Friendly Products",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
    },
    {
      id: "client5",
      name: "Robert Garcia",
      email: "robert@example.com",
      company: "Digital Solutions Ltd",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "client6",
      name: "Emily Davis",
      email: "emily@example.com",
      company: "Creative Marketing Agency",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "active",
    },
    {
      id: "client7",
      name: "David Wilson",
      email: "david@example.com",
      company: "Tech Innovations Inc.",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "pending",
    },
  ]

  const filteredClients = clients.filter((client) => {
    // Filter by status
    if (clientFilter !== "all" && client.status !== clientFilter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleAssign = async () => {
    if (!selectedClient) {
      toast.error("Please select a client")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you'd make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const selectedClientData = clients.find((client) => client.id === selectedClient)

      toast.success(`Template assigned to ${selectedClientData?.name} successfully`)
      onClose()
    } catch (error) {
      console.error("Error assigning template:", error)
      toast.error("Failed to assign template")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Template to Client</DialogTitle>
          <DialogDescription>Assign "{templateName}" template to a client</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{packageId}</Badge>
              <span className="text-sm font-medium">{templateName}</span>
            </div>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search clients..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs value={clientFilter} onValueChange={setClientFilter} className="mb-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Clients</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>

          <ScrollArea className="h-[300px] pr-4">
            {filteredClients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No clients found matching your search</div>
            ) : (
              <div className="space-y-2">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-3 rounded-md border flex items-center gap-3 cursor-pointer transition-colors ${
                      selectedClient === client.id ? "border-primary bg-primary/5" : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedClient(client.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium flex items-center gap-2">
                        {client.name}
                        <Badge
                          variant="outline"
                          className={
                            client.status === "active"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : client.status === "pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground truncate">{client.company}</div>
                      <div className="text-xs text-muted-foreground">{client.email}</div>
                    </div>
                    {selectedClient === client.id && <Check className="h-5 w-5 text-primary" />}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedClient || isLoading}
            className="bg-[#00b894] hover:bg-[#00a382]"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Assign Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
