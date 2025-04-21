// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useRouter } from "next/navigation"
// import {
//   Search,
//   Calendar,
//   CheckCircle,
//   Users,
//   FileText,
//   Plus,
//   MessageSquare,
//   AlertTriangle,
//   CheckCheck,
//   ArrowLeft,
//   Copy,
//   UserPlus,
//   Eye,
//   Filter,
//   Check,
//   Globe,
//   Layout,
//   Layers,
// } from "lucide-react"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Progress } from "@/components/ui/progress"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import Link from "next/link"
// import { AssignTemplateModal } from "@/components/assign-template-modal"
// import { toast } from "sonner"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"

// // Mock data
// const generateTemplates = (packageId: string) => {
//   const templates = [
//     {
//       id: "template1",
//       name: "Standard Marketing Template",
//       description: "Default template for marketing clients",
//       createdAt: "2025-03-01",
//       updatedAt: "2025-03-15",
//       isDefault: true,
//       company: "Birds Of Eden Corporation",
//       designation: "Marketing Director",
//       avatar: "/placeholder.svg?height=80&width=80",
//       progress: 25,
//       status: "pending",
//       package: packageId,
//       packageType: "DFP90",
//       startDate: "2025-03-01",
//       dueDate: "2025-06-15",
//       totalTasks: 18,
//       completedTasks: 4,
//       pendingTasks: 10,
//       inProgressTasks: 4,
//       hasNewComments: true,
//       hasIssues: false,
//       teamMembers: [
//         {
//           id: "tm1",
//           name: "Alice Johnson",
//           email: "alice@example.com",
//           avatar: "/placeholder.svg?height=60&width=60",
//           role: "Social Media Manager",
//           team: "social",
//           assignedDate: "2025-03-05",
//           assignedTasks: 6,
//           completedTasks: 2,
//           lateTasks: 1,
//         },
//         {
//           id: "tm2",
//           name: "Bob Smith",
//           email: "bob@example.com",
//           avatar: "/placeholder.svg?height=60&width=60",
//           role: "Content Writer",
//           team: "content",
//           assignedDate: "2025-03-05",
//           assignedTasks: 5,
//           completedTasks: 1,
//           lateTasks: 0,
//         },
//       ],
//       socialSites: [
//         { name: "Facebook", url: "https://facebook.com", isRequired: true },
//         { name: "Twitter", url: "https://twitter.com", isRequired: true },
//         { name: "Instagram", url: "https://instagram.com", isRequired: true },
//         { name: "LinkedIn", url: "https://linkedin.com", isRequired: true },
//         { name: "Pinterest", url: "https://pinterest.com", isRequired: false },
//       ],
//       web2Sites: [
//         { name: "Medium", url: "https://medium.com", isRequired: true },
//         { name: "Blogger", url: "https://blogger.com", isRequired: true },
//         { name: "WordPress", url: "https://wordpress.com", isRequired: false },
//       ],
//       additionalAssets: [
//         { name: "Logo Design", description: "Company logo in vector format", isRequired: true },
//         { name: "Banner Images", description: "Social media banners", isRequired: true },
//         { name: "Brand Guidelines", description: "PDF document", isRequired: false },
//       ],
//     },
//     {
//       id: "template2",
//       name: "Tech Startup Template",
//       description: "Optimized for tech startups and SaaS companies",
//       createdAt: "2025-02-15",
//       updatedAt: "2025-02-28",
//       isDefault: false,
//       company: "TechStart Inc.",
//       designation: "CEO",
//       avatar: "/placeholder.svg?height=80&width=80",
//       progress: 60,
//       status: "in-progress",
//       package: packageId,
//       packageType: "DFP120",
//       startDate: "2025-02-15",
//       dueDate: "2025-05-30",
//       totalTasks: 15,
//       completedTasks: 9,
//       pendingTasks: 3,
//       inProgressTasks: 3,
//       hasNewComments: false,
//       hasIssues: true,
//       teamMembers: [
//         {
//           id: "tm4",
//           name: "David Wilson",
//           email: "david@example.com",
//           avatar: "/placeholder.svg?height=60&width=60",
//           role: "Project Manager",
//           team: "management",
//           assignedDate: "2025-02-20",
//           assignedTasks: 4,
//           completedTasks: 3,
//           lateTasks: 0,
//         },
//         {
//           id: "tm5",
//           name: "Emma Brown",
//           email: "emma@example.com",
//           avatar: "/placeholder.svg?height=60&width=60",
//           role: "Content Strategist",
//           team: "content",
//           assignedDate: "2025-02-20",
//           assignedTasks: 6,
//           completedTasks: 4,
//           lateTasks: 1,
//         },
//       ],
//       socialSites: [
//         { name: "Twitter", url: "https://twitter.com", isRequired: true },
//         { name: "LinkedIn", url: "https://linkedin.com", isRequired: true },
//         { name: "GitHub", url: "https://github.com", isRequired: true },
//         { name: "ProductHunt", url: "https://producthunt.com", isRequired: false },
//       ],
//       web2Sites: [
//         { name: "Medium", url: "https://medium.com", isRequired: true },
//         { name: "Dev.to", url: "https://dev.to", isRequired: true },
//         { name: "Hacker News", url: "https://news.ycombinator.com", isRequired: false },
//       ],
//       additionalAssets: [
//         { name: "Product Screenshots", description: "High-resolution product screenshots", isRequired: true },
//         { name: "Demo Videos", description: "Product demo videos", isRequired: true },
//         { name: "Technical Documentation", description: "API documentation", isRequired: false },
//       ],
//     },
//     {
//       id: "template3",
//       name: "E-commerce Package",
//       description: "Complete template for online stores and e-commerce businesses",
//       createdAt: "2025-01-10",
//       updatedAt: "2025-02-05",
//       isDefault: false,
//       company: "Global Retail Solutions",
//       designation: "Marketing VP",
//       avatar: "/placeholder.svg?height=80&width=80",
//       progress: 100,
//       status: "completed",
//       package: packageId,
//       packageType: "DFP180",
//       startDate: "2025-01-10",
//       dueDate: "2025-03-15",
//       totalTasks: 20,
//       completedTasks: 20,
//       pendingTasks: 0,
//       inProgressTasks: 0,
//       hasNewComments: false,
//       hasIssues: false,
//       teamMembers: [
//         {
//           id: "tm7",
//           name: "Grace Lee",
//           email: "grace@example.com",
//           avatar: "/placeholder.svg?height=60&width=60",
//           role: "Social Media Coordinator",
//           team: "social",
//           assignedDate: "2025-01-15",
//           assignedTasks: 7,
//           completedTasks: 7,
//           lateTasks: 0,
//         },
//         {
//           id: "tm8",
//           name: "Henry Garcia",
//           email: "henry@example.com",
//           avatar: "/placeholder.svg?height=60&width=60",
//           role: "Content Creator",
//           team: "content",
//           assignedDate: "2025-01-15",
//           assignedTasks: 6,
//           completedTasks: 6,
//           lateTasks: 0,
//         },
//       ],
//       socialSites: [
//         { name: "Facebook", url: "https://facebook.com", isRequired: true },
//         { name: "Instagram", url: "https://instagram.com", isRequired: true },
//         { name: "Pinterest", url: "https://pinterest.com", isRequired: true },
//         { name: "TikTok", url: "https://tiktok.com", isRequired: true },
//         { name: "YouTube", url: "https://youtube.com", isRequired: true },
//       ],
//       web2Sites: [
//         { name: "Shopify Blog", url: "https://shopify.com/blog", isRequired: true },
//         { name: "Medium", url: "https://medium.com", isRequired: true },
//         { name: "WordPress", url: "https://wordpress.com", isRequired: true },
//       ],
//       additionalAssets: [
//         { name: "Product Photos", description: "High-quality product photography", isRequired: true },
//         { name: "Brand Style Guide", description: "Complete brand guidelines", isRequired: true },
//         { name: "Email Templates", description: "Marketing email templates", isRequired: true },
//       ],
//     },
//   ]

