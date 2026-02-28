import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hiringHeatmap } from "@/data/placementData";

const departments = ["CSE", "IT", "ECE", "EE", "ME", "CE"];

const getColor = (value: number) => {
  if (value === 0) return "bg-muted";
  if (value <= 3) return "bg-secondary/20";
  if (value <= 8) return "bg-secondary/40";
  if (value <= 15) return "bg-secondary/60";
  if (value <= 25) return "bg-secondary/80";
  return "bg-secondary";
};

const getTextColor = (value: number) => {
  if (value === 0) return "text-muted-foreground/40";
  if (value <= 15) return "text-foreground";
  return "text-secondary-foreground";
};

const HiringHeatmap = () => (
  <Card className="shadow-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-display">Company-Department Hiring Heatmap</CardTitle>
      <p className="text-sm text-muted-foreground">Number of hires per company per department (2024)</p>
    </CardHeader>
    <CardContent className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left p-2 font-medium text-muted-foreground">Company</th>
            {departments.map((d) => (
              <th key={d} className="p-2 text-center font-medium text-muted-foreground">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hiringHeatmap.map((row) => (
            <tr key={row.company} className="border-t border-border">
              <td className="p-2 font-medium">{row.company}</td>
              {departments.map((dept) => {
                const val = (row as any)[dept] as number;
                return (
                  <td key={dept} className="p-1 text-center">
                    <div className={`rounded-md py-1.5 px-2 text-xs font-semibold ${getColor(val)} ${getTextColor(val)}`}>
                      {val || "—"}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <span className="w-6 h-4 rounded bg-muted" />
        <span className="w-6 h-4 rounded bg-secondary/20" />
        <span className="w-6 h-4 rounded bg-secondary/40" />
        <span className="w-6 h-4 rounded bg-secondary/60" />
        <span className="w-6 h-4 rounded bg-secondary/80" />
        <span className="w-6 h-4 rounded bg-secondary" />
        <span>More</span>
      </div>
    </CardContent>
  </Card>
);

export default HiringHeatmap;
