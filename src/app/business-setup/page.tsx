"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/CustomButton";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Building2, Phone, Bot, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toasts";

const BusinessSetup = () => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [botPurpose, setBotPurpose] = useState("");
  const [botCategory, setBotCategory] = useState(""); // ✅ Add Bot Category
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!businessName || !whatsappNumber || !botPurpose || !botCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // ✅ Simulate API / n8n webhook
    setTimeout(() => {
      const botData = {
        botId: "BOT-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        webhookUrl: `https://api.whatsappbot.com/webhook/${Math.random()
          .toString(36)
          .substring(2, 9)}`,
        botCategory, // ✅ Pass category
      };
      setLoading(false);

      toast({
        title: "🎉 Bot Created!",
        description: "Now connect it with WhatsApp",
      });

      // ✅ Redirect with botData as query params
      router.push(
        `/bot-connection?botId=${botData.botId}&webhookUrl=${botData.webhookUrl}&botCategory=${botData.botCategory}`
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-20 lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Business Setup</h1>
            <p className="text-muted-foreground">
              Configure your WhatsApp Bot for your business
            </p>
          </motion.div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Bot Configuration</CardTitle>
              <CardDescription>Set up your automated WhatsApp assistant</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <Label htmlFor="business-name">
                    <Building2 className="inline h-4 w-4 mr-2" />
                    Business Name
                  </Label>
                  <Input
                    id="business-name"
                    placeholder="Enter your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-number">
                    <Phone className="inline h-4 w-4 mr-2" />
                    WhatsApp Number
                  </Label>
                  <Input
                    id="whatsapp-number"
                    placeholder="+1234567890"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                  />
                </div>

                {/* Bot Purpose */}
                <div className="space-y-2">
                  <Label htmlFor="bot-purpose">
                    <Bot className="inline h-4 w-4 mr-2" />
                    Bot Purpose
                  </Label>
                  <Select value={botPurpose} onValueChange={setBotPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bot purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales & Lead Generation</SelectItem>
                      <SelectItem value="appointments">Appointment Booking</SelectItem>
                      <SelectItem value="order-tracking">Order Tracking</SelectItem>
                      <SelectItem value="faq">FAQ & Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* ✅ Bot Category */}
                <div className="space-y-2">
                  <Label htmlFor="bot-category">
                    <Bot className="inline h-4 w-4 mr-2" />
                    Bot Category / Business Type
                  </Label>
                  <Select value={botCategory} onValueChange={setBotCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bot category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="e-commerce">E-Commerce</SelectItem>
                      <SelectItem value="retail">Retail Store</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Plan */}
                <div className="space-y-3">
                  <Label>
                    <Sparkles className="inline h-4 w-4 mr-2" />
                    Select Plan
                  </Label>
                  <RadioGroup value={plan} onValueChange={setPlan}>
                    {[
                      { id: "free", title: "Free Plan", desc: "100 messages/month" },
                      { id: "paid", title: "Paid Plan", desc: "Unlimited messages" },
                      { id: "premium", title: "Premium Plan", desc: "AI-powered replies" },
                    ].map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-card-hover"
                      >
                        <RadioGroupItem value={p.id} id={p.id} />
                        <Label htmlFor={p.id} className="cursor-pointer flex-1">
                          <span className="font-medium">{p.title}</span>
                          <span className="block text-sm text-muted-foreground">{p.desc}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  variant="gradient"
                  disabled={loading}
                >
                  {loading ? "Creating Bot..." : "Create WhatsApp Bot"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.main>
    </div>
  );
};

export default BusinessSetup;
