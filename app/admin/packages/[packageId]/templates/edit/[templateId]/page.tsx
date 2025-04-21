"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  Info,
  Loader2,
  Plus,
  Trash2,
  Layout,
  Layers,
  ArrowLeft,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import Link from "next/link"
import type { Template } from "@/lib/data"

// Define the template form schema
const templateFormSchema = z.object({
  templateName: z.string().min(3, {
    message: "Template name must be at least 3 characters.",
  }),
  description: z.string().optional(),
  packageId: z.string(),
  isDefault: z.boolean().default(false),
  socialSites: z.array(
    z.object({
      name: z.string().min(1, { message: "Site name is required" }),
      url: z.string().url({ message: "Must be a valid URL" }).or(z.string().length(0)),
      isRequired: z.boolean().default(true),
    }),
  ),
  web2Sites: z.array(
    z.object({
      name: z.string().min(1, { message: "Site name is required" }),
      url: z.string().url({ message: "Must be a valid URL" }).or(z.string().length(0)),
      isRequired: z.boolean().default(true),
    }),
  ),
  additionalAssets: z.array(
    z.object({
      name: z.string().min(1, { message: "Asset name is required" }),
      description: z.string().optional(),
      isRequired: z.boolean().default(false),
    }),
  ),
})

type TemplateFormValues = z.infer<typeof templateFormSchema>

