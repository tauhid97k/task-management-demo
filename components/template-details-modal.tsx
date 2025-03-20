"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AssignTaskModal } from "@/components/assign-task-modal";
import { CalendarClock, CheckCircle2, Clock, Users } from "lucide-react";

interface TemplateDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: any;
}

export function TemplateDetailsModal({
  isOpen,
  onClose,
  template,
}: TemplateDetailsModalProps) {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate task statistics
  const allTasks = Object.values(template.tasks).flat() as any[];
  const completedTasks = allTasks.filter(
    (task) => task.status === "completed"
  ).length;
  const inProgressTasks = allTasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const pendingTasks = allTasks.filter(
    (task) => task.status === "pending"
  ).length;
  const completionPercentage = Math.round(
    (completedTasks / allTasks.length) * 100
  );

  const handleAssignTask = () => {
    setIsAssignModalOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl">Template Details</DialogTitle>
          </DialogHeader>

          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={template.clientAvatar}
                alt={template.clientName}
              />
              <AvatarFallback>
                {template.clientName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{template.clientName}</h2>
              <p className="text-sm text-muted-foreground">
                {template.companyName}
              </p>
            </div>
            <StatusBadge status={template.status} />
          </div>

          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto pr-2">
              <TabsContent value="overview" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard
                    icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                    title="Completion"
                    value={`${completionPercentage}%`}
                    description={`${completedTasks} of ${allTasks.length} tasks`}
                  >
                    <Progress
                      value={completionPercentage}
                      className="h-2 mt-2"
                    />
                  </StatCard>

                  <StatCard
                    icon={<Clock className="h-5 w-5 text-amber-500" />}
                    title="Status"
                    value={
                      template.status === "pending"
                        ? "Pending"
                        : template.status === "in-progress"
                        ? "In Progress"
                        : "Completed"
                    }
                    description={`${pendingTasks} pending, ${inProgressTasks} in progress`}
                  />

                  <StatCard
                    icon={<Users className="h-5 w-5 text-blue-500" />}
                    title="Team Members"
                    value={template.teamMembers.length.toString()}
                    description="Assigned to this template"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TaskOverviewCard
                    title="Social"
                    tasks={template.tasks.social}
                  />
                  <TaskOverviewCard
                    title="Content"
                    tasks={template.tasks.content}
                  />
                  <TaskOverviewCard
                    title="Design"
                    tasks={template.tasks.design}
                  />
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="mt-0 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <TaskCategoryCard
                    title="Social Tasks"
                    tasks={template.tasks.social}
                  />
                  <TaskCategoryCard
                    title="Content Tasks"
                    tasks={template.tasks.content}
                  />
                  <TaskCategoryCard
                    title="Design Tasks"
                    tasks={template.tasks.design}
                  />
                </div>
              </TabsContent>

              <TabsContent value="team" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {template.teamMembers.map((member: any) => (
                    <Card key={member.id}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Team Member
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="mt-4 pt-4 border-t flex justify-end">
            <Button
              onClick={handleAssignTask}
              disabled={template.status === "completed"}
            >
              Assign Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AssignTaskModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        templateId={template.id}
      />
    </>
  );
}

function StatusBadge({
  status,
}: {
  status: "pending" | "in-progress" | "completed";
}) {
  const variants = {
    pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-100",
    completed: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  };

  const labels = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <Badge
      variant="outline"
      className={`px-3 py-1 text-sm ${variants[status]}`}
    >
      {labels[status]}
    </Badge>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  children?: React.ReactNode;
}

function StatCard({
  icon,
  title,
  value,
  description,
  children,
}: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

function TaskOverviewCard({ title, tasks }: { title: string; tasks: any[] }) {
  const completed = tasks.filter((t) => t.status === "completed").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const pending = tasks.filter((t) => t.status === "pending").length;
  const completionPercentage = Math.round((completed / tasks.length) * 100);

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <Badge variant="outline" className="bg-muted/50">
            {tasks.length} Tasks
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Progress value={completionPercentage} className="h-2 mt-3 mb-2" />
        <div className="grid grid-cols-3 text-center text-sm mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="font-medium">{pending}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">In Progress</p>
            <p className="font-medium">{inProgress}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="font-medium">{completed}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function TaskCategoryCard({ title, tasks }: { title: string; tasks: any[] }) {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <Badge variant="outline" className="bg-muted/50">
            {tasks.length} Tasks
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-2 mt-2">
          {tasks.map((task: any) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
            >
              <div className="flex items-center gap-2">
                {task.status === "completed" ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : task.status === "in-progress" ? (
                  <CalendarClock className="h-4 w-4 text-blue-500" />
                ) : (
                  <Clock className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-sm">{task.name}</span>
              </div>
              <StatusBadge status={task.status} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
