"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const [groupOpen, setGroupOpen] = React.useState<Record<string, boolean>>({});
  const [submenuOpen, setSubmenuOpen] = React.useState<Record<string, boolean>>(
    {}
  );

  const toggleGroup = (title: string) => {
    setGroupOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const toggleSubmenu = (title: string) => {
    setSubmenuOpen((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const data = {
    user: {
      name: session?.user.name,
      email: session?.user.email,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Birds Of Eden Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Birds Of Eden Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Birds Of Eden Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Admin Area",
        roles: ["admin"],
        items: [
          {
            title: "Dashboard",
            url: "/admin",
            roles: ["admin"],
          },
          {
            title: "Clients",
            roles: ["admin"],
            children: [
              { title: "All Clients", url: "/admin/clients", roles: ["admin"] },
              {
                title: "Add Client",
                url: "/admin/clients/onboarding",
                roles: ["admin"],
              },
            ],
          },
          {
            title: "Packages",
            roles: ["admin"],
            children: [
              {
                title: "All Packages",
                url: "/admin/packages",
                roles: ["admin"],
              },
              {
                title: "Create Package",
                url: "/admin/packages/create",
                roles: ["admin"],
              },
            ],
          },
          {
            title: "Role Permissions",
            url: "/admin/role-permissions",
            roles: ["admin"],
          },
          {
            title: "ESB",
            url: "/admin/esb",
            roles: ["admin"],
          },
        ],
      },
      {
        title: "Agent Area",
        roles: ["agent"],
        items: [
          {
            title: "Tasks",
            url: "/agent/tasks",
            roles: ["agent"],
          },
          {
            title: "Projects",
            url: "/agent/projects",
            roles: ["agent"],
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        {data.navMain
          .filter(
            (group) => !group.roles || group.roles.includes(role as string)
          )
          .map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel
                onClick={() => toggleGroup(group.title)}
                className="cursor-pointer flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 rounded-md px-3 py-2"
              >
                <span className="font-medium">{group.title}</span>
                <motion.div
                  animate={{
                    rotate: groupOpen[group.title] ? 0 : -90,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </SidebarGroupLabel>

              <AnimatePresence>
                {groupOpen[group.title] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {group.items
                          .filter(
                            (item) =>
                              !item.roles || item.roles.includes(role as string)
                          )
                          .map((item) => {
                            const hasChildren = !!item.children;

                            if (hasChildren) {
                              return (
                                <React.Fragment key={item.title}>
                                  <div
                                    onClick={() => toggleSubmenu(item.title)}
                                    className={cn(
                                      "cursor-pointer px-3 py-2 text-sm font-medium flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200 rounded-md",
                                      {
                                        "bg-sidebar-accent":
                                          item.children?.some(
                                            (child) => child.url === pathname
                                          ),
                                      }
                                    )}
                                  >
                                    {item.title}
                                    <motion.div
                                      animate={{
                                        rotate: submenuOpen[item.title]
                                          ? 0
                                          : -90,
                                      }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <ChevronDown className="h-4 w-4" />
                                    </motion.div>
                                  </div>

                                  <AnimatePresence>
                                    {submenuOpen[item.title] && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{
                                          duration: 0.2,
                                          ease: "easeInOut",
                                        }}
                                      >
                                        {item.children
                                          .filter((child) =>
                                            child.roles?.includes(
                                              role as string
                                            )
                                          )
                                          .map((child) => (
                                            <SidebarMenuItem key={child.title}>
                                              <SidebarMenuButton asChild>
                                                <Link
                                                  href={child.url}
                                                  className={cn(
                                                    "ml-4 px-3 py-2 text-sm block rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200",
                                                    {
                                                      "bg-sidebar-accent text-primary font-medium ring-1 ring-zinc-200 dark:ring-zinc-700":
                                                        child.url === pathname,
                                                    }
                                                  )}
                                                >
                                                  {child.title}
                                                </Link>
                                              </SidebarMenuButton>
                                            </SidebarMenuItem>
                                          ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </React.Fragment>
                              );
                            }

                            return (
                              <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                  <Link
                                    href={item.url}
                                    className={cn(
                                      "px-3 py-2 rounded-md block hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors duration-200",
                                      {
                                        "bg-sidebar-accent text-primary font-medium ring-1 ring-zinc-200 dark:ring-zinc-700":
                                          item.url === pathname,
                                      }
                                    )}
                                  >
                                    {item.title}
                                  </Link>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            );
                          })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </SidebarGroup>
          ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
