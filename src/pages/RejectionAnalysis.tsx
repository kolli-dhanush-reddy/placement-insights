import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { rejectionReasons, improvementTips } from "@/data/placementData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Lightbulb, CheckCircle2, BookOpen, MessageSquare, Brain, FileText, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PIE_COLORS = [
  "hsl(0, 72%, 51%)",
  "hsl(38, 92%, 55%)",
  "hsl(220, 60%, 45%)",
  "hsl(175, 55%, 40%)",
  "hsl(280, 50%, 55%)",
  "hsl(145, 55%, 42%)",
];

const impactColor: Record<string, string> = {
  high: "bg-destructive/10 text-destructive border-0",
  medium: "bg-accent/20 text-accent-foreground border-0",
  low: "bg-secondary/10 text-secondary border-0",
};

const categoryIcon: Record<string, React.ReactNode> = {
  soft: <MessageSquare className="w-4 h-4" />,
  technical: <Brain className="w-4 h-4" />,
  aptitude: <BookOpen className="w-4 h-4" />,
  experience: <Users className="w-4 h-4" />,
  resume: <FileText className="w-4 h-4" />,
  interview: <CheckCircle2 className="w-4 h-4" />,
};

const detailedGuidance = [
  {
    title: "Resume Building",
    icon: "📄",
    tips: [
      "Use ATS-friendly templates with clean formatting",
      "Quantify achievements with numbers and metrics",
      "Tailor your resume for each application",
      "Include relevant projects with tech stack details",
      "Keep it to 1 page for freshers",
    ],
  },
  {
    title: "Technical Skill Development",
    icon: "💻",
    tips: [
      "Master at least one programming language thoroughly",
      "Practice 2-3 DSA problems daily on LeetCode/HackerRank",
      "Build 3-5 full-stack portfolio projects",
      "Learn system design fundamentals",
      "Contribute to open source projects",
    ],
  },
  {
    title: "Aptitude Practice",
    icon: "🧮",
    tips: [
      "Practice quantitative aptitude for 30 mins daily",
      "Focus on time management during tests",
      "Use platforms like IndiaBix and PrepInsta",
      "Take weekly mock aptitude tests",
      "Study logical reasoning and verbal ability",
    ],
  },
  {
    title: "Communication Training",
    icon: "💬",
    tips: [
      "Join a public speaking or debate club",
      "Practice group discussions with peers weekly",
      "Read English newspapers and articles daily",
      "Record yourself speaking and review",
      "Take online communication courses",
    ],
  },
  {
    title: "Mock Interview Preparation",
    icon: "🎤",
    tips: [
      "Practice with peers using real interview questions",
      "Use platforms like Pramp for mock technical interviews",
      "Prepare STAR-method answers for behavioral questions",
      "Research common questions for target companies",
      "Get feedback from seniors and mentors",
    ],
  },
];

const RejectionAnalysis = () => (
  <DashboardLayout title="Rejection Analysis" subtitle="Learn & Improve">
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">Rejection Reasons Breakdown</CardTitle>
            <p className="text-sm text-muted-foreground">Analysis of why students get rejected</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="h-[240px] w-[240px] flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={rejectionReasons} cx="50%" cy="50%" innerRadius={60} outerRadius={95} dataKey="percentage" paddingAngle={3}>
                      {rejectionReasons.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [`${v}%`]} contentStyle={{ borderRadius: "0.75rem" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 flex-1">
                {rejectionReasons.map((r, i) => (
                  <div key={r.reason} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <span className="flex items-center gap-1 flex-1">{categoryIcon[r.category]} {r.reason}</span>
                    <span className="font-semibold">{r.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-display">Rejection Reasons (Bar View)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rejectionReasons} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" horizontal={false} />
                  <XAxis type="number" domain={[0, 40]} tick={{ fontSize: 12 }} stroke="hsl(215, 16%, 47%)" />
                  <YAxis type="category" dataKey="reason" width={160} tick={{ fontSize: 10 }} stroke="hsl(215, 16%, 47%)" />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem" }} formatter={(v: number) => [`${v}%`]} />
                  <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={22}>
                    {rejectionReasons.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-display flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-accent" /> Actionable Improvement Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {improvementTips.map((tip) => (
              <div key={tip.title} className="p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  {categoryIcon[tip.category]}
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <Badge variant="secondary" className={impactColor[tip.impact]}>{tip.impact}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{tip.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-display">📚 Detailed Preparation Guide</CardTitle>
          <p className="text-sm text-muted-foreground">Step-by-step guidance to improve your placement readiness</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={detailedGuidance[0].title}>
            <TabsList className="flex-wrap h-auto gap-1 mb-4">
              {detailedGuidance.map((g) => (
                <TabsTrigger key={g.title} value={g.title} className="text-xs">
                  {g.icon} {g.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {detailedGuidance.map((g) => (
              <TabsContent key={g.title} value={g.title}>
                <div className="space-y-2">
                  {g.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/30">
                      <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  </DashboardLayout>
);

export default RejectionAnalysis;
