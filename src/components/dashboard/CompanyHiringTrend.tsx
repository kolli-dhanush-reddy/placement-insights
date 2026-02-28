import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { companyHiringTrend } from "@/data/placementData";

const CompanyHiringTrend = () => (
  <Card className="shadow-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-display">Company Hiring by Sector</CardTitle>
      <p className="text-sm text-muted-foreground">Sector-wise hiring trends across years</p>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={companyHiringTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
            <Legend />
            <Bar dataKey="IT" stackId="a" fill="hsl(175, 55%, 40%)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="consulting" stackId="a" fill="hsl(220, 60%, 45%)" />
            <Bar dataKey="finance" stackId="a" fill="hsl(38, 92%, 55%)" />
            <Bar dataKey="core" stackId="a" fill="hsl(280, 50%, 55%)" />
            <Bar dataKey="startup" stackId="a" fill="hsl(145, 55%, 42%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default CompanyHiringTrend;
