"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends Omit<ButtonProps, "asChild"> {
  href: string;
  showArrow?: boolean;
  external?: boolean;
}

export function CtaButton({
  href,
  children,
  showArrow = false,
  external = false,
  className,
  variant = "primary",
  size = "lg",
  ...rest
}: CtaButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group inline-flex">
        <Button variant={variant} size={size} className={cn("group", className)} {...rest}>
          {content}
        </Button>
      </a>
    );
  }

  return (
    <Link href={href} className="group inline-flex">
      <Button variant={variant} size={size} className={cn("group", className)} {...rest}>
        {content}
      </Button>
    </Link>
  );
}
