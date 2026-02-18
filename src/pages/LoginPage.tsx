import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { toast } from "sonner";
import { ShoppingCart, UserPlus, LogIn } from "lucide-react";

const LoginPage = () => {
  const [mode, setMode] = useState<"choose" | "login" | "signup">("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        await signup(email, password);
        toast.success("Account created successfully!");
      } else {
        await login(email, password);
        toast.success("Welcome back!");
      }
      navigate("/order");
    } catch (err: any) {
      toast.error(err.message?.replace("Firebase: ", "") || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    navigate("/order");
  };

  if (mode === "choose") {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card rounded-lg border shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <Link to="/">
              <img src={logo} alt="Curbside Produce" className="h-16 w-auto object-contain mb-4" />
            </Link>
            <h1 className="text-2xl font-bold text-foreground">Welcome</h1>
            <p className="text-sm text-muted-foreground mt-1">How would you like to continue?</p>
          </div>

          <div className="space-y-3">
            <Button onClick={handleGuest} variant="outline" className="w-full h-14 justify-start gap-3 text-base">
              <ShoppingCart className="h-5 w-5" />
              Continue as Guest
            </Button>
            <Button onClick={() => setMode("signup")} variant="outline" className="w-full h-14 justify-start gap-3 text-base">
              <UserPlus className="h-5 w-5" />
              Create Account
            </Button>
            <Button onClick={() => setMode("login")} className="w-full h-14 justify-start gap-3 text-base">
              <LogIn className="h-5 w-5" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card rounded-lg border shadow-lg p-8">
        <div className="flex flex-col items-center mb-8">
          <Link to="/">
            <img src={logo} alt="Curbside Produce" className="h-16 w-auto object-contain mb-4" />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {mode === "signup" ? "Create Account" : "Sign In"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signup" ? "Get started with your wholesale account" : "Access your wholesale ordering platform"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" required />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Password</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "signup" ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="mt-4 space-y-3 text-center text-sm text-muted-foreground">
          <div>
            {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => setMode(mode === "signup" ? "login" : "signup")} className="text-primary font-semibold hover:underline">
              {mode === "signup" ? "Sign In" : "Sign Up"}
            </button>
          </div>
          <button onClick={() => setMode("choose")} className="text-primary font-semibold hover:underline">
            ← Back to options
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
