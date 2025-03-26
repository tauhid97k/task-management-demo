"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Search,
  Plus,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  AlertTriangle,
  MessageSquare,
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
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

// Mock data for tasks
const generateTasksData = (clientId: string) => {
  return {
    clientId,
    clientName: "John Smith",
    companyName: "Birds Of Eden Corporation",
    designation: "Marketing Director",
    packageName: "Premium Marketing Package",
    startDate: "2025-03-01",
    dueDate: "2025-05-15",
    isOverdue: false,
    progress: 35,
    tasks: {
      pending: [
        {
          id: "task1",
          name: "Create Facebook post",
          category: "social",
          priority: "medium",
          dueDate: "2025-04-10",
          assignedTo: {
            id: "tm1",
            name: "Alice Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Social Media Manager",
          },
          comments: [
            {
              id: "c1",
              text: "Please make sure to include the new product images in this post.",
              author: "John Smith",
              date: "2025-04-02",
              avatar: "/placeholder.svg?height=30&width=30",
            },
          ],
          reports: [],
        },
        {
          id: "task3",
          name: "Write blog article",
          category: "content",
          priority: "high",
          dueDate: "2025-04-20",
          assignedTo: {
            id: "tm2",
            name: "Bob Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Content Writer",
          },
          comments: [],
          reports: [
            {
              id: "r1",
              text: "The topic needs to be revised as it overlaps with a competitor's recent post.",
              author: "Diana Evans",
              date: "2025-04-05",
              avatar: "/placeholder.svg?height=30&width=30",
              severity: "medium",
            },
          ],
        },
        {
          id: "task5",
          name: "Redesign website homepage",
          category: "design",
          priority: "high",
          dueDate: "2025-04-30",
          assignedTo: {
            id: "tm3",
            name: "Charlie Davis",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Designer",
          },
          comments: [
            {
              id: "c2",
              text: "Can we use the new color palette that was approved last week?",
              author: "John Smith",
              date: "2025-04-08",
              avatar: "/placeholder.svg?height=30&width=30",
            },
            {
              id: "c3",
              text: "Please make sure the mobile version is responsive.",
              author: "Diana Evans",
              date: "2025-04-09",
              avatar: "/placeholder.svg?height=30&width=30",
            },
          ],
          reports: [],
        },
      ],
      inProgress: [
        {
          id: "task6",
          name: "Schedule Twitter content",
          category: "social",
          priority: "high",
          dueDate: "2025-04-05",
          assignedTo: {
            id: "tm1",
            name: "Alice Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Social Media Manager",
          },
          comments: [],
          reports: [
            {
              id: "r2",
              text: "We need to reschedule due to a conflict with another campaign.",
              author: "Diana Evans",
              date: "2025-04-03",
              avatar: "/placeholder.svg?height=30&width=30",
              severity: "high",
            },
          ],
        },
        {
          id: "task7",
          name: "Design new logo",
          category: "design",
          priority: "high",
          dueDate: "2025-04-25",
          assignedTo: {
            id: "tm3",
            name: "Charlie Davis",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Designer",
          },
          comments: [
            {
              id: "c4",
              text: "I like the direction, but can we try a few more variations?",
              author: "John Smith",
              date: "2025-04-15",
              avatar: "/placeholder.svg?height=30&width=30",
            },
          ],
          reports: [],
        },
      ],
      completed: [
        {
          id: "task8",
          name: "Create newsletter",
          category: "content",
          priority: "medium",
          dueDate: "2025-04-01",
          assignedTo: {
            id: "tm2",
            name: "Bob Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Content Writer",
          },
          comments: [
            {
              id: "c5",
              text: "Great job on this newsletter! The open rate was excellent.",
              author: "John Smith",
              date: "2025-04-02",
              avatar: "/placeholder.svg?height=30&width=30",
            },
          ],
          reports: [],
        },
      ],
      unassigned: [
        {
          id: "task2",
          name: "Design Instagram story",
          category: "social",
          priority: "medium",
          dueDate: "2025-04-12",
          assignedTo: null,
          comments: [],
          reports: [],
        },
        {
          id: "task4",
          name: "Create banner ads",
          category: "design",
          priority: "medium",
          dueDate: "2025-04-18",
          assignedTo: null,
          comments: [
            {
              id: "c6",
              text: "Please use the dimensions specified in the brief.",
              author: "John Smith",
              date: "2025-04-10",
              avatar: "/placeholder.svg?height=30&width=30",
            },
          ],
          reports: [
            {
              id: "r3",
              text: "The deadline for this task might be too tight given our current workload.",
              author: "Diana Evans",
              date: "2025-04-11",
              avatar: "/placeholder.svg?height=30&width=30",
              severity: "low",
            },
          ],
        },
      ],
    },
    teamMembers: [
      {
        id: "tm1",
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Social Media Manager",
        team: "social",
        tasksAssigned: 3,
        tasksCompleted: 2,
      },
      {
        id: "tm2",
        name: "Bob Smith",
        email: "bob@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Content Writer",
        team: "content",
        tasksAssigned: 4,
        tasksCompleted: 3,
      },
      {
        id: "tm3",
        name: "Charlie Davis",
        email: "charlie@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Designer",
        team: "assets",
        tasksAssigned: 5,
        tasksCompleted: 4,
      },
      {
        id: "tm4",
        name: "Diana Evans",
        email: "diana@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "Project Manager",
        team: "management",
        tasksAssigned: 2,
        tasksCompleted: 2,
      },
      {
        id: "tm5",
        name: "Edward Wilson",
        email: "edward@example.com",
        avatar: "/placeholder.svg?height=60&width=60",
        role: "SEO Specialist",
        team: "content",
        tasksAssigned: 3,
        tasksCompleted: 1,
      },
    ],
  };
};

