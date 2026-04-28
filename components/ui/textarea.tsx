"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-sm border border-cbf-gray-soft bg-white px-4 py-3 text-sm text-cbf-black",
        "placeholder:text-cbf-gray-light",
        "focus-visible:outline-none focus-visible:border-cbf-gold focus-visible:ring-2 focus-visible:ring-cbf-gold/20",
        "disabled:cursor-not-allowed disabled:opacity-60 transition-colors",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
