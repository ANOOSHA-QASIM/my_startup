"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/CustomButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import Sidebar from "@/components/Sidebar";
import { Link2, Copy, CheckCircle, Smartphone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toasts";
import { firestore } from "@/../lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";

export default function BotConnection() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [botId, setBotId] = useState(""); 
  const [webhookUrl, setWebhookUrl] = useState("");
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const router = useRouter();

  // ✅ Fetch botId & webhookUrl dynamically using businessId from query
  useEffect(() => {
    const businessId = searchParams.get("businessId");
    if (!businessId) {
      toast({
        title: "Error",
        description: "No business selected. Go back to setup page.",
      });
      return;
    }

    const fetchBotData = async () => {
      try {
        const docRef = doc(firestore, "businesses", businessId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBotId(data.botId);
          setWebhookUrl(data.webhookUrl);
          console.log("Dynamic botId loaded:", data.botId);
        } else {
          toast({ title: "Error", description: "Business document not found." });
        }
      } catch (error) {
        console.error("Error fetching bot data:", error);
      }
    };

    fetchBotData();
  }, [searchParams, toast]);

  // ✅ Connect button triggers n8n webhook
  const handleConnect = async () => {
    if (!botId || !webhookUrl) {
      toast({
        title: "Error",
        description: "Bot data not loaded yet, try again.",
      });
      return;
    }

    setIsConnecting(true);

    try {
      const res = await fetch("/api/send-botId", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId, webhookUrl }),
      });

      const data = await res.json();
      console.log("Webhook response via API:", data);

      if (res.ok) {
        setIsConnected(true);
        toast({ title: "Bot Connected!", description: "Your WhatsApp bot is now active" });
      } else {
        throw new Error(data.error || "Connection failed");
      }
    } catch (error: any) {
      console.error("Error connecting bot:", error);
      toast({ title: "Connection Failed", description: error.message || "Try again." });
    } finally {
      setIsConnecting(false);
    }
  };

  // ✅ Copy webhook URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({ title: "Copied!", description: "Webhook URL copied to clipboard" });
  };

  // Framer Motion Variants
  const cardVariants: Variants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    hover: { scale: 1.02, transition: { type: "spring", stiffness: 400 } },
  };

  const stepVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.2, type: "spring", stiffness: 100 },
    }),
  };

  const steps = [
    { icon: Smartphone, title: "Open WhatsApp Business", description: "Open WhatsApp Business app on your phone" },
    { icon: Link2, title: "Link Device", description: "Go to Settings → Linked Devices → Link a Device" },
    { icon: MessageCircle, title: "Scan QR Code", description: "Scan the QR code shown below to connect" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Sidebar />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-20 lg:ml-64 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Bot Connection</h1>
            <p className="text-muted-foreground">Connect your WhatsApp Business account to the bot</p>
          </motion.div>

          {/* Webhook Card */}
          {webhookUrl && (
            <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Webhook Configuration</CardTitle>
                  <CardDescription>Use this webhook URL in your WhatsApp Business API settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-secondary rounded-lg flex justify-between items-center">
                    <code className="font-mono text-sm break-all flex-1">{webhookUrl}</code>
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Connection Steps */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Connection Steps</CardTitle>
              <CardDescription>Follow these steps to connect your WhatsApp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-card-hover transition-colors"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* QR Code & Connect Button */}
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <CardTitle>QR Code</CardTitle>
                <CardDescription>Scan this code with WhatsApp Business</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <motion.div
                  animate={isConnecting ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: isConnecting ? Infinity : 0, ease: "linear" }}
                  className="w-48 h-48 bg-gradient-subtle rounded-lg flex items-center justify-center border-2 border-primary"
                >
                  {isConnected ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
                      <CheckCircle className="h-24 w-24 text-success" />
                    </motion.div>
                  ) : (
                    <div className="text-center">
                      <MessageCircle className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">QR Code will appear here</p>
                    </div>
                  )}
                </motion.div>

                <Button
                  variant={isConnected ? "secondary" : "whatsapp"}
                  size="lg"
                  onClick={handleConnect}
                  disabled={isConnecting || isConnected}
                  className="min-w-[200px]"
                >
                  {isConnecting ? (
                    <span className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Link2 className="h-4 w-4" />
                      </motion.div>
                      Connecting...
                    </span>
                  ) : isConnected ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />Connected
                    </span>
                  ) : (
                    "Connect Bot"
                  )}
                </Button>

                {isConnected && (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-success font-medium">
                    Your WhatsApp Bot is active and ready to respond!
                  </motion.p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
