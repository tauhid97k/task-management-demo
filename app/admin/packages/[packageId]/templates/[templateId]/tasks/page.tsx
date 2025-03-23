"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ArrowLeft,
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Users,
  Calendar,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data generator - in a real app this would be fetched from an API
const generateTemplateData = (packageId: string, templateId: string) => {
  // This is a simplified version - in a real app, you'd fetch this data from your API
  return {
    id: templateId,
    packageId: packageId,
    clientName: "John Smith Sr.",
    companyName: "Birds Of Eden Corporation Global",
    designation: "Marketing Director",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
    dueDate: "2025-04-15",
    progress: 25,
    teamMembers: [
      {
        id: "tm1",
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=30&width=30",
        role: "Social Media Manager",
        team: "social",
      },
      {
        id: "tm2",
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=30&width=30",
        role: "Content Writer",
        team: "content",
      },
      {
        id: "tm3",
        name: "Charlie Davis",
        avatar: "/placeholder.svg?height=30&width=30",
        role: "Designer",
        team: "assets",
      },
      {
        id: "tm4",
        name: "Diana Evans",
        avatar: "/placeholder.svg?height=30&width=30",
        role: "Project Manager",
        team: "management",
      },
      {
        id: "tm5",
        name: "Edward Wilson",
        avatar: "/placeholder.svg?height=30&width=30",
        role: "SEO Specialist",
        team: "content",
      },
    ],
    tasks: {
      social: [
        {
          id: "s1",
          name: "Create Facebook post",
          status: "pending",
          assignedTo: "tm1",
          dueDate: "2025-04-10",
          priority: "medium",
        },
        {
          id: "s2",
          name: "Schedule Twitter content",
          status: "in-progress",
          assignedTo: "tm1",
          dueDate: "2025-04-05",
          priority: "high",
        },
        {
          id: "s3",
          name: "Design Instagram story",
          status: "pending",
          assignedTo: null,
          dueDate: "2025-04-12",
          priority: "medium",
        },
        {
          id: "s4",
          name: "LinkedIn campaign setup",
          status: "pending",
          assignedTo: null,
          dueDate: "2025-04-18",
          priority: "low",
        },
      ],
      content: [
        {
          id: "c1",
          name: "Write blog article",
          status: "pending",
          assignedTo: "tm2",
          dueDate: "2025-04-20",
          priority: "high",
        },
        {
          id: "c2",
          name: "Create newsletter",
          status: "completed",
          assignedTo: "tm2",
          dueDate: "2025-04-01",
          priority: "medium",
        },
        {
          id: "c3",
          name: "SEO keyword research",
          status: "in-progress",
          assignedTo: "tm5",
          dueDate: "2025-04-08",
          priority: "high",
        },
        {
          id: "c4",
          name: "Content calendar planning",
          status: "pending",
          assignedTo: "tm2",
          dueDate: "2025-04-15",
          priority: "medium",
        },
      ],
      design: [
        {
          id: "d1",
          name: "Design new logo",
          status: "in-progress",
          assignedTo: "tm3",
          dueDate: "2025-04-25",
          priority: "high",
        },
        {
          id: "d2",
          name: "Create banner ads",
          status: "pending",
          assignedTo: null,
          dueDate: "2025-04-18",
          priority: "medium",
        },
        {
          id: "d3",
          name: "Redesign website homepage",
          status: "pending",
          assignedTo: "tm3",
          dueDate: "2025-04-30",
          priority: "high",
        },
        {
          id: "d4",
          name: "Product photography editing",
          status: "completed",
          assignedTo: "tm3",
          dueDate: "2025-04-02",
          priority: "medium",
        },
      ],
    },
  };
};

