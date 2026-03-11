import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search, IndianRupee, Users, TrendingUp, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CompanyPlacement {
  id: string;
  year: string;
  company: string;
  job_role: string | null;
  salary_pa: number;
  hires: number;
}

interface CompanySummary {
  name: string;
  totalHires: number;
  avgSalary: number;
  maxSalary: number;
  yearsActive: string[];
  roles: string[];
  yearWiseHires: { year: string; hires: number }[];
  records: CompanyPlacement[];
}

const CompanyCard = ({ company, onSelect }: { company: CompanySummary; onSelect: () => void }) => (
  <Card className="shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer" onClick={onSelect}>
    <CardContent className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold font-display text-lg">{company.name}</h3>
          <p className="text-xs text-muted-foreground">{company.yearsActive.length} year{company.yearsActive.length > 1 ? "s" : ""} active</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-display text-secondary">₹{(company.maxSalary / 100000).toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground">highest package</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center mt-4">
        <div className="p-2 rounded-lg bg-muted/50">
          <p className="text-lg font-bold">{company.totalHires}</p>
          <p className="text-xs text-muted-foreground">Total Hires</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/50">
          <p className="text-lg font-bold">₹{(company.avgSalary / 100000).toFixed(1)}L</p>
          <p className="text-xs text-muted-foreground">Avg Salary</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/50">
          <p className="text-lg font-bold">{company.roles.length}</p>
          <p className="text-xs text-muted-foreground">Roles</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {company.yearsActive.slice(-3).map((y) => (
          <Badge key={y} variant="outline" className="text-xs">{y}</Badge>
        ))}
        {company.yearsActive.length > 3 && (
          <Badge variant="outline" className="text-xs">+{company.yearsActive.length - 3} more</Badge>
        )}
      </div>
    </CardContent>
  </Card>
);

