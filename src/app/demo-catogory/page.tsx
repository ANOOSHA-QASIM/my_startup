"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { ArrowLeft, Bot } from "lucide-react";

const DemoCategory = () => {
  const router = useRouter();
  const params = useParams(); // get URL params

  const category = params?.category as string;

  const categoryInfo: Record<
    string,
    { title: string; icon: string; description: string }
  > = {
    "business-support": {
      title: "Business Support Bot",
      icon: "💼",
      description:
        "Automate customer inquiries, provide instant support, and handle FAQs 24/7.",
    },
    restaurant: {
      title: "Restaurant Bot",
      icon: "🍔",
      description:
        "Take orders, manage reservations, and share menu updates instantly.",
    },
    "real-estate": {
      title: "Real Estate Bot",
      icon: "🏠",
      description:
        "Schedule property viewings, answer queries, and share listings automatically.",
    },
    healthcare: {
      title: "Healthcare Bot",
      icon: "⚕️",
      description:
        "Book appointments, send reminders, and provide health information.",
    },
    education: {
      title: "Education Bot",
      icon: "📚",
      description:
        "Share course details, handle admissions, and support student queries.",
    },
    freelancing: {
      title: "Freelancing Bot",
      icon: "💻",
      description:
        "Manage project inquiries, schedule meetings, and share portfolio details.",
    },
  };

  const info =
    categoryInfo[category] || {
      title: "Bot Demo",
      icon: "🤖",
      description: "This bot category is coming soon!",
    };

  return (
    <div className="min-h-screen bg-gradient-subtle py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-card-hover">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="text-6xl mb-4"
            >
              {info.icon}
            </motion.div>
            <CardTitle className="text-3xl">{info.title}</CardTitle>
            <CardDescription className="text-lg mt-2">
              {info.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-secondary p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <Bot className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Demo Preview</h3>
                  <p className="text-muted-foreground mb-4">
                    This is a placeholder for the {info.title} demo. In the full
                    version, you'll be able to interact with a live bot
                    simulation here.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">✅ Features included:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Automated responses to common questions</li>
                      <li>24/7 availability</li>
                      <li>Easy integration with WhatsApp</li>
                      <li>Customizable templates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="default"
                className="flex-1"
                onClick={() => router.push("/auth")}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push("/demo-chat")}
              >
                Try Chat Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DemoCategory;
