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
import { useState } from "react";

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  return (
    <DashboardLayout title="Dashboard" subtitle="Placement Overview">
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
          <StatCard title="Total Placed" value="455" subtitle="out of 500 students" icon={Users} trend={{ value: "5.8%", positive: true }} />
          <StatCard title="Placement Rate" value="91%" subtitle="highest ever recorded" icon={TrendingUp} trend={{ value: "5%", positive: true }} />
          <StatCard title="Companies Visited" value="128" subtitle="across all sectors" icon={Building2} trend={{ value: "12%", positive: true }} />
          <StatCard title="Avg Package" value="₹9.2L" subtitle="per annum" icon={IndianRupee} trend={{ value: "8.2%", positive: true }} />
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
