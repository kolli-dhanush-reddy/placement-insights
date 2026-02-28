import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { yearWisePlacement, predictionData, departmentPrediction, companyDetails, companyHiringTrend } from "@/data/placementData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { ArrowUp, ArrowDown, Minus, TrendingUp, Target, Building2 } from "lucide-react";

const trendIcon = (trend: string) => {
  if (trend === "rising") return <ArrowUp className="w-4 h-4 text-chart-6" />;
  if (trend === "declining") return <ArrowDown className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
};

const trendLabel: Record<string, string> = {
  rising: "bg-chart-6/15 text-chart-6 border-0",
  declining: "bg-destructive/15 text-destructive border-0",
  stable: "bg-muted text-muted-foreground border-0",
};

const TrendsAndPredictions = () => {
  const allTrendData = [
    ...yearWisePlacement.map((d) => ({ year: d.year, percentage: d.percentage, predicted: null as number | null })),
    ...predictionData.map((d) => ({ year: d.year, percentage: null as number | null, predicted: d.predicted })),
  ];

  const topVisitCompanies = [...companyDetails]
    .sort((a, b) => b.visitProbability - a.visitProbability)
    .slice(0, 8);

  return (
    <DashboardLayout title="Trends & Predictions" subtitle="Data Analysis & Forecasting">
      <div className="space-y-6">
        {/* Overall Prediction */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {predictionData.map((p) => (
            <Card key={p.year} className="shadow-card">
              <CardContent className="p-5 text-center">
                <TrendingUp className="w-5 h-5 mx-auto text-secondary mb-2" />
                <p className="text-3xl font-bold font-display text-secondary">{p.predicted}%</p>
                <p className="text-sm text-muted-foreground">Predicted for {p.year}</p>
                <p className="text-xs text-muted-foreground mt-1">Confidence: {p.confidence}%</p>
                <Progress value={p.confidence} className="mt-2 h-1.5" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trend Chart */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">Placement Percentage: Actual vs Predicted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={allTrendData}>
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(175, 55%, 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(175, 55%, 40%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(38, 92%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
                  <Legend />
                  <Area type="monotone" dataKey="percentage" stroke="hsl(175, 55%, 40%)" fill="url(#colorActual)" strokeWidth={2.5} name="Actual" connectNulls={false} />
                  <Area type="monotone" dataKey="predicted" stroke="hsl(38, 92%, 55%)" fill="url(#colorPred)" strokeWidth={2.5} strokeDasharray="5 5" name="Predicted" connectNulls={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Department Predictions */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">Department Placement Potential</CardTitle>
            <p className="text-sm text-muted-foreground">Current performance vs predicted for 2025</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentPrediction.map((d) => (
                <div key={d.department} className="flex items-center gap-4">
                  <span className="w-12 font-semibold text-sm">{d.department}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Current: {d.current}%</span>
                      <div className="flex items-center gap-1">
                        {trendIcon(d.trend)}
                        <span>Predicted: {d.predicted}%</span>
                      </div>
                    </div>
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 left-0 bg-secondary/40 rounded-full" style={{ width: `${d.current}%` }} />
                      <div className="absolute inset-y-0 left-0 bg-secondary rounded-full opacity-70" style={{ width: `${d.predicted}%`, borderRight: "2px dashed hsl(175, 55%, 40%)" }} />
                    </div>
                  </div>
                  <Badge variant="secondary" className={trendLabel[d.trend]}>{d.trend}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sector Hiring Trends */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">Sector-wise Hiring Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={companyHiringTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
                  <Legend />
                  <Bar dataKey="IT" stackId="a" fill="hsl(175, 55%, 40%)" />
                  <Bar dataKey="consulting" stackId="a" fill="hsl(220, 60%, 45%)" />
                  <Bar dataKey="finance" stackId="a" fill="hsl(38, 92%, 55%)" />
                  <Bar dataKey="core" stackId="a" fill="hsl(280, 50%, 55%)" />
                  <Bar dataKey="startup" stackId="a" fill="hsl(145, 55%, 42%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Company Visit Predictions */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display flex items-center gap-2">
              <Target className="w-5 h-5 text-secondary" /> Company Visit Probability (2025)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {topVisitCompanies.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{c.name}</span>
                      <Badge variant="outline" className="text-xs">{c.sector}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Expected: {c.expectedHires2025} hires | ₹{c.expectedPackageRange[0]}L–₹{c.expectedPackageRange[1]}L
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold font-display text-secondary">{c.visitProbability}%</p>
                    <Progress value={c.visitProbability} className="w-16 h-1.5 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TrendsAndPredictions;
