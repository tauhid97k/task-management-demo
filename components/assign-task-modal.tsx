"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ArrowLeft, Check, AlertCircle } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock team members data
const teamMembers = {
  social: [
    { id: "s1", name: "Alice Johnson", role: "Social Media Manager", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "s2", name: "Bob Smith", role: "Content Creator", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "s3", name: "Charlie Davis", role: "Community Manager", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "s4", name: "Diana Miller", role: "Social Media Specialist", avatar: "/placeholder.svg?height=50&width=50" },
    {
      id: "s5",
      name: "Edward Wilson",
      role: "Digital Marketing Specialist",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ],
  assets: [
    { id: "a1", name: "Frank Thomas", role: "Graphic Designer", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "a2", name: "Grace Lee", role: "UI/UX Designer", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "a3", name: "Henry Clark", role: "Video Editor", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "a4", name: "Ivy Robinson", role: "Photographer", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "a5", name: "Jack Martin", role: "Motion Designer", avatar: "/placeholder.svg?height=50&width=50" },
    { id: "a6", name: "Karen White", role: "Illustrator", avatar: "/placeholder.svg?height=50&width=50" },
  ],
}

// Mock pending tasks for templates
const mockPendingTasks = {
  "DFP90-template1": [
    { id: "task1", name: "Create Facebook post", category: "social" },
    { id: "task2", name: "Design Instagram story", category: "social" },
    { id: "task3", name: "Write blog article", category: "content" },
    { id: "task4", name: "Design new logo", category: "design" },
    { id: "task5", name: "Create banner ads", category: "design" },
  ],
  "DFP90-template2": [
    { id: "task6", name: "LinkedIn campaign", category: "social" },
    { id: "task7", name: "YouTube video promotion", category: "social" },
    { id: "task8", name: "Technical whitepaper", category: "content" },
    { id: "task9", name: "Case study", category: "content" },
    { id: "task10", name: "Product documentation", category: "content" },
  ],
  "DFP90-template3": [
    { id: "task11", name: "Pinterest campaign", category: "social" },
    { id: "task12", name: "TikTok content creation", category: "social" },
    { id: "task13", name: "Product descriptions", category: "content" },
    { id: "task14", name: "Email marketing sequence", category: "content" },
    { id: "task15", name: "Product catalog design", category: "design" },
    { id: "task16", name: "Promotional flyers", category: "design" },
  ],
}

// Generate mock tasks for all templates
const generateTasksForAllTemplates = () => {
  const allTasks: Record<string, any[]> = {}

  // Base templates from mockPendingTasks
  Object.keys(mockPendingTasks).forEach((templateId) => {
    allTasks[templateId] = mockPendingTasks[templateId as keyof typeof mockPendingTasks]
  })

  // Generate for other package templates
  ;["DFP120", "DFP240", "DFP270", "DFP360"].forEach((packageId) => {
    Object.keys(mockPendingTasks).forEach((templateId) => {
      const newTemplateId = templateId.replace("DFP90", packageId)
      allTasks[newTemplateId] = mockPendingTasks[templateId as keyof typeof mockPendingTasks].map((task) => ({
        ...task,
        id: `${packageId}-${task.id}`,
      }))
    })
  })

  return allTasks
}

const allPendingTasks = generateTasksForAllTemplates()

interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
}

interface Task {
  id: string
  name: string
  category: string
}

interface AssignTaskModalProps {
  isOpen: boolean
  onClose: () => void
  templateId: string | null
}

export function AssignTaskModal({ isOpen, onClose, templateId }: AssignTaskModalProps) {
  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState("social")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const pendingTasks =
    templateId && allPendingTasks[templateId]
      ? allPendingTasks[templateId].filter(
          (task: any) => task.category === activeTab.toLowerCase() || activeTab === "all",
        )
      : []

  const filteredMembers = {
    social: teamMembers.social.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
    assets: teamMembers.assets.filter(
      (member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }

  const handleSelectMember = (member: TeamMember) => {
    setSelectedMember(member)
    setStep(2)
    setActiveTab("all")
  }

  const handleBackToMembers = () => {
    setStep(1)
    setSelectedTasks([])
    setActiveTab("social")
  }

  const handleTaskSelection = (taskId: string) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const handleAssignTasks = () => {
    // In a real app, you would handle the assignment logic here
    console.log(
      `Assigned tasks ${selectedTasks.join(", ")} from template ${templateId} to team member ${selectedMember?.id}`,
    )
    onClose()
    // Reset state for next time
    setStep(1)
    setSelectedMember(null)
    setSelectedTasks([])
    setActiveTab("social")
  }

  const handleClose = () => {
    onClose()
    // Reset state for next time
    setStep(1)
    setSelectedMember(null)
    setSelectedTasks([])
    setSearchQuery("")
    setActiveTab("social")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Select Team Member" : "Assign Tasks"}</DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <>
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or role..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Tabs defaultValue="social" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="social">Social Team</TabsTrigger>
                <TabsTrigger value="assets">Assets Team</TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMembers.social.map((member) => (
                    <TeamMemberCard key={member.id} member={member} onSelect={() => handleSelectMember(member)} />
                  ))}
                  {filteredMembers.social.length === 0 && (
                    <p className="text-muted-foreground col-span-2 text-center py-4">No team members found</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="assets" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMembers.assets.map((member) => (
                    <TeamMemberCard key={member.id} member={member} onSelect={() => handleSelectMember(member)} />
                  ))}
                  {filteredMembers.assets.length === 0 && (
                    <p className="text-muted-foreground col-span-2 text-center py-4">No team members found</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <>
            <div className="mb-6">
              <Button variant="ghost" size="sm" onClick={handleBackToMembers} className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to team members
              </Button>

              {selectedMember && (
                <div className="flex items-center gap-3 p-3 border rounded-md bg-muted/20">
                  <Avatar>
                    <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                    <AvatarFallback>{selectedMember.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedMember.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1 mb-4">
              <h3 className="text-sm font-medium">Available Pending Tasks</h3>
              <p className="text-sm text-muted-foreground">Select tasks to assign to this team member</p>
            </div>

            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="design">Design</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="max-h-[300px] overflow-y-auto border rounded-md p-2">
              {pendingTasks.length > 0 ? (
                <div className="space-y-2">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
                      <Checkbox
                        id={task.id}
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={() => handleTaskSelection(task.id)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor={task.id} className="text-sm font-medium">
                          {task.name}
                        </Label>
                        <p className="text-xs text-muted-foreground capitalize">{task.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    No pending tasks available for this category. Try selecting a different category.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={handleBackToMembers}>
                Back
              </Button>
              <Button onClick={handleAssignTasks} disabled={selectedTasks.length === 0}>
                <Check className="h-4 w-4 mr-2" />
                Assign {selectedTasks.length} {selectedTasks.length === 1 ? "Task" : "Tasks"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

function TeamMemberCard({ member, onSelect }: { member: TeamMember; onSelect: () => void }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium">{member.name}</h4>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <Button size="sm" onClick={onSelect}>
          Select
        </Button>
      </CardContent>
    </Card>
  )
}

