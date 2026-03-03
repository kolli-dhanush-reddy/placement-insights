import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { GraduationCap } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border bg-card px-4 sticky top-0 z-40">
            <SidebarTrigger className="text-muted-foreground" />
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-lg font-semibold font-display truncate">{title}</h1>
              {subtitle && <span className="text-sm text-muted-foreground hidden sm:inline">— {subtitle}</span>}
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            {children}
          </main>
          <footer className="text-center text-xs text-muted-foreground py-4 border-t border-border">
            © 2024 HireSight
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
