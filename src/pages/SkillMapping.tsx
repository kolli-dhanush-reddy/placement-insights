import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { skillDemandData, companyDetails } from "@/data/placementData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

const trendIcon = (trend: string) => {
  if (trend === "rising") return <ArrowUp className="w-3 h-3 text-chart-6" />;
  if (trend === "declining") return <ArrowDown className="w-3 h-3 text-destructive" />;
  return <ArrowRight className="w-3 h-3 text-muted-foreground" />;
};

const categoryColor: Record<string, string> = {
  programming: "bg-chart-1/15 text-chart-1 border-0",
  framework: "bg-chart-2/15 text-chart-2 border-0",
  soft: "bg-chart-3/15 text-chart-3 border-0",
  tool: "bg-chart-4/15 text-chart-4 border-0",
  domain: "bg-chart-6/15 text-chart-6 border-0",
};

const barColors: Record<string, string> = {
  programming: "hsl(175, 55%, 40%)",
  framework: "hsl(220, 60%, 45%)",
  soft: "hsl(38, 92%, 55%)",
  tool: "hsl(280, 50%, 55%)",
  domain: "hsl(145, 55%, 42%)",
};

const SkillMapping = () => {
  const [catFilter, setCatFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");

  let filteredSkills = [...skillDemandData].sort((a, b) => b.demandCount - a.demandCount);
  if (catFilter !== "all") filteredSkills = filteredSkills.filter((s) => s.category === catFilter);
  if (companyFilter !== "all") filteredSkills = filteredSkills.filter((s) => s.companies.includes(companyFilter));

  // Company → Role → Skills mapping
  const companySkillMap = companyDetails.map((c) => ({
    company: c.name,
    roles: c.jobRoles,
    skills: c.requiredSkills,
  }));

  const emergingSkills = skillDemandData.filter((s) => s.trend === "rising").sort((a, b) => b.demandCount - a.demandCount);

  return (
    <DashboardLayout title="Skill Mapping" subtitle="Job Role & Skill Intelligence">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-3">
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="framework">Frameworks</SelectItem>
              <SelectItem value="soft">Soft Skills</SelectItem>
              <SelectItem value="tool">Tools</SelectItem>
              <SelectItem value="domain">Domain</SelectItem>
            </SelectContent>
          </Select>
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="w-[160px]"><SelectValue placeholder="Company" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companyDetails.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-display">Skill Demand Distribution</CardTitle>
              <p className="text-sm text-muted-foreground">Number of companies requiring each skill</p>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredSkills} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                    <YAxis type="category" dataKey="skill" width={100} tick={{ fontSize: 11 }} stroke="hsl(215, 16%, 47%)" />
                    <Tooltip contentStyle={{ borderRadius: "0.75rem" }} formatter={(v: number) => [`${v} companies`, "Demand"]} />
                    <Bar dataKey="demandCount" radius={[0, 6, 6, 0]} barSize={20}>
                      {filteredSkills.map((s, i) => (
                        <Cell key={i} fill={barColors[s.category]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-display">🔥 Emerging Skills</CardTitle>
              <p className="text-sm text-muted-foreground">Skills with rising demand trends</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {emergingSkills.map((s) => (
                  <div key={s.skill} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-center gap-2">
                      {trendIcon(s.trend)}
                      <span className="font-medium">{s.skill}</span>
                      <Badge variant="secondary" className={categoryColor[s.category]}>{s.category}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{s.demandCount} companies</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">Company → Role → Skills Mapping</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Job Roles</TableHead>
                  <TableHead>Required Skills</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companySkillMap.map((row) => (
                  <TableRow key={row.company}>
                    <TableCell className="font-medium whitespace-nowrap">{row.company}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {row.roles.map((r) => <Badge key={r} variant="outline" className="text-xs">{r}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {row.skills.map((s) => <Badge key={s} variant="secondary" className="bg-secondary/10 text-secondary border-0 text-xs">{s}</Badge>)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SkillMapping;
