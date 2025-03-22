"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  FileText,
  HelpCircle,
  LineChart,
  MoreHorizontal,
  Star,
  Timer,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle,
  CheckCircle,
  AlertCircle,
  Circle,
  ExternalLink,
  Check,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Sample agent data
const agentData = {
  id: 7,
  name: "Tom Holland",
  avatar: "/placeholder.svg?height=60&width=60",
  designation: "Social Media Manager",
  email: "tom.holland@example.com",
  joinDate: "2024-06-15",
  department: "Marketing",
  team: "Social Media",
  manager: "Sarah Johnson",

  // Performance metrics
  performanceScore: 87,
  performanceTrend: "up", // "up", "down", or "stable"
  taskCompletionRate: 92,
  qualityScore: 89,
  clientSatisfaction: 4.7,

  // Time tracking
  totalHoursWorked: 1842,
  hoursThisMonth: 142,
  hoursLastMonth: 168,
  averageHoursPerDay: 7.8,
  overtimeHours: 12,

  // Task statistics
  tasksCompleted: 342,
  tasksOnTime: 315,
  tasksEarly: 98,
  tasksLate: 27,
  averageTaskCompletionTime: "2.3 days",

  // Project statistics
  projectsCompleted: 28,
  activeProjects: 4,
  averageProjectCompletionTime: "32 days",

  // Scoring
  onTimeScore: 3150, // 315 tasks × 10 points
  earlyBonus: 1960, // 98 tasks × 20 points
  latePenalty: 810, // 27 tasks × -30 points (assuming average 3 days late)
  totalScore: 4300, // onTimeScore + earlyBonus + latePenalty

  // Monthly performance
  monthlyPerformance: [
    { month: "Jan", score: 78 },
    { month: "Feb", score: 82 },
    { month: "Mar", score: 79 },
    { month: "Apr", score: 85 },
    { month: "May", score: 83 },
    { month: "Jun", score: 87 },
    { month: "Jul", score: 90 },
    { month: "Aug", score: 88 },
    { month: "Sep", score: 91 },
    { month: "Oct", score: 87 },
    { month: "Nov", score: 89 },
    { month: "Dec", score: 92 },
  ],

  // Task categories
  taskCategories: [
    { category: "Social Media Profiles", count: 112, percentage: 33 },
    { category: "Content Creation", count: 86, percentage: 25 },
    { category: "Engagement", count: 65, percentage: 19 },
    { category: "Analytics", count: 45, percentage: 13 },
    { category: "Strategy", count: 34, percentage: 10 },
  ],

  // Client distribution
  clientDistribution: [
    { client: "Acme Corporation", count: 8, percentage: 29 },
    { client: "TechStart Inc", count: 6, percentage: 21 },
    { client: "Local Bistro", count: 5, percentage: 18 },
    { client: "Global Retail", count: 4, percentage: 14 },
    { client: "Others", count: 5, percentage: 18 },
  ],

  // Recent achievements
  recentAchievements: [
    {
      id: 1,
      title: "Top Performer",
      description: "Highest task completion rate in Q3",
      date: "2025-09-30",
    },
    {
      id: 2,
      title: "Client Excellence",
      description: "Perfect client satisfaction score for TechStart Inc",
      date: "2025-08-15",
    },
    {
      id: 3,
      title: "Efficiency Award",
      description: "Completed 15 tasks ahead of schedule in July",
      date: "2025-07-31",
    },
  ],

  // Improvement areas
  improvementAreas: [
    { id: 1, area: "Analytics Reporting", score: 72 },
    { id: 2, area: "Content Strategy", score: 78 },
    { id: 3, area: "Team Collaboration", score: 81 },
  ],

  // Today's tasks by client
  todaysWorkByClient: [
    {
      client: "TechStart Inc",
      clientLogo: "/placeholder.svg?height=40&width=40",
      tasks: [
        {
          id: 1,
          name: "Create Instagram post for product launch",
          dueTime: "11:00 AM",
          priority: "high",
          status: "in-progress",
          project: "Product Launch Campaign",
          description:
            "Design and schedule Instagram post announcing the new product launch",
          completed: false,
        },
        {
          id: 2,
          name: "Schedule Twitter announcement",
          dueTime: "1:30 PM",
          priority: "medium",
          status: "not-started",
          project: "Product Launch Campaign",
          description:
            "Create and schedule Twitter announcement for the product launch",
          completed: false,
        },
        {
          id: 3,
          name: "Prepare social media analytics report",
          dueTime: "4:00 PM",
          priority: "medium",
          status: "not-started",
          project: "Monthly Reporting",
          description:
            "Compile social media performance metrics for the monthly client report",
          completed: false,
        },
      ],
    },
    {
      client: "Local Bistro",
      clientLogo: "/placeholder.svg?height=40&width=40",
      tasks: [
        {
          id: 4,
          name: "Respond to customer comments",
          dueTime: "12:30 PM",
          priority: "medium",
          status: "not-started",
          project: "Social Media Management",
          description:
            "Respond to all customer comments and questions from the weekend posts",
          completed: false,
        },
        {
          id: 5,
          name: "Post daily special",
          dueTime: "10:00 AM",
          priority: "high",
          status: "completed",
          project: "Daily Content",
          description:
            "Create and post today's special menu item across all platforms",
          completed: true,
        },
      ],
    },
    {
      client: "Acme Corporation",
      clientLogo: "/placeholder.svg?height=40&width=40",
      tasks: [
        {
          id: 6,
          name: "Weekly analytics report",
          dueTime: "3:00 PM",
          priority: "high",
          status: "not-started",
          project: "Performance Tracking",
          description:
            "Compile and send weekly social media performance report to client",
          completed: false,
        },
        {
          id: 7,
          name: "Engagement response",
          dueTime: "2:00 PM",
          priority: "medium",
          status: "not-started",
          project: "Community Management",
          description:
            "Respond to all comments and messages from the past 24 hours",
          completed: false,
        },
      ],
    },
    {
      client: "Global Retail",
      clientLogo: "/placeholder.svg?height=40&width=40",
      tasks: [
        {
          id: 8,
          name: "Content calendar for next week",
          dueTime: "5:00 PM",
          priority: "medium",
          status: "not-started",
          project: "Content Planning",
          description:
            "Finalize next week's content calendar and get approval from client",
          completed: false,
        },
      ],
    },
    {
      client: "Internal",
      clientLogo: "/placeholder.svg?height=40&width=40",
      tasks: [
        {
          id: 9,
          name: "Team meeting preparation",
          dueTime: "9:30 AM",
          priority: "urgent",
          status: "completed",
          project: "Team Management",
          description:
            "Prepare slides and talking points for the weekly team meeting",
          completed: true,
        },
        {
          id: 10,
          name: "Training session: Advanced Analytics",
          dueTime: "2:30 PM",
          priority: "low",
          status: "not-started",
          project: "Professional Development",
          description:
            "Attend online training session for advanced social media analytics",
          completed: false,
        },
      ],
    },
  ],

  // Upcoming deadlines
  upcomingDeadlines: [
    {
      id: 1,
      name: "Q2 Social Media Strategy",
      client: "TechStart Inc",
      dueDate: "2025-03-25",
      progress: 65,
    },
    {
      id: 2,
      name: "Summer Campaign Planning",
      client: "Local Bistro",
      dueDate: "2025-03-28",
      progress: 40,
    },
    {
      id: 3,
      name: "Website Social Integration",
      client: "Global Retail",
      dueDate: "2025-04-02",
      progress: 25,
    },
  ],
};

