"use client"; // client

import * as React from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

// skeleton
export const SidebarMenuSkeleton = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { showIcon?: boolean }>(
  ({ className, showIcon = false, ...props }, ref) => {
    const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
    return (
      <div ref={ref} data-sidebar="menu-skeleton" className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)} {...props}>
        {showIcon && <Skeleton className="size-4 rounded-md" data-sidebar="menu-skeleton-icon" />}
        <Skeleton className="h-4 max-w-[--skeleton-width] flex-1" data-sidebar="menu-skeleton-text" style={{ "--skeleton-width": width } as React.CSSProperties} />
      </div>
    );
  }
);
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
