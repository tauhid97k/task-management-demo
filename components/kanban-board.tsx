/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TemplateDetailsModal } from "@/components/template-details-modal";

type TemplateStatus = "pending" | "in-progress" | "completed";

// Mock data for templates with status
const mockTemplates = [
  {
    id: "template1",
    clientName: "John Smith",
    companyName: "Acme Corporation",
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

export function KanbanBoard({ packageId }: { packageId: string }) {
  const [templates] = useState(generateTemplatesForPackage(packageId));
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleOpenDetails = (templateId: string) => {
    setSelectedTemplate(templateId);
    setIsDetailsModalOpen(true);
  };

  const pendingTemplates = templates.filter((t) => t.status === "pending");
  const inProgressTemplates = templates.filter(
    (t) => t.status === "in-progress"
  );
  const completedTemplates = templates.filter((t) => t.status === "completed");

  const selectedTemplateData =
    templates.find((t) => t.id === selectedTemplate) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <KanbanColumn
          title="Pending"
          count={pendingTemplates.length}
          templates={pendingTemplates}
          onTemplateClick={handleOpenDetails}
          colorClass="bg-amber-50 border-amber-200"
          headerClass="bg-amber-100 text-amber-800"
        />
        <KanbanColumn
          title="In Progress"
          count={inProgressTemplates.length}
          templates={inProgressTemplates}
          onTemplateClick={handleOpenDetails}
          colorClass="bg-blue-50 border-blue-200"
          headerClass="bg-blue-100 text-blue-800"
        />
        <KanbanColumn
          title="Completed"
          count={completedTemplates.length}
          templates={completedTemplates}
          onTemplateClick={handleOpenDetails}
          colorClass="bg-emerald-50 border-emerald-200"
          headerClass="bg-emerald-100 text-emerald-800"
        />
      </div>

      {selectedTemplateData && (
        <TemplateDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          template={selectedTemplateData}
        />
      )}
    </div>
  );
}

interface KanbanColumnProps {
  title: string;
  count: number;
  templates: any[];
  onTemplateClick: (id: string) => void;
  colorClass: string;
  headerClass: string;
}

function KanbanColumn({
  title,
  count,
  templates,
  onTemplateClick,
  colorClass,
  headerClass,
}: KanbanColumnProps) {
  return (
    <div className={`flex flex-col h-full border rounded-lg ${colorClass}`}>
      <div
        className={`p-3 border-b ${headerClass} rounded-t-lg flex justify-between items-center`}
      >
        <h3 className="font-medium">{title}</h3>
        <Badge variant="outline" className={headerClass}>
          {count}
        </Badge>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onClick={() => onTemplateClick(template.id)}
          />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  onClick,
}: {
  template: any;
  onClick: () => void;
}) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow border border-muted"
      onClick={onClick}
    >
      <CardHeader className="p-3 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={template.clientAvatar}
                alt={template.clientName}
              />
              <AvatarFallback>
                {template.clientName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-sm">{template.clientName}</h4>
              <p className="text-xs text-muted-foreground">
                {template.companyName}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs bg-muted/50">
              {Object.values(template.tasks).flat().length} Tasks
            </Badge>
            <Badge variant="outline" className="text-xs bg-muted/50">
              {
                Object.values(template.tasks)
                  .flat()
                  .filter((t: any) => t.status === "completed").length
              }{" "}
              Completed
            </Badge>
          </div>
          <div className="flex -space-x-2">
            {template.teamMembers.slice(0, 3).map((member: any) => (
              <Avatar
                key={member.id}
                className="border-2 border-background h-6 w-6"
              >
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
            {template.teamMembers.length > 3 && (
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-[10px] font-medium border-2 border-background">
                +{template.teamMembers.length - 3}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
