import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CompanyIntelligence from "./pages/CompanyIntelligence";
import CompanyComparison from "./pages/CompanyComparison";
import SkillMapping from "./pages/SkillMapping";
import TrendsAndPredictions from "./pages/TrendsAndPredictions";
import RejectionAnalysis from "./pages/RejectionAnalysis";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/companies" element={<CompanyIntelligence />} />
            <Route path="/comparison" element={<CompanyComparison />} />
            <Route path="/skills" element={<SkillMapping />} />
            <Route path="/trends" element={<TrendsAndPredictions />} />
            <Route path="/rejections" element={<RejectionAnalysis />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