export default function EditTemplatePage() {
  const params = useParams<{ packageId: string; templateId: string }>()
  const router = useRouter()
  const packageId = params.packageId as string
  const templateId = params.templateId as string
  const [activeTab, setActiveTab] = useState("socialSites")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(true)
  const [packageDetails, setPackageDetails] = useState<any>(null)
  const [template, setTemplate] = useState<Template | null>(null)

  // Find the package details based on packageId
  useEffect(() => {
    // In a real app, you'd fetch this from an API
    const packages = [
      {
        id: "DFP90",
        subscriptions: 29,
        days: 90,
        socialSites: 11,
        web2Sites: 5,
        additionalAssets: 10,
        monthlyEngagement: 1,
        domain: "1",
      },
      {
        id: "DFP120",
        subscriptions: 12,
        days: 120,
        socialSites: 22,
        web2Sites: 10,
        additionalAssets: 10,
        monthlyEngagement: 3,
        domain: "2/3",
      },
      {
        id: "DFP180",
        subscriptions: 21,
        days: 240,
        socialSites: 24,
        web2Sites: 11,
        additionalAssets: 10,
        monthlyEngagement: 3,
        domain: "2/3 or more",
      },
      {
        id: "DFP240",
        subscriptions: 21,
        days: 270,
        socialSites: 29,
        web2Sites: 11,
        additionalAssets: 10,
        monthlyEngagement: 3,
        domain: "2/3 or more",
      },
      {
        id: "DFP270",
        subscriptions: 5,
        days: 360,
        socialSites: 34,
        web2Sites: 11,
        additionalAssets: 10,
        monthlyEngagement: 3,
        domain: "3 or more",
      },
    ]

    const pkg = packages.find((p) => p.id === packageId)
    setPackageDetails(pkg)
  }, [packageId])

  // Fetch the template data
  useEffect(() => {
    const fetchTemplate = async () => {
      setIsLoadingTemplate(true)
      try {
        const response = await fetch(`/api/templates/${templateId}`)
        if (response.ok) {
          const data = await response.json()
          setTemplate(data)
        } else {
          toast.error("Failed to fetch template")
          router.push(`/admin/packages/${packageId}/templates`)
        }
      } catch (error) {
        console.error("Error fetching template:", error)
        toast.error("An error occurred while fetching the template")
        router.push(`/admin/packages/${packageId}/templates`)
      } finally {
        setIsLoadingTemplate(false)
      }
    }

    if (templateId) {
      fetchTemplate()
    }
  }, [templateId, packageId, router])

  // Initialize form with default values
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      templateName: "",
      description: "",
      packageId: packageId,
      isDefault: false,
      socialSites: [],
      web2Sites: [],
      additionalAssets: [],
    },
  })

  // Update form when template is loaded
  useEffect(() => {
    if (template) {
      form.reset({
        templateName: template.name,
        description: template.description || "",
        packageId: template.packageId,
        isDefault: template.isDefault,
        socialSites: template.socialSites,
        web2Sites: template.web2Sites,
        additionalAssets: template.additionalAssets,
      })
    }
  }, [template, form])

  // Handle form submission
  const onSubmit = async (data: TemplateFormValues) => {
    try {
      setIsLoading(true)

      // Validate required fields
      let hasError = false

      // Check social sites
      data.socialSites.forEach((site, index) => {
        if (site.isRequired && (!site.name || !site.url)) {
          toast.error(`Required social site #${index + 1} is missing information`)
          hasError = true
        }
      })

      // Check web2 sites
      data.web2Sites.forEach((site, index) => {
        if (site.isRequired && (!site.name || !site.url)) {
          toast.error(`Required web 2.0 site #${index + 1} is missing information`)
          hasError = true
        }
      })

      // Check additional assets
      data.additionalAssets.forEach((asset, index) => {
        if (asset.isRequired && !asset.name) {
          toast.error(`Required asset #${index + 1} is missing information`)
          hasError = true
        }
      })

      if (hasError) {
        setIsLoading(false)
        return
      }

      // Filter out empty entries
      const filteredSocialSites = data.socialSites.filter((site) => site.name.trim() !== "")
      const filteredWeb2Sites = data.web2Sites.filter((site) => site.name.trim() !== "")
      const filteredAdditionalAssets = data.additionalAssets.filter((asset) => asset.name.trim() !== "")

      if (!template) {
        throw new Error("Template not found")
      }

      // Create the updated template object
      const updatedTemplate: Partial<Template> = {
        id: templateId,
        name: data.templateName,
        description: data.description || "",
        packageId: data.packageId,
        packageType: data.packageId,
        isDefault: data.isDefault,
        status: template.status,
        progress: template.progress,
        startDate: template.startDate,
        dueDate: template.dueDate,
        totalTasks: filteredSocialSites.length + filteredWeb2Sites.length + filteredAdditionalAssets.length,
        completedTasks: template.completedTasks,
        pendingTasks:
          filteredSocialSites.length +
          filteredWeb2Sites.length +
          filteredAdditionalAssets.length -
          template.completedTasks -
          template.inProgressTasks,
        inProgressTasks: template.inProgressTasks,
        hasNewComments: template.hasNewComments,
        hasIssues: template.hasIssues,
        teamMembers: template.teamMembers,
        socialSites: filteredSocialSites,
        web2Sites: filteredWeb2Sites,
        additionalAssets: filteredAdditionalAssets,
      }

      // Save the template to the API
      const response = await fetch(`/api/templates/${templateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTemplate),
      })

      if (!response.ok) {
        throw new Error("Failed to update template")
      }

      toast.success("Template updated successfully")

      // Navigate back to the templates page
      router.push(`/admin/packages/${packageId}/templates`)
    } catch (error) {
      console.error("Error updating template:", error)
      toast.error("Failed to update template")
    } finally {
      setIsLoading(false)
    }
  }

  // Get form values for the current tab
  const getFieldArray = (fieldName: "socialSites" | "web2Sites" | "additionalAssets") => {
    return form.watch(fieldName) || []
  }

  // Add a new item to a field array
  const addItem = (fieldName: "socialSites" | "web2Sites" | "additionalAssets") => {
    const currentItems = form.getValues(fieldName)
    const newItem =
      fieldName === "additionalAssets"
        ? { name: "", description: "", isRequired: false }
        : { name: "", url: "", isRequired: false }

    form.setValue(fieldName, [...currentItems, newItem])
  }

  // Remove an item from a field array
  const removeItem = (fieldName: "socialSites" | "web2Sites" | "additionalAssets", index: number) => {
    const currentItems = form.getValues(fieldName)
    const newItems = [...currentItems]
    newItems.splice(index, 1)
    form.setValue(fieldName, newItems)
  }

  // Move an item up in the list
  const moveItemUp = (fieldName: "socialSites" | "web2Sites" | "additionalAssets", index: number) => {
    if (index === 0) return
    const currentItems = form.getValues(fieldName)
    const newItems = [...currentItems]
    const temp = newItems[index]
    newItems[index] = newItems[index - 1]
    newItems[index - 1] = temp
    form.setValue(fieldName, newItems)
  }

  // Move an item down in the list
  const moveItemDown = (fieldName: "socialSites" | "web2Sites" | "additionalAssets", index: number) => {
    const currentItems = form.getValues(fieldName)
    if (index === currentItems.length - 1) return
    const newItems = [...currentItems]
    const temp = newItems[index]
    newItems[index] = newItems[index + 1]
    newItems[index + 1] = temp
    form.setValue(fieldName, newItems)
  }

  // Toggle required status for an item
  const toggleRequired = (fieldName: "socialSites" | "web2Sites" | "additionalAssets", index: number) => {
    const currentItems = form.getValues(fieldName)
    const newItems = [...currentItems]
    newItems[index].isRequired = !newItems[index].isRequired
    form.setValue(fieldName, newItems)
  }

  // Update a specific field in an item
  const updateField = (
    fieldName: "socialSites" | "web2Sites" | "additionalAssets",
    index: number,
    key: string,
    value: string | boolean,
  ) => {
    const currentItems = form.getValues(fieldName)
    const newItems = [...currentItems]
    ;(newItems[index] as any)[key] = value
    form.setValue(fieldName, newItems)
  }

  if (isLoadingTemplate || !packageDetails || !template) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h3 className="text-xl font-medium">Loading template...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href={`/admin/packages/${packageId}/templates`} className="text-gray-500 hover:text-gray-700">
            <Button variant="ghost" size="sm" className="gap-1">
              <ArrowLeft size={16} />
              <span>Back to Templates</span>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Template: {template.name}</h1>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="templateName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Template Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter template name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter template description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="packageId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package</FormLabel>
                      <FormControl>
                        <Select disabled value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select package" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DFP90">DFP90</SelectItem>
                            <SelectItem value="DFP120">DFP120</SelectItem>
                            <SelectItem value="DFP180">DFP180</SelectItem>
                            <SelectItem value="DFP240">DFP240</SelectItem>
                            <SelectItem value="DFP270">DFP270</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Package configuration: {packageDetails.socialSites} Social Sites, {packageDetails.web2Sites} Web
                        2.0 Sites, {packageDetails.additionalAssets} Additional Assets
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Default Template</FormLabel>
                        <FormDescription>Make this the default template for this package</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Separator />

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="socialSites" className="relative">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <span>Social Sites</span>
                    <Badge className="ml-1 bg-primary/20 text-primary">{getFieldArray("socialSites").length}</Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="web2Sites" className="relative">
                  <div className="flex items-center gap-2">
                    <Layout className="h-4 w-4" />
                    <span>Web 2.0 Sites</span>
                    <Badge className="ml-1 bg-primary/20 text-primary">{getFieldArray("web2Sites").length}</Badge>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="additionalAssets" className="relative">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    <span>Additional Assets</span>
                    <Badge className="ml-1 bg-primary/20 text-primary">
                      {getFieldArray("additionalAssets").length}
                    </Badge>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="socialSites" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Social Media Sites</h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addItem("socialSites")}
                    disabled={getFieldArray("socialSites").length >= packageDetails.socialSites}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Site
                  </Button>
                </div>

                <div className="space-y-3">
                  {getFieldArray("socialSites").map((site, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={site.isRequired ? "default" : "outline"}
                            className={site.isRequired ? "bg-primary" : ""}
                          >
                            {site.isRequired ? "Required" : "Optional"}
                          </Badge>
                          <h4 className="text-sm font-medium">Social Site {index + 1}</h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => moveItemUp("socialSites", index)}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => moveItemDown("socialSites", index)}
                            disabled={index === getFieldArray("socialSites").length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-primary"
                            onClick={() => toggleRequired("socialSites", index)}
                          >
                            {site.isRequired ? <Check className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive"
                            onClick={() => removeItem("socialSites", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel className="text-xs">Site Name</FormLabel>
                          <Input
                            placeholder="e.g., Facebook, Twitter"
                            value={site.name}
                            onChange={(e) => updateField("socialSites", index, "name", e.target.value)}
                            className={site.isRequired && !site.name ? "border-red-500" : ""}
                          />
                          {site.isRequired && !site.name && <p className="text-xs text-red-500">Required field</p>}
                        </div>
                        <div className="space-y-2">
                          <FormLabel className="text-xs">URL</FormLabel>
                          <Input
                            placeholder="https://example.com"
                            value={site.url}
                            onChange={(e) => updateField("socialSites", index, "url", e.target.value)}
                            className={site.isRequired && !site.url ? "border-red-500" : ""}
                          />
                          {site.isRequired && !site.url && <p className="text-xs text-red-500">Required field</p>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {getFieldArray("socialSites").length === 0 && (
                    <div className="text-center py-8 border rounded-lg bg-muted/20">
                      <p className="text-muted-foreground">
                        No social sites added yet. Click "Add Site" to get started.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="web2Sites" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layout className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Web 2.0 Sites</h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addItem("web2Sites")}
                    disabled={getFieldArray("web2Sites").length >= packageDetails.web2Sites}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Site
                  </Button>
                </div>

                <div className="space-y-3">
                  {getFieldArray("web2Sites").map((site, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={site.isRequired ? "default" : "outline"}
                            className={site.isRequired ? "bg-primary" : ""}
                          >
                            {site.isRequired ? "Required" : "Optional"}
                          </Badge>
                          <h4 className="text-sm font-medium">Web 2.0 Site {index + 1}</h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => moveItemUp("web2Sites", index)}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => moveItemDown("web2Sites", index)}
                            disabled={index === getFieldArray("web2Sites").length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-primary"
                            onClick={() => toggleRequired("web2Sites", index)}
                          >
                            {site.isRequired ? <Check className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive"
                            onClick={() => removeItem("web2Sites", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <FormLabel className="text-xs">Site Name</FormLabel>
                          <Input
                            placeholder="e.g., Medium, Blogger"
                            value={site.name}
                            onChange={(e) => updateField("web2Sites", index, "name", e.target.value)}
                            className={site.isRequired && !site.name ? "border-red-500" : ""}
                          />
                          {site.isRequired && !site.name && <p className="text-xs text-red-500">Required field</p>}
                        </div>
                        <div className="space-y-2">
                          <FormLabel className="text-xs">URL</FormLabel>
                          <Input
                            placeholder="https://example.com"
                            value={site.url}
                            onChange={(e) => updateField("web2Sites", index, "url", e.target.value)}
                            className={site.isRequired && !site.url ? "border-red-500" : ""}
                          />
                          {site.isRequired && !site.url && <p className="text-xs text-red-500">Required field</p>}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {getFieldArray("web2Sites").length === 0 && (
                    <div className="text-center py-8 border rounded-lg bg-muted/20">
                      <p className="text-muted-foreground">
                        No Web 2.0 sites added yet. Click "Add Site" to get started.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="additionalAssets" className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Additional Assets</h3>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addItem("additionalAssets")}
                    disabled={getFieldArray("additionalAssets").length >= packageDetails.additionalAssets}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Asset
                  </Button>
                </div>

                <div className="space-y-3">
                  {getFieldArray("additionalAssets").map((asset, index) => (
                    <Card key={index}>
                      <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={asset.isRequired ? "default" : "outline"}
                            className={asset.isRequired ? "bg-primary" : ""}
                          >
                            {asset.isRequired ? "Required" : "Optional"}
                          </Badge>
                          <h4 className="text-sm font-medium">Asset {index + 1}</h4>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => moveItemUp("additionalAssets", index)}
                            disabled={index === 0}
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => moveItemDown("additionalAssets", index)}
                            disabled={index === getFieldArray("additionalAssets").length - 1}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-primary"
                            onClick={() => toggleRequired("additionalAssets", index)}
                          >
                            {asset.isRequired ? <Check className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive"
                            onClick={() => removeItem("additionalAssets", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 space-y-4">
                        <div className="space-y-2">
                          <FormLabel className="text-xs">Asset Name</FormLabel>
                          <Input
                            placeholder="e.g., Logo Design, Banner"
                            value={asset.name}
                            onChange={(e) => updateField("additionalAssets", index, "name", e.target.value)}
                            className={asset.isRequired && !asset.name ? "border-red-500" : ""}
                          />
                          {asset.isRequired && !asset.name && <p className="text-xs text-red-500">Required field</p>}
                        </div>
                        <div className="space-y-2">
                          <FormLabel className="text-xs">Description</FormLabel>
                          <Textarea
                            placeholder="Describe the asset requirements"
                            value={asset.description || ""}
                            onChange={(e) => updateField("additionalAssets", index, "description", e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {getFieldArray("additionalAssets").length === 0 && (
                    <div className="text-center py-8 border rounded-lg bg-muted/20">
                      <p className="text-muted-foreground">
                        No additional assets added yet. Click "Add Asset" to get started.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push(`/admin/packages/${packageId}/templates`)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[#00b894] hover:bg-[#00a382]" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Template
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
