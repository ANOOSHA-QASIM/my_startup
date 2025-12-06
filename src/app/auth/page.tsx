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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { MessageCircle, Bot, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toasts";
import { useSignIn, useSignUp } from "@clerk/nextjs";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { toast } = useToast();

  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  // Validation
  const validateSignup = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!signupEmail) newErrors.signupEmail = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signupEmail))
      newErrors.signupEmail = "Invalid email format";
    if (!signupPassword) newErrors.signupPassword = "Password is required";
    else if (signupPassword.length < 6)
      newErrors.signupPassword = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm password";
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

  // Email Signup
  const handleSignup = async () => {
    if (!validateSignup()) return;
    if (!signUpLoaded) return;

    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: signupEmail,
        password: signupPassword,
        firstName,
        lastName,
      });

      // Send verification code
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
        // add redirect URL required by Clerk
      });

      // Save user locally
      localStorage.setItem(
        "user",
        JSON.stringify({ name: firstName + " " + lastName })
      );

      toast({
        title: "Verify your email ✉️",
        description: "We’ve sent you a verification code.",
      });

      router.push("/verify-email");
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description: err.errors?.[0]?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Email Login
  const handleLogin = async () => {
    if (!validateLogin()) return;
    if (!signInLoaded) return;

    setIsLoading(true);
    try {
      const result = await signIn.create({
        identifier: loginEmail,
        password: loginPassword,
      });

      if (result.status === "complete") {
        localStorage.setItem("user", JSON.stringify({ name: loginEmail }));
        toast({
          title: "Welcome back! 👋",
          description: "You’ve successfully logged in.",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Verification needed",
          description: "Please verify your email.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.errors?.[0]?.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Google OAuth Login/Signup
  const handleGoogleAuth = async (mode: "login" | "signup") => {
    try {
      const redirectUrl = "/dashboard";
      const redirectUrlComplete = "/dashboard";

      if (mode === "login" && signInLoaded) {
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl,
          redirectUrlComplete,
        });
      } else if (mode === "signup" && signUpLoaded) {
        await signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl,
          redirectUrlComplete,
        });
      }
    } catch (error: any) {
      toast({
        title: "Google Auth failed",
        description: error.errors?.[0]?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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
      {/* Background Icons */}
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
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-16 w-16 text-primary/10" />
        </motion.div>
      </motion.div>

      {/* Auth Card */}
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
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-background data-[state=active]:text-primary"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-background data-[state=active]:text-primary"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN FORM */}
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
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full" variant="gradient">
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>

                    <Button
                      type="button"
                      className="w-full mt-3 bg-white border text-black hover:bg-gray-100"
                      onClick={() => handleGoogleAuth("login")}
                    >
                      Continue with Google
                    </Button>
                  </motion.form>
                </TabsContent>

                {/* SIGNUP FORM */}
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
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <Label>First Name</Label>
                        <Input
                          type="text"
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="w-1/2">
                        <Label>Last Name</Label>
                        <Input
                          type="text"
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Create a password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm Password</Label>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>

                    <Button type="submit" className="w-full" variant="gradient">
                      {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>

                    <Button
                      type="button"
                      className="w-full mt-3 bg-white border text-black hover:bg-gray-100"
                      onClick={() => handleGoogleAuth("signup")}
                    >
                      Sign up with Google
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