//   return templates
// }

// export default function TemplatesPage() {
//   const params = useParams<{ packageId: string }>()
//   const router = useRouter()
//   const packageId = params.packageId as string
//   const [templates, setTemplates] = useState<any[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [isAgentsModalOpen, setIsAgentsModalOpen] = useState(false)
//   const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
//   const [agentSearchQuery, setAgentSearchQuery] = useState("")
//   const [activeTeamTab, setActiveTeamTab] = useState("all")
//   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
//   const [templateToAssign, setTemplateToAssign] = useState<any>(null)
//   const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
//   const [templateToPreview, setTemplateToPreview] = useState<any>(null)

//   useEffect(() => {
//     if (packageId) {
//       // In a real app, you'd fetch this from your API
//       const data = generateTemplates(packageId)
//       setTemplates(data)
//     }
//   }, [packageId])

//   const filteredTemplates = templates.filter((template) => {
//     // Filter by status
//     if (statusFilter !== "all" && template.status !== statusFilter) {
//       return false
//     }

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       return template.name.toLowerCase().includes(query) || template.description.toLowerCase().includes(query)
//     }

//     return true
//   })

//   const handleViewAgents = (template: any) => {
//     setSelectedTemplate(template)
//     setIsAgentsModalOpen(true)
//   }

//   const handleViewTasks = (templateId: string) => {
//     router.push(`/admin/packages/${packageId}/templates/${templateId}`)
//   }

//   const handleCreateTemplate = () => {
//     // Navigate to the new template creation page
//     router.push(`/admin/packages/${packageId}/templates/new`)
//   }

//   const handleEditTemplate = (template: any) => {
//     // In a real app, you'd navigate to an edit page with the template ID
//     router.push(`/admin/packages/${packageId}/templates/edit/${template.id}`)
//   }

//   const handleAssignTemplate = (template: any) => {
//     setTemplateToAssign(template)
//     setIsAssignModalOpen(true)
//   }

