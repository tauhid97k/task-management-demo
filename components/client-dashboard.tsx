"use client";

import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpDown,
  BarChart3,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  LineChart,
  MoreHorizontal,
  Package,
  Calendar,
  Users,
  PieChart,
  User,
  MessageSquare,
} from "lucide-react";

import { TaskCard } from "@/components/task-card";
import { WorkflowStages } from "@/components/workflow-stages";
import { ClientStats } from "@/components/client-stats";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TaskList } from "@/components/task-list";
import { TaskPerformance } from "@/components/task-performance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskCompletionChart } from "@/components/charts/task-completion-chart";
import { CategoryDistributionChart } from "@/components/charts/category-distribution-chart";
import { TaskTrendChart } from "@/components/charts/task-trend-chart";
import { AgentPerformanceChart } from "@/components/charts/agent-performance-chart";

// Sample data
const initialTasks = [
  {
    id: 1,
    title: "Create social media graphics",
    dueDate: "2025-04-02",
    priority: "High",
    status: "Pending",
    assignedTo: null,
  },
  {
    id: 2,
    title: "Design new banner ads",
    dueDate: "2025-04-05",
    priority: "Medium",
    status: "Pending",
    assignedTo: null,
  },
  {
    id: 3,
    title: "Update product photos",
    dueDate: "2025-04-10",
    priority: "Low",
    status: "Pending",
    assignedTo: null,
  },
  {
    id: 4,
    title: "Create promotional video",
    dueDate: "2025-04-15",
    priority: "High",
    status: "Pending",
    assignedTo: null,
  },
];

