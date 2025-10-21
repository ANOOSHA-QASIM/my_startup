"use client"; // client util

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// merge classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
