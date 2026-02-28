import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { companyDetails, CompanyDetail } from "@/data/placementData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CHART_COLORS = [
  "hsl(175, 55%, 40%)",
  "hsl(38, 92%, 55%)",
  "hsl(220, 60%, 45%)",
  "hsl(280, 50%, 55%)",
  "hsl(0, 72%, 51%)",
];

const CompanyComparison = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(["tcs", "google", "deloitte"]);

  const toggleCompany = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : prev.length < 5 ? [...prev, id] : prev
    );
  };

  const selected = companyDetails.filter((c) => selectedIds.includes(c.id));

  const packageData = selected.map((c) => ({
    name: c.name,
    min: c.expectedPackageRange[0],
    avg: c.avgPackage,
    max: c.highestPackage,
  }));

  const hiresData = selected[0]?.yearWiseHires.map((_, i) => {
    const entry: any = { year: selected[0].yearWiseHires[i]?.year };
    selected.forEach((c) => {
      const found = c.yearWiseHires.find((h) => h.year === entry.year);
      entry[c.name] = found?.hires || 0;
    });
    return entry;
  }) || [];

  const radarData = [
    { metric: "Avg Package", fullMark: 35 },
    { metric: "Hires", fullMark: 100 },
    { metric: "Selection %", fullMark: 50 },
    { metric: "Visit Prob %", fullMark: 100 },
    { metric: "Min CGPA", fullMark: 10 },
  ].map((m) => {
    const entry: any = { metric: m.metric, fullMark: m.fullMark };
    selected.forEach((c) => {
      if (m.metric === "Avg Package") entry[c.name] = c.avgPackage;
      else if (m.metric === "Hires") entry[c.name] = c.yearWiseHires[c.yearWiseHires.length - 1]?.hires || 0;
      else if (m.metric === "Selection %") entry[c.name] = c.selectionRatio;
      else if (m.metric === "Visit Prob %") entry[c.name] = c.visitProbability;
      else if (m.metric === "Min CGPA") entry[c.name] = c.minCGPA;
    });
    return entry;
  });

  return (
    <DashboardLayout title="Company Comparison" subtitle="Compare Side by Side">
      <div className="space-y-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">Select Companies to Compare (max 5)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {companyDetails.map((c) => (
                <label key={c.id} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <Checkbox
                    checked={selectedIds.includes(c.id)}
                    onCheckedChange={() => toggleCompany(c.id)}
                    disabled={!selectedIds.includes(c.id) && selectedIds.length >= 5}
                  />
                  <span className="text-sm font-medium">{c.name}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {selected.length >= 2 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-display">Package Comparison (LPA)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={packageData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
                        <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                        <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
                        <Legend />
                        <Bar dataKey="min" fill="hsl(220, 60%, 45%)" name="Min" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="avg" fill="hsl(175, 55%, 40%)" name="Avg" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="max" fill="hsl(38, 92%, 55%)" name="Max" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-display">Multi-Metric Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="hsl(214, 20%, 88%)" />
                        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                        <PolarRadiusAxis tick={{ fontSize: 10 }} />
                        {selected.map((c, i) => (
                          <Radar key={c.id} name={c.name} dataKey={c.name} stroke={CHART_COLORS[i]} fill={CHART_COLORS[i]} fillOpacity={0.15} strokeWidth={2} />
                        ))}
                        <Legend />
                        <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-display">Hiring Trend Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hiresData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                      <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                      <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
                      <Legend />
                      {selected.map((c, i) => (
                        <Bar key={c.id} dataKey={c.name} fill={CHART_COLORS[i]} radius={[4, 4, 0, 0]} />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-display">Detailed Comparison Table</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      {selected.map((c) => <TableHead key={c.id} className="text-center">{c.name}</TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Sector</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center"><Badge variant="secondary" className="text-xs">{c.sector}</Badge></TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Avg Package</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center font-semibold">₹{c.avgPackage}L</TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Highest Package</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center">₹{c.highestPackage}L</TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Latest Hires</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center">{c.yearWiseHires[c.yearWiseHires.length - 1]?.hires}</TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Selection Ratio</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center">{c.selectionRatio}%</TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Min CGPA</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center">{c.minCGPA}</TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Departments</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center">{c.hiringDepartments.join(", ")}</TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Job Roles</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center text-xs">{c.jobRoles.join(", ")}</TableCell>)}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Visit Probability</TableCell>
                      {selected.map((c) => <TableCell key={c.id} className="text-center font-semibold">{c.visitProbability}%</TableCell>)}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {selected.length < 2 && (
          <p className="text-center text-muted-foreground py-12">Select at least 2 companies to compare.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CompanyComparison;
