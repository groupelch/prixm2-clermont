"use client";

import { motion } from "framer-motion";
import { formatPricePerM2 } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PrixBadgeProps {
  prix: number | null;
  label?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "gold" | "dark" | "outline";
  animated?: boolean;
}

export function PrixBadge({
  prix,
  label = "Prix moyen",
  size = "md",
  variant = "gold",
  animated = false,
}: PrixBadgeProps) {
  const sizes = {
    sm: "p-3 text-base",
    md: "p-4 text-lg",
    lg: "p-6 text-2xl",
    xl: "p-8 text-3xl md:text-4xl",
  };
  const variants = {
    gold: "bg-cbf-gold text-cbf-black",
    dark: "bg-cbf-black text-cbf-white",
    outline: "border-2 border-cbf-gold text-cbf-black bg-cbf-ivory",
  };

  const Wrapper: React.ElementType = animated ? motion.div : "div";
  const motionProps = animated
    ? {
        initial: { scale: 0.92, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: "easeOut" },
      }
    : {};

  return (
    <Wrapper
      className={cn(
        "inline-flex flex-col rounded-sm shadow-sm",
        variants[variant],
        sizes[size]
      )}
      {...motionProps}
    >
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] opacity-80">
        {label}
      </span>
      <span className="font-playfair font-bold leading-none mt-1">
        {formatPricePerM2(prix)}
      </span>
    </Wrapper>
  );
}
