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
import {
  Building2,
  Phone,
  Bot,
  Sparkles,
  List,
  Trash2,
  Plus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toasts";
import { firestore } from "@/../lib/firebaseClient";
import { collection, addDoc } from "firebase/firestore";

const BusinessSetup = () => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [botPurpose, setBotPurpose] = useState("");
  const [botCategory, setBotCategory] = useState("");
  const [itemType, setItemType] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [menuItems, setMenuItems] = useState([{ name: "", price: "" }]);
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Update item name or price
  const handleItemChange = (
    index: number,
    field: "name" | "price",
    value: string
  ) => {
    const newItems = [...menuItems];
    newItems[index][field] = value;
    setMenuItems(newItems);
  };

  // Add new item
  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: "", price: "" }]);
  };

  // Remove item
  const removeMenuItem = (index: number) => {
    const newItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(newItems);
  };

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

    try {
      // Generate unique bot data
      const botData = {
        botId:
          "BOT-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
        webhookUrl: `https://api.whatsappbot.com/webhook/${Math.random()
          .toString(36)
          .substring(2, 9)}`,
        botCategory,
      };

      // Save to Firestore
      const docRef = await addDoc(collection(firestore, "businesses"), {
        businessName,
        whatsappNumber,
        botPurpose,
        botCategory,
        itemType,
        otherDescription,
        menuItems,
        plan,
        botId: botData.botId,
        webhookUrl: botData.webhookUrl,
        createdAt: new Date(),
      });

      toast({
        title: "🎉 Bot Created!",
        description: "Your WhatsApp Bot has been saved successfully.",
      });

      router.push(`/bot-connection?businessId=${docRef.id}`);
    } catch (error: any) {
      console.error("Error creating bot:", error);
      toast({
        title: "Error",
        description: error.message || "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
              Business Setup
            </h1>
            <p className="text-muted-foreground">
              Configure your WhatsApp Bot for your business
            </p>
          </motion.div>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Bot Configuration</CardTitle>
              <CardDescription>
                Set up your automated WhatsApp assistant
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Name */}
                <div className="space-y-2">
                  <Label>
                    <Building2 className="inline h-4 w-4 mr-2" /> Business Name
                  </Label>
                  <Input
                    placeholder="Enter your business name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                  />
                </div>

                {/* WhatsApp Number */}
                <div className="space-y-2">
                  <Label>
                    <Phone className="inline h-4 w-4 mr-2" /> WhatsApp Number
                  </Label>
                  <Input
                    placeholder="+923001234567"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                  />
                </div>

                {/* Bot Purpose */}
                <div className="space-y-2">
                  <Label>
                    <Bot className="inline h-4 w-4 mr-2" /> Bot Purpose
                  </Label>
                  <Select value={botPurpose} onValueChange={setBotPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bot purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">
                        Customer Support
                      </SelectItem>
                      <SelectItem value="sales">
                        Sales & Lead Generation
                      </SelectItem>
                      <SelectItem value="appointments">
                        Appointment Booking
                      </SelectItem>
                      <SelectItem value="order-tracking">
                        Order Tracking
                      </SelectItem>
                      <SelectItem value="faq">FAQ & Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bot Category */}
                <div className="space-y-2">
                  <Label>
                    <Bot className="inline h-4 w-4 mr-2" /> Bot Category /
                    Business Type
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

                {/* Item Type */}
                <div className="space-y-2">
                  <Label>
                    <List className="inline h-4 w-4 mr-2" /> Item Type
                  </Label>
                  <Select value={itemType} onValueChange={setItemType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menu">Menu</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* If "Other" selected */}
                {itemType === "other" && (
                  <div className="space-y-2">
                    <Label>Describe your item type</Label>
                    <Input
                      placeholder="Enter your custom type"
                      value={otherDescription}
                      onChange={(e) => setOtherDescription(e.target.value)}
                    />
                  </div>
                )}

                {/* Menu Listing with Price */}
                <div className="space-y-3">
                  <Label>
                    <List className="inline h-4 w-4 mr-2" /> Items with Price
                  </Label>
                  {menuItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <Input
                        placeholder="Item name (e.g. Pizza)"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(index, "name", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Price (e.g. 500)"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(index, "price", e.target.value)
                        }
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeMenuItem(index)}
                        className="px-3"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addMenuItem}>
                    <Plus className="h-4 w-4 mr-2" /> Add Item
                  </Button>
                </div>

                {/* Plan */}
                <div className="space-y-3">
                  <Label>
                    <Sparkles className="inline h-4 w-4 mr-2" /> Select Plan
                  </Label>
                  <RadioGroup value={plan} onValueChange={setPlan}>
                    {[
                      {
                        id: "free",
                        title: "Free Plan",
                        desc: "100 messages/month",
                      },
                      {
                        id: "paid",
                        title: "Paid Plan",
                        desc: "Unlimited messages",
                      },
                      {
                        id: "premium",
                        title: "Premium Plan",
                        desc: "AI-powered replies",
                      },
                    ].map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-card-hover"
                      >
                        <RadioGroupItem value={p.id} id={p.id} />
                        <Label htmlFor={p.id} className="cursor-pointer flex-1">
                          <span className="font-medium">{p.title}</span>
                          <span className="block text-sm text-muted-foreground">
                            {p.desc}
                          </span>
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
