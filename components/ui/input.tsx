"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-sm border border-cbf-gray-soft bg-white px-4 text-sm text-cbf-black",
          "placeholder:text-cbf-gray-light",
          "focus-visible:outline-none focus-visible:border-cbf-gold focus-visible:ring-2 focus-visible:ring-cbf-gold/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "transition-colors",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