const employees = [
  { id: 1, name: "Alex Kim", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Jamie Smith", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Taylor Wong", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Jordan Lee", avatar: "/placeholder.svg?height=40&width=40" },
];

const clientData = {
  name: "Acme Corporation",
  package: "DFP120",
  tasksPerMonth: 3,
  tasksCompleted: 1,
  nextTaskDate: "2025-04-10",
  daysUntilNextTask: 15,
};

const workflowData = {
  assets: { total: 12, completed: 8 },
  socialMedia: { total: 8, completed: 3 },
  review: { total: 5, completed: 1 },
};

export function ClientDashboard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTaskForComment, setSelectedTaskForComment] = useState(null);
  const [selectedTaskForReport, setSelectedTaskForReport] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [reportText, setReportText] = useState("");
  const [reportType, setReportType] = useState("");

  const distributeTasks = () => {
    const updatedTasks = tasks.map((task) => {
      if (!task.assignedTo) {
        // Randomly assign an employee
        const randomEmployee =
          employees[Math.floor(Math.random() * employees.length)];
        return { ...task, assignedTo: randomEmployee };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  return (
    <div className="p-3">
      {/* Task Distribution Start */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">
            Manage tasks and track workflow progress
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Tasks</CardTitle>
              <Button onClick={distributeTasks}>
                <Users className="mr-2 h-4 w-4" />
                Distribute Tasks
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Package Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-2 text-primary" />
                <span className="font-medium">
                  {clientData.package} Package
                </span>
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>{clientData.tasksPerMonth} tasks per month</span>
              </div>

              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                <span>
                  {clientData.tasksCompleted}/{clientData.tasksPerMonth} tasks
                  completed
                </span>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>Next task in {clientData.daysUntilNextTask} days</span>
              </div>
            </CardContent>
            <CardFooter>
              <Badge variant="outline" className="w-full justify-center py-2">
                Next task: {clientData.nextTaskDate}
              </Badge>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mb-10">
        <WorkflowStages workflowData={workflowData} />
      </div>
      {/* Task Distribution End */}

      <div className="flex flex-col gap-6 mt-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
            <p className="text-muted-foreground"></p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Filter className="h-3.5 w-3.5" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Agent</DropdownMenuItem>
                <DropdownMenuItem>Date</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <Download className="h-3.5 w-3.5" />
                  <span>Export</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Export as PDF</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Export as CSV</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LineChart className="mr-2 h-4 w-4" />
                  <span>Export as Excel</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog>
              <DialogTrigger asChild>
                {/* <Button size="sm" className="h-8 gap-1">
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Task</span>
                </Button> */}
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>
                    Add a new task to your project. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task-title">Task Title</Label>
                    <Input id="task-title" placeholder="Enter task title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-description">Description</Label>
                    <Textarea
                      id="task-description"
                      placeholder="Enter task description"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-category">Category</Label>
                    <Select>
                      <SelectTrigger id="task-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="content">Content</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="task-priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-due-date">Due Date</Label>
                    <Input id="task-due-date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="task-assignee">Assign To</Label>
                    <Select>
                      <SelectTrigger id="task-assignee">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alice">Alice Johnson</SelectItem>
                        <SelectItem value="bob">Bob Smith</SelectItem>
                        <SelectItem value="charlie">Charlie Davis</SelectItem>
                        <SelectItem value="diana">Diana Miller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Package
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">DFP90</div>
                  <p className="text-xs text-muted-foreground">
                    90 Days Duration
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Tasks
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1/8</div>
                  <p className="text-xs text-muted-foreground">
                    12.5% completion rate
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Tasks
                  </CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    62.5% of total tasks
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Overall Progress
                  </CardTitle>
                  <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">13%</div>
                  <Progress value={13} className="h-2" />
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Task Status Overview</CardTitle>
                  <CardDescription>
                    View the status of all your tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center justify-center rounded-lg border bg-amber-50 p-4">
                      <span className="text-lg font-semibold text-amber-600">
                        5
                      </span>
                      <span className="text-sm text-amber-700">Pending</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border bg-blue-50 p-4">
                      <span className="text-lg font-semibold text-blue-600">
                        2
                      </span>
                      <span className="text-sm text-blue-700">In Progress</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg border bg-green-50 p-4">
                      <span className="text-lg font-semibold text-green-600">
                        1
                      </span>
                      <span className="text-sm text-green-700">Completed</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <TaskCompletionChart className="h-[200px] w-full" />
                  </div>

                  <div className="mt-6">
                    <h4 className="mb-4 text-sm font-semibold">Recent Tasks</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="bg-amber-50 text-amber-700"
                          >
                            Pending
                          </Badge>
                          <span className="font-medium">
                            Create Facebook post
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src="/placeholder.svg?height=24&width=24"
                              alt="@alice"
                            />
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            In Progress
                          </Badge>
                          <span className="font-medium">
                            Write blog article
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src="/placeholder.svg?height=24&width=24"
                              alt="@bob"
                            />
                            <AvatarFallback>BS</AvatarFallback>
                          </Avatar>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700"
                          >
                            Completed
                          </Badge>
                          <span className="font-medium">Design logo</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src="/placeholder.svg?height=24&width=24"
                              alt="@diana"
                            />
                            <AvatarFallback>DM</AvatarFallback>
                          </Avatar>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("tasks")}
                  >
                    View All Tasks
                  </Button>
                </CardFooter>
              </Card>

              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Package Details</CardTitle>
                  <CardDescription>
                    Your current subscription package
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Package Name</span>
                    <span className="font-semibold">DFP90</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Duration</span>
                    <span>90 Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Social Sites</span>
                    <span>11</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Web 2.0s</span>
                    <span>5 Sites</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Additional Assets
                    </span>
                    <span>10 Approx</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Monthly Engagement
                    </span>
                    <span>1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Domain</span>
                    <span>1</span>
                  </div>

                  <div className="pt-4">
                    <h4 className="mb-2 text-sm font-semibold">
                      Assigned Team
                    </h4>
                    <div className="flex -space-x-2">
                      <Avatar className="border-2 border-background">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="@alice"
                        />
                        <AvatarFallback>AJ</AvatarFallback>
                      </Avatar>
                      <Avatar className="border-2 border-background">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="@bob"
                        />
                        <AvatarFallback>BS</AvatarFallback>
                      </Avatar>
                      <Avatar className="border-2 border-background">
                        <AvatarImage
                          src="/placeholder.svg?height=32&width=32"
                          alt="@charlie"
                        />
                        <AvatarFallback>CD</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <div className="pt-4">
                    <CategoryDistributionChart className="h-[180px] w-full" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        View Sites
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>DFP90 Site Directory</DialogTitle>
                        <DialogDescription>
                          Browse all available sites included in this package
                        </DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="social" className="mt-4">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="social">Social Sites</TabsTrigger>
                          <TabsTrigger value="web">Web 2.0 Sites</TabsTrigger>
                          <TabsTrigger value="additional">
                            Additional Sites
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="social" className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[
                              {
                                name: "www.behance.net",
                                url: "https://www.behance.net/",
                              },
                              {
                                name: "www.youtube.com",
                                url: "https://www.youtube.com/",
                              },
                              {
                                name: "www.pinterest.com",
                                url: "https://www.pinterest.com/",
                              },
                              {
                                name: "www.crunchbase.com",
                                url: "https://www.crunchbase.com/register",
                              },
                            ].map((site, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border p-3"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-muted p-1">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM6.98284 2.18567C7.12126 2.07528 7.30541 2.07528 7.44383 2.18567L9.75 4.01493L7.5 5.8107L5.25 4.01493L6.98284 2.18567ZM4.5 8.25V4.83688L6.75 6.6326V10.0533L4.5 8.25ZM8.25 6.6326L10.5 4.83688V8.25L8.25 10.0533V6.6326Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </div>
                                  <span className="text-sm font-medium">
                                    {site.name}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 gap-1"
                                >
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="web" className="space-y-4 pt-4">
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {[
                              {
                                name: "muckrack.com",
                                url: "https://muckrack.com/account/signup",
                              },
                              { name: "slides.com", url: "slides.com" },
                              {
                                name: "flipboard.com",
                                url: "https://flipboard.com/signup",
                              },
                              { name: "about.me", url: "http://about.me/" },
                            ].map((site, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between rounded-md border p-3"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="rounded-full bg-muted p-1">
                                    <svg
                                      width="16"
                                      height="16"
                                      viewBox="0 0 15 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM6.98284 2.18567C7.12126 2.07528 7.30541 2.07528 7.44383 2.18567L9.75 4.01493L7.5 5.8107L5.25 4.01493L6.98284 2.18567ZM4.5 8.25V4.83688L6.75 6.6326V10.0533L4.5 8.25ZM8.25 6.6326L10.5 4.83688V8.25L8.25 10.0533V6.6326Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </div>
                                  <span className="text-sm font-medium">
                                    {site.name}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 gap-1"
                                >
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z"
                                      fill="currentColor"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Task Management</CardTitle>
                    <CardDescription>
                      View and manage all your tasks
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <ArrowUpDown className="h-3.5 w-3.5" />
                      <span>Sort</span>
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        {/* <Button size="sm" className="h-8 gap-1">
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Task</span>
                        </Button> */}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Create New Task</DialogTitle>
                          <DialogDescription>
                            Add a new task to your project. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="task-title">Task Title</Label>
                            <Input
                              id="task-title"
                              placeholder="Enter task title"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="task-description">
                              Description
                            </Label>
                            <Textarea
                              id="task-description"
                              placeholder="Enter task description"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="task-category">Category</Label>
                            <Select>
                              <SelectTrigger id="task-category">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="social">Social</SelectItem>
                                <SelectItem value="content">Content</SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="task-assignee">Assign To</Label>
                            <Select>
                              <SelectTrigger id="task-assignee">
                                <SelectValue placeholder="Select team member" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alice">
                                  Alice Johnson
                                </SelectItem>
                                <SelectItem value="bob">Bob Smith</SelectItem>
                                <SelectItem value="charlie">
                                  Charlie Davis
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Create Task</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Tasks</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="mt-4">
                    <TaskList />
                  </TabsContent>
                  <TabsContent value="pending" className="mt-4">
                    <TaskList status="pending" />
                  </TabsContent>
                  <TabsContent value="in-progress" className="mt-4">
                    <TaskList status="in-progress" />
                  </TabsContent>
                  <TabsContent value="completed" className="mt-4">
                    <TaskList status="completed" />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task Performance Analysis</CardTitle>
                <CardDescription>
                  Track the efficiency and progress of your tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TaskPerformance />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Reports & Analytics</CardTitle>
                    <CardDescription>
                      Generate and export detailed reports
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 gap-1"
                        >
                          <ArrowDownToLine className="h-3.5 w-3.5" />
                          <span>Export</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Export Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Export as PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          <span>Export as CSV</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LineChart className="mr-2 h-4 w-4" />
                          <span>Export as Excel</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="summary" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="agents">Agents</TabsTrigger>
                    <TabsTrigger value="custom">Custom</TabsTrigger>
                  </TabsList>

                  <TabsContent value="summary" className="mt-4 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Task Completion Summary
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <TaskCompletionChart className="h-full w-full" />
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Category Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <CategoryDistributionChart className="h-full w-full" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Monthly Progress Report
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <TaskTrendChart className="h-full w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="performance" className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Performance Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px]">
                          <TaskTrendChart className="h-full w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="agents" className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Agent Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px]">
                          <AgentPerformanceChart className="h-full w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="custom" className="mt-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">
                          Custom Report
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="report-type">Report Type</Label>
                            <Select>
                              <SelectTrigger id="report-type">
                                <SelectValue placeholder="Select report type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="task-completion">
                                  Task Completion
                                </SelectItem>
                                <SelectItem value="agent-performance">
                                  Agent Performance
                                </SelectItem>
                                <SelectItem value="category-analysis">
                                  Category Analysis
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="date-range">Date Range</Label>
                            <div className="flex gap-2">
                              <Input
                                id="date-from"
                                type="date"
                                className="w-1/2"
                              />
                              <Input
                                id="date-to"
                                type="date"
                                className="w-1/2"
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>Include Data</Label>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center space-x-2">
                                <Checkbox id="include-tasks" />
                                <Label
                                  htmlFor="include-tasks"
                                  className="text-sm font-normal"
                                >
                                  Tasks
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="include-agents" />
                                <Label
                                  htmlFor="include-agents"
                                  className="text-sm font-normal"
                                >
                                  Agents
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox id="include-categories" />
                                <Label
                                  htmlFor="include-categories"
                                  className="text-sm font-normal"
                                >
                                  Categories
                                </Label>
                              </div>
                            </div>
                          </div>

                          <Button className="w-full">
                            Generate Custom Report
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Task History</CardTitle>
                <CardDescription>
                  View a record of all past tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-sm font-medium">March 2023</h3>
                    <div className="space-y-2">
                      {[
                        {
                          title: "Logo Design",
                          status: "completed",
                          date: "Mar 28, 2023",
                          agent: "Diana Miller",
                        },
                        {
                          title: "Website Copy",
                          status: "completed",
                          date: "Mar 22, 2023",
                          agent: "Bob Smith",
                        },
                        {
                          title: "Social Media Strategy",
                          status: "completed",
                          date: "Mar 15, 2023",
                          agent: "Alice Johnson",
                        },
                      ].map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              Completed
                            </Badge>
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <User className="h-3.5 w-3.5" />
                              <span>{task.agent}</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() =>
                                    setSelectedTaskForComment(task)
                                  }
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  <span>Add Comment</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    setSelectedTaskForReport(task)
                                  }
                                  className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Add Report</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-4 text-sm font-medium">February 2023</h3>
                    <div className="space-y-2">
                      {[
                        {
                          title: "Email Campaign",
                          status: "completed",
                          date: "Feb 28, 2023",
                          agent: "Charlie Davis",
                        },
                        {
                          title: "Product Photography",
                          status: "completed",
                          date: "Feb 15, 2023",
                          agent: "Diana Miller",
                        },
                        {
                          title: "Market Research",
                          status: "completed",
                          date: "Feb 10, 2023",
                          agent: "Bob Smith",
                        },
                        {
                          title: "Competitor Analysis",
                          status: "completed",
                          date: "Feb 5, 2023",
                          agent: "Alice Johnson",
                        },
                      ].map((task, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700"
                            >
                              Completed
                            </Badge>
                            <div>
                              <p className="font-medium">{task.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {task.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <User className="h-3.5 w-3.5" />
                              <span>{task.agent}</span>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More options</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onSelect={() =>
                                    setSelectedTaskForComment(task)
                                  }
                                >
                                  <MessageSquare className="mr-2 h-4 w-4" />
                                  <span>Add Comment</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={() =>
                                    setSelectedTaskForReport(task)
                                  }
                                  className="text-red-600 focus:bg-red-50 focus:text-red-700"
                                >
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Add Report</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Load More
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Comment Modal */}
        <Dialog
          open={selectedTaskForComment !== null}
          onOpenChange={(open) => !open && setSelectedTaskForComment(null)}
        >
          <DialogContent className="w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Comment</DialogTitle>
              <DialogDescription>
                Add a comment to the task: {selectedTaskForComment?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="comment">Your Comment</Label>
                <Textarea
                  id="comment"
                  placeholder="Enter your comment here..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedTaskForComment(null)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Here you would typically save the comment
                  console.log("Comment added:", commentText);
                  setCommentText("");
                  setSelectedTaskForComment(null);
                }}
              >
                Submit Comment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Report Modal */}
        <Dialog
          open={selectedTaskForReport !== null}
          onOpenChange={(open) => !open && setSelectedTaskForReport(null)}
        >
          <DialogContent className="border-red-200 w-[500px]">
            <DialogHeader className="border-b border-red-100 pb-3">
              <DialogTitle className="text-red-600">Add Report</DialogTitle>
              <DialogDescription>
                Submit a report for the task: {selectedTaskForReport?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger
                    id="report-type"
                    className="border-red-200 focus:ring-red-500"
                  >
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="progress">Progress Report</SelectItem>
                    <SelectItem value="issue">Issue Report</SelectItem>
                    <SelectItem value="feedback">Feedback Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="report-details">Report Details</Label>
                <Textarea
                  id="report-details"
                  placeholder="Enter report details..."
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  className="min-h-[120px] border-red-200 focus-visible:ring-red-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedTaskForReport(null)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  // Here you would typically save the report
                  console.log("Report added:", {
                    type: reportType,
                    details: reportText,
                  });
                  setReportType("");
                  setReportText("");
                  setSelectedTaskForReport(null);
                }}
              >
                Submit Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
