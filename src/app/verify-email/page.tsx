"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toasts";

// 🟢 Clerk import
import { useSignUp } from "@clerk/nextjs";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const { signUp, isLoaded } = useSignUp();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Safe check for Clerk hooks
    if (!isLoaded || !signUp) return;

    setIsVerifying(true);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        toast({
          title: "✅ Email Verified!",
          description: "Your account has been successfully created.",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Verification Pending",
          description: "Please check your email and try again.",
        });
      }
    } catch (err: any) {
      toast({
        title: "Verification Failed ❌",
        description: err.errors?.[0]?.message || "Invalid code. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (!isLoaded || !signUp) return;

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      toast({
        title: "Code Resent ✉️",
        description: "Check your inbox again!",
      });
    } catch {
      toast({
        title: "Failed to resend code",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4 relative overflow-hidden">
      {/* 🌟 Floating Icon */}
      <motion.div
        className="absolute top-10 right-10"
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="h-16 w-16 text-primary/10" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-10"
      >
        <Card className="shadow-xl border border-border/50 bg-card/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-primary">
              Verify Your Email ✉️
            </CardTitle>
            <CardDescription>
              Enter the 6-digit code we sent to your email
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter your code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="text-center tracking-widest text-lg"
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                variant="gradient"
                disabled={isVerifying}
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground mt-4">
              Didn’t receive the code?{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={handleResend}
              >
                Resend
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
