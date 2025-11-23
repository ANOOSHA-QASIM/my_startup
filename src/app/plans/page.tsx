"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/CustomButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Check, Sparkles, Zap, Crown, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toasts";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // available plan data
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      period: "/month",
      icon: Sparkles,
      color: "border-muted",
      features: [
        "100 messages per month",
        "Basic auto-reply",
        "1 WhatsApp number",
        "Email support",
        "Basic analytics",
      ],
      popular: false,
    },
    {
      id: "paid",
      name: "Professional",
      price: "$29",
      period: "/month",
      icon: Zap,
      color: "border-primary shadow-glow",
      features: [
        "Unlimited messages",
        "Advanced auto-reply",
        "5 WhatsApp numbers",
        "Priority support",
        "Advanced analytics",
        "Custom workflows",
        "API access",
      ],
      popular: true,
    },
    {
      id: "premium",
      name: "Enterprise",
      price: "$99",
      period: "/month",
      icon: Crown,
      color: "border-primary-glow",
      features: [
        "Everything in Professional",
        "AI-powered responses",
        "Unlimited numbers",
        "24/7 phone support",
        "Custom integrations",
        "White-label option",
        "Dedicated account manager",
        "SLA guarantee",
      ],
      popular: false,
    },
  ];

  const handlePurchase = async (planId: string) => {
    setSelectedPlan(planId);
    setIsProcessing(true);

    try {
      // dummy API call
      await fetch("https://dummyapi.com/payment/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId }),
      });

      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Payment Successful!",
          description: `You've been upgraded to the ${
            plans.find((p) => p.id === planId)?.name
          } plan`,
        });
      }, 2000);
    } catch {
      setIsProcessing(false);
      toast({
        title: "Payment Failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ml-20 lg:ml-64 p-6"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-3">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground">
              Select the perfect plan for your business needs
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { type: "spring" as const, stiffness: 300 },
                }}
              >
                <Card
                  className={`relative h-full ${plan.color} transition-all hover:shadow-glow`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-gradient-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8 pt-8">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="mx-auto mb-4"
                    >
                      <plan.icon className="h-12 w-12 text-primary" />
                    </motion.div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <Check className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <Button
                      variant={plan.popular ? "gradient" : "outline"}
                      className="w-full"
                      onClick={() => handlePurchase(plan.id)}
                      disabled={isProcessing && selectedPlan === plan.id}
                    >
                      {isProcessing && selectedPlan === plan.id ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <CreditCard className="h-4 w-4" />
                          </motion.div>
                          Processing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          {plan.id === "free" ? "Get Started" : "Buy Now"}
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Card className="shadow-card max-w-2xl mx-auto">
              <CardContent className="py-6">
                <h3 className="text-lg font-semibold mb-2">
                  Need a custom plan?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Contact our sales team for enterprise solutions tailored to
                  your needs
                </p>
                <Button variant="secondary">Contact Sales</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Plans;
