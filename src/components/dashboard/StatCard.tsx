import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend }: StatCardProps) => (
  <Card className="shadow-card hover:shadow-elevated transition-shadow duration-300">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-display animate-count-up">{value}</p>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="p-3 rounded-xl bg-secondary/10">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1">
          <span className={`text-xs font-medium ${trend.positive ? "text-chart-6" : "text-destructive"}`}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-xs text-muted-foreground">vs last year</span>
        </div>
      )}
    </CardContent>
  </Card>
);

export default StatCard;
