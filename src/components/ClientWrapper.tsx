"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/Tooltip";
import FloatingChat from "./FloatingChat";
import { Toaster } from "./ui/Toaster";
import { Toaster as Sonner } from "./ui/Sonner";

const queryClient = new QueryClient();

export default function ClientWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FloatingChat />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
