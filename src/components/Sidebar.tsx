"use client"; // client component

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Link2,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Bot,
  HelpCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/CustomButton";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Building2, label: "Business Setup", path: "/business-setup" },
    { icon: Link2, label: "Bot Connection", path: "/bot-connection" },
    { icon: CreditCard, label: "Plans & Pricing", path: "/plans" },
    { icon: MessageSquare, label: "Demo Chat", path: "/demo-chat" },
    { icon: HelpCircle, label: "FAQ", path: "/faq" },
    { icon: Mail, label: "Contact", path: "/contact" },
  ];

  const handleLogout = () => router.push("/"); // logout redirect

  const sidebarVariants: Variants = {
    open: { width: "256px", transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { width: "80px", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const itemVariants: Variants = { open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } };

  return (
    <>
      <motion.aside
        variants={sidebarVariants}
        initial="open"
        animate={isOpen ? "open" : "closed"}
        className="bg-primary text-primary-foreground h-screen fixed left-0 top-0 z-40 shadow-glow"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center gap-2"
                >
                  <Bot className="h-8 w-8" />
                  <span className="font-bold text-lg">OrderZap</span>
                </motion.div>
              )}
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary-foreground hover:bg-primary-glow"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-primary-glow",
                      pathname === item.path && "bg-primary-glow"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <AnimatePresence>
                      {isOpen && (
                        <motion.span
                          variants={itemVariants}
                          initial="closed"
                          animate="open"
                          exit="closed"
                          className="text-sm font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="w-full justify-start text-primary-foreground hover:bg-primary-glow"
            >
              <LogOut className="h-5 w-5" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    className="ml-3"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
