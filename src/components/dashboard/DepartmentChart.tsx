import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { departmentWise } from "@/data/placementData";

const colors = [
  "hsl(175, 55%, 40%)",
  "hsl(220, 60%, 45%)",
  "hsl(38, 92%, 55%)",
  "hsl(280, 50%, 55%)",
  "hsl(0, 72%, 51%)",
  "hsl(145, 55%, 42%)",
];

const DepartmentChart = () => (
  <Card className="shadow-card">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-display">Department-wise Performance</CardTitle>
      <p className="text-sm text-muted-foreground">Placement percentage by department (2024)</p>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departmentWise} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
            <YAxis type="category" dataKey="department" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" width={50} />
            <Tooltip
              formatter={(value: number) => [`${value}%`, "Placed"]}
              contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214, 20%, 88%)" }}
            />
            <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={28}>
              {departmentWise.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

export default DepartmentChart;