export default function TemplateTasksPage() {
  const router = useRouter();
  const { packageId, templateId } = router.query;
  const [template, setTemplate] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [activeTeamTab, setActiveTeamTab] = useState("all");

  useEffect(() => {
    if (packageId && templateId) {
      // In a real app, you'd fetch this data from your API
      const data = generateTemplateData(
        packageId as string,
        templateId as string
      );
      setTemplate(data);
    }
  }, [packageId, templateId]);

  if (!template) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const allTasks = [
    ...template.tasks.social.map((task: any) => ({
      ...task,
      category: "social",
    })),
    ...template.tasks.content.map((task: any) => ({
      ...task,
      category: "content",
    })),
    ...template.tasks.design.map((task: any) => ({
      ...task,
      category: "design",
    })),
  ];

  const filteredTasks = allTasks.filter((task) => {
    // Filter by status
    if (statusFilter !== "all" && task.status !== statusFilter) {
      return false;
    }

    // Filter by assignee
    if (assigneeFilter === "unassigned" && task.assignedTo) {
      return false;
    } else if (
      assigneeFilter !== "all" &&
      assigneeFilter !== "unassigned" &&
      task.assignedTo !== assigneeFilter
    ) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return task.name.toLowerCase().includes(query);
    }

    return true;
  });

  const pendingTasks = filteredTasks.filter((t) => t.status === "pending");
  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === "in-progress"
  );
  const completedTasks = filteredTasks.filter((t) => t.status === "completed");

  const handleAssignTask = (task: any) => {
    setSelectedTask(task);
    setIsAssignModalOpen(true);
  };

  const handleGoBack = () => {
    router.back();
  };

  const filteredTeamMembers =
    activeTeamTab === "all"
      ? template.teamMembers
      : template.teamMembers.filter(
          (member: any) => member.team === activeTeamTab
        );

  return (
    <div className="container mx-auto py-6">
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleGoBack}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Button>
            <h1 className="text-xl font-semibold">{template.clientName}</h1>
            <p className="text-gray-500">
              {template.companyName} • {template.designation}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search tasks..."
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

            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {template.teamMembers.map((member: any) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="bg-[#00b894] hover:bg-[#00a382]">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span>Pending: {pendingTasks.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>In Progress: {inProgressTasks.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span>Completed: {completedTasks.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-400"></div>
              <span>
                Unassigned: {filteredTasks.filter((t) => !t.assignedTo).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col h-full">
          <div className="bg-amber-50 border-amber-200 border rounded-t-lg p-3 flex justify-between items-center">
            <h3 className="font-medium text-amber-800">Pending</h3>
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              {pendingTasks.length}
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-amber-50 border-amber-200 border-x border-b rounded-b-lg p-3 space-y-3">
            {pendingTasks.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No pending tasks found</p>
              </div>
            ) : (
              pendingTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  template={template}
                  onAssign={() => handleAssignTask(task)}
                />
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="bg-blue-50 border-blue-200 border rounded-t-lg p-3 flex justify-between items-center">
            <h3 className="font-medium text-blue-800">In Progress</h3>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {inProgressTasks.length}
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-blue-50 border-blue-200 border-x border-b rounded-b-lg p-3 space-y-3">
            {inProgressTasks.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No in-progress tasks found</p>
              </div>
            ) : (
              inProgressTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  template={template}
                  onAssign={() => handleAssignTask(task)}
                />
              ))
            )}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <div className="bg-emerald-50 border-emerald-200 border rounded-t-lg p-3 flex justify-between items-center">
            <h3 className="font-medium text-emerald-800">Completed</h3>
            <Badge
              variant="outline"
              className="bg-emerald-100 text-emerald-800"
            >
              {completedTasks.length}
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-emerald-50 border-emerald-200 border-x border-b rounded-b-lg p-3 space-y-3">
            {completedTasks.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No completed tasks found</p>
              </div>
            ) : (
              completedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  template={template}
                  onAssign={() => handleAssignTask(task)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Assign Task Modal */}
      {selectedTask && (
        <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Assign Task</DialogTitle>
              <DialogDescription>
                Assign "{selectedTask.name}" to a team member
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Task Details</h3>
                  <Badge
                    className={
                      selectedTask.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : selectedTask.priority === "medium"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {selectedTask.priority.charAt(0).toUpperCase() +
                      selectedTask.priority.slice(1)}{" "}
                    Priority
                  </Badge>
                </div>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{selectedTask.name}</div>
                    <Badge
                      className={
                        selectedTask.category === "social"
                          ? "bg-emerald-100 text-emerald-800"
                          : selectedTask.category === "content"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }
                    >
                      {selectedTask.category.charAt(0).toUpperCase() +
                        selectedTask.category.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Due:{" "}
                        {new Date(selectedTask.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {selectedTask.assignedTo
                          ? `Assigned to: ${
                              template.teamMembers.find(
                                (m: any) => m.id === selectedTask.assignedTo
                              )?.name
                            }`
                          : "Unassigned"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search team members..."
                    className="pl-9"
                  />
                </div>
              </div>

              <Tabs value={activeTeamTab} onValueChange={setActiveTeamTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Teams</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="management">Management</TabsTrigger>
                </TabsList>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {filteredTeamMembers.map((member: any) => (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedTask.assignedTo === member.id
                          ? "border-blue-500 bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">
                            {member.role}
                          </div>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className={
                          member.team === "social"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : member.team === "content"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : member.team === "assets"
                            ? "bg-purple-50 text-purple-800 border-purple-200"
                            : "bg-gray-50 text-gray-800 border-gray-200"
                        }
                      >
                        {member.team.charAt(0).toUpperCase() +
                          member.team.slice(1)}{" "}
                        Team
                      </Badge>
                    </div>
                  ))}
                </div>
              </Tabs>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-[#00b894] hover:bg-[#00a382]">
                Assign Task
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

function TaskCard({
  task,
  template,
  onAssign,
}: {
  task: any;
  template: any;
  onAssign: () => void;
}) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-medium text-sm">{task.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                className={
                  task.category === "social"
                    ? "bg-emerald-100 text-emerald-800"
                    : task.category === "content"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }
              >
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </Badge>
              <Badge
                className={
                  task.priority === "high"
                    ? "bg-red-100 text-red-800"
                    : task.priority === "medium"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onAssign}>
                <Users className="h-4 w-4 mr-2" />
                {task.assignedTo ? "Reassign" : "Assign"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Clock className="h-4 w-4 mr-2" />
                Change Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center justify-between mt-2 text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          </div>

          {task.assignedTo ? (
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={
                  template.teamMembers.find(
                    (m: any) => m.id === task.assignedTo
                  )?.avatar
                }
                alt={
                  template.teamMembers.find(
                    (m: any) => m.id === task.assignedTo
                  )?.name
                }
              />
              <AvatarFallback>
                {template.teamMembers
                  .find((m: any) => m.id === task.assignedTo)
                  ?.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-6 text-xs"
              onClick={onAssign}
            >
              Assign
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
