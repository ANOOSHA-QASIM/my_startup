"use client"; // client component

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const demoMessages = [
    { sender: "user", text: "Hi, what are your business hours?" },
    { sender: "bot", text: "Hello! We're open Monday-Friday, 9 AM to 6 PM. How can I help you today?" },
    { sender: "user", text: "Do you offer 24/7 support?" },
    { sender: "bot", text: "Yes! Our AI-powered bot is available 24/7 to answer your questions instantly." },
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </motion.button>
      </motion.div>

      {/* Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96"
          >
            <Card className="shadow-lg overflow-hidden">
              <div className="bg-primary text-primary-foreground p-4">
                <h3 className="font-semibold text-lg">Chat Demo</h3>
                <p className="text-xs opacity-90">See how OrderZap bot responds</p>
              </div>
              
              <div className="p-4 space-y-3 max-h-80 overflow-y-auto bg-background">
                {demoMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-card border-t border-border">
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  Close Demo
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChat;