type Task = {
  id: string;
  name: string;
  category: string;
  priority: string;
  dueDate: string;
  assignedTo: {
    id: string;
    name: string;
    avatar: string;
    role: string;
  } | null;
  status?: string;
  comments: {
    id: string;
    text: string;
    author: string;
    date: string;
    avatar: string;
  }[];
  reports: {
    id: string;
    text: string;
    author: string;
    date: string;
    avatar: string;
    severity: "high" | "medium" | "low";
  }[];
};

type TeamMember = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  team: string;
  tasksAssigned: number;
  tasksCompleted: number;
};

export default function TasksPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params.clientId;
  const [clientData, setClientData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTeamTab, setActiveTeamTab] = useState("all");
  const [agentSearchQuery, setAgentSearchQuery] = useState("");
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [tasks, setTasks] = useState<{
    pending: Task[];
    inProgress: Task[];
    completed: Task[];
    unassigned: Task[];
  }>({
    pending: [],
    inProgress: [],
    completed: [],
    unassigned: [],
  });

  useEffect(() => {
    if (clientId) {
      // In a real app, you'd fetch this data from your API
      const data = generateTasksData(clientId as string);
      setClientData(data);
      setTasks(data.tasks);
    }
  }, [clientId]);

  if (!clientData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  const handleAssignTask = (task: Task) => {
    setSelectedTask(task);
    setIsAssignModalOpen(true);
  };

  const handleViewComments = (task: Task) => {
    setSelectedTask(task);
    setIsCommentModalOpen(true);
  };

  const handleViewReports = (task: Task) => {
    setSelectedTask(task);
    setIsReportModalOpen(true);
  };

  const handleGoBack = () => {
    router.push("/admin/clients");
  };

  const filteredTeamMembers =
    activeTeamTab === "all"
      ? clientData.teamMembers
      : clientData.teamMembers.filter(
          (member: TeamMember) => member.team === activeTeamTab
        );

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    if (!task.assignedTo) {
      e.preventDefault();
      toast.error("Assign the task first before moving it");
      return;
    }
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.setData("taskStatus", task.status || "");
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const sourceStatus = e.dataTransfer.getData("taskStatus");

    if (!taskId || !sourceStatus || sourceStatus === targetStatus) return;

    // Find the task in the source list
    const sourceList = tasks[sourceStatus as keyof typeof tasks];
    const taskIndex = sourceList.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) return;

    // Create a copy of the task
    const task = { ...sourceList[taskIndex], status: targetStatus };

    // Remove from source list
    const newSourceList = [...sourceList];
    newSourceList.splice(taskIndex, 1);

    // Add to target list
    const newTargetList = [...tasks[targetStatus as keyof typeof tasks], task];

    // Update state
    setTasks({
      ...tasks,
      [sourceStatus]: newSourceList,
      [targetStatus]: newTargetList,
    });

    toast.info(
      `Task moved to ${targetStatus.replace(/([A-Z])/g, " $1").toLowerCase()}`
    );

    setDraggedTask(null);
  };

  const assignTaskToMember = (task: Task, member: TeamMember) => {
    // If task is unassigned, move it to pending
    if (!task.assignedTo) {
      // Find the task in unassigned list
      const taskIndex = tasks.unassigned.findIndex((t) => t.id === task.id);
      if (taskIndex === -1) return;

      // Create a copy with the new assignee
      const updatedTask = {
        ...tasks.unassigned[taskIndex],
        assignedTo: {
          id: member.id,
          name: member.name,
          avatar: member.avatar,
          role: member.role,
        },
        status: "pending",
      };

      // Remove from unassigned
      const newUnassigned = [...tasks.unassigned];
      newUnassigned.splice(taskIndex, 1);

      // Add to pending
      const newPending = [...tasks.pending, updatedTask];

      // Update state
      setTasks({
        ...tasks,
        unassigned: newUnassigned,
        pending: newPending,
      });
    } else {
      // Task is already assigned, just update the assignee
      const status = task.status as keyof typeof tasks;
      const taskIndex = tasks[status].findIndex((t) => t.id === task.id);
      if (taskIndex === -1) return;

      // Create a copy with the new assignee
      const updatedTask = {
        ...tasks[status][taskIndex],
        assignedTo: {
          id: member.id,
          name: member.name,
          avatar: member.avatar,
          role: member.role,
        },
      };

      // Update the list
      const newList = [...tasks[status]];
      newList[taskIndex] = updatedTask;

      // Update state
      setTasks({
        ...tasks,
        [status]: newList,
      });
    }

    toast.info(`Task assigned to ${member.name}`);

    setIsAssignModalOpen(false);
  };

  // Apply filters to each category
  const applyFilters = (taskList: Task[]) => {
    return taskList.filter((task) => {
      // Filter by category
      if (categoryFilter !== "all" && task.category !== categoryFilter) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return task.name.toLowerCase().includes(query);
      }

      return true;
    });
  };

  const filteredTasks = {
    pending: applyFilters(tasks.pending),
    inProgress: applyFilters(tasks.inProgress),
    completed: applyFilters(tasks.completed),
    unassigned: applyFilters(tasks.unassigned),
  };

  // Only show the lists that match the status filter
  const visibleTasks = {
    pending:
      statusFilter === "all" || statusFilter === "pending"
        ? filteredTasks.pending
        : [],
    inProgress:
      statusFilter === "all" || statusFilter === "inProgress"
        ? filteredTasks.inProgress
        : [],
    completed:
      statusFilter === "all" || statusFilter === "completed"
        ? filteredTasks.completed
        : [],
    unassigned:
      statusFilter === "all" || statusFilter === "unassigned"
        ? filteredTasks.unassigned
        : [],
  };

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
              Back to Clients
            </Button>
            <h1 className="text-xl font-semibold">{clientData.clientName}</h1>
            <p className="text-gray-500">
              {clientData.companyName} • {clientData.designation}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 text-sm">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-800 border-purple-200"
                >
                  {clientData.packageName}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Start Date: {clientData.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>Due Date: {clientData.dueDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`h-4 w-4 ${
                    clientData.isOverdue ? "text-red-500" : "text-gray-500"
                  }`}
                />
                <span
                  className={
                    clientData.isOverdue ? "text-red-500 font-medium" : ""
                  }
                >
                  {clientData.isOverdue ? "Overdue by 3 days" : "On Schedule"}
                </span>
              </div>
            </div>
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
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>

            <Button className="bg-[#00b894] hover:bg-[#00a382]">
              <Plus className="h-4 w-4 mr-2" />
              New Task
            </Button>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span>Pending: {tasks.pending.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>In Progress: {tasks.inProgress.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span>Completed: {tasks.completed.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span>Unassigned: {tasks.unassigned.length}</span>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <Progress value={clientData.progress} className="h-2 w-[100px]" />
              <span className="font-medium">
                {clientData.progress}% Complete
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-220px)]">
        <div
          className="flex flex-col h-full"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "unassigned")}
        >
          <div className="bg-red-50 border-red-200 border rounded-t-lg p-3 flex justify-between items-center">
            <h3 className="font-medium text-red-800">Unassigned</h3>
            <Badge variant="outline" className="bg-red-100 text-red-800">
              {visibleTasks.unassigned.length}
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-red-50 border-red-200 border-x border-b rounded-b-lg p-3 space-y-3">
            {visibleTasks.unassigned.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No unassigned tasks found</p>
              </div>
            ) : (
              visibleTasks.unassigned.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAssign={() => handleAssignTask(task)}
                  onDragStart={(e) => handleDragStart(e, task)}
                  onViewComments={() => handleViewComments(task)}
                  onViewReports={() => handleViewReports(task)}
                  isUnassigned={true}
                />
              ))
            )}
          </div>
        </div>

        <div
          className="flex flex-col h-full"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "pending")}
        >
          <div className="bg-amber-50 border-amber-200 border rounded-t-lg p-3 flex justify-between items-center">
            <h3 className="font-medium text-amber-800">Pending</h3>
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              {visibleTasks.pending.length}
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-amber-50 border-amber-200 border-x border-b rounded-b-lg p-3 space-y-3">
            {visibleTasks.pending.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No pending tasks found</p>
              </div>
            ) : (
              visibleTasks.pending.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAssign={() => handleAssignTask(task)}
                  onDragStart={(e) => handleDragStart(e, task)}
                  onViewComments={() => handleViewComments(task)}
                  onViewReports={() => handleViewReports(task)}
                  isUnassigned={false}
                />
              ))
            )}
          </div>
        </div>

        <div
          className="flex flex-col h-full"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "inProgress")}
        >
          <div className="bg-blue-50 border-blue-200 border rounded-t-lg p-3 flex justify-between items-center">
            <h3 className="font-medium text-blue-800">In Progress</h3>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">
              {visibleTasks.inProgress.length}
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-blue-50 border-blue-200 border-x border-b rounded-b-lg p-3 space-y-3">
            {visibleTasks.inProgress.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No in-progress tasks found</p>
              </div>
            ) : (
              visibleTasks.inProgress.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAssign={() => handleAssignTask(task)}
                  onDragStart={(e) => handleDragStart(e, task)}
                  onViewComments={() => handleViewComments(task)}
                  onViewReports={() => handleViewReports(task)}
                  isUnassigned={false}
                />
              ))
            )}
          </div>
        </div>

        <div
          className="flex flex-col h-full"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, "completed")}
        >
          <div className="bg-emerald-50 border-emerald-200 border rounded-t-lg p-3 flex justify-between items-center">
            <h3 className="font-medium text-emerald-800">Completed</h3>
            <Badge
              variant="outline"
              className="bg-emerald-100 text-emerald-800"
            >
              {visibleTasks.completed.length}
            </Badge>
          </div>
          <div className="flex-1 overflow-y-auto bg-emerald-50 border-emerald-200 border-x border-b rounded-b-lg p-3 space-y-3">
            {visibleTasks.completed.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <p>No completed tasks found</p>
              </div>
            ) : (
              visibleTasks.completed.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onAssign={() => handleAssignTask(task)}
                  onDragStart={(e) => handleDragStart(e, task)}
                  onViewComments={() => handleViewComments(task)}
                  onViewReports={() => handleViewReports(task)}
                  isUnassigned={false}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Assign Task Modal */}
      {selectedTask && (
        <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
          <DialogContent className="max-w-[800px] max-h-[80vh] w-[95vw]">
            <DialogHeader>
              <DialogTitle>Assign Task</DialogTitle>
              <DialogDescription>
                Assign &quot;{selectedTask.name}&quot; to a team member
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
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
                <div className="p-4 border rounded-md bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
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
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-gray-500">
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
                          ? `Currently assigned to: ${selectedTask.assignedTo.name}`
                          : "Unassigned"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search team members..."
                    className="pl-9"
                    value={agentSearchQuery}
                    onChange={(e) => setAgentSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs value={activeTeamTab} onValueChange={setActiveTeamTab}>
                <TabsList className="mb-5 w-full justify-start overflow-x-auto">
                  <TabsTrigger value="all">All Teams</TabsTrigger>
                  <TabsTrigger value="social">Social</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="assets">Assets</TabsTrigger>
                  <TabsTrigger value="management">Management</TabsTrigger>
                </TabsList>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2">
                  {filteredTeamMembers
                    .filter(
                      (member: TeamMember) =>
                        member.name
                          .toLowerCase()
                          .includes(agentSearchQuery.toLowerCase()) ||
                        member.email
                          .toLowerCase()
                          .includes(agentSearchQuery.toLowerCase())
                    )
                    .map((member: TeamMember) => (
                      <div
                        key={member.id}
                        className={`flex flex-col p-4 border rounded-md hover:bg-gray-50 transition-colors ${
                          selectedTask.assignedTo?.id === member.id
                            ? "border-blue-500 bg-blue-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <Avatar className="h-12 w-12 flex-shrink-0">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback>
                              {member.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="font-medium truncate">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {member.email}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {member.role}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-800 border-blue-200"
                          >
                            {member.tasksAssigned} Tasks
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-800 border-emerald-200"
                          >
                            {member.tasksCompleted} Completed
                          </Badge>
                        </div>

                        <Button
                          size="sm"
                          className="bg-[#00b894] hover:bg-[#00a382] w-full mt-auto"
                          onClick={() =>
                            assignTaskToMember(selectedTask, member)
                          }
                        >
                          Assign to {member.name.split(" ")[0]}
                        </Button>
                      </div>
                    ))}
                </div>
              </Tabs>
            </div>

            <DialogFooter className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Comments Modal */}
      {selectedTask && (
        <Dialog open={isCommentModalOpen} onOpenChange={setIsCommentModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
              <DialogDescription>
                Comments for &quot;{selectedTask.name}&quot;
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 max-h-[60vh] overflow-y-auto">
              {selectedTask.comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No comments yet
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedTask.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 border rounded-md bg-white"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={comment.avatar}
                            alt={comment.author}
                          />
                          <AvatarFallback>
                            {comment.author.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">
                            {comment.author}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(comment.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCommentModalOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reports Modal */}
      {selectedTask && (
        <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader className="border-b pb-4">
              <DialogTitle className="text-red-600">
                Issues Reported
              </DialogTitle>
              <DialogDescription>
                Issues for &quot;{selectedTask.name}&quot;
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 max-h-[60vh] overflow-y-auto">
              {selectedTask.reports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No issues reported
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedTask.reports.map((report) => (
                    <div
                      key={report.id}
                      className="p-4 border border-red-100 rounded-md bg-red-50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={report.avatar}
                            alt={report.author}
                          />
                          <AvatarFallback>
                            {report.author.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {report.author}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(report.date).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge
                          className={
                            report.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : report.severity === "medium"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {report.severity.charAt(0).toUpperCase() +
                            report.severity.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-sm">{report.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="border-t pt-4">
              <Button
                variant="outline"
                onClick={() => setIsReportModalOpen(false)}
              >
                Close
              </Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Resolve All
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
  onAssign,
  onDragStart,
  onViewComments,
  onViewReports,
  isUnassigned = false,
}: {
  task: any;
  onAssign: () => void;
  onDragStart: (e: React.DragEvent) => void;
  onViewComments: () => void;
  onViewReports: () => void;
  isUnassigned?: boolean;
}) {
  return (
    <Card
      className={`overflow-hidden ${
        isUnassigned ? "cursor-not-allowed" : "cursor-move"
      }`}
      draggable
      onDragStart={onDragStart}
    >
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
                src={task.assignedTo.avatar}
                alt={task.assignedTo.name}
              />
              <AvatarFallback>
                {task.assignedTo.name.substring(0, 2)}
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

        <div className="flex items-center gap-2 mt-2">
          {task.comments.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent"
              onClick={onViewComments}
            >
              <MessageSquare className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{task.comments.length}</span>
            </Button>
          )}

          {task.reports.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 p-0 text-red-600 hover:text-red-800 hover:bg-transparent"
              onClick={onViewReports}
            >
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{task.reports.length}</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
