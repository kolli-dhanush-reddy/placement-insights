import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { yearWisePlacement, predictionData } from "@/data/placementData";

const PlacementTrendChart = () => {
  const allData = [
    ...yearWisePlacement.map((d) => ({ ...d, type: "actual" })),
    ...predictionData.map((d) => ({ year: d.year, percentage: d.predicted, type: "predicted" })),
  ];

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display">Placement Trend & Prediction</CardTitle>
        <p className="text-sm text-muted-foreground">Year-wise placement percentage with future predictions</p>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={allData}>
              <defs>
                <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(175, 55%, 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(175, 55%, 40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
              <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "1px solid hsl(214, 20%, 88%)",
                  boxShadow: "0 4px 12px hsl(220, 30%, 12%, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="percentage"
                stroke="hsl(175, 55%, 40%)"
                strokeWidth={2.5}
                fill="url(#colorPct)"
                strokeDasharray="0"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-secondary inline-block" /> Actual</span>
          <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-secondary inline-block border-dashed" style={{ borderTop: "2px dashed hsl(175, 55%, 40%)", height: 0 }} /> Predicted</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacementTrendChart;
