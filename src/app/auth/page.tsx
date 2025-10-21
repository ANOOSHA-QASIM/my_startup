"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/Tabs";
import { MessageCircle, Bot, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toasts";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { toast } = useToast();

  // ✅ Validation Helpers
  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!signupEmail) newErrors.signupEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupEmail))
      newErrors.signupEmail = "Invalid email format";
    if (!signupPassword) newErrors.signupPassword = "Password is required";
    else if (signupPassword.length < 6)
      newErrors.signupPassword = "Password must be at least 6 characters";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please confirm password";
    else if (signupPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};
    if (!loginEmail) newErrors.loginEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(loginEmail))
      newErrors.loginEmail = "Invalid email format";
    if (!loginPassword) newErrors.loginPassword = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Signup Logic
  const handleSignup = async () => {
    if (!validateSignup()) return;
    setIsLoading(true);
    try {
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify({ email: signupEmail }));
        toast({
          title: "Account created!",
          description: "Welcome to OrderZap",
        });
        router.push("/dashboard");
      }, 1500);
    } catch {
      toast({
        title: "Signup failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Login Logic
  const handleLogin = async () => {
    if (!validateLogin()) return;
    setIsLoading(true);
    try {
      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify({ email: loginEmail }));
        toast({
          title: "Welcome back!",
          description: "Successfully logged in",
        });
        router.push("/dashboard");
      }, 1500);
    } catch {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌟 Floating Icons Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-10 left-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <MessageCircle className="h-20 w-20 text-primary/10" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Bot className="h-24 w-24 text-primary/10" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles className="h-16 w-16 text-primary/10" />
        </motion.div>
      </motion.div>

      {/* 💫 Auth Card */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">OrderZap</h1>
          <p className="text-muted-foreground">
            Automate your business conversations
          </p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="shadow-xl border border-border/50 bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground">
                Welcome
              </CardTitle>
              <CardDescription>
                Sign in to your account or create a new one
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/50 rounded-lg mb-4">
                  <TabsTrigger value="login" className="data-[state=active]:bg-background data-[state=active]:text-primary">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="data-[state=active]:bg-background data-[state=active]:text-primary">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* 🔐 Login Form */}
                <TabsContent value="login">
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleLogin();
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className={errors.loginEmail ? "border-destructive" : ""}
                      />
                      {errors.loginEmail && (
                        <p className="text-sm text-destructive">
                          {errors.loginEmail}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className={errors.loginPassword ? "border-destructive" : ""}
                      />
                      {errors.loginPassword && (
                        <p className="text-sm text-destructive">
                          {errors.loginPassword}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      variant="gradient"
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                  </motion.form>
                </TabsContent>

                {/* 🧾 Signup Form */}
                <TabsContent value="signup">
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSignup();
                    }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className={errors.signupEmail ? "border-destructive" : ""}
                      />
                      {errors.signupEmail && (
                        <p className="text-sm text-destructive">
                          {errors.signupEmail}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className={errors.signupPassword ? "border-destructive" : ""}
                      />
                      {errors.signupPassword && (
                        <p className="text-sm text-destructive">
                          {errors.signupPassword}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={errors.confirmPassword ? "border-destructive" : ""}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      variant="gradient"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                  </motion.form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
