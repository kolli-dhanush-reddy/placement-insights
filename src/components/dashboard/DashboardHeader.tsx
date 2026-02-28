import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="gradient-hero sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-secondary/20">
            <GraduationCap className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-display text-primary-foreground">Placement Trend Organizer</h1>
            <p className="text-xs text-primary-foreground/60">College Placement Analytics Dashboard</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
          onClick={() => navigate("/")}
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
