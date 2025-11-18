"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  MessageSquare,
  ShoppingCart,
  HelpCircle,
  Bot,
  ChevronDown,
  ArrowRight,
  Zap,
  Clock,
  Users,
} from "lucide-react";

const HomePage = () => {
  const router = useRouter();
  const [showFeatures, setShowFeatures] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const features = [
    {
      icon: MessageSquare,
      title: "Customer Support",
      description:
        "Automate responses to common customer queries 24/7 with intelligent chatbots.",
      color: "text-primary",
    },
    {
      icon: ShoppingCart,
      title: "Order Taking",
      description:
        "Accept and process orders directly through WhatsApp with automated workflows.",
      color: "text-success",
    },
    {
      icon: HelpCircle,
      title: "FAQs & Quick Replies",
      description:
        "Set up instant responses for frequently asked questions to save time.",
      color: "text-warning",
    },
    {
      icon: Bot,
      title: "AI-Powered Replies",
      description:
        "Use advanced AI to generate natural, context-aware responses to customers.",
      color: "text-accent",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Bots" },
    { value: "1M+", label: "Messages Sent" },
    { value: "99.9%", label: "Uptime" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative min-h-[90vh] flex flex-col items-center justify-center px-4"
      >
        {/* Background decoration */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow rounded-full filter blur-3xl" />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-center z-10 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center z-20">
            <Image
              src="/logo.png"
              alt="OrderZap Logo"
              width={180}
              height={60}
              className="drop-shadow-xl"
              priority
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
            >
              <Zap className="h-4 w-4" />
              <span className="text-sm font-medium">
                Trusted by 10,000+ businesses
              </span>
            </motion.div>
          </div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold text-foreground mb-6"
          >
            Welcome to <span className="text-primary">OrderZap</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            The easiest way to create your own WhatsApp Bot in minutes.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => router.push("/auth")}
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 text-lg shadow-glow hover:shadow-glow-intense transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  setShowFeatures(true);
                  setTimeout(() => {
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }}
                className="px-8 py-6 text-lg border-2 hover:bg-primary/10"
              >
                Learn More
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-6"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <AnimatePresence>
        {showFeatures && (
          <motion.section
            id="features"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="py-20 px-4"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Why Choose <span className="text-primary">OrderZap</span>?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to automate your WhatsApp business
                communications
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className="h-full hover:shadow-card-hover transition-all duration-300 border-border hover:border-primary/50 group">
                    <CardHeader>
                      <motion.div
                        className={`inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 ${feature.color}`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <feature.icon className="h-8 w-8" />
                      </motion.div>
                      <CardTitle className="text-xl mt-4">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Benefits */}
            <motion.div variants={itemVariants} className="mt-20 text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <Clock className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">5-Minute Setup</h3>
                  <p className="text-muted-foreground">
                    Get your bot running in minutes, not hours
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    No Code Required
                  </h3>
                  <p className="text-muted-foreground">
                    Simple interface designed for everyone
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center"
                >
                  <Zap className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    Instant Deployment
                  </h3>
                  <p className="text-muted-foreground">
                    Go live with one click
                  </p>
                </motion.div>
              </div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => router.push("/auth")}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground px-12 py-6 text-lg shadow-glow hover:shadow-glow-intense transition-all duration-300"
                >
                  Start Building Your Bot
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
