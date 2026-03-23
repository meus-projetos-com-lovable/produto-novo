import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import logoHeader from "@/assets/logoheader.png";

export function AppLayout() {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-3 sm:px-5 shrink-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="shrink-0" />
              {!isMobile && (
                <div />
              )}
              <div className={isMobile ? "ml-1" : ""}>
                <h1 className="text-sm font-semibold text-foreground leading-tight">
                  {isMobile ? "Olá, Cliente!" : "Bem-vindo(a) de volta, Cliente!"}
                </h1>
                {!isMobile && (
                  <p className="text-xs text-muted-foreground">É a hora de administrar seus projetos</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
              </button>
              {!isMobile && (
                <div className="flex items-center gap-2 pl-2 border-l">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                    CL
                  </div>
                  <span className="text-sm font-medium">Cliente</span>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>

          {/* Mobile bottom navigation */}
          {isMobile && <MobileBottomNav />}
        </div>
      </div>
    </SidebarProvider>
  );
}

import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FolderKanban, User } from "lucide-react";

function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Projetos", icon: FolderKanban, path: "/projetos" },
    { label: "Perfil", icon: User, path: "#" },
  ];

  return (
    <nav className="h-16 border-t bg-card flex items-center justify-around shrink-0 safe-area-bottom">
      {tabs.map((tab) => {
        const active = tab.path === "/" ? location.pathname === "/" : location.pathname.startsWith(tab.path) && tab.path !== "#";
        return (
          <button
            key={tab.label}
            onClick={() => tab.path !== "#" && navigate(tab.path)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}