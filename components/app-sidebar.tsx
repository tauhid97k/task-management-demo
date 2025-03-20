"use client";

import * as React from "react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

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
        title: "General",
        url: "#",
        items: [
          {
            title: "Dashboard",
            url: "/admin",
            roles: ["admin"],
          },
          {
            title: "Packages",
            url: "/admin/packages",
            roles: ["admin"],
          },
          {
            title: "Role Permissions",
            url: "/admin/role-permissions",
            roles: ["admin"],
          },
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
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items
                  .filter((navItem) => navItem.roles?.includes(role as string))
                  .map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          className={cn({
                            "bg-sidebar-accent ring-1 ring-zinc-200":
                              item.url == pathname,
                          })}
                          href={item.url}
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
              </SidebarMenu>
            </SidebarGroupContent>
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
