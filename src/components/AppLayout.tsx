import React, { useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, Menu, LayoutDashboard, FolderKanban, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import logoHeader from "@/assets/logoheader.png";
import { NotificationModal } from "./modals/NotificationModal";
import { ProfileModal } from "./modals/ProfileModal";

export function AppLayout() {
  const isMobile = useIsMobile();
  const [showNav, setShowNav] = useState(true);
  const [activeModal, setActiveModal] = useState<"notifications" | "profile" | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (!isMobile) return;
    const currentScrollY = e.currentTarget.scrollTop;
    
    // Hide when scrolling down past 50px, show when scrolling up
    if (currentScrollY > lastScrollY.current + 8 && currentScrollY > 50) {
      setShowNav(false);
    } else if (currentScrollY < lastScrollY.current - 8) {
      setShowNav(true);
    }
    lastScrollY.current = currentScrollY;
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full relative">
        {!isMobile && <AppSidebar />}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b bg-card px-3 sm:px-5 shrink-0">
            <div className="flex items-center gap-2">
              {!isMobile && <SidebarTrigger className="shrink-0" />}
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
              <NotificationModal
                open={activeModal === "notifications"}
                onOpenChange={(open) => setActiveModal(open ? "notifications" : null)}
              >
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
                </button>
              </NotificationModal>
              {!isMobile && (
                <ProfileModal
                  open={activeModal === "profile"}
                  onOpenChange={(open) => setActiveModal(open ? "profile" : null)}
                >
                  <div className="flex items-center gap-2 pl-2 border-l cursor-pointer hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                      CL
                    </div>
                    <span className="text-sm font-medium">Cliente</span>
                  </div>
                </ProfileModal>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-auto" onScroll={handleScroll}>
            <Outlet />
          </main>

          {/* Mobile bottom navigation */}
          {isMobile && (
            <div
              className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
                showNav ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <MobileBottomNav activeModal={activeModal} setActiveModal={setActiveModal} />
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}

interface MobileBottomNavProps {
  activeModal: "notifications" | "profile" | null;
  setActiveModal: (modal: "notifications" | "profile" | null) => void;
}

function MobileBottomNav({ activeModal, setActiveModal }: MobileBottomNavProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/" },
    { label: "Projetos", icon: FolderKanban, path: "/projetos" },
    { label: "Perfil", icon: User, path: "/perfil" },
  ];

  return (
    <nav className="h-16 border-t bg-card flex items-center justify-around shrink-0 safe-area-bottom z-50">
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