//   const handleDuplicateTemplate = (template: any) => {
//     const newTemplate = {
//       ...template,
//       id: `template-${Date.now()}`,
//       name: `${template.name} (Copy)`,
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//       isDefault: false,
//     }

//     setTemplates([...templates, newTemplate])
//     toast.success("Template duplicated successfully")
//   }

//   const handlePreviewTemplate = (template: any) => {
//     setTemplateToPreview(template)
//     setIsPreviewModalOpen(true)
//   }

//   const handleMakeDefault = (template: any) => {
//     // Update all templates to not be default
//     const updatedTemplates = templates.map((t) => ({
//       ...t,
//       isDefault: t.id === template.id,
//     }))

//     setTemplates(updatedTemplates)
//     toast.success(`"${template.name}" set as default template`)
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
//           <div className="flex items-center gap-2">
//             <Link href="/admin/packages" className="text-gray-500 hover:text-gray-700">
//               <Button variant="ghost" size="sm" className="gap-1">
//                 <ArrowLeft size={16} />
//                 <span>Back to Packages</span>
//               </Button>
//             </Link>
//             <h1 className="text-2xl font-bold">{packageId} Templates</h1>
//           </div>

//           <div className="flex flex-wrap items-center gap-3">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
//               <Input
//                 placeholder="Search templates..."
//                 className="pl-9 w-[250px]"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-[150px]">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="in-progress">In Progress</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button className="bg-[#00b894] hover:bg-[#00a382]" onClick={handleCreateTemplate}>
//               <Plus className="h-4 w-4 mr-2" />
//               New Template
//             </Button>
//           </div>
//         </div>

//         <div className="flex items-center text-sm text-gray-500 mb-2">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-1">
//               <div className="w-3 h-3 rounded-full bg-amber-400"></div>
//               <span>Pending: {templates.filter((c) => c.status === "pending").length}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-3 h-3 rounded-full bg-blue-400"></div>
//               <span>In Progress: {templates.filter((c) => c.status === "in-progress").length}</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
//               <span>Completed: {templates.filter((c) => c.status === "completed").length}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {filteredTemplates.length === 0 ? (
//           <div className="col-span-full text-center py-12 border rounded-lg bg-muted/20">
//             <div className="flex flex-col items-center justify-center gap-3">
//               <FileText className="h-12 w-12 text-muted-foreground/50" />
//               <h3 className="text-xl font-medium">No templates found</h3>
//               <p className="text-muted-foreground">
//                 {searchQuery || statusFilter !== "all"
//                   ? "Try adjusting your search or filters"
//                   : "Create your first template to get started"}
//               </p>
//               {(searchQuery || statusFilter !== "all") && (
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setSearchQuery("")
//                     setStatusFilter("all")
//                   }}
//                   className="mt-2"
//                 >
//                   <Filter className="h-4 w-4 mr-2" />
//                   Clear Filters
//                 </Button>
//               )}
//               {!searchQuery && statusFilter === "all" && (
//                 <Button className="bg-[#00b894] hover:bg-[#00a382] mt-2" onClick={handleCreateTemplate}>
//                   <Plus className="h-4 w-4 mr-2" />
//                   Create Template
//                 </Button>
//               )}
//             </div>
//           </div>
//         ) : (
//           filteredTemplates.map((template) => (
//             <Card key={template.id} className="overflow-hidden">
//               <CardHeader className="p-5 border-b">
//                 <div className="flex items-center justify-between">
//                   <div className="flex flex-col gap-1">
//                     <div className="flex items-center gap-2">
//                       <h2 className="text-xl font-semibold">{template.name}</h2>
//                       {template.isDefault && (
//                         <Badge variant="secondary" className="bg-blue-100 text-blue-800">
//                           Default
//                         </Badge>
//                       )}
//                     </div>
//                     <p className="text-gray-500">{template.description}</p>
//                     <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
//                       <span>Created: {new Date(template.createdAt).toLocaleDateString()}</span>
//                       <span>•</span>
//                       <span>Updated: {new Date(template.updatedAt).toLocaleDateString()}</span>
//                     </div>
//                   </div>
//                   <div className="flex flex-col items-end gap-2">
//                     <Badge
//                       className={
//                         template.status === "completed"
//                           ? "bg-emerald-100 text-emerald-800 text-sm px-3 py-1"
//                           : template.status === "in-progress"
//                             ? "bg-blue-100 text-blue-800 text-sm px-3 py-1"
//                             : "bg-amber-100 text-amber-800 text-sm px-3 py-1"
//                       }
//                     >
//                       {template.status === "completed"
//                         ? "Completed"
//                         : template.status === "in-progress"
//                           ? "In Progress"
//                           : "Pending"}
//                     </Badge>
//                     <Badge variant="outline" className="bg-gray-50">
//                       Package: {template.packageType}
//                     </Badge>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-5">
//                 <div className="space-y-4">
//                   <div>
//                     <div className="flex justify-between text-sm mb-1">
//                       <span className="text-gray-500">Overall Progress</span>
//                       <span className="font-medium">{template.progress}%</span>
//                     </div>
//                     <Progress value={template.progress} className="h-2" />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="bg-gray-50 p-3 rounded-lg border">
//                       <div className="flex items-center gap-2 mb-2">
//                         <FileText className="h-5 w-5 text-gray-500" />
//                         <h3 className="font-medium">Configuration</h3>
//                       </div>
//                       <div className="grid grid-cols-2 gap-2 text-sm">
//                         <div className="text-gray-500">Social Sites:</div>
//                         <div className="font-medium">{template.socialSites.length}</div>

