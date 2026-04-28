"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    type="checkbox"
    className={cn(
      "h-4 w-4 rounded-sm border border-cbf-gray-soft text-cbf-gold accent-cbf-gold focus:ring-cbf-gold focus:ring-2 focus:ring-offset-2",
      className
    )}
    {...props}
  />
));
Checkbox.displayName = "Checkbox";
