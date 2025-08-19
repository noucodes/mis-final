"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Play,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { navMainData } from "@/data/sidebar/navmain";
import { useEffect, useState } from "react";
import axios from "axios";
import { roleLabels } from "@/lib/roleLabels";
import { Skeleton } from "../ui/skeleton";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // 👈 from login
        if (!token) return;

        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data); // { id, name, email, role }
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    fetchUser();
  }, []);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {user ? (
                <a href="#">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Play className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">ADON GROUP</span>
                    <span className="truncate text-xs">
                      {user ? roleLabels[user.role] ?? user.role : "User"}
                    </span>
                  </div>
                </a>
              ) : (
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="grid flex-1 gap-1">
                    <Skeleton className="h-[17.5px]" />
                    <Skeleton className="h-[16px]" />
                  </div>
                </div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