//                         <div className="text-gray-500">Web 2.0 Sites:</div>
//                         <div className="font-medium">{template.web2Sites.length}</div>

//                         <div className="text-gray-500">Additional Assets:</div>
//                         <div className="font-medium">{template.additionalAssets.length}</div>
//                       </div>
//                     </div>

//                     <div className="bg-gray-50 p-3 rounded-lg border">
//                       <div className="flex items-center gap-2 mb-2">
//                         <Calendar className="h-5 w-5 text-gray-500" />
//                         <h3 className="font-medium">Timeline</h3>
//                       </div>
//                       <div className="grid grid-cols-2 gap-2 text-sm">
//                         <div className="text-gray-500">Start Date:</div>
//                         <div className="font-medium">{new Date(template.startDate).toLocaleDateString()}</div>

//                         <div className="text-gray-500">Due Date:</div>
//                         <div className="font-medium">{new Date(template.dueDate).toLocaleDateString()}</div>

//                         <div className="text-gray-500">Team Size:</div>
//                         <div className="font-medium">{template.teamMembers.length} members</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-4">
//                     {template.hasNewComments && (
//                       <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
//                         <MessageSquare className="h-4 w-4" />
//                         <span>New comments</span>
//                       </div>
//                     )}
//                     {template.hasIssues && (
//                       <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
//                         <AlertTriangle className="h-4 w-4" />
//                         <span>Issues reported</span>
//                       </div>
//                     )}
//                     {!template.hasIssues && !template.hasNewComments && (
//                       <div className="flex items-center gap-1 text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full text-sm">
//                         <CheckCheck className="h-4 w-4" />
//                         <span>No Issues</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter className="border-t p-0 grid grid-cols-4">
//                 <Button variant="ghost" className="rounded-none h-12" onClick={() => handleViewAgents(template)}>
//                   <Users className="h-4 w-4 mr-2" />
//                   Team
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="rounded-none h-12 border-l"
//                   onClick={() => handleViewTasks(template.id)}
//                 >
//                   <CheckCircle className="h-4 w-4 mr-2" />
//                   Tasks
//                 </Button>
//                 <Button
//                   variant="ghost"
//                   className="rounded-none h-12 border-l"
//                   onClick={() => handleEditTemplate(template)}
//                 >
//                   <FileText className="h-4 w-4 mr-2" />
//                   Edit
//                 </Button>
//                 <div className="flex border-l">
//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" className="rounded-none h-12 flex-1">
//                         <UserPlus className="h-4 w-4 mr-2" />
//                         Assign
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuItem onClick={() => handleAssignTemplate(template)}>
//                         <UserPlus className="h-4 w-4 mr-2" />
//                         Assign to Client
//                       </DropdownMenuItem>
//                       <DropdownMenuItem onClick={() => handlePreviewTemplate(template)}>
//                         <Eye className="h-4 w-4 mr-2" />
//                         Preview Template
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)}>
//                         <Copy className="h-4 w-4 mr-2" />
//                         Duplicate Template
//                       </DropdownMenuItem>
//                       {!template.isDefault && (
//                         <DropdownMenuItem onClick={() => handleMakeDefault(template)}>
//                           <Check className="h-4 w-4 mr-2" />
//                           Make Default
//                         </DropdownMenuItem>
//                       )}
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </CardFooter>
//             </Card>
//           ))
//         )}
//       </div>

//       {/* Assign Template Modal */}
//       {templateToAssign && (
//         <AssignTemplateModal
//           isOpen={isAssignModalOpen}
//           onClose={() => setIsAssignModalOpen(false)}
//           templateId={templateToAssign.id}
//           templateName={templateToAssign.name}
//           packageId={packageId}
//         />
//       )}

//       {/* Template Preview Modal */}
//       {templateToPreview && (
//         <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
//           <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
//             <DialogHeader>
//               <DialogTitle>Template Preview: {templateToPreview.name}</DialogTitle>
//               <DialogDescription>Preview how this template will appear when assigned to clients</DialogDescription>
//             </DialogHeader>

//             <div className="overflow-auto flex-1 p-4">
//               <div className="space-y-6">
//                 <div className="bg-gray-50 p-4 rounded-lg border">
//                   <h3 className="text-lg font-medium mb-3">Template Information</h3>
//                   <div className="grid grid-cols-2 gap-4 text-sm">
//                     <div>
//                       <p className="text-gray-500">Package Type:</p>
//                       <p className="font-medium">{templateToPreview.packageType}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Default Template:</p>
//                       <p className="font-medium">{templateToPreview.isDefault ? "Yes" : "No"}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Created:</p>
//                       <p className="font-medium">{new Date(templateToPreview.createdAt).toLocaleDateString()}</p>
//                     </div>
//                     <div>
//                       <p className="text-gray-500">Last Updated:</p>
//                       <p className="font-medium">{new Date(templateToPreview.updatedAt).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                 </div>