const CompanyDetailView = ({ company, onBack }: { company: CompanySummary; onBack: () => void }) => (
  <div className="space-y-6 animate-fade-in">
    <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      ← Back to all companies
    </button>

    <h2 className="text-2xl font-bold font-display">{company.name}</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <Users className="w-5 h-5 mx-auto text-secondary mb-1" />
        <p className="text-2xl font-bold font-display">{company.totalHires}</p>
        <p className="text-xs text-muted-foreground">Total Hires (all years)</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <IndianRupee className="w-5 h-5 mx-auto text-secondary mb-1" />
        <p className="text-2xl font-bold font-display">₹{(company.avgSalary / 100000).toFixed(1)}L</p>
        <p className="text-xs text-muted-foreground">Avg Package</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <TrendingUp className="w-5 h-5 mx-auto text-accent mb-1" />
        <p className="text-2xl font-bold font-display">₹{(company.maxSalary / 100000).toFixed(1)}L</p>
        <p className="text-xs text-muted-foreground">Highest Package</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <Briefcase className="w-5 h-5 mx-auto text-chart-2 mb-1" />
        <p className="text-2xl font-bold font-display">{company.yearsActive.length}</p>
        <p className="text-xs text-muted-foreground">Years Visited</p>
      </CardContent></Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-display">Year-wise Hiring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={company.yearWiseHires}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                <Tooltip contentStyle={{ borderRadius: "0.75rem" }} />
                <Bar dataKey="hires" fill="hsl(175, 55%, 40%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-display">Job Roles Offered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {company.roles.map((r) => (
              <Badge key={r} variant="secondary" className="bg-secondary/10 text-secondary border-0">{r}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    <Card className="shadow-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display">All Placement Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead className="text-right">Salary (PA)</TableHead>
              <TableHead className="text-right">Hires</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {company.records
              .sort((a, b) => b.year.localeCompare(a.year) || b.salary_pa - a.salary_pa)
              .map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.year}</TableCell>
                  <TableCell>{r.job_role || "—"}</TableCell>
                  <TableCell className="text-right">₹{(r.salary_pa / 100000).toFixed(2)}L</TableCell>
                  <TableCell className="text-right font-medium">{r.hires}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

const CompanyIntelligence = () => {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [selected, setSelected] = useState<CompanySummary | null>(null);

  const { data: placements = [], isLoading } = useQuery({
    queryKey: ["company_placements"],
    queryFn: async () => {
      const { data, error } = await supabase.from("company_placements").select("*").order("year");
      if (error) throw error;
      return data as CompanyPlacement[];
    },
  });

  const companies = useMemo(() => {
    const map = new Map<string, CompanySummary>();
    for (const r of placements) {
      let c = map.get(r.company);
      if (!c) {
        c = { name: r.company, totalHires: 0, avgSalary: 0, maxSalary: 0, yearsActive: [], roles: [], yearWiseHires: [], records: [] };
        map.set(r.company, c);
      }
      c.totalHires += r.hires;
      c.maxSalary = Math.max(c.maxSalary, r.salary_pa);
      if (!c.yearsActive.includes(r.year)) c.yearsActive.push(r.year);
      if (r.job_role && !c.roles.includes(r.job_role)) c.roles.push(r.job_role);
      c.records.push(r);
    }

    for (const c of map.values()) {
      c.yearsActive.sort();
      // weighted avg salary
      const totalWeighted = c.records.reduce((s, r) => s + r.salary_pa * r.hires, 0);
      c.avgSalary = c.totalHires > 0 ? totalWeighted / c.totalHires : 0;
      // year-wise hires
      const yearMap = new Map<string, number>();
      for (const r of c.records) {
        yearMap.set(r.year, (yearMap.get(r.year) || 0) + r.hires);
      }
      c.yearWiseHires = Array.from(yearMap.entries())
        .map(([year, hires]) => ({ year, hires }))
        .sort((a, b) => a.year.localeCompare(b.year));
    }

    // Composite ranking: normalize each metric to 0-1 range, then weighted sum
    const all = Array.from(map.values());
    const maxHires = Math.max(...all.map(c => c.totalHires), 1);
    const maxAvg = Math.max(...all.map(c => c.avgSalary), 1);
    const maxMax = Math.max(...all.map(c => c.maxSalary), 1);
    const maxYears = Math.max(...all.map(c => c.yearsActive.length), 1);
    const maxRoles = Math.max(...all.map(c => c.roles.length), 1);
    const maxAvgHiresPerYear = Math.max(...all.map(c => c.totalHires / (c.yearsActive.length || 1)), 1);

    const score = (c: CompanySummary) => {
      const normAvgSalary = c.avgSalary / maxAvg;
      const normMaxSalary = c.maxSalary / maxMax;
      const normHiresPerYear = (c.totalHires / (c.yearsActive.length || 1)) / maxAvgHiresPerYear;
      const normYears = c.yearsActive.length / maxYears;
      const normRoles = c.roles.length / maxRoles;
      // Weights: avg salary 30%, max salary 25%, hires/year 25%, consistency 10%, role diversity 10%
      return normAvgSalary * 0.30 + normMaxSalary * 0.25 + normHiresPerYear * 0.25 + normYears * 0.10 + normRoles * 0.10;
    };

    return all.sort((a, b) => score(b) - score(a));
  }, [placements]);

  const years = useMemo(() => {
    const s = new Set(placements.map((p) => p.year));
    return Array.from(s).sort();
  }, [placements]);

  const filtered = companies.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchYear = yearFilter === "all" || c.yearsActive.includes(yearFilter);
    return matchSearch && matchYear;
  });

  return (
    <DashboardLayout title="Company Intelligence" subtitle="Detailed Company Insights">
      {selected ? (
        <CompanyDetailView company={selected} onBack={() => setSelected(null)} />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search companies..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((y) => <SelectItem key={y} value={y}>{y}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <p className="text-center text-muted-foreground py-12">Loading companies...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((c) => (
                <CompanyCard key={c.name} company={c} onSelect={() => setSelected(c)} />
              ))}
            </div>
          )}
          {!isLoading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No companies match your filters.</p>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CompanyIntelligence;
