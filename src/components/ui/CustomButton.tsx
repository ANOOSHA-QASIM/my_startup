"use client"; // Next.js ke liye client component

import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // Optional wrapper for "asChild" pattern
import { cva, type VariantProps } from "class-variance-authority"; // For variant-based styling
import { cn } from "@/lib/utils"; // Utility for conditional classNames

// Button styles with variants and sizes
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
       default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-elegant hover:shadow-glow",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-elegant hover:shadow-glow",
        whatsapp: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-elegant hover:shadow-glow transform hover:scale-105 transition-transform",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Button props type
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // Allows using a different component instead of <button>
}

// Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"; // Use Slot if asChild, else native button
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Apply variant + size + custom class
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button"; // Name for React DevTools

export { Button, buttonVariants };