//                 <Tabs defaultValue="socialSites">
//                   <TabsList className="grid w-full grid-cols-3">
//                     <TabsTrigger value="socialSites" className="relative">
//                       <div className="flex items-center gap-2">
//                         <Globe className="h-4 w-4" />
//                         <span>Social Sites</span>
//                         <Badge className="ml-1 bg-primary/20 text-primary">
//                           {templateToPreview.socialSites.length}
//                         </Badge>
//                       </div>
//                     </TabsTrigger>
//                     <TabsTrigger value="web2Sites" className="relative">
//                       <div className="flex items-center gap-2">
//                         <Layout className="h-4 w-4" />
//                         <span>Web 2.0 Sites</span>
//                         <Badge className="ml-1 bg-primary/20 text-primary">{templateToPreview.web2Sites.length}</Badge>
//                       </div>
//                     </TabsTrigger>
//                     <TabsTrigger value="additionalAssets" className="relative">
//                       <div className="flex items-center gap-2">
//                         <Layers className="h-4 w-4" />
//                         <span>Additional Assets</span>
//                         <Badge className="ml-1 bg-primary/20 text-primary">
//                           {templateToPreview.additionalAssets.length}
//                         </Badge>
//                       </div>
//                     </TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="socialSites" className="mt-4">
//                     <div className="space-y-3">
//                       {templateToPreview.socialSites.map((site: any, index: number) => (
//                         <Card key={index}>
//                           <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <Badge
//                                 variant={site.isRequired ? "default" : "outline"}
//                                 className={site.isRequired ? "bg-primary" : ""}
//                               >
//                                 {site.isRequired ? "Required" : "Optional"}
//                               </Badge>
//                               <h4 className="text-sm font-medium">{site.name}</h4>
//                             </div>
//                           </CardHeader>
//                           <CardContent className="p-4 pt-2">
//                             <div className="text-sm">
//                               <p className="text-gray-500">URL:</p>
//                               <a
//                                 href={site.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:underline"
//                               >
//                                 {site.url}
//                               </a>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </TabsContent>

//                   <TabsContent value="web2Sites" className="mt-4">
//                     <div className="space-y-3">
//                       {templateToPreview.web2Sites.map((site: any, index: number) => (
//                         <Card key={index}>
//                           <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <Badge
//                                 variant={site.isRequired ? "default" : "outline"}
//                                 className={site.isRequired ? "bg-primary" : ""}
//                               >
//                                 {site.isRequired ? "Required" : "Optional"}
//                               </Badge>
//                               <h4 className="text-sm font-medium">{site.name}</h4>
//                             </div>
//                           </CardHeader>
//                           <CardContent className="p-4 pt-2">
//                             <div className="text-sm">
//                               <p className="text-gray-500">URL:</p>
//                               <a
//                                 href={site.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:underline"
//                               >
//                                 {site.url}
//                               </a>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </TabsContent>

//                   <TabsContent value="additionalAssets" className="mt-4">
//                     <div className="space-y-3">
//                       {templateToPreview.additionalAssets.map((asset: any, index: number) => (
//                         <Card key={index}>
//                           <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <Badge
//                                 variant={asset.isRequired ? "default" : "outline"}
//                                 className={asset.isRequired ? "bg-primary" : ""}
//                               >
//                                 {asset.isRequired ? "Required" : "Optional"}
//                               </Badge>
//                               <h4 className="text-sm font-medium">{asset.name}</h4>
//                             </div>
//                           </CardHeader>
//                           <CardContent className="p-4 pt-2">
//                             <div className="text-sm">
//                               <p className="text-gray-500">Description:</p>
//                               <p>{asset.description || "No description provided"}</p>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))}
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </div>
//             </div>

//             <DialogFooter className="border-t pt-4">
//               <Button variant="outline" onClick={() => setIsPreviewModalOpen(false)}>
//                 Close Preview
//               </Button>
//               <Button
//                 className="bg-[#00b894] hover:bg-[#00a382]"
//                 onClick={() => {
//                   setIsPreviewModalOpen(false)
//                   handleAssignTemplate(templateToPreview)
//                 }}
//               >
//                 <UserPlus className="h-4 w-4 mr-2" />
//                 Assign to Client
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>
//   )
// }









