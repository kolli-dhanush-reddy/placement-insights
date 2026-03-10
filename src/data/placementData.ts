// ── Year-wise Placement ──
export const yearWisePlacement = [
  { year: "2019", placed: 427, unplaced: 173, percentage: 71, companiesVisited: 65, highestSalary: 10 },
  { year: "2020", placed: 346, unplaced: 254, percentage: 58, companiesVisited: 37, highestSalary: 10 },
  { year: "2021", placed: 868, unplaced: 132, percentage: 87, companiesVisited: 55, highestSalary: 30 },
  { year: "2022", placed: 1048, unplaced: 152, percentage: 87, companiesVisited: 22, highestSalary: 21 },
  { year: "2023", placed: 734, unplaced: 166, percentage: 82, companiesVisited: 32, highestSalary: 58 },
  { year: "2024", placed: 634, unplaced: 166, percentage: 79, companiesVisited: 64, highestSalary: 25 },
];

// ── Department-wise ──
export const departmentWise = [
  { department: "CSE", placed: 145, total: 150, percentage: 97 },
  { department: "ECE", placed: 98, total: 120, percentage: 82 },
  { department: "ME", placed: 65, total: 100, percentage: 65 },
  { department: "EE", placed: 52, total: 80, percentage: 65 },
  { department: "CE", placed: 48, total: 70, percentage: 69 },
  { department: "IT", placed: 47, total: 50, percentage: 94 },
];

// ── Top Recruiters (summary) ──
export const topRecruiters = [
  { company: "Accenture", hires: 608, avgPackage: 4.8 },
  { company: "Virtusa", hires: 497, avgPackage: 4.5 },
  { company: "Capgemini", hires: 424, avgPackage: 4.1 },
  { company: "Wipro", hires: 331, avgPackage: 4.2 },
  { company: "TCS", hires: 286, avgPackage: 3.8 },
  { company: "DXC Technology", hires: 188, avgPackage: 3.9 },
  { company: "Tech Mahindra", hires: 117, avgPackage: 3.3 },
  { company: "Cognizant", hires: 112, avgPackage: 4.0 },
  { company: "Infosys", hires: 82, avgPackage: 4.0 },
  { company: "HCL Technologies", hires: 74, avgPackage: 3.8 },
  { company: "Epam Systems", hires: 53, avgPackage: 7.5 },
  { company: "GlobalLogic", hires: 54, avgPackage: 2.2 },
  { company: "PeopleTech", hires: 38, avgPackage: 3.3 },
  { company: "Bosch Global Software", hires: 28, avgPackage: 5.5 },
  { company: "Amadeus Labs", hires: 19, avgPackage: 10.5 },
  { company: "Amazon", hires: 17, avgPackage: 14.0 },
  { company: "Palo Alto Networks", hires: 3, avgPackage: 58.0 },
  { company: "Walmart Global Tech", hires: 3, avgPackage: 24.0 },
];

// ── Salary Data ──
export const salaryData = [
  { year: "2019", min: 2.5, avg: 4.5, max: 10.0 },
  { year: "2020", min: 2.2, avg: 4.2, max: 10.0 },
  { year: "2021", min: 3.0, avg: 6.5, max: 30.0 },
  { year: "2022", min: 3.5, avg: 7.0, max: 21.0 },
  { year: "2023", min: 3.8, avg: 8.5, max: 58.0 },
  { year: "2024", min: 4.0, avg: 8.0, max: 25.0 },
];

// ── Rejection Reasons ──
export const rejectionReasons = [
  { reason: "Poor Communication Skills", percentage: 32, icon: "💬", category: "soft" },
  { reason: "Weak Technical Knowledge", percentage: 28, icon: "💻", category: "technical" },
  { reason: "Low Aptitude Scores", percentage: 18, icon: "🧮", category: "aptitude" },
  { reason: "Lack of Projects/Experience", percentage: 12, icon: "📁", category: "experience" },
  { reason: "Poor Resume Quality", percentage: 6, icon: "📄", category: "resume" },
  { reason: "Interview Performance", percentage: 4, icon: "🎤", category: "interview" },
];

// ── Prediction Data ──
export const predictionData = [
  { year: "2025", predicted: 81, confidence: 88 },
  { year: "2026", predicted: 84, confidence: 74 },
  { year: "2027", predicted: 86, confidence: 58 },
];

