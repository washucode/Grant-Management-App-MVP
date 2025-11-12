import {
  LayoutDashboard,
  FileText,
  DollarSign,
  BarChart3,
  Settings,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useLocation } from "wouter";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    url: "/applications",
    icon: FileText,
  },
  {
    title: "Programs",
    url: "/programs",
    icon: DollarSign,
  },
  {
    title: "Applicants",
    url: "/applicants",
    icon: Users,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <DollarSign className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <h1 className="text-lg font-semibold tracking-tight text-primary">Lattice</h1>
              <span className="text-sm font-medium text-accent">.africa</span>
            </div>
            <p className="text-xs text-muted-foreground">Strategic Expertise for Sustainable Growth in Africa</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase()}`}
                  >
                    <a href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-primary">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Admin User</p>
            <p className="text-xs text-muted-foreground truncate">admin@grants.org</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
