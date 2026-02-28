import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { salaryData } from "@/data/placementData";

const SalaryChart = () => (
  <Card className="shadow-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-display">Salary Packages (LPA)</CardTitle>
      <p className="text-sm text-muted-foreground">Minimum, average, and highest salary trends</p>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salaryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }} />
            <Legend />
            <Line type="monotone" dataKey="max" stroke="hsl(38, 92%, 55%)" strokeWidth={2.5} name="Highest" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="avg" stroke="hsl(175, 55%, 40%)" strokeWidth={2.5} name="Average" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="min" stroke="hsl(220, 60%, 45%)" strokeWidth={2.5} name="Minimum" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default SalaryChart;