// ── Company Hiring Trend ──
export const companyHiringTrend = [
  { year: "2019", IT: 120, consulting: 80, finance: 40, core: 60, startup: 20 },
  { year: "2020", IT: 100, consulting: 70, finance: 35, core: 50, startup: 25 },
  { year: "2021", IT: 140, consulting: 85, finance: 45, core: 55, startup: 25 },
  { year: "2022", IT: 170, consulting: 95, finance: 55, core: 50, startup: 40 },
  { year: "2023", IT: 185, consulting: 100, finance: 50, core: 45, startup: 50 },
  { year: "2024", IT: 200, consulting: 105, finance: 55, core: 40, startup: 55 },
];

// ── Improvement Tips ──
export const improvementTips = [
  {
    title: "Enhance Communication Skills",
    description: "Join public speaking clubs, practice mock interviews, and participate in group discussions regularly.",
    impact: "high" as const,
    category: "soft",
  },
  {
    title: "Build Strong Technical Foundation",
    description: "Focus on DSA, system design, and practice on platforms like LeetCode and HackerRank.",
    impact: "high" as const,
    category: "technical",
  },
  {
    title: "Work on Real Projects",
    description: "Build portfolio projects, contribute to open source, and do internships to gain practical experience.",
    impact: "medium" as const,
    category: "experience",
  },
  {
    title: "Improve Aptitude Skills",
    description: "Practice quantitative aptitude, logical reasoning, and verbal ability questions daily.",
    impact: "medium" as const,
    category: "aptitude",
  },
  {
    title: "Craft a Professional Resume",
    description: "Use clean templates, quantify achievements, and tailor resume for each application.",
    impact: "medium" as const,
    category: "resume",
  },
  {
    title: "Mock Interview Preparation",
    description: "Practice with peers, record yourself, and seek feedback from seniors and mentors.",
    impact: "high" as const,
    category: "interview",
  },
];

// ── Detailed Company Data ──
export interface CompanyDetail {
  id: string;
  name: string;
  sector: string;
  hiringDepartments: string[];
  jobRoles: string[];
  yearWiseHires: { year: string; hires: number }[];
  selectionRatio: number;
  avgPackage: number;
  highestPackage: number;
  minCGPA: number;
  requiredSkills: string[];
  visitProbability: number;
  expectedHires2025: number;
  expectedPackageRange: [number, number];
}

