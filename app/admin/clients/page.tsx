"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  CheckCircle,
  Users,
  FileText,
  Plus,
  MessageSquare,
  AlertTriangle,
  Filter,
  CheckCheck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for clients
const clients = [
  {
    id: "client1",
    name: "John Smith",
    company: "Birds Of Eden Corporation",
    designation: "Marketing Director",
    avatar: "/placeholder.svg?height=80&width=80",
    progress: 25,
    status: "pending",
    package: "DFP90",
    startDate: "2025-03-01",
    dueDate: "2025-06-15",
    totalTasks: 18,
    completedTasks: 4,
    pendingTasks: 10,
    inProgressTasks: 4,
    hasNewComments: true,
    hasIssues: false,
    teamMembers: [
      {
        id: "tm1",
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Social Media Manager",
        team: "social",
        assignedDate: "2025-03-05",
        assignedTasks: 6,
        completedTasks: 2,
        lateTasks: 1,
      },
      {
        id: "tm2",
        name: "Bob Smith",
        email: "bob@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Content Writer",
        team: "content",
        assignedDate: "2025-03-05",
        assignedTasks: 5,
        completedTasks: 1,
        lateTasks: 0,
      },
      {
        id: "tm3",
        name: "Charlie Davis",
        email: "charlie@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Designer",
        team: "assets",
        assignedDate: "2025-03-07",
        assignedTasks: 7,
        completedTasks: 1,
        lateTasks: 2,
      },
    ],
  },
  {
    id: "client2",
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    designation: "CEO",
    avatar: "/placeholder.svg?height=80&width=80",
    progress: 60,
    status: "in-progress",
    package: "DFP120",
    startDate: "2025-02-15",
    dueDate: "2025-05-30",
    totalTasks: 15,
    completedTasks: 9,
    pendingTasks: 3,
    inProgressTasks: 3,
    hasNewComments: false,
    hasIssues: true,
    teamMembers: [
      {
        id: "tm4",
        name: "David Wilson",
        email: "david@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Project Manager",
        team: "management",
        assignedDate: "2025-02-20",
        assignedTasks: 4,
        completedTasks: 3,
        lateTasks: 0,
      },
      {
        id: "tm5",
        name: "Emma Brown",
        email: "emma@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Content Strategist",
        team: "content",
        assignedDate: "2025-02-20",
        assignedTasks: 6,
        completedTasks: 4,
        lateTasks: 1,
      },
      {
        id: "tm6",
        name: "Frank Miller",
        email: "frank@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "SEO Specialist",
        team: "content",
        assignedDate: "2025-02-25",
        assignedTasks: 5,
        completedTasks: 2,
        lateTasks: 0,
      },
    ],
  },
  {
    id: "client3",
    name: "Michael Brown",
    company: "Global Retail Solutions",
    designation: "Marketing VP",
    avatar: "/placeholder.svg?height=80&width=80",
    progress: 100,
    status: "completed",
    package: "DFP90",
    startDate: "2025-01-10",
    dueDate: "2025-03-15",
    totalTasks: 20,
    completedTasks: 20,
    pendingTasks: 0,
    inProgressTasks: 0,
    hasNewComments: false,
    hasIssues: false,
    teamMembers: [
      {
        id: "tm7",
        name: "Grace Lee",
        email: "grace@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Social Media Coordinator",
        team: "social",
        assignedDate: "2025-01-15",
        assignedTasks: 7,
        completedTasks: 7,
        lateTasks: 0,
      },
      {
        id: "tm8",
        name: "Henry Garcia",
        email: "henry@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Content Creator",
        team: "content",
        assignedDate: "2025-01-15",
        assignedTasks: 6,
        completedTasks: 6,
        lateTasks: 0,
      },
      {
        id: "tm9",
        name: "Ivy Chen",
        email: "ivy@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Graphic Designer",
        team: "assets",
        assignedDate: "2025-01-20",
        assignedTasks: 7,
        completedTasks: 7,
        lateTasks: 0,
      },
    ],
  },
  {
    id: "client4",
    name: "Jennifer Wilson",
    company: "Eco Friendly Products",
    designation: "Product Manager",
    avatar: "/placeholder.svg?height=80&width=80",
    progress: 10,
    status: "pending",
    package: "DFP120",
    startDate: "2025-03-20",
    dueDate: "2025-07-01",
    totalTasks: 16,
    completedTasks: 1,
    pendingTasks: 12,
    inProgressTasks: 3,
    hasNewComments: true,
    hasIssues: false,
    teamMembers: [
      {
        id: "tm10",
        name: "Kevin Park",
        email: "kevin@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Marketing Specialist",
        team: "social",
        assignedDate: "2025-03-25",
        assignedTasks: 8,
        completedTasks: 1,
        lateTasks: 0,
      },
      {
        id: "tm11",
        name: "Laura Adams",
        email: "laura@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Content Writer",
        team: "content",
        assignedDate: "2025-03-25",
        assignedTasks: 8,
        completedTasks: 0,
        lateTasks: 0,
      },
    ],
  },
  {
    id: "client5",
    name: "Robert Garcia",
    company: "Digital Solutions Ltd",
    designation: "CTO",
    avatar: "/placeholder.svg?height=80&width=80",
    progress: 45,
    status: "in-progress",
    package: "DFP180",
    startDate: "2025-02-01",
    dueDate: "2025-05-15",
    totalTasks: 22,
    completedTasks: 10,
    pendingTasks: 6,
    inProgressTasks: 6,
    hasNewComments: false,
    hasIssues: true,
    teamMembers: [
      {
        id: "tm12",
        name: "Mike Thompson",
        email: "mike@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Project Lead",
        team: "management",
        assignedDate: "2025-02-05",
        assignedTasks: 7,
        completedTasks: 3,
        lateTasks: 1,
      },
      {
        id: "tm13",
        name: "Nancy White",
        email: "nancy@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Content Manager",
        team: "content",
        assignedDate: "2025-02-05",
        assignedTasks: 8,
        completedTasks: 4,
        lateTasks: 0,
      },
      {
        id: "tm14",
        name: "Oliver Scott",
        email: "oliver@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Web Developer",
        team: "assets",
        assignedDate: "2025-02-10",
        assignedTasks: 7,
        completedTasks: 3,
        lateTasks: 2,
      },
    ],
  },
  {
    id: "client6",
    name: "Patricia Martinez",
    company: "Health & Wellness Co",
    designation: "Brand Director",
    avatar: "/placeholder.svg?height=80&width=80",
    progress: 100,
    status: "completed",
    package: "DFP90",
    startDate: "2025-01-05",
    dueDate: "2025-03-01",
    totalTasks: 14,
    completedTasks: 14,
    pendingTasks: 0,
    inProgressTasks: 0,
    hasNewComments: false,
    hasIssues: false,
    teamMembers: [
      {
        id: "tm15",
        name: "Paul Rodriguez",
        email: "paul@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Brand Strategist",
        team: "management",
        assignedDate: "2025-01-10",
        assignedTasks: 7,
        completedTasks: 7,
        lateTasks: 0,
      },
      {
        id: "tm16",
        name: "Quinn Taylor",
        email: "quinn@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Content Creator",
        team: "content",
        assignedDate: "2025-01-10",
        assignedTasks: 7,
        completedTasks: 7,
        lateTasks: 0,
      },
    ],
  },
];

