import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const registeredEmails = ["student@college.edu", "admin@college.edu", "faculty@college.edu"];

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    // Simulate credential checks
    const emailLower = email.toLowerCase().trim();
    if (!registeredEmails.includes(emailLower)) {
      setErrors({ general: "This email is not registered. Please contact your placement cell." });
      return;
    }
    if (password !== "password123" && password !== "admin123") {
      setErrors({ general: "Incorrect password. Please try again." });
      return;
    }

    toast({ title: "Welcome back!", description: "You've been successfully logged in." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-secondary/20 mb-4">
            <GraduationCap className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold font-display text-primary-foreground">
            Placement Trend Organizer
          </h1>
          <p className="text-primary-foreground/60 mt-2">Analyze. Predict. Succeed.</p>
        </div>

        <Card className="shadow-elevated border-0">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold font-display text-center">Sign in to your account</h2>
            <p className="text-sm text-muted-foreground text-center">Use your college-provided credentials</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {errors.general && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">College Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@college.edu"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined, general: undefined })); }}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined, general: undefined })); }}
                    className={errors.password ? "border-destructive pr-10" : "pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground" disabled={loading}>
                {loading ? "Signing in..." : (
                  <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>
                )}
              </Button>

              <div className="text-xs text-center text-muted-foreground space-y-1">
                <p>Demo credentials: <strong>student@college.edu</strong> / <strong>password123</strong></p>
                <p className="text-muted-foreground/60">Any valid email is accepted</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
