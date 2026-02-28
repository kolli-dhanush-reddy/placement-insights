import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { rejectionReasons, improvementTips } from "@/data/placementData";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

const COLORS = [
  "hsl(0, 72%, 51%)",
  "hsl(38, 92%, 55%)",
  "hsl(220, 60%, 45%)",
  "hsl(175, 55%, 40%)",
  "hsl(280, 50%, 55%)",
  "hsl(145, 55%, 42%)",
];

const impactColor: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border-0",
  medium: "bg-accent/20 text-accent-foreground border-0",
  low: "bg-secondary/10 text-secondary border-0",
};

const RejectionAnalysis = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display">Rejection Reasons</CardTitle>
        <p className="text-sm text-muted-foreground">Common reasons for placement rejections</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="h-[220px] w-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={rejectionReasons} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="percentage" paddingAngle={3}>
                  {rejectionReasons.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`]} contentStyle={{ borderRadius: "0.75rem" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 flex-1">
            {rejectionReasons.map((r, i) => (
              <div key={r.reason} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[i] }} />
                <span className="flex-1">{r.icon} {r.reason}</span>
                <span className="font-semibold">{r.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>

    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" /> Improvement Tips
        </CardTitle>
        <p className="text-sm text-muted-foreground">Actionable guidance to improve your chances</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {improvementTips.map((tip) => (
            <div key={tip.title} className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{tip.title}</h4>
                <Badge variant="secondary" className={impactColor[tip.impact]}>
                  {tip.impact} impact
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default RejectionAnalysis;
