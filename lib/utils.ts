import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPricePerM2(value: number | null): string {
  if (!value) return "—";
  return `${new Intl.NumberFormat("fr-FR").format(value)} €/m²`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("fr-FR").format(value);
}

export const SITE_NAME = "prixm² Clermont-Ferrand";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.prixm2clermontferrand.fr";
export const PHONE = process.env.NEXT_PUBLIC_PHONE || "+33473000000";
export const PHONE_DISPLAY = "04 73 00 00 00"; // placeholder à remplacer
