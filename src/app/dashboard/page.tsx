"use client";
import { useUser } from "@clerk/nextjs"; // ✅ Clerk hook
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Activity,
  CheckCircle,
  Users,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Plus,
  CreditCard,
  BarChart3,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface BotStatus {
  isActive: boolean;
  messagesHandled: number;
  activeConversations: number;
  totalCustomers: number;
  responseTime: string;
  uptime: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { user } = useUser(); // ✅ Clerk user data
  const [botStatus, setBotStatus] = useState<BotStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    fetchBotStatus();

    // ✅ Clerk user data ya localStorage data
    if (user) {
      setUserName(user.firstName || user.fullName || user.emailAddresses[0]?.emailAddress.split("@")[0]);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: user.firstName || user.fullName || "User" })
      );
    } else {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        setUserName(JSON.parse(localUser).name);
      }
    }
  }, [user]);

  // ✅ Dummy API
  const fetchBotStatus = async () => {
    setTimeout(() => {
      setBotStatus({
        isActive: true,
        messagesHandled: 1247,
        activeConversations: 23,
        totalCustomers: 458,
        responseTime: "< 1 sec",
        uptime: "99.9%",
      });
      setLoading(false);
    }, 1000);
  };


  // ✅ Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 100 },
    },
    hover: {
      scale: 1.05,
      transition: { type: "spring" as const, stiffness: 400 },
    },
  };

  const stats = [
    {
      title: "Bot Status",
      value: botStatus?.isActive ? "Active" : "Inactive",
      icon: Activity,
      color: botStatus?.isActive ? "text-success" : "text-destructive",
    },
    {
      title: "Messages Handled",
      value: botStatus?.messagesHandled || 0,
      icon: MessageSquare,
      color: "text-primary0",
    },
    {
      title: "Active Conversations",
      value: botStatus?.activeConversations || 0,
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Total Customers",
      value: botStatus?.totalCustomers || 0,
      icon: Users,
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-20 lg:ml-64 p-6"
      >
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome, {userName} 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what you can do with OrderZap
            </p>
          </motion.div>

          {/* Quick Action Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            {/* Create New Bot */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card
                className="cursor-pointer hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/50"
                onClick={() => router.push("/business-setup")}
              >
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className="mx-auto mb-4 p-4 rounded-full bg-primary/10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Plus className="h-8 w-8 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl">Create New Bot</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Set up a new WhatsApp bot for your business in minutes
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* Manage Subscription */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card
                className="cursor-pointer hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/50"
                onClick={() => router.push("/plans")}
              >
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className="mx-auto mb-4 p-4 rounded-full bg-primary/10"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CreditCard className="h-8 w-8 text-primary" />
                  </motion.div>
                  <CardTitle className="text-xl">
                    Manage Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    View and upgrade your current plan to unlock more features
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            {/* View Analytics */}
            <motion.div variants={cardVariants} whileHover="hover">
              <Card className="cursor-pointer hover:shadow-card-hover transition-all duration-300 border-2 hover:border-primary/50 opacity-75">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className="mx-auto mb-4 p-4 rounded-full bg-muted"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BarChart3 className="h-8 w-8 text-muted-foreground" />
                  </motion.div>
                  <CardTitle className="text-xl">View Analytics</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription>
                    Coming soon - Track your bot performance and insights
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Dashboard Stats */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Dashboard Overview
            </h2>
            <p className="text-muted-foreground">
              Monitor your WhatsApp Bot performance in real-time
            </p>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center h-64"
            >
              <div className="animate-pulse">
                <Activity className="h-12 w-12 text-primary" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.title}
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="shadow-card hover:shadow-glow transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bottom Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Performance Metrics */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Real-time bot performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Response Time
                  </span>
                  <span className="text-sm font-medium">
                    {botStatus?.responseTime || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Uptime</span>
                  <span className="text-sm font-medium">
                    {botStatus?.uptime || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className="flex items-center gap-2">
                    {botStatus?.isActive ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium">
                      {botStatus?.isActive ? "Running" : "Stopped"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your bot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-gradient-primary text-primary-foreground rounded-lg shadow-elegant hover:shadow-glow transition-all"
                >
                  Configure Auto-Reply
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all"
                >
                  View Analytics
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-all"
                >
                  Download Reports
                </motion.button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default Dashboard;