"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  Search,
  Calendar,
  CheckCircle,
  Users,
  FileText,
  Plus,
  MessageSquare,
  AlertTriangle,
  CheckCheck,
  ArrowLeft,
  Copy,
  UserPlus,
  Eye,
  Filter,
  Check,
  Globe,
  Layout,
  Layers,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { AssignTemplateModal } from "@/components/assign-template-modal"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Template, Assignment, Client } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TemplatesPage() {
  const params = useParams<{ packageId: string }>()
  const router = useRouter()
  const packageId = params.packageId as string
  const [templates, setTemplates] = useState<Template[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [isAgentsModalOpen, setIsAgentsModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [agentSearchQuery, setAgentSearchQuery] = useState("")
  const [activeTeamTab, setActiveTeamTab] = useState("all")
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [templateToAssign, setTemplateToAssign] = useState<Template | null>(null)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [templateToPreview, setTemplateToPreview] = useState<Template | null>(null)
  const [assignedClients, setAssignedClients] = useState<{ [key: string]: Client[] }>({})

  // Fetch templates for the package
  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/templates?packageId=${packageId}`)
        if (response.ok) {
          const data = await response.json()
          setTemplates(data)

          // Fetch assigned clients for each template
          const clientAssignments: { [key: string]: Client[] } = {}
          for (const template of data) {
            const assignmentsResponse = await fetch(`/api/assignments?templateId=${template.id}`)
            if (assignmentsResponse.ok) {
              const assignments = (await assignmentsResponse.json()) as Assignment[]

              // Fetch client details for each assignment
              const clients: Client[] = []
              for (const assignment of assignments) {
                const clientResponse = await fetch(`/api/clients?id=${assignment.clientId}`)
                if (clientResponse.ok) {
                  const client = await clientResponse.json()
                  clients.push(client)
                }
              }

              clientAssignments[template.id] = clients
            }
          }

          setAssignedClients(clientAssignments)
        } else {
          toast.error("Failed to fetch templates")
        }
      } catch (error) {
        console.error("Error fetching templates:", error)
        toast.error("An error occurred while fetching templates")
      } finally {
        setIsLoading(false)
      }
    }

    if (packageId) {
      fetchTemplates()
    }
  }, [packageId])

  const filteredTemplates = templates.filter((template) => {
    // Filter by status
    if (statusFilter !== "all" && template.status !== statusFilter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return template.name.toLowerCase().includes(query) || template.description.toLowerCase().includes(query)
    }

    return true
  })

  const handleViewAgents = (template: Template) => {
    setSelectedTemplate(template)
    setIsAgentsModalOpen(true)
  }

  const handleViewTasks = (templateId: string) => {
    router.push(`/admin/packages/${packageId}/templates/${templateId}`)
  }

  const handleCreateTemplate = () => {
    // Navigate to the new template creation page
    router.push(`/admin/packages/${packageId}/templates/new`)
  }

  const handleEditTemplate = (template: Template) => {
    // Navigate to the edit page with the template ID
    router.push(`/admin/packages/${packageId}/templates/edit/${template.id}`)
  }

  const handleAssignTemplate = (template: Template) => {
    setTemplateToAssign(template)
    setIsAssignModalOpen(true)
  }

  const handleDuplicateTemplate = async (template: Template) => {
    try {
      const newTemplate = {
        ...template,
        id: `template-${Date.now()}`,
        name: `${template.name} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDefault: false,
      }

      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTemplate),
      })

      if (response.ok) {
        const savedTemplate = await response.json()
        setTemplates([...templates, savedTemplate])
        toast.success("Template duplicated successfully")
      } else {
        toast.error("Failed to duplicate template")
      }
    } catch (error) {
      console.error("Error duplicating template:", error)
      toast.error("An error occurred while duplicating the template")
    }
  }

  const handlePreviewTemplate = (template: Template) => {
    setTemplateToPreview(template)
    setIsPreviewModalOpen(true)
  }

  const handleMakeDefault = async (template: Template) => {
    try {
      // Update the template to be default
      const updatedTemplate = {
        ...template,
        isDefault: true,
        updatedAt: new Date().toISOString(),
      }

      const response = await fetch(`/api/templates/${template.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTemplate),
      })

      if (response.ok) {
        // Update all templates in state
        const updatedTemplates = templates.map((t) => ({
          ...t,
          isDefault: t.id === template.id,
        }))

        setTemplates(updatedTemplates)
        toast.success(`"${template.name}" set as default template`)
      } else {
        toast.error("Failed to update template")
      }
    } catch (error) {
      console.error("Error updating template:", error)
      toast.error("An error occurred while updating the template")
    }
  }

  const handleAssignmentComplete = async (templateId: string, clientId: string) => {
    try {
      // Fetch the assignment
      const response = await fetch(`/api/assignments?templateId=${templateId}&clientId=${clientId}`)
      if (response.ok) {
        const assignments = (await response.json()) as Assignment[]
        if (assignments.length > 0) {
          const assignment = assignments[0]

          // Update the assignment status
          const updatedAssignment = {
            ...assignment,
            status: "completed",
          }

          const updateResponse = await fetch(`/api/assignments/${assignment.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedAssignment),
          })

          if (updateResponse.ok) {
            toast.success("Assignment marked as completed")

            // Refresh assigned clients
            const clientsResponse = await fetch(`/api/assignments?templateId=${templateId}`)
            if (clientsResponse.ok) {
              const updatedAssignments = (await clientsResponse.json()) as Assignment[]

              // Fetch client details for each assignment
              const clients: Client[] = []
              for (const assignment of updatedAssignments) {
                const clientResponse = await fetch(`/api/clients?id=${assignment.clientId}`)
                if (clientResponse.ok) {
                  const client = await clientResponse.json()
                  clients.push(client)
                }
              }

              setAssignedClients({
                ...assignedClients,
                [templateId]: clients,
              })
            }
          } else {
            toast.error("Failed to update assignment")
          }
        }
      }
    } catch (error) {
      console.error("Error updating assignment:", error)
      toast.error("An error occurred while updating the assignment")
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h3 className="text-xl font-medium">Loading templates...</h3>
          <p className="text-muted-foreground">Please wait while we fetch your templates</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Link href="/admin/packages" className="text-gray-500 hover:text-gray-700">
              <Button variant="ghost" size="sm" className="gap-1">
                <ArrowLeft size={16} />
                <span>Back to Packages</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{packageId} Templates</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search templates..."
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

            <Button className="bg-[#00b894] hover:bg-[#00a382]" onClick={handleCreateTemplate}>
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <span>Pending: {templates.filter((c) => c.status === "pending").length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>In Progress: {templates.filter((c) => c.status === "in-progress").length}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              <span>Completed: {templates.filter((c) => c.status === "completed").length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full text-center py-12 border rounded-lg bg-muted/20">
            <div className="flex flex-col items-center justify-center gap-3">
              <FileText className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-xl font-medium">No templates found</h3>
              <p className="text-muted-foreground">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create your first template to get started"}
              </p>
              {(searchQuery || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setStatusFilter("all")
                  }}
                  className="mt-2"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
              {!searchQuery && statusFilter === "all" && (
                <Button className="bg-[#00b894] hover:bg-[#00a382] mt-2" onClick={handleCreateTemplate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              )}
            </div>
          </div>
        ) : (
          filteredTemplates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <CardHeader className="p-5 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">{template.name}</h2>
                      {template.isDefault && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-500">{template.description}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <span>Created: {new Date(template.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated: {new Date(template.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      className={
                        template.status === "completed"
                          ? "bg-emerald-100 text-emerald-800 text-sm px-3 py-1"
                          : template.status === "in-progress"
                            ? "bg-blue-100 text-blue-800 text-sm px-3 py-1"
                            : "bg-amber-100 text-amber-800 text-sm px-3 py-1"
                      }
                    >
                      {template.status === "completed"
                        ? "Completed"
                        : template.status === "in-progress"
                          ? "In Progress"
                          : "Pending"}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50">
                      Package: {template.packageType}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Overall Progress</span>
                      <span className="font-medium">{template.progress}%</span>
                    </div>
                    <Progress value={template.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-5 w-5 text-gray-500" />
                        <h3 className="font-medium">Configuration</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Social Sites:</div>
                        <div className="font-medium">{template.socialSites.length}</div>

                        <div className="text-gray-500">Web 2.0 Sites:</div>
                        <div className="font-medium">{template.web2Sites.length}</div>

                        <div className="text-gray-500">Additional Assets:</div>
                        <div className="font-medium">{template.additionalAssets.length}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <h3 className="font-medium">Timeline</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-500">Start Date:</div>
                        <div className="font-medium">{new Date(template.startDate).toLocaleDateString()}</div>

                        <div className="text-gray-500">Due Date:</div>
                        <div className="font-medium">{new Date(template.dueDate).toLocaleDateString()}</div>

                        <div className="text-gray-500">Team Size:</div>
                        <div className="font-medium">{template.teamMembers.length} members</div>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Clients Section */}
                  {assignedClients[template.id] && assignedClients[template.id].length > 0 && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-5 w-5 text-gray-500" />
                        <h3 className="font-medium">Assigned Clients</h3>
                      </div>
                      <div className="space-y-2">
                        {assignedClients[template.id].map((client) => (
                          <div
                            key={client.id}
                            className="flex items-center justify-between p-2 bg-white rounded border"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
                                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{client.name}</p>
                                <p className="text-xs text-gray-500">{client.company}</p>
                              </div>
                            </div>
                            <Badge
                              variant={client.status === "active" ? "default" : "outline"}
                              className={
                                client.status === "active"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : client.status === "pending"
                                    ? "bg-amber-100 text-amber-800 border-amber-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                              }
                            >
                              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {template.hasNewComments && (
                      <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                        <MessageSquare className="h-4 w-4" />
                        <span>New comments</span>
                      </div>
                    )}
                    {template.hasIssues && (
                      <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Issues reported</span>
                      </div>
                    )}
                    {!template.hasIssues && !template.hasNewComments && (
                      <div className="flex items-center gap-1 text-zinc-600 bg-zinc-100 px-3 py-1 rounded-full text-sm">
                        <CheckCheck className="h-4 w-4" />
                        <span>No Issues</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t p-0 grid grid-cols-4">
                <Button variant="ghost" className="rounded-none h-12" onClick={() => handleViewAgents(template)}>
                  <Users className="h-4 w-4 mr-2" />
                  Team
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-none h-12 border-l"
                  onClick={() => handleViewTasks(template.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Tasks
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-none h-12 border-l"
                  onClick={() => handleEditTemplate(template)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <div className="flex border-l">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="rounded-none h-12 flex-1">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAssignTemplate(template)}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Assign to Client
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handlePreviewTemplate(template)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Template
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDuplicateTemplate(template)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate Template
                      </DropdownMenuItem>
                      {!template.isDefault && (
                        <DropdownMenuItem onClick={() => handleMakeDefault(template)}>
                          <Check className="h-4 w-4 mr-2" />
                          Make Default
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {/* Assign Template Modal */}
      {templateToAssign && (
        <AssignTemplateModal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          templateId={templateToAssign.id}
          templateName={templateToAssign.name}
          packageId={packageId}
          onAssignComplete={(clientId) => {
            // Refresh the assigned clients after assignment
            const fetchAssignedClients = async () => {
              const assignmentsResponse = await fetch(`/api/assignments?templateId=${templateToAssign.id}`)
              if (assignmentsResponse.ok) {
                const assignments = (await assignmentsResponse.json()) as Assignment[]

                // Fetch client details for each assignment
                const clients: Client[] = []
                for (const assignment of assignments) {
                  const clientResponse = await fetch(`/api/clients?id=${assignment.clientId}`)
                  if (clientResponse.ok) {
                    const client = await clientResponse.json()
                    clients.push(client)
                  }
                }

                setAssignedClients({
                  ...assignedClients,
                  [templateToAssign.id]: clients,
                })
              }
            }

            fetchAssignedClients()
          }}
        />
      )}

      {/* Template Preview Modal */}
      {templateToPreview && (
        <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Template Preview: {templateToPreview.name}</DialogTitle>
              <DialogDescription>Preview how this template will appear when assigned to clients</DialogDescription>
            </DialogHeader>

            <div className="overflow-auto flex-1 p-4">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-lg font-medium mb-3">Template Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Package Type:</p>
                      <p className="font-medium">{templateToPreview.packageType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Default Template:</p>
                      <p className="font-medium">{templateToPreview.isDefault ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Created:</p>
                      <p className="font-medium">{new Date(templateToPreview.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Updated:</p>
                      <p className="font-medium">{new Date(templateToPreview.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="socialSites">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="socialSites" className="relative">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>Social Sites</span>
                        <Badge className="ml-1 bg-primary/20 text-primary">
                          {templateToPreview.socialSites.length}
                        </Badge>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="web2Sites" className="relative">
                      <div className="flex items-center gap-2">
                        <Layout className="h-4 w-4" />
                        <span>Web 2.0 Sites</span>
                        <Badge className="ml-1 bg-primary/20 text-primary">{templateToPreview.web2Sites.length}</Badge>
                      </div>
                    </TabsTrigger>
                    <TabsTrigger value="additionalAssets" className="relative">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4" />
                        <span>Additional Assets</span>
                        <Badge className="ml-1 bg-primary/20 text-primary">
                          {templateToPreview.additionalAssets.length}
                        </Badge>
                      </div>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="socialSites" className="mt-4">
                    <div className="space-y-3">
                      {templateToPreview.socialSites.map((site, index) => (
                        <Card key={index}>
                          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={site.isRequired ? "default" : "outline"}
                                className={site.isRequired ? "bg-primary" : ""}
                              >
                                {site.isRequired ? "Required" : "Optional"}
                              </Badge>
                              <h4 className="text-sm font-medium">{site.name}</h4>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="text-sm">
                              <p className="text-gray-500">URL:</p>
                              <a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {site.url}
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="web2Sites" className="mt-4">
                    <div className="space-y-3">
                      {templateToPreview.web2Sites.map((site, index) => (
                        <Card key={index}>
                          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={site.isRequired ? "default" : "outline"}
                                className={site.isRequired ? "bg-primary" : ""}
                              >
                                {site.isRequired ? "Required" : "Optional"}
                              </Badge>
                              <h4 className="text-sm font-medium">{site.name}</h4>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="text-sm">
                              <p className="text-gray-500">URL:</p>
                              <a
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {site.url}
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="additionalAssets" className="mt-4">
                    <div className="space-y-3">
                      {templateToPreview.additionalAssets.map((asset, index) => (
                        <Card key={index}>
                          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={asset.isRequired ? "default" : "outline"}
                                className={asset.isRequired ? "bg-primary" : ""}
                              >
                                {asset.isRequired ? "Required" : "Optional"}
                              </Badge>
                              <h4 className="text-sm font-medium">{asset.name}</h4>
                            </div>
                          </CardHeader>
                          <CardContent className="p-4 pt-2">
                            <div className="text-sm">
                              <p className="text-gray-500">Description:</p>
                              <p>{asset.description || "No description provided"}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <DialogFooter className="border-t pt-4">
              <Button variant="outline" onClick={() => setIsPreviewModalOpen(false)}>
                Close Preview
              </Button>
              <Button
                className="bg-[#00b894] hover:bg-[#00a382]"
                onClick={() => {
                  setIsPreviewModalOpen(false)
                  handleAssignTemplate(templateToPreview)
                }}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Assign to Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