// Team averages for comparison
const teamAverages = {
  performanceScore: 82,
  taskCompletionRate: 88,
  qualityScore: 85,
  clientSatisfaction: 4.3,
  tasksCompleted: 310,
  projectsCompleted: 24,
  totalScore: 3800,
};

export default function AgentOverview() {
  const [timeRange, setTimeRange] = useState("all-time");
  const [completedTasks, setCompletedTasks] = useState<number[]>(
    agentData.todaysWorkByClient.flatMap((client) =>
      client.tasks.filter((task) => task.completed).map((task) => task.id)
    )
  );
  const [expandedClients, setExpandedClients] = useState<string[]>(
    agentData.todaysWorkByClient.map((client) => client.client)
  );

  // Calculate performance relative to team average
  const performanceVsTeam = Math.round(
    ((agentData.performanceScore - teamAverages.performanceScore) /
      teamAverages.performanceScore) *
      100
  );
  const scoreVsTeam = Math.round(
    ((agentData.totalScore - teamAverages.totalScore) /
      teamAverages.totalScore) *
      100
  );

  // Calculate task efficiency
  const taskEfficiency = Math.round(
    (agentData.tasksEarly / agentData.tasksCompleted) * 100
  );

  // Calculate on-time percentage
  const onTimePercentage = Math.round(
    ((agentData.tasksOnTime + agentData.tasksEarly) /
      agentData.tasksCompleted) *
      100
  );

  // Handle task completion toggle
  const toggleTaskCompletion = (taskId: number) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter((id) => id !== taskId));
    } else {
      setCompletedTasks([...completedTasks, taskId]);
    }
  };

  // Toggle client expansion
  const toggleClientExpansion = (client: string) => {
    if (expandedClients.includes(client)) {
      setExpandedClients(expandedClients.filter((c) => c !== client));
    } else {
      setExpandedClients([...expandedClients, client]);
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      default:
        return null;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Circle className="h-4 w-4 text-blue-500 fill-blue-100" />;
      case "not-started":
        return <Circle className="h-4 w-4 text-gray-300" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Count total tasks and completed tasks
  const totalTasks = agentData.todaysWorkByClient.reduce(
    (sum, client) => sum + client.tasks.length,
    0
  );
  const totalCompletedTasks = completedTasks.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((totalCompletedTasks / totalTasks) * 100) : 0;

  return (
    <TooltipProvider>
      <div>
        {/* Main Content */}
        <div className="p-4">
          {/* Agent Profile Card */}
          <div className="bg-white rounded-md shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={agentData.avatar} alt={agentData.name} />
                  <AvatarFallback className="text-xl">TH</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{agentData.name}</h1>
                  <p className="text-gray-500">{agentData.designation}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className="bg-[#00b894] hover:bg-[#00a382]">
                      {agentData.department}
                    </Badge>
                    <Badge variant="outline">{agentData.team}</Badge>
                  </div>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    Performance Score
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {agentData.performanceScore}
                    </span>
                    <Badge
                      className={`flex items-center gap-1 ${
                        performanceVsTeam >= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {performanceVsTeam >= 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {performanceVsTeam >= 0 ? "+" : ""}
                      {performanceVsTeam}% vs team
                    </Badge>
                  </div>
                  <Progress
                    value={agentData.performanceScore}
                    className="h-2 mt-2"
                  />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Total Score</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {agentData.totalScore.toLocaleString()}
                    </span>
                    <Badge
                      className={`flex items-center gap-1 ${
                        scoreVsTeam >= 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {scoreVsTeam >= 0 ? (
                        <TrendingUp size={14} />
                      ) : (
                        <TrendingDown size={14} />
                      )}
                      {scoreVsTeam >= 0 ? "+" : ""}
                      {scoreVsTeam}% vs team
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-green-500" />
                      On-time: +{agentData.onTimeScore.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ArrowUp size={12} className="text-blue-500" />
                      Early: +{agentData.earlyBonus.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <ArrowDown size={12} className="text-red-500" />
                      Late: {agentData.latePenalty.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">
                    Client Satisfaction
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {agentData.clientSatisfaction}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={
                            i < Math.floor(agentData.clientSatisfaction)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    Based on {agentData.projectsCompleted} completed projects
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="text-gray-500" />
                  <span>
                    Joined: {new Date(agentData.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} className="text-gray-500" />
                  <span>Manager: {agentData.manager}</span>
                </div>
              </div>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Tasks Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold">
                      {agentData.tasksCompleted}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      vs team avg: {teamAverages.tasksCompleted}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-sm">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>On-time: {onTimePercentage}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <ArrowUp size={12} className="text-blue-500" />
                      <span>Early: {agentData.tasksEarly} tasks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Projects Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold">
                      {agentData.projectsCompleted}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      vs team avg: {teamAverages.projectsCompleted}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-blue-500" />
                      <span>Avg: {agentData.averageProjectCompletionTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <FileText size={12} />
                      <span>Active: {agentData.activeProjects} projects</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Hours Worked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold">
                      {agentData.totalHoursWorked}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">lifetime hours</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-sm">
                      <Timer size={16} className="text-purple-500" />
                      <span>This month: {agentData.hoursThisMonth}h</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock size={12} />
                      <span>Daily avg: {agentData.averageHoursPerDay}h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  Task Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-3xl font-bold">{taskEfficiency}%</div>
                    <p className="text-xs text-gray-500 mt-1">
                      early completion rate
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock size={16} className="text-orange-500" />
                      <span>
                        Avg time: {agentData.averageTaskCompletionTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <XCircle size={12} className="text-red-500" />
                      <span>Late: {agentData.tasksLate} tasks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Detailed Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Today's Work List by Client */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span>Today&apos;s Work List</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {totalCompletedTasks}/{totalTasks} Tasks
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Tasks for {new Date().toLocaleDateString()}
                </CardDescription>
                <Progress value={completionPercentage} className="h-2 mt-2" />
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {agentData.todaysWorkByClient.map((clientData) => (
                    <Collapsible
                      key={clientData.client}
                      open={expandedClients.includes(clientData.client)}
                      onOpenChange={() =>
                        toggleClientExpansion(clientData.client)
                      }
                      className="w-full"
                    >
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={clientData.clientLogo}
                              alt={clientData.client}
                            />
                            <AvatarFallback>
                              {clientData.client.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {clientData.client}
                            </div>
                            <div className="text-xs text-gray-500">
                              {clientData.tasks.length} task
                              {clientData.tasks.length !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gray-100 text-gray-800">
                            {
                              clientData.tasks.filter((task) =>
                                completedTasks.includes(task.id)
                              ).length
                            }
                            /{clientData.tasks.length}
                          </Badge>
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${
                              expandedClients.includes(clientData.client)
                                ? "rotate-90"
                                : ""
                            }`}
                          />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="divide-y bg-gray-50">
                          {clientData.tasks.map((task) => (
                            <div
                              key={task.id}
                              className={`p-4 flex items-start gap-3 ${
                                completedTasks.includes(task.id)
                                  ? "bg-gray-100"
                                  : ""
                              }`}
                            >
                              <Checkbox
                                id={`task-${task.id}`}
                                checked={completedTasks.includes(task.id)}
                                onCheckedChange={() =>
                                  toggleTaskCompletion(task.id)
                                }
                                className="mt-1"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <div
                                    className={`font-medium ${
                                      completedTasks.includes(task.id)
                                        ? "line-through text-gray-500"
                                        : ""
                                    }`}
                                  >
                                    {task.name}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {getPriorityBadge(task.priority)}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                  <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{task.dueTime}</span>
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center gap-1">
                                    <FileText size={12} />
                                    <span>{task.project}</span>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1 text-xs">
                                    {getStatusIcon(
                                      completedTasks.includes(task.id)
                                        ? "completed"
                                        : task.status
                                    )}
                                    <span
                                      className={`${
                                        completedTasks.includes(task.id)
                                          ? "text-green-500"
                                          : task.status === "in-progress"
                                          ? "text-blue-500"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {completedTasks.includes(task.id)
                                        ? "Completed"
                                        : task.status === "in-progress"
                                        ? "In Progress"
                                        : "Not Started"}
                                    </span>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                      >
                                        <MoreHorizontal size={12} />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>
                                        <ExternalLink
                                          size={14}
                                          className="mr-2"
                                        />
                                        View Details
                                      </DropdownMenuItem>
                                      <DropdownMenuItem>
                                        <Clock size={14} className="mr-2" />
                                        Reschedule
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        onClick={() =>
                                          toggleTaskCompletion(task.id)
                                        }
                                      >
                                        <Check size={14} className="mr-2" />
                                        {completedTasks.includes(task.id)
                                          ? "Mark as Incomplete"
                                          : "Mark as Complete"}
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Calendar size={14} className="mr-2" />
                    View All Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Projects and tasks due soon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentData.upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{deadline.name}</div>
                          <div className="text-sm text-gray-500">
                            {deadline.client}
                          </div>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800">
                          {new Date(deadline.dueDate).toLocaleDateString()}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">
                            {deadline.progress}%
                          </span>
                        </div>
                        <Progress value={deadline.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-start gap-2">
                    <Calendar size={16} className="text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Weekly Planning</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Your next planning session is scheduled for tomorrow at
                        10:00 AM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>
                  Monthly performance score over the past year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full flex items-end justify-between gap-2">
                  {agentData.monthlyPerformance.map((month) => (
                    <div
                      key={month.month}
                      className="flex flex-col items-center gap-1 w-full"
                    >
                      <div
                        className="bg-primary/80 hover:bg-primary rounded-t-sm w-full transition-all"
                        style={{ height: `${month.score * 1.8}px` }}
                      ></div>
                      <span className="text-xs text-gray-500">
                        {month.month}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-sm">
                  <div className="flex items-center gap-1">
                    <LineChart size={16} className="text-primary" />
                    <span>Trend: </span>
                    <Badge className="bg-green-100 text-green-800">
                      Improving
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Year average: </span>
                    <span className="font-medium">
                      {Math.round(
                        agentData.monthlyPerformance.reduce(
                          (acc, month) => acc + month.score,
                          0
                        ) / agentData.monthlyPerformance.length
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Scoring Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Scoring Breakdown</CardTitle>
                <CardDescription>
                  How your performance score is calculated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 size={16} className="text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">On-Time Completion</div>
                        <div className="text-sm text-gray-500">
                          {agentData.tasksOnTime} tasks × 10 points
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      +{agentData.onTimeScore.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <ArrowUp size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          Early Completion Bonus
                        </div>
                        <div className="text-sm text-gray-500">
                          {agentData.tasksEarly} tasks × 20 points
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      +{agentData.earlyBonus.toLocaleString()}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                        <ArrowDown size={16} className="text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          Late Completion Penalty
                        </div>
                        <div className="text-sm text-gray-500">
                          {agentData.tasksLate} tasks × avg. -30 points
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold text-red-600">
                      {agentData.latePenalty.toLocaleString()}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Award size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Total Score</div>
                        <div className="text-sm text-gray-500">
                          Sum of all points
                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-bold">
                      {agentData.totalScore.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-md text-sm">
                  <div className="flex items-start gap-2">
                    <HelpCircle size={16} className="text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">How scoring works</p>
                      <p className="text-gray-500 mt-1">
                        On-time tasks earn 10 points each. Early completions
                        earn a bonus of 20 points. Late completions incur a
                        penalty of -10 points per hour after the deadline.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements and Improvement Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Achievements & Improvement Areas</CardTitle>
                <CardDescription>
                  Recent accomplishments and growth opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <h3 className="text-sm font-medium mb-3">
                    Recent Achievements
                  </h3>
                  <div className="space-y-3">
                    {agentData.recentAchievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-3 p-3 bg-green-50 rounded-md"
                      >
                        <Award size={18} className="text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium">{achievement.title}</div>
                          <div className="text-sm text-gray-600">
                            {achievement.description}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(achievement.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">
                    Improvement Areas
                  </h3>
                  <div className="space-y-4">
                    {agentData.improvementAreas.map((area) => (
                      <div key={area.id}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm">{area.area}</span>
                          <span className="text-sm font-medium">
                            {area.score}/100
                          </span>
                        </div>
                        <Progress value={area.score} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                    <div className="flex items-start gap-2">
                      <HelpCircle size={16} className="text-blue-500 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          Improvement Recommendations
                        </p>
                        <ul className="text-gray-600 mt-1 space-y-1 list-disc pl-4">
                          <li>
                            Complete the &quot;Advanced Analytics&quot; training
                            course
                          </li>
                          <li>
                            Schedule a strategy session with your team lead
                          </li>
                          <li>
                            Participate in the next cross-team collaboration
                            project
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison to Team */}
          <Card>
            <CardHeader>
              <CardTitle>Team Comparison</CardTitle>
              <CardDescription>
                How you compare to team averages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Performance Score</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Team: {teamAverages.performanceScore}
                        </span>
                        <span className="text-xs font-medium">
                          You: {agentData.performanceScore}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gray-300"
                        style={{ width: `${teamAverages.performanceScore}%` }}
                      ></div>
                      <div
                        className="absolute top-0 left-0 h-full bg-primary"
                        style={{ width: `${agentData.performanceScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Task Completion Rate</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Team: {teamAverages.taskCompletionRate}%
                        </span>
                        <span className="text-xs font-medium">
                          You: {agentData.taskCompletionRate}%
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gray-300"
                        style={{ width: `${teamAverages.taskCompletionRate}%` }}
                      ></div>
                      <div
                        className="absolute top-0 left-0 h-full bg-primary"
                        style={{ width: `${agentData.taskCompletionRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Quality Score</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Team: {teamAverages.qualityScore}
                        </span>
                        <span className="text-xs font-medium">
                          You: {agentData.qualityScore}
                        </span>
                      </div>
                    </div>
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-gray-300"
                        style={{ width: `${teamAverages.qualityScore}%` }}
                      ></div>
                      <div
                        className="absolute top-0 left-0 h-full bg-primary"
                        style={{ width: `${agentData.qualityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <h3 className="font-medium mb-3">Performance Insights</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <TrendingUp
                          size={16}
                          className="text-green-500 mt-0.5"
                        />
                        <div>
                          <p className="font-medium">Strengths</p>
                          <ul className="text-gray-600 mt-1 space-y-1 list-disc pl-4">
                            <li>
                              Consistently delivers tasks ahead of schedule
                            </li>
                            <li>High client satisfaction ratings</li>
                            <li>Excellent social media engagement metrics</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <TrendingDown
                          size={16}
                          className="text-amber-500 mt-0.5"
                        />
                        <div>
                          <p className="font-medium">Areas for Growth</p>
                          <ul className="text-gray-600 mt-1 space-y-1 list-disc pl-4">
                            <li>Analytics reporting could be more detailed</li>
                            <li>
                              Content strategy development needs improvement
                            </li>
                            <li>More collaboration with team members</li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Award size={16} className="text-blue-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Next Level Goals</p>
                          <ul className="text-gray-600 mt-1 space-y-1 list-disc pl-4">
                            <li>Achieve 95% on-time task completion</li>
                            <li>Lead a cross-functional project</li>
                            <li>Develop advanced analytics skills</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