export default function ClientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [packageFilter, setPackageFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isAgentsModalOpen, setIsAgentsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [agentSearchQuery, setAgentSearchQuery] = useState("");
  const [activeTeamTab, setActiveTeamTab] = useState("all");

  const filteredClients = clients.filter((client) => {
    // Filter by status
    if (statusFilter !== "all" && client.status !== statusFilter) {
      return false;
    }

    // Filter by package
    if (packageFilter !== "all" && client.package !== packageFilter) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        client.name.toLowerCase().includes(query) ||
        client.company.toLowerCase().includes(query) ||
        client.designation.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleViewAgents = (client: any) => {
    setSelectedClient(client);
    setIsAgentsModalOpen(true);
  };

  const handleViewTasks = (clientId: string) => {
    router.push(`/admin/clients/${clientId}/tasks`);
  };

  const handleAddNewClient = () => {
    router.push("/admin/clients/onboarding");
  };

  const filteredAgents = selectedClient
    ? selectedClient.teamMembers.filter((agent: any) => {
        // Filter by team
        if (activeTeamTab !== "all" && agent.team !== activeTeamTab) {
          return false;
        }

        // Filter by search query
        if (agentSearchQuery) {
          const query = agentSearchQuery.toLowerCase();
          return (
            agent.name.toLowerCase().includes(query) ||
            agent.email.toLowerCase().includes(query)
          );
        }

        return true;
      })
    : [];

  // Get unique package types for filter
  const packageTypes = Array.from(
    new Set(clients.map((client) => client.package))
  );

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <h1 className="text-2xl font-bold">All Clients</h1>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search clients..."
                className="pl-9 w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={packageFilter} onValueChange={setPackageFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Packages</SelectItem>
                {packageTypes.map((pkg) => (
                  <SelectItem key={pkg} value={pkg}>
                    {pkg}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Tabs
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "grid" | "list")}
              className="hidden md:block"
            >
              <TabsList className="h-9">
                <TabsTrigger value="grid" className="px-3">
                  <div className="grid grid-cols-3 gap-0.5 h-4 w-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3">
                  <div className="flex flex-col gap-0.5 h-4 w-4">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              className="bg-[#00b894] hover:bg-[#00a382]"
              onClick={handleAddNewClient}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Client
            </Button>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span>
                Pending: {clients.filter((c) => c.status === "pending").length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>
                In Progress:{" "}
                {clients.filter((c) => c.status === "in-progress").length}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span>
                Completed:{" "}
                {clients.filter((c) => c.status === "completed").length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onViewAgents={() => handleViewAgents(client)}
              onViewTasks={() => handleViewTasks(client.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] p-3 bg-gray-50 border-b text-sm font-medium text-gray-500">
            <div>Client</div>
            <div className="text-center w-24">Status</div>
            <div className="text-center w-24">Package</div>
            <div className="text-center w-24">Due Date</div>
            <div className="text-center w-24">Progress</div>
            <div className="text-center w-24">Actions</div>
          </div>

          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto_auto] p-4 border-b hover:bg-gray-50 transition-colors items-center"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={client.avatar} alt={client.name} />
                  <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.company}</p>
                  <p className="text-xs text-gray-400">{client.designation}</p>
                </div>
              </div>

              <div className="text-center w-24">
                <Badge
                  className={
                    client.status === "completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : client.status === "in-progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }
                >
                  {client.status === "completed"
                    ? "Completed"
                    : client.status === "in-progress"
                    ? "In Progress"
                    : "Pending"}
                </Badge>
              </div>

              <div className="text-center w-24">
                <Badge variant="outline" className="bg-gray-50">
                  {client.package}
                </Badge>
              </div>

              <div className="text-center w-24 text-sm">
                {new Date(client.dueDate).toLocaleDateString()}
              </div>

              <div className="w-24">
                <div className="flex items-center gap-2">
                  <Progress value={client.progress} className="h-2 w-full" />
                  <span className="text-sm font-medium mb-1">
                    {client.progress}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 w-24">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleViewAgents(client)}
                >
                  <Users className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => handleViewTasks(client.id)}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Agents Modal */}
      {selectedClient && (
        <Dialog open={isAgentsModalOpen} onOpenChange={setIsAgentsModalOpen}>
          <DialogContent className="max-w-[800px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Team Members - {selectedClient.name}
              </DialogTitle>
              <DialogDescription>
                {selectedClient.company} • {selectedClient.designation}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 my-4">
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search team members..."
                  className="pl-9 w-full md:w-[300px]"
                  value={agentSearchQuery}
                  onChange={(e) => setAgentSearchQuery(e.target.value)}
                />
              </div>

              <Tabs
                value={activeTeamTab}
                onValueChange={setActiveTeamTab}
                className="w-full md:w-auto"
              >
                <TabsList>
                  <TabsTrigger value="all">All Teams</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="management">Management</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAgents.length === 0 ? (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No team members found matching your criteria.
                  </div>
                ) : (
                  filteredAgents.map((agent: any) => (
                    <Card key={agent.id} className="overflow-hidden gap-0">
                      <CardHeader className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={agent.avatar} alt={agent.name} />
                            <AvatarFallback>
                              {agent.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium">{agent.name}</h3>
                            <p className="text-sm text-gray-500">
                              {agent.role}
                            </p>
                            <p className="text-xs text-gray-400">
                              {agent.email}
                            </p>
                          </div>
                          <Badge
                            className={
                              agent.team === "social"
                                ? "bg-emerald-100 text-emerald-800"
                                : agent.team === "content"
                                ? "bg-blue-100 text-blue-800"
                                : agent.team === "assets"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }
                          >
                            {agent.team.charAt(0).toUpperCase() +
                              agent.team.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0 flex flex-col h-full">
                        <div className="grid grid-cols-3 gap-2 text-center mb-4">
                          <div className="bg-gray-50 p-2 rounded">
                            <div className="text-lg font-semibold">
                              {agent.assignedTasks}
                            </div>
                            <div className="text-xs text-gray-500">
                              Assigned
                            </div>
                          </div>
                          <div className="bg-emerald-50 p-2 rounded">
                            <div className="text-lg font-semibold">
                              {agent.completedTasks}
                            </div>
                            <div className="text-xs text-gray-500">
                              Completed
                            </div>
                          </div>
                          <div
                            className={`p-2 rounded ${
                              agent.lateTasks > 0 ? "bg-red-50" : "bg-gray-50"
                            }`}
                          >
                            <div
                              className={`text-lg font-semibold ${
                                agent.lateTasks > 0 ? "text-red-600" : ""
                              }`}
                            >
                              {agent.lateTasks}
                            </div>
                            <div className="text-xs text-gray-500">Late</div>
                          </div>
                        </div>

                        <div className="mt-auto">
                          <div className="mt-3 text-xs text-gray-500 flex items-center gap-1 mb-4">
                            <Calendar className="h-3 w-3" />
                            <span>
                              Assigned:{" "}
                              {new Date(
                                agent.assignedDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mb-1 flex justify-between">
                            <span>Completion Rate</span>
                            <span>
                              {agent.assignedTasks > 0
                                ? Math.round(
                                    (agent.completedTasks /
                                      agent.assignedTasks) *
                                      100
                                  )
                                : 0}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              agent.assignedTasks > 0
                                ? (agent.completedTasks / agent.assignedTasks) *
                                  100
                                : 0
                            }
                            className="h-1.5"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <DialogFooter className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAgentsModalOpen(false)}
              >
                Close
              </Button>
              <Button className="bg-[#00b894] hover:bg-[#00a382]">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function ClientCard({
  client,
  onViewAgents,
  onViewTasks,
}: {
  client: any;
  onViewAgents: () => void;
  onViewTasks: () => void;
}) {
  return (
    <Card className="overflow-hidden gap-0">
      <CardHeader className="p-5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={client.avatar} alt={client.name} />
              <AvatarFallback>{client.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-semibold">{client.name}</h2>
              <p className="text-gray-500">{client.company}</p>
              <p className="text-gray-500">{client.designation}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge
              className={
                client.status === "completed"
                  ? "bg-emerald-100 text-emerald-800 text-sm px-3 py-1"
                  : client.status === "in-progress"
                  ? "bg-blue-100 text-blue-800 text-sm px-3 py-1"
                  : "bg-amber-100 text-amber-800 text-sm px-3 py-1"
              }
            >
              {client.status === "completed"
                ? "Completed"
                : client.status === "in-progress"
                ? "In Progress"
                : "Pending"}
            </Badge>
            <Badge variant="outline" className="bg-gray-50">
              Package: {client.package}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500">Overall Progress</span>
              <span className="font-medium">{client.progress}%</span>
            </div>
            <Progress value={client.progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">Task Summary</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Total Tasks:</div>
                <div className="font-medium">{client.totalTasks}</div>

                <div className="text-gray-500">Completed:</div>
                <div className="font-medium">{client.completedTasks}</div>

                <div className="text-gray-500">In Progress:</div>
                <div className="font-medium">{client.inProgressTasks}</div>

                <div className="text-gray-500">Pending:</div>
                <div className="font-medium">{client.pendingTasks}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <h3 className="font-medium">Timeline</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Start Date:</div>
                <div className="font-medium">
                  {new Date(client.startDate).toLocaleDateString()}
                </div>

                <div className="text-gray-500">Due Date:</div>
                <div className="font-medium">
                  {new Date(client.dueDate).toLocaleDateString()}
                </div>

                <div className="text-gray-500">Team Size:</div>
                <div className="font-medium">
                  {client.teamMembers.length} members
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {client.hasNewComments && (
              <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                <MessageSquare className="h-4 w-4" />
                <span>New comments</span>
              </div>
            )}
            {client.hasIssues && (
              <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
                <AlertTriangle className="h-4 w-4" />
                <span>Issues reported</span>
              </div>
            )}
            {!client.hasIssues && !client.hasNewComments && (
              <div className="flex items-center gap-1 text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full text-sm">
                <CheckCheck className="h-4 w-4" />
                <span>No Issues</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t grid grid-cols-2 p-0">
        <Button
          variant="ghost"
          className="rounded-none h-12"
          onClick={onViewAgents}
        >
          <Users className="h-4 w-4 mr-2" />
          View Team Members
        </Button>
        <Button
          variant="ghost"
          className="rounded-none h-12 border-l"
          onClick={onViewTasks}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          View Tasks
        </Button>
      </CardFooter>
    </Card>
  );
}
