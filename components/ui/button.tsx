"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cbf-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        primary:
          "bg-cbf-gold text-cbf-black hover:bg-cbf-gold-dark hover:shadow-[0_8px_24px_-8px_rgba(184,134,11,0.5)] hover:-translate-y-0.5",
        dark: "bg-cbf-black text-cbf-white hover:bg-cbf-anthracite hover:-translate-y-0.5",
        outline:
          "border border-cbf-black text-cbf-black bg-transparent hover:bg-cbf-black hover:text-cbf-white",
        "outline-gold":
          "border border-cbf-gold text-cbf-gold bg-transparent hover:bg-cbf-gold hover:text-cbf-black",
        ghost: "text-cbf-black hover:bg-cbf-ivory",
        link: "text-cbf-gold underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
