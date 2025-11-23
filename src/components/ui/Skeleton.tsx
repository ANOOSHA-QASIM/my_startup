"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Skeleton loader component
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    // pulse animation + rounded + muted background
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