export const companyDetails: CompanyDetail[] = [
  {
    id: "tcs",
    name: "TCS",
    sector: "IT",
    hiringDepartments: ["CSE", "IT", "ECE", "EE"],
    jobRoles: ["Software Developer", "System Engineer", "Data Analyst"],
    yearWiseHires: [
      { year: "2019", hires: 55 },
      { year: "2020", hires: 42 },
      { year: "2021", hires: 60 },
      { year: "2022", hires: 72 },
      { year: "2023", hires: 78 },
      { year: "2024", hires: 85 },
    ],
    selectionRatio: 42,
    avgPackage: 4.5,
    highestPackage: 7.0,
    minCGPA: 6.0,
    requiredSkills: ["Java", "SQL", "Problem Solving", "Communication"],
    visitProbability: 98,
    expectedHires2025: 90,
    expectedPackageRange: [3.6, 7.5],
  },
  {
    id: "infosys",
    name: "Infosys",
    sector: "IT",
    hiringDepartments: ["CSE", "IT", "ECE"],
    jobRoles: ["Systems Engineer", "Digital Specialist", "Operations Executive"],
    yearWiseHires: [
      { year: "2019", hires: 40 },
      { year: "2020", hires: 35 },
      { year: "2021", hires: 48 },
      { year: "2022", hires: 55 },
      { year: "2023", hires: 58 },
      { year: "2024", hires: 62 },
    ],
    selectionRatio: 38,
    avgPackage: 4.2,
    highestPackage: 8.5,
    minCGPA: 6.5,
    requiredSkills: ["Python", "Java", "Cloud Computing", "Agile"],
    visitProbability: 95,
    expectedHires2025: 65,
    expectedPackageRange: [3.6, 9.0],
  },
  {
    id: "google",
    name: "Google",
    sector: "IT",
    hiringDepartments: ["CSE"],
    jobRoles: ["Software Engineer", "SDE Intern", "Cloud Engineer"],
    yearWiseHires: [
      { year: "2019", hires: 3 },
      { year: "2020", hires: 2 },
      { year: "2021", hires: 5 },
      { year: "2022", hires: 6 },
      { year: "2023", hires: 7 },
      { year: "2024", hires: 8 },
    ],
    selectionRatio: 5,
    avgPackage: 32.0,
    highestPackage: 45.0,
    minCGPA: 8.0,
    requiredSkills: ["DSA", "System Design", "C++", "Python", "Machine Learning"],
    visitProbability: 70,
    expectedHires2025: 8,
    expectedPackageRange: [28.0, 48.0],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    sector: "IT",
    hiringDepartments: ["CSE", "IT"],
    jobRoles: ["Software Engineer", "Program Manager", "Data Scientist"],
    yearWiseHires: [
      { year: "2019", hires: 5 },
      { year: "2020", hires: 4 },
      { year: "2021", hires: 8 },
      { year: "2022", hires: 10 },
      { year: "2023", hires: 11 },
      { year: "2024", hires: 12 },
    ],
    selectionRatio: 8,
    avgPackage: 24.5,
    highestPackage: 38.0,
    minCGPA: 7.5,
    requiredSkills: ["DSA", "C#", ".NET", "Azure", "System Design"],
    visitProbability: 75,
    expectedHires2025: 13,
    expectedPackageRange: [22.0, 40.0],
  },
  {
    id: "amazon",
    name: "Amazon",
    sector: "IT",
    hiringDepartments: ["CSE", "IT", "ECE"],
    jobRoles: ["SDE-1", "Quality Assurance", "Operations Manager"],
    yearWiseHires: [
      { year: "2019", hires: 6 },
      { year: "2020", hires: 5 },
      { year: "2021", hires: 10 },
      { year: "2022", hires: 12 },
      { year: "2023", hires: 14 },
      { year: "2024", hires: 15 },
    ],
    selectionRatio: 10,
    avgPackage: 22.0,
    highestPackage: 35.0,
    minCGPA: 7.0,
    requiredSkills: ["DSA", "Java", "AWS", "System Design", "Leadership Principles"],
    visitProbability: 80,
    expectedHires2025: 16,
    expectedPackageRange: [20.0, 38.0],
  },
  {
    id: "wipro",
    name: "Wipro",
    sector: "IT",
    hiringDepartments: ["CSE", "IT", "ECE", "EE", "ME"],
    jobRoles: ["Project Engineer", "Software Developer", "Testing Engineer"],
    yearWiseHires: [
      { year: "2019", hires: 30 },
      { year: "2020", hires: 25 },
      { year: "2021", hires: 35 },
      { year: "2022", hires: 40 },
      { year: "2023", hires: 45 },
      { year: "2024", hires: 48 },
    ],
    selectionRatio: 35,
    avgPackage: 4.0,
    highestPackage: 6.5,
    minCGPA: 6.0,
    requiredSkills: ["Java", "SQL", "Testing", "Communication"],
    visitProbability: 96,
    expectedHires2025: 50,
    expectedPackageRange: [3.5, 7.0],
  },
  {
    id: "deloitte",
    name: "Deloitte",
    sector: "Consulting",
    hiringDepartments: ["CSE", "IT", "ME", "CE"],
    jobRoles: ["Analyst", "Consultant", "Technology Consultant"],
    yearWiseHires: [
      { year: "2019", hires: 15 },
      { year: "2020", hires: 12 },
      { year: "2021", hires: 18 },
      { year: "2022", hires: 22 },
      { year: "2023", hires: 25 },
      { year: "2024", hires: 28 },
    ],
    selectionRatio: 20,
    avgPackage: 7.5,
    highestPackage: 12.0,
    minCGPA: 7.0,
    requiredSkills: ["Analytical Thinking", "Excel", "SQL", "Communication", "Business Acumen"],
    visitProbability: 85,
    expectedHires2025: 30,
    expectedPackageRange: [7.0, 13.0],
  },
  {
    id: "accenture",
    name: "Accenture",
    sector: "Consulting",
    hiringDepartments: ["CSE", "IT", "ECE", "ME"],
    jobRoles: ["Associate Software Engineer", "Analyst", "Technology Architect"],
    yearWiseHires: [
      { year: "2019", hires: 28 },
      { year: "2020", hires: 22 },
      { year: "2021", hires: 32 },
      { year: "2022", hires: 36 },
      { year: "2023", hires: 40 },
      { year: "2024", hires: 42 },
    ],
    selectionRatio: 30,
    avgPackage: 5.0,
    highestPackage: 9.0,
    minCGPA: 6.5,
    requiredSkills: ["Java", "Cloud", "Agile", "Communication", "Problem Solving"],
    visitProbability: 92,
    expectedHires2025: 45,
    expectedPackageRange: [4.5, 10.0],
  },
  {
    id: "cognizant",
    name: "Cognizant",
    sector: "IT",
    hiringDepartments: ["CSE", "IT", "ECE"],
    jobRoles: ["Programmer Analyst", "Software Engineer", "QA Engineer"],
    yearWiseHires: [
      { year: "2019", hires: 22 },
      { year: "2020", hires: 18 },
      { year: "2021", hires: 25 },
      { year: "2022", hires: 30 },
      { year: "2023", hires: 32 },
      { year: "2024", hires: 35 },
    ],
    selectionRatio: 28,
    avgPackage: 4.8,
    highestPackage: 7.5,
    minCGPA: 6.0,
    requiredSkills: ["Java", "Python", "SQL", "Testing", "Agile"],
    visitProbability: 90,
    expectedHires2025: 38,
    expectedPackageRange: [4.0, 8.0],
  },
  {
    id: "goldmansachs",
    name: "Goldman Sachs",
    sector: "Finance",
    hiringDepartments: ["CSE", "IT"],
    jobRoles: ["Software Engineer", "Quantitative Analyst", "Risk Analyst"],
    yearWiseHires: [
      { year: "2019", hires: 2 },
      { year: "2020", hires: 1 },
      { year: "2021", hires: 3 },
      { year: "2022", hires: 4 },
      { year: "2023", hires: 4 },
      { year: "2024", hires: 5 },
    ],
    selectionRatio: 4,
    avgPackage: 28.0,
    highestPackage: 40.0,
    minCGPA: 8.0,
    requiredSkills: ["DSA", "Java", "Python", "Financial Modeling", "Statistics"],
    visitProbability: 60,
    expectedHires2025: 5,
    expectedPackageRange: [25.0, 42.0],
  },
  {
    id: "larsentoubro",
    name: "L&T",
    sector: "Core",
    hiringDepartments: ["ME", "CE", "EE"],
    jobRoles: ["Graduate Engineer Trainee", "Design Engineer", "Site Engineer"],
    yearWiseHires: [
      { year: "2019", hires: 18 },
      { year: "2020", hires: 12 },
      { year: "2021", hires: 15 },
      { year: "2022", hires: 14 },
      { year: "2023", hires: 12 },
      { year: "2024", hires: 10 },
    ],
    selectionRatio: 15,
    avgPackage: 5.5,
    highestPackage: 8.0,
    minCGPA: 6.5,
    requiredSkills: ["AutoCAD", "MATLAB", "Project Management", "Domain Knowledge"],
    visitProbability: 82,
    expectedHires2025: 11,
    expectedPackageRange: [5.0, 8.5],
  },
  {
    id: "razorpay",
    name: "Razorpay",
    sector: "Startup",
    hiringDepartments: ["CSE", "IT"],
    jobRoles: ["Backend Engineer", "Frontend Engineer", "DevOps Engineer"],
    yearWiseHires: [
      { year: "2021", hires: 3 },
      { year: "2022", hires: 5 },
      { year: "2023", hires: 7 },
      { year: "2024", hires: 10 },
    ],
    selectionRatio: 8,
    avgPackage: 18.0,
    highestPackage: 25.0,
    minCGPA: 7.5,
    requiredSkills: ["Go", "React", "AWS", "Microservices", "System Design"],
    visitProbability: 72,
    expectedHires2025: 12,
    expectedPackageRange: [16.0, 28.0],
  },
];

