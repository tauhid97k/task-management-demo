"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AssignTaskModal } from "@/components/assign-task-modal";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TemplateStatus = "pending" | "in-progress" | "completed";

// Mock data for templates with status
const mockTemplates = [
  {
    id: "template1",
    clientName: "John Smith",
    companyName: "Birds Of Eden Corporation",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "pending" as TemplateStatus,
    teamMembers: [
      {
        id: "tm1",
        name: "Alice",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      { id: "tm2", name: "Bob", avatar: "/placeholder.svg?height=30&width=30" },
      {
        id: "tm3",
        name: "Charlie",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    tasks: {
      social: [
        { id: "s1", name: "Create Facebook post", status: "pending" },
        { id: "s2", name: "Schedule Twitter content", status: "in-progress" },
        { id: "s3", name: "Design Instagram story", status: "pending" },
      ],
      content: [
        { id: "c1", name: "Write blog article", status: "pending" },
        { id: "c2", name: "Create newsletter", status: "completed" },
      ],
      design: [
        { id: "d1", name: "Design new logo", status: "in-progress" },
        { id: "d2", name: "Create banner ads", status: "pending" },
        { id: "d3", name: "Redesign website homepage", status: "pending" },
      ],
    },
  },
  {
    id: "template2",
    clientName: "Sarah Johnson",
    companyName: "TechStart Inc.",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "in-progress" as TemplateStatus,
    teamMembers: [
      {
        id: "tm4",
        name: "David",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm5",
        name: "Emma",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    tasks: {
      social: [
        { id: "s4", name: "LinkedIn campaign", status: "pending" },
        { id: "s5", name: "YouTube video promotion", status: "pending" },
      ],
      content: [
        { id: "c3", name: "Technical whitepaper", status: "in-progress" },
        { id: "c4", name: "Case study", status: "pending" },
        { id: "c5", name: "Product documentation", status: "pending" },
      ],
      design: [
        { id: "d4", name: "Product mockups", status: "completed" },
        { id: "d5", name: "UI design for app", status: "in-progress" },
      ],
    },
  },
  {
    id: "template3",
    clientName: "Michael Brown",
    companyName: "Global Retail Solutions",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "completed" as TemplateStatus,
    teamMembers: [
      {
        id: "tm6",
        name: "Frank",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm7",
        name: "Grace",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm8",
        name: "Henry",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      { id: "tm9", name: "Ivy", avatar: "/placeholder.svg?height=30&width=30" },
    ],
    tasks: {
      social: [
        { id: "s6", name: "Pinterest campaign", status: "completed" },
        { id: "s7", name: "TikTok content creation", status: "completed" },
        { id: "s8", name: "Social media calendar", status: "completed" },
      ],
      content: [
        { id: "c6", name: "Product descriptions", status: "completed" },
        { id: "c7", name: "Email marketing sequence", status: "completed" },
      ],
      design: [
        { id: "d6", name: "Product catalog design", status: "completed" },
        { id: "d7", name: "Promotional flyers", status: "completed" },
        { id: "d8", name: "Packaging design", status: "completed" },
      ],
    },
  },
  {
    id: "template4",
    clientName: "Jennifer Wilson",
    companyName: "Eco Friendly Products",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "pending" as TemplateStatus,
    teamMembers: [
      {
        id: "tm10",
        name: "Kevin",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm11",
        name: "Laura",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    tasks: {
      social: [
        { id: "s9", name: "Instagram campaign", status: "pending" },
        { id: "s10", name: "Facebook ads", status: "pending" },
      ],
      content: [
        { id: "c8", name: "Product launch blog", status: "pending" },
        { id: "c9", name: "Press release", status: "pending" },
      ],
      design: [
        { id: "d9", name: "Product packaging", status: "pending" },
        { id: "d10", name: "Social media graphics", status: "pending" },
      ],
    },
  },
  {
    id: "template5",
    clientName: "Robert Garcia",
    companyName: "Digital Solutions Ltd",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "in-progress" as TemplateStatus,
    teamMembers: [
      {
        id: "tm12",
        name: "Mike",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm13",
        name: "Nancy",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm14",
        name: "Oliver",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    tasks: {
      social: [
        { id: "s11", name: "Twitter campaign", status: "in-progress" },
        { id: "s12", name: "LinkedIn posts", status: "pending" },
      ],
      content: [
        { id: "c10", name: "SEO optimization", status: "in-progress" },
        { id: "c11", name: "Website copy", status: "completed" },
      ],
      design: [
        { id: "d11", name: "Website redesign", status: "in-progress" },
        { id: "d12", name: "Logo refresh", status: "pending" },
      ],
    },
  },
  {
    id: "template6",
    clientName: "Patricia Martinez",
    companyName: "Health & Wellness Co",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "completed" as TemplateStatus,
    teamMembers: [
      {
        id: "tm15",
        name: "Paul",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm16",
        name: "Quinn",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    tasks: {
      social: [
        { id: "s13", name: "Instagram stories", status: "completed" },
        { id: "s14", name: "Facebook community", status: "completed" },
      ],
      content: [
        { id: "c12", name: "Wellness guides", status: "completed" },
        { id: "c13", name: "Newsletter series", status: "completed" },
      ],
      design: [
        { id: "d13", name: "Product labels", status: "completed" },
        { id: "d14", name: "Brochure design", status: "completed" },
      ],
    },
  },
  {
    id: "template7",
    clientName: "Thomas Anderson",
    companyName: "Matrix Technologies",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "in-progress" as TemplateStatus,
    teamMembers: [
      {
        id: "tm17",
        name: "Rachel",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm18",
        name: "Steve",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm19",
        name: "Tina",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    tasks: {
      social: [
        { id: "s15", name: "Tech forum engagement", status: "in-progress" },
        { id: "s16", name: "Developer community", status: "pending" },
      ],
      content: [
        { id: "c14", name: "Technical documentation", status: "in-progress" },
        { id: "c15", name: "API guides", status: "pending" },
      ],
      design: [
        { id: "d15", name: "UI component library", status: "completed" },
        { id: "d16", name: "Dashboard mockups", status: "in-progress" },
      ],
    },
  },
  {
    id: "template8",
    clientName: "Olivia Taylor",
    companyName: "Fashion Forward",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    status: "pending" as TemplateStatus,
    teamMembers: [
      {
        id: "tm20",
        name: "Uma",
        avatar: "/placeholder.svg?height=30&width=30",
      },
      {
        id: "tm21",
        name: "Victor",
        avatar: "/placeholder.svg?height=30&width=30",
      },
    ],
    tasks: {
      social: [
        { id: "s17", name: "Instagram influencer campaign", status: "pending" },
        { id: "s18", name: "Pinterest boards", status: "pending" },
      ],
      content: [
        { id: "c16", name: "Style guides", status: "pending" },
        { id: "c17", name: "Seasonal lookbook", status: "pending" },
      ],
      design: [
        { id: "d17", name: "Product photography", status: "pending" },
        { id: "d18", name: "Website banners", status: "pending" },
      ],
    },
  },
];

// Generate more templates for each package
const generateTemplatesForPackage = (packageId: string) => {
  // Use the mock templates as a base and add some variation
  return mockTemplates.map((template, index) => ({
    ...template,
    id: `${packageId}-${template.id}`,
    clientName: template.clientName + (index % 2 === 0 ? " Jr." : " Sr."),
    companyName:
      template.companyName +
      (index % 3 === 0 ? " Global" : index % 3 === 1 ? " Ltd." : " Inc."),
  }));
};

export function TemplateList({ packageId }: { packageId: string }) {
  const [templates] = useState(generateTemplatesForPackage(packageId));
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TemplateStatus | "all">("all");

  const handleAssignTask = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsModalOpen(true);
  };

  const filteredTemplates =
    activeTab === "all"
      ? templates
      : templates.filter((template) => template.status === activeTab);

  return (
    <div>
      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TemplateStatus | "all")}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-8">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <CardHeader className="p-4 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={template.clientAvatar}
                      alt={template.clientName}
                    />
                    <AvatarFallback>
                      {template.clientName.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{template.clientName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {template.companyName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <StatusBadge status={template.status} large />
                  <div className="flex -space-x-2">
                    {template.teamMembers.map((member) => (
                      <Avatar
                        key={member.id}
                        className="border-2 border-background h-8 w-8"
                      >
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {template.teamMembers.length > 3 && (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                        +{template.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TaskColumn title="Social" tasks={template.tasks.social} />
                <TaskColumn title="Content" tasks={template.tasks.content} />
                <TaskColumn title="Design" tasks={template.tasks.design} />
              </div>
            </CardContent>
            <CardFooter className="p-4 border-t">
              <Button
                className="w-full"
                onClick={() => handleAssignTask(template.id)}
                disabled={template.status === "completed"}
              >
                Assign Task
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AssignTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        templateId={selectedTemplate}
      />
    </div>
  );
}

interface Task {
  id: string;
  name: string;
  status: "pending" | "in-progress" | "completed";
}

function TaskColumn({ title, tasks }: { title: string; tasks: Task[] }) {
  return (
    <div>
      <h4 className="font-medium mb-3">{title}</h4>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
          >
            <span className="text-sm">{task.name}</span>
            <StatusBadge status={task.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusBadge({
  status,
  large = false,
}: {
  status: "pending" | "in-progress" | "completed";
  large?: boolean;
}) {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    "in-progress": "bg-blue-100 text-blue-800 hover:bg-blue-100",
    completed: "bg-green-100 text-green-800 hover:bg-green-100",
  };

  const labels = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <Badge
      variant="outline"
      className={`${variants[status]} ${
        large ? "px-3 py-1 text-sm" : "text-xs"
      }`}
    >
      {labels[status]}
    </Badge>
  );
}
