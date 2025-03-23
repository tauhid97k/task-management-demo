"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  LineChart,
  Star,
  Timer,
  TrendingDown,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

// Import data from data folder
import { agentData, teamAverages } from "@/Data/agent-data";

export default function AgentOverview() {
  const [timeRange, setTimeRange] = useState("all-time");

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

  return (
    <div>
      <div>
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
                <span className="text-sm text-gray-500">Performance Score</span>
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
                    <span>Avg time: {agentData.averageTaskCompletionTime}</span>
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
          {/* Monthly Performance Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
              <CardDescription>
                Monthly performance score over the past year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full flex items-end justify-between gap-2">
                {agentData.monthlyPerformance.map((month) => (
                  <div
                    key={month.month}
                    className="flex flex-col items-center gap-1 w-full"
                  >
                    <div
                      className="bg-primary/80 hover:bg-primary rounded-t-sm w-full transition-all"
                      style={{ height: `${month.score * 2.5}px` }}
                    ></div>
                    <span className="text-xs text-gray-500">{month.month}</span>
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

          {/* Task Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Task Distribution</CardTitle>
              <CardDescription>Tasks completed by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentData.taskCategories.map((category) => (
                  <div key={category.category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{category.category}</span>
                      <span className="text-sm font-medium">
                        {category.count} tasks
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={category.percentage} className="h-2" />
                      <span className="text-xs text-gray-500 w-8">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div>
                <h4 className="text-sm font-medium mb-3">
                  Client Distribution
                </h4>
                <div className="space-y-2">
                  {agentData.clientDistribution.map((client) => (
                    <div
                      key={client.client}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="text-gray-600">{client.client}</span>
                      <Badge variant="outline">{client.count} projects</Badge>
                    </div>
                  ))}
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
                      <div className="font-medium">Early Completion Bonus</div>
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
                      <div className="font-medium">Late Completion Penalty</div>
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
                      On-time tasks earn 10 points each. Early completions earn
                      a bonus of 20 points. Late completions incur a penalty of
                      -10 points per hour after the deadline.
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
                <h3 className="text-sm font-medium mb-3">Improvement Areas</h3>
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
                      <p className="font-medium">Improvement Recommendations</p>
                      <ul className="text-gray-600 mt-1 space-y-1 list-disc pl-4">
                        <li>
                          Complete the "Advanced Analytics" training course
                        </li>
                        <li>Schedule a strategy session with your team lead</li>
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

        {/* Time Tracking */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Time Tracking</CardTitle>
            <CardDescription>
              Hours worked across projects and tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Hours by Month</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">This Month</span>
                    <span className="font-medium">
                      {agentData.hoursThisMonth} hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Last Month</span>
                    <span className="font-medium">
                      {agentData.hoursLastMonth} hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Average</span>
                    <span className="font-medium">
                      {Math.round(agentData.totalHoursWorked / 12)} hours
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Overtime</span>
                    <span className="font-medium">
                      {agentData.overtimeHours} hours
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">
                  Hours by Project Type
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Social Media</span>
                      <span className="text-xs">45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Content Creation</span>
                      <span className="text-xs">30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Analytics</span>
                      <span className="text-xs">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Strategy</span>
                      <span className="text-xs">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">
                  Productivity Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tasks per Hour</span>
                    <span className="font-medium">
                      {(
                        agentData.tasksCompleted / agentData.totalHoursWorked
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hours per Task</span>
                    <span className="font-medium">
                      {(
                        agentData.totalHoursWorked / agentData.tasksCompleted
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hours per Project</span>
                    <span className="font-medium">
                      {(
                        agentData.totalHoursWorked / agentData.projectsCompleted
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Efficiency Rating</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">High</span>
                      <Badge className="bg-green-100 text-green-800">
                        Top 15%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-sm font-medium mb-3">
                Weekly Time Distribution
              </h3>
              <div className="h-[100px] w-full flex items-end justify-between gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => (
                    <div
                      key={day}
                      className="flex flex-col items-center gap-1 w-full"
                    >
                      <div
                        className={`rounded-t-sm w-full transition-all ${
                          index < 5
                            ? "bg-primary/80 hover:bg-primary"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                        style={{
                          height: `${
                            index < 5
                              ? 60 + Math.random() * 30
                              : 10 + Math.random() * 10
                          }px`,
                        }}
                      ></div>
                      <span className="text-xs text-gray-500">{day}</span>
                    </div>
                  )
                )}
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={16} className="text-primary" />
                  <span>Peak productivity: </span>
                  <span className="font-medium">Tuesday & Thursday</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Weekend work: </span>
                  <span className="font-medium">5% of total hours</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison to Team */}
        <Card>
          <CardHeader>
            <CardTitle>Team Comparison</CardTitle>
            <CardDescription>How you compare to team averages</CardDescription>
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
                      <TrendingUp size={16} className="text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Strengths</p>
                        <ul className="text-gray-600 mt-1 space-y-1 list-disc pl-4">
                          <li>Consistently delivers tasks ahead of schedule</li>
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
  );
}