// ── Skill Demand Data ──
export interface SkillDemand {
  skill: string;
  demandCount: number;
  category: "programming" | "framework" | "soft" | "tool" | "domain";
  trend: "rising" | "stable" | "declining";
  companies: string[];
}

export const skillDemandData: SkillDemand[] = [
  { skill: "Java", demandCount: 9, category: "programming", trend: "stable", companies: ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Amazon", "Goldman Sachs", "Deloitte", "Microsoft"] },
  { skill: "Python", demandCount: 7, category: "programming", trend: "rising", companies: ["Google", "Infosys", "Amazon", "Cognizant", "Goldman Sachs", "Razorpay", "Microsoft"] },
  { skill: "DSA", demandCount: 5, category: "domain", trend: "rising", companies: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Razorpay"] },
  { skill: "SQL", demandCount: 6, category: "tool", trend: "stable", companies: ["TCS", "Wipro", "Deloitte", "Cognizant", "Infosys", "Goldman Sachs"] },
  { skill: "System Design", demandCount: 4, category: "domain", trend: "rising", companies: ["Google", "Microsoft", "Amazon", "Razorpay"] },
  { skill: "Communication", demandCount: 5, category: "soft", trend: "stable", companies: ["TCS", "Wipro", "Deloitte", "Accenture", "Infosys"] },
  { skill: "Cloud Computing", demandCount: 4, category: "framework", trend: "rising", companies: ["Infosys", "Google", "Amazon", "Accenture"] },
  { skill: "Problem Solving", demandCount: 3, category: "soft", trend: "stable", companies: ["TCS", "Accenture", "Deloitte"] },
  { skill: "React", demandCount: 3, category: "framework", trend: "rising", companies: ["Razorpay", "Microsoft", "Amazon"] },
  { skill: "Machine Learning", demandCount: 2, category: "domain", trend: "rising", companies: ["Google", "Microsoft"] },
  { skill: "C++", demandCount: 2, category: "programming", trend: "stable", companies: ["Google", "Goldman Sachs"] },
  { skill: "Go", demandCount: 1, category: "programming", trend: "rising", companies: ["Razorpay"] },
  { skill: "Agile", demandCount: 3, category: "framework", trend: "stable", companies: ["Infosys", "Cognizant", "Accenture"] },
  { skill: "AWS", demandCount: 3, category: "tool", trend: "rising", companies: ["Amazon", "Razorpay", "Accenture"] },
  { skill: "Microservices", demandCount: 2, category: "framework", trend: "rising", companies: ["Razorpay", "Amazon"] },
  { skill: "AutoCAD", demandCount: 1, category: "tool", trend: "declining", companies: ["L&T"] },
  { skill: "MATLAB", demandCount: 1, category: "tool", trend: "declining", companies: ["L&T"] },
];

// ── Department Prediction ──
export const departmentPrediction = [
  { department: "CSE", current: 97, predicted: 98, trend: "rising" as const },
  { department: "IT", current: 94, predicted: 96, trend: "rising" as const },
  { department: "ECE", current: 82, predicted: 84, trend: "rising" as const },
  { department: "CE", current: 69, predicted: 71, trend: "rising" as const },
  { department: "EE", current: 65, predicted: 66, trend: "stable" as const },
  { department: "ME", current: 65, predicted: 63, trend: "declining" as const },
];

// ── Hiring Heatmap Data (company x department) ──
export const hiringHeatmap = [
  { company: "TCS", CSE: 30, IT: 20, ECE: 20, EE: 15, ME: 0, CE: 0 },
  { company: "Infosys", CSE: 25, IT: 20, ECE: 17, EE: 0, ME: 0, CE: 0 },
  { company: "Wipro", CSE: 15, IT: 12, ECE: 10, EE: 6, ME: 5, CE: 0 },
  { company: "Google", CSE: 8, IT: 0, ECE: 0, EE: 0, ME: 0, CE: 0 },
  { company: "Microsoft", CSE: 8, IT: 4, ECE: 0, EE: 0, ME: 0, CE: 0 },
  { company: "Amazon", CSE: 8, IT: 4, ECE: 3, EE: 0, ME: 0, CE: 0 },
  { company: "Deloitte", CSE: 10, IT: 8, ECE: 0, EE: 0, ME: 5, CE: 5 },
  { company: "Accenture", CSE: 15, IT: 10, ECE: 8, EE: 0, ME: 9, CE: 0 },
  { company: "Goldman Sachs", CSE: 3, IT: 2, ECE: 0, EE: 0, ME: 0, CE: 0 },
  { company: "L&T", CSE: 0, IT: 0, ECE: 0, EE: 3, ME: 4, CE: 3 },
  { company: "Razorpay", CSE: 7, IT: 3, ECE: 0, EE: 0, ME: 0, CE: 0 },
];
