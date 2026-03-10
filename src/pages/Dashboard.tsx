import { Users, TrendingUp, Building2, IndianRupee } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import PlacementTrendChart from "@/components/dashboard/PlacementTrendChart";
import DepartmentChart from "@/components/dashboard/DepartmentChart";
import SalaryChart from "@/components/dashboard/SalaryChart";
import TopRecruitersTable from "@/components/dashboard/TopRecruitersTable";
import CompanyHiringTrend from "@/components/dashboard/CompanyHiringTrend";
import HiringHeatmap from "@/components/dashboard/HiringHeatmap";
import { yearWisePlacement, salaryData } from "@/data/placementData";
import { useMemo, useState } from "react";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const yearData = useMemo(() => {
    const placement = yearWisePlacement.find((d) => d.year === selectedYear);
    const salary = salaryData.find((d) => d.year === selectedYear);
    return { placement, salary };
  }, [selectedYear]);

  const prevYearData = useMemo(() => {
    const prevYear = String(Number(selectedYear) - 1);
    const placement = yearWisePlacement.find((d) => d.year === prevYear);
    return placement;
  }, [selectedYear]);

  const placementTrend = yearData.placement && prevYearData
    ? ((yearData.placement.percentage - prevYearData.percentage) / prevYearData.percentage * 100).toFixed(1)
    : null;

  return (
    <DashboardLayout title="Dashboard" subtitle="MLRIT Placement Overview">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {["2019", "2020", "2021", "2022", "2023", "2024"].map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">Showing data for {selectedYear}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Job Offers"
            value={yearData.placement ? String(yearData.placement.placed) : "—"}
            subtitle={`total offers in ${selectedYear}`}
            icon={Users}
            trend={placementTrend ? { value: `${Math.abs(Number(placementTrend))}%`, positive: Number(placementTrend) >= 0 } : undefined}
          />
          <StatCard
            title="Placement Rate"
            value={yearData.placement ? `${yearData.placement.percentage}%` : "—"}
            subtitle="of eligible students"
            icon={TrendingUp}
            trend={placementTrend ? { value: `${Math.abs(Number(placementTrend))}%`, positive: Number(placementTrend) >= 0 } : undefined}
          />
          <StatCard
            title="Companies Visited"
            value={yearData.placement ? String(yearData.placement.companiesVisited) : "—"}
            subtitle="across all sectors"
            icon={Building2}
          />
          <StatCard
            title="Highest Package"
            value={yearData.placement ? `₹${yearData.placement.highestSalary}L` : "—"}
            subtitle="per annum"
            icon={IndianRupee}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PlacementTrendChart />
          <DepartmentChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalaryChart />
          <CompanyHiringTrend />
        </div>

        <HiringHeatmap />

        <TopRecruitersTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
