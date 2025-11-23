"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordian";
import {
  HelpCircle,
  Bot,
  Link,
  Settings,
  RefreshCw,
  Shield,
  MessageSquare,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const FAQ = () => {
  const router = useRouter();

  const faqs = [
    {
      icon: HelpCircle,
      question: "What is this WhatsApp Bot and how does it work?",
      answer:
        "Our WhatsApp Bot is an automated messaging platform that helps businesses interact with customers 24/7. It uses AI and pre-configured responses to handle customer inquiries, take orders, provide support, and more. Simply connect your WhatsApp Business number, configure your bot's purpose, and start automating your customer interactions.",
    },
    {
      icon: Link,
      question: "How do I connect my WhatsApp number to the bot?",
      answer:
        "After creating your bot in the Business Setup page, you'll receive a Bot ID and Webhook URL. Navigate to the Bot Connection page where you'll find step-by-step instructions to connect your WhatsApp Business Account using the provided credentials. The setup typically takes 5-10 minutes.",
    },
    {
      icon: Bot,
      question: "What bot categories can I choose from?",
      answer:
        "We offer various bot categories including Business Support Bot, Restaurant Bot, Real Estate Bot, Healthcare Bot, Education Bot, and Freelancing Bot. Each category comes with pre-built templates and responses tailored to your industry needs.",
    },
    {
      icon: RefreshCw,
      question: "Can I change my bot category later?",
      answer:
        "Yes! Your bot configuration is flexible. You can change the bot category, purpose, and settings whenever needed through the Business Setup page. Changes take effect immediately after saving, and you won't lose any of your existing data.",
    },
    {
      icon: MessageSquare,
      question: "What is the difference between Free, Paid, and Premium plans?",
      answer:
        "Free plan includes 100 messages per month with basic automation. Paid plan offers unlimited messages, priority support, and advanced customization for $29/month. Premium plan includes everything in Paid plus AI-powered responses, sentiment analysis, and multi-language support for $99/month.",
    },
    {
      icon: Shield,
      question: "How secure is my data with this bot?",
      answer:
        "We take security seriously. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. Your WhatsApp credentials, customer data, and business information are stored securely on protected servers and never shared with third parties. We comply with GDPR and industry-standard security practices.",
    },
    {
      icon: Settings,
      question: "Can I customize the bot responses?",
      answer:
        "Absolutely! You can fully customize your bot's responses, greetings, and conversation flows from the Business Setup page. Premium plan users also get access to AI-powered dynamic responses that adapt to customer queries in real-time.",
    },
    {
      icon: MessageSquare,
      question: "How many messages can the bot handle per day?",
      answer:
        "The bot can handle unlimited simultaneous conversations. Free plan users get 100 messages per month (about 3-4 messages per day). Paid and Premium plans offer unlimited messages with no daily or monthly caps, capable of handling thousands of conversations simultaneously.",
    },
    {
      icon: Users,
      question: "Does the bot support multiple WhatsApp numbers?",
      answer:
        "Yes! Each bot instance is tied to one WhatsApp Business number, but you can create multiple bots under your account. Paid plan allows up to 3 WhatsApp numbers, and Premium plan supports unlimited numbers, perfect for businesses with multiple departments or locations.",
    },
    {
      icon: RefreshCw,
      question: "What should I do if the bot stops responding?",
      answer:
        "First, check your Bot Connection page to ensure your WhatsApp number is still properly connected. Verify that your webhook URL is active and your subscription is current. If issues persist, restart your bot from the Dashboard. For continued problems, contact our support team immediately.",
    },
    {
      icon: HelpCircle,
      question: "How do I contact support if I face an issue?",
      answer:
        "You can reach our support team via email at anushatech333@gmail.com or WhatsApp at +92 319 2955162. Premium users get priority support with response times under 2 hours. You can also visit our Contact page to submit a detailed support request.",
    },
    {
      icon: MessageSquare,
      question: "Is there a trial period for the Paid or Premium plan?",
      answer:
        "Yes! We offer a 14-day free trial for both Paid and Premium plans. No credit card required to start your trial. You'll have full access to all features during the trial period, and you can cancel anytime before the trial ends without any charges.",
    },
    {
      icon: Link,
      question:
        "Can I integrate this bot with other platforms like Shopify or website chat?",
      answer:
        "Yes! Premium plan includes integration capabilities with popular platforms like Shopify, WooCommerce, WordPress, and custom website chat widgets. We provide API access and webhooks for custom integrations. Our support team can help you set up integrations specific to your business needs.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ml-20 lg:ml-64 p-6"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">
              Find answers to common questions about your WhatsApp bot
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Common Questions</CardTitle>
                <CardDescription>
                  Everything you need to know about setting up and using your
                  WhatsApp bot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => {
                    const Icon = faq.icon;
                    return (
                      <motion.div key={index} variants={itemVariants}>
                        <AccordionItem
                          value={`item-${index}`}
                          className="border-b last:border-0"
                        >
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3 text-left">
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <span className="font-medium">
                                {faq.question}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pl-13 pr-4 pt-2">
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="text-muted-foreground leading-relaxed"
                            >
                              {faq.answer}
                            </motion.p>
                          </AccordionContent>
                        </AccordionItem>
                      </motion.div>
                    );
                  })}
                </Accordion>
              </CardContent>
            </Card>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <Card className="shadow-card bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="pt-6">
                  <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Can't find the answer you're looking for? Our support team
                    is here to help.
                  </p>
                  <Button
                    onClick={() => router.push("/contact")}
                    className="px-6 py-2"
                  >
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default FAQ;
