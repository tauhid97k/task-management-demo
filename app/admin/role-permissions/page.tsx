"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Copy,
  Edit,
  Eye,
  EyeOff,
  Filter,
  Info,
  Plus,
  Save,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trash2,
  MoreHorizontal,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Import data from separate files
import { teams } from "@/Data/teams";
import { roles } from "@/Data/roles";
import { permissionCategories } from "@/Data/permission-categories";
import { defaultRolePermissions } from "@/Data/default-role-permissions";

export default function RolePermissionsPage() {
  const [selectedTeam, setSelectedTeam] = useState("social-media");
  const [selectedRole, setSelectedRole] = useState("social-manager");
  const [rolePermissions, setRolePermissions] = useState<
    Record<string, string[]>
  >(defaultRolePermissions);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");
  const [baseRole, setBaseRole] = useState("");
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareRole, setCompareRole] = useState("");

  // Filter permissions based on search query
  const filterPermissions = (categories: any[]) => {
    if (!searchQuery) return categories;

    return categories
      .map((category) => {
        const filteredPermissions = category.permissions.filter(
          (permission: any) =>
            permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            permission.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );

        return {
          ...category,
          permissions: filteredPermissions,
          filtered: filteredPermissions.length > 0,
        };
      })
      .filter((category) => category.filtered);
  };

  // Toggle permission for the selected role
  const togglePermission = (permissionId: string) => {
    setHasUnsavedChanges(true);

    if (rolePermissions[selectedRole].includes(permissionId)) {
      setRolePermissions({
        ...rolePermissions,
        [selectedRole]: rolePermissions[selectedRole].filter(
          (id) => id !== permissionId
        ),
      });
    } else {
      setRolePermissions({
        ...rolePermissions,
        [selectedRole]: [...rolePermissions[selectedRole], permissionId],
      });
    }
  };

  // Toggle all permissions in a category
  const toggleCategoryPermissions = (categoryPermissions: any[]) => {
    setHasUnsavedChanges(true);

    const permissionIds = categoryPermissions.map(
      (permission) => permission.id
    );
    const allEnabled = permissionIds.every((id) =>
      rolePermissions[selectedRole].includes(id)
    );

    if (allEnabled) {
      // Remove all permissions in this category
      setRolePermissions({
        ...rolePermissions,
        [selectedRole]: rolePermissions[selectedRole].filter(
          (id) => !permissionIds.includes(id)
        ),
      });
    } else {
      // Add all permissions in this category
      const currentPermissions = new Set(rolePermissions[selectedRole]);
      permissionIds.forEach((id) => currentPermissions.add(id));

      setRolePermissions({
        ...rolePermissions,
        [selectedRole]: Array.from(currentPermissions),
      });
    }
  };

  // Create a new role
  const createNewRole = () => {
    if (!newRoleName) return;

    const newRoleId = `${selectedTeam}-${newRoleName
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    // Add the new role to the roles list
    const updatedRoles = {
      ...roles,
      [selectedTeam as keyof typeof roles]: [
        ...roles[selectedTeam as keyof typeof roles],
        {
          id: newRoleId,
          name: newRoleName,
          description: newRoleDescription,
          members: 0,
          isDefault: false,
          isCustom: true,
        },
      ],
    };

    // Set permissions based on the base role if selected
    const initialPermissions = baseRole ? [...rolePermissions[baseRole]] : [];

    setRolePermissions({
      ...rolePermissions,
      [newRoleId]: initialPermissions,
    });

    // Update state
    setSelectedRole(newRoleId);
    setIsCreateRoleModalOpen(false);
    setNewRoleName("");
    setNewRoleDescription("");
    setBaseRole("");
  };

  // Delete the selected role
  const deleteSelectedRole = () => {
    const updatedRoles = {
      ...roles,
    };

    updatedRoles[selectedTeam as keyof typeof roles] = roles[
      selectedTeam as keyof typeof roles
    ].filter((role) => role.id !== selectedRole);

    // Remove permissions for this role
    const { [selectedRole]: _, ...restPermissions } = rolePermissions;

    // Select the first available role
    const newSelectedRole =
      updatedRoles[selectedTeam as keyof typeof roles][0].id;

    setSelectedRole(newSelectedRole);
    setRolePermissions(restPermissions);
    setIsDeleteConfirmOpen(false);
  };

  // Save changes
  const saveChanges = () => {
    // In a real application, this would save to a database
    console.log("Saving role permissions:", rolePermissions);
    setHasUnsavedChanges(false);

    // Show success message
    alert("Role permissions saved successfully!");
  };

  // Reset changes
  const resetChanges = () => {
    setRolePermissions(defaultRolePermissions);
    setHasUnsavedChanges(false);
  };

  // Handle team change
  useEffect(() => {
    // Select the default role for the selected team
    const defaultRole = roles[selectedTeam as keyof typeof roles].find(
      (role) => role.isDefault
    );
    if (defaultRole) {
      setSelectedRole(defaultRole.id);
    } else {
      setSelectedRole(roles[selectedTeam as keyof typeof roles][0].id);
    }
  }, [selectedTeam]);

  // Get the current role object
  const currentRole = roles[selectedTeam as keyof typeof roles].find(
    (role) => role.id === selectedRole
  );

  // Get filtered permission categories
  const filteredCategories = filterPermissions(
    permissionCategories[selectedTeam as keyof typeof permissionCategories]
  );

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Teams & Roles</CardTitle>
                <CardDescription>
                  Select a team and role to manage permissions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Selection */}
                <div className="space-y-2">
                  <Label htmlFor="team-select">Team</Label>
                  <Select value={selectedTeam} onValueChange={setSelectedTeam}>
                    <SelectTrigger id="team-select">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={team.id}>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`${team.color} h-6 w-6 p-1 flex items-center justify-center rounded-full`}
                            >
                              {team.icon}
                            </Badge>
                            <span>{team.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="role-select">Role</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-xs"
                      onClick={() => setIsCreateRoleModalOpen(true)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      New Role
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {roles[selectedTeam as keyof typeof roles].map((role) => (
                      <div
                        key={role.id}
                        className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                          selectedRole === role.id
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setSelectedRole(role.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          <div>
                            <div className="font-medium text-sm">
                              {role.name}
                            </div>
                            <div className="text-xs opacity-80">
                              {role.members} members
                            </div>
                          </div>
                        </div>
                        {role.isDefault && (
                          <Badge className="text-xs">Default</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Role Actions */}
                <div className="pt-2">
                  <Separator className="mb-4" />
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => setShowCompareModal(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Compare Roles
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-start"
                        >
                          <MoreHorizontal className="h-4 w-4 mr-2" />
                          More Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="h-4 w-4 mr-2" />
                          Rename Role
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate Role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-red-600 focus:text-red-600"
                          onClick={() => setIsDeleteConfirmOpen(true)}
                          disabled={currentRole?.isDefault}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Role
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Info Card */}
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${
                        teams.find((t) => t.id === selectedTeam)?.color
                      } h-6 w-6 p-1 flex items-center justify-center rounded-full`}
                    >
                      {teams.find((t) => t.id === selectedTeam)?.icon}
                    </Badge>
                    <span>
                      {teams.find((t) => t.id === selectedTeam)?.name}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="text-gray-500 mb-3">
                  {teams.find((t) => t.id === selectedTeam)?.description}
                </p>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>
                    {teams.find((t) => t.id === selectedTeam)?.members} team
                    members
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-xl">
                    {currentRole?.name}
                    {currentRole?.isDefault && (
                      <Badge variant="outline" className="ml-2">
                        Default Role
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{currentRole?.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={resetChanges}
                          disabled={!hasUnsavedChanges}
                        >
                          Reset
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Reset to default permissions</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    size="sm"
                    className="bg-[#00b894] hover:bg-[#00a382]"
                    onClick={saveChanges}
                    disabled={!hasUnsavedChanges}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Search and Filter */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search permissions..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="cursor-pointer">
                        <Check className="h-4 w-4 mr-2" />
                        Enabled Permissions
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <EyeOff className="h-4 w-4 mr-2" />
                        Disabled Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Critical Permissions
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Permissions List */}
                <ScrollArea className="h-[calc(100vh-320px)] pr-4">
                  {searchQuery && filteredCategories.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Search className="h-12 w-12 text-gray-300 mb-2" />
                      <h3 className="text-lg font-medium">
                        No permissions found
                      </h3>
                      <p className="text-sm text-gray-500">
                        Try a different search term
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredCategories.map((category) => (
                        <Accordion
                          key={category.id}
                          type="single"
                          collapsible
                          defaultValue={category.id}
                          className="border rounded-lg overflow-hidden"
                        >
                          <AccordionItem
                            value={category.id}
                            className="border-0"
                          >
                            <AccordionTrigger className="px-4 py-3 hover:no-underline bg-gray-50">
                              <div className="flex items-center gap-2">
                                <div className="font-medium">
                                  {category.name}
                                </div>
                                <Badge variant="outline" className="ml-2">
                                  {category.permissions.length} permissions
                                </Badge>

                                {/* Category toggle */}
                                <div
                                  className="ml-auto mr-4"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleCategoryPermissions(
                                      category.permissions
                                    );
                                  }}
                                >
                                  <Switch
                                    checked={category.permissions.every(
                                      (permission: any) =>
                                        rolePermissions[selectedRole].includes(
                                          permission.id
                                        )
                                    )}
                                  />
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-0 pt-0 pb-0">
                              <div className="border-t">
                                {category.permissions.map(
                                  (permission: any, index: number) => (
                                    <div
                                      key={permission.id}
                                      className={`flex items-center justify-between p-4 ${
                                        index !==
                                        category.permissions.length - 1
                                          ? "border-b"
                                          : ""
                                      }`}
                                    >
                                      <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                          <div className="font-medium">
                                            {permission.name}
                                          </div>
                                          {permission.id.includes("delete") && (
                                            <Badge
                                              variant="outline"
                                              className="bg-red-50 text-red-700 border-red-200"
                                            >
                                              Critical
                                            </Badge>
                                          )}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                          {permission.description}
                                        </div>
                                      </div>
                                      <div>
                                        <Switch
                                          checked={rolePermissions[
                                            selectedRole
                                          ].includes(permission.id)}
                                          onCheckedChange={() =>
                                            togglePermission(permission.id)
                                          }
                                        />
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>

              <CardFooter className="border-t bg-gray-50 flex justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Info className="h-4 w-4" />
                  <span>Last updated: March 15, 2025</span>
                </div>

                {hasUnsavedChanges && (
                  <Badge
                    variant="outline"
                    className="bg-amber-50 text-amber-700 border-amber-200"
                  >
                    Unsaved Changes
                  </Badge>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Role Modal */}
      <Dialog
        open={isCreateRoleModalOpen}
        onOpenChange={setIsCreateRoleModalOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Role</DialogTitle>
            <DialogDescription>
              Create a new role for the{" "}
              {teams.find((t) => t.id === selectedTeam)?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Role Name</Label>
              <Input
                id="role-name"
                placeholder="e.g., Senior Specialist"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-description">Description</Label>
              <Input
                id="role-description"
                placeholder="e.g., Senior role with advanced permissions"
                value={newRoleDescription}
                onChange={(e) => setNewRoleDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Base Permissions On</Label>
              <RadioGroup value={baseRole} onValueChange={setBaseRole}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="base-none" />
                    <Label htmlFor="base-none" className="cursor-pointer">
                      Start with no permissions
                    </Label>
                  </div>

                  {roles[selectedTeam as keyof typeof roles].map((role) => (
                    <div key={role.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={role.id} id={`base-${role.id}`} />
                      <Label
                        htmlFor={`base-${role.id}`}
                        className="cursor-pointer"
                      >
                        {role.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateRoleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={createNewRole} disabled={!newRoleName}>
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Role</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the "{currentRole?.name}" role?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              <div className="flex items-start gap-2">
                <ShieldAlert className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Warning</p>
                  <p className="mt-1">
                    Deleting this role will remove all associated permissions.
                    Any users assigned to this role will need to be reassigned.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteSelectedRole}>
              Delete Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Compare Roles Modal */}
      <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Compare Roles</DialogTitle>
            <DialogDescription>
              Compare permissions between different roles
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <Label className="mb-2 block">Current Role</Label>
                <div className="p-2 border rounded-md bg-gray-50">
                  <div className="font-medium">{currentRole?.name}</div>
                  <div className="text-sm text-gray-500">
                    {currentRole?.description}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <Label htmlFor="compare-role" className="mb-2 block">
                  Compare With
                </Label>
                <Select value={compareRole} onValueChange={setCompareRole}>
                  <SelectTrigger id="compare-role">
                    <SelectValue placeholder="Select role to compare" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles[selectedTeam as keyof typeof roles]
                      .filter((role) => role.id !== selectedRole)
                      .map((role) => (
                        <SelectItem key={role.id} value={role.id}>
                          {role.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {compareRole && (
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {permissionCategories[
                    selectedTeam as keyof typeof permissionCategories
                  ].map((category) => (
                    <div
                      key={category.id}
                      className="border rounded-md overflow-hidden"
                    >
                      <div className="bg-gray-50 p-3 font-medium border-b">
                        {category.name}
                      </div>
                      <div>
                        {category.permissions.map(
                          (permission: any, index: number) => (
                            <div
                              key={permission.id}
                              className={`grid grid-cols-[1fr,auto,auto] gap-4 p-3 items-center ${
                                index !== category.permissions.length - 1
                                  ? "border-b"
                                  : ""
                              }`}
                            >
                              <div>
                                <div className="font-medium text-sm">
                                  {permission.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {permission.description}
                                </div>
                              </div>

                              <div className="flex items-center justify-center w-16">
                                {rolePermissions[selectedRole].includes(
                                  permission.id
                                ) ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    Yes
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-gray-500"
                                  >
                                    No
                                  </Badge>
                                )}
                              </div>

                              <div className="flex items-center justify-center w-16">
                                {rolePermissions[compareRole].includes(
                                  permission.id
                                ) ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    Yes
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-gray-500"
                                  >
                                    No
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setShowCompareModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
