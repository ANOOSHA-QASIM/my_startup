"use client"; // client

import * as React from "react";

// sub item
export const SidebarMenuSubItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ ...props }, ref) => {
  return <li ref={ref} {...props} />;
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
