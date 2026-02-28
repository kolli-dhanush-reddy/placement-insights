import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { companyDetails, CompanyDetail } from "@/data/placementData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Search, Building2, Users, TrendingUp, IndianRupee, Target, Star } from "lucide-react";

const sectorColors: Record<string, string> = {
  IT: "bg-chart-1/15 text-chart-1 border-0",
  Consulting: "bg-chart-2/15 text-chart-2 border-0",
  Finance: "bg-chart-3/15 text-chart-3 border-0",
  Core: "bg-chart-4/15 text-chart-4 border-0",
  Startup: "bg-chart-6/15 text-chart-6 border-0",
};

const CompanyCard = ({ company, onSelect }: { company: CompanyDetail; onSelect: () => void }) => (
  <Card className="shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer" onClick={onSelect}>
    <CardContent className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold font-display text-lg">{company.name}</h3>
          <Badge variant="secondary" className={sectorColors[company.sector] || ""}>
            {company.sector}
          </Badge>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-display text-secondary">₹{company.avgPackage}L</p>
          <p className="text-xs text-muted-foreground">avg package</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center mt-4">
        <div className="p-2 rounded-lg bg-muted/50">
          <p className="text-lg font-bold">{company.yearWiseHires[company.yearWiseHires.length - 1]?.hires || 0}</p>
          <p className="text-xs text-muted-foreground">Hired (latest)</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/50">
          <p className="text-lg font-bold">{company.selectionRatio}%</p>
          <p className="text-xs text-muted-foreground">Selection Rate</p>
        </div>
        <div className="p-2 rounded-lg bg-muted/50">
          <p className="text-lg font-bold">{company.visitProbability}%</p>
          <p className="text-xs text-muted-foreground">Visit Prob.</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1">
        {company.hiringDepartments.map((d) => (
          <Badge key={d} variant="outline" className="text-xs">{d}</Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const CompanyDetailView = ({ company, onBack }: { company: CompanyDetail; onBack: () => void }) => (
  <div className="space-y-6 animate-fade-in">
    <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      ← Back to all companies
    </button>

    <div className="flex flex-wrap items-center gap-3">
      <h2 className="text-2xl font-bold font-display">{company.name}</h2>
      <Badge variant="secondary" className={sectorColors[company.sector] || ""}>{company.sector}</Badge>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <IndianRupee className="w-5 h-5 mx-auto text-secondary mb-1" />
        <p className="text-2xl font-bold font-display">₹{company.avgPackage}L</p>
        <p className="text-xs text-muted-foreground">Avg Package</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <Star className="w-5 h-5 mx-auto text-accent mb-1" />
        <p className="text-2xl font-bold font-display">₹{company.highestPackage}L</p>
        <p className="text-xs text-muted-foreground">Highest Package</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <Target className="w-5 h-5 mx-auto text-chart-2 mb-1" />
        <p className="text-2xl font-bold font-display">{company.selectionRatio}%</p>
        <p className="text-xs text-muted-foreground">Selection Ratio</p>
      </CardContent></Card>
      <Card className="shadow-card"><CardContent className="p-4 text-center">
        <TrendingUp className="w-5 h-5 mx-auto text-chart-6 mb-1" />
        <p className="text-2xl font-bold font-display">{company.visitProbability}%</p>
        <p className="text-xs text-muted-foreground">Visit Probability (2025)</p>
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
          <CardTitle className="text-lg font-display">Company Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Hiring Departments</p>
            <div className="flex flex-wrap gap-1">{company.hiringDepartments.map((d) => <Badge key={d} variant="outline">{d}</Badge>)}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Job Roles</p>
            <div className="flex flex-wrap gap-1">{company.jobRoles.map((r) => <Badge key={r} variant="secondary" className="bg-secondary/10 text-secondary border-0">{r}</Badge>)}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Required Skills</p>
            <div className="flex flex-wrap gap-1">{company.requiredSkills.map((s) => <Badge key={s} className="bg-accent/15 text-accent-foreground border-0">{s}</Badge>)}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Minimum CGPA</p>
            <p className="text-lg font-bold">{company.minCGPA}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">2025 Prediction</p>
            <p className="text-sm">Expected hires: <strong>{company.expectedHires2025}</strong> | Package range: <strong>₹{company.expectedPackageRange[0]}L – ₹{company.expectedPackageRange[1]}L</strong></p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const CompanyIntelligence = () => {
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [selected, setSelected] = useState<CompanyDetail | null>(null);

  const sectors = Array.from(new Set(companyDetails.map((c) => c.sector)));
  const filtered = companyDetails.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === "all" || c.sector === sectorFilter;
    return matchSearch && matchSector;
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
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <CompanyCard key={c.id} company={c} onSelect={() => setSelected(c)} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No companies match your filters.</p>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default CompanyIntelligence;
