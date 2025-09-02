"use client";

import * as React from "react";
import {
  Play
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
import { navMainData, HRData, FinanceData, HRecruitmentData } from "@/data/sidebar/navmain";
import { useEffect, useState } from "react";
import axios from "axios";
import { roleLabels } from "@/lib/roleLabels";
import { Skeleton } from "../ui/skeleton";
import { toast, Toaster } from "sonner";
import router from "next/router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar?: string;
    role: string;
  } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Handle logout on token expiration
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.error("Session expired, please log in again");
    router.push("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setIsAuthenticated(false); }
        setIsAuthenticated(true);
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        setUser(res.data);
        setIsAuthenticated(true); // { id, name, email, role }
      } catch (err) {
        console.error("Failed to fetch user", err);
        handleLogout();
      }
    };

    fetchUser();
  }, []);
  return (
    <Sidebar collapsible="icon" {...props}>
      <Toaster />
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {user ? (
                <a href="/dashboard">
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
        {user && user.role ? (
          user.role === 'hr' ? <><NavMain data={HRData} /><NavMain data={HRecruitmentData} /></> :
            user.role === 'finance' ? <NavMain data={FinanceData} /> :
              <NavMain data={navMainData} />
        ) : null}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
