"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quartiers } from "@/data/quartiers";
import { cn, PHONE, PHONE_DISPLAY } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Accueil", href: "/" },
  { label: "Estimation", href: "/estimation" },
  { label: "Vendre", href: "/vendre-clermont-ferrand" },
  { label: "Louer", href: "/louer-clermont-ferrand" },
  { label: "Investir", href: "/investir-clermont-ferrand" },
  { label: "Prix immo", href: "/prix-immobilier-clermont-ferrand" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [quartierMenu, setQuartierMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const topQuartiers = quartiers.filter((q) => q.type === "quartier").slice(0, 8);
  const topCommunes = quartiers.filter((q) => q.type === "commune").slice(0, 6);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_20px_-8px_rgba(0,0,0,0.1)]"
          : "bg-white"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-20">
        <Link href="/" className="flex items-baseline gap-1.5 group">
          <span className="font-playfair text-2xl text-cbf-black font-bold leading-none">
            prixm
            <sup className="text-cbf-gold">2</sup>
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.15em] text-cbf-gray-light hidden sm:inline">
            clermontferrand.fr
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-2 text-sm text-cbf-gray hover:text-cbf-gold transition-colors"
          >
            Accueil
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setQuartierMenu(true)}
            onMouseLeave={() => setQuartierMenu(false)}
          >
            <button className="px-3 py-2 text-sm text-cbf-gray hover:text-cbf-gold transition-colors flex items-center gap-1">
              Prix par quartier
              <ChevronDown className="h-3 w-3" />
            </button>
            {quartierMenu && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px]">
                <div className="bg-white rounded-sm border border-cbf-gray-soft shadow-xl p-6 grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold mb-3">
                      Quartiers Clermont-Ferrand
                    </h4>
                    <ul className="space-y-1.5">
                      {topQuartiers.map((q) => (
                        <li key={q.slug}>
                          <Link
                            href={`/prix-m2/${q.slug}`}
                            className="text-sm text-cbf-gray hover:text-cbf-gold transition-colors"
                          >
                            {q.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gold font-bold mb-3">
                      Communes agglo
                    </h4>
                    <ul className="space-y-1.5">
                      {topCommunes.map((q) => (
                        <li key={q.slug}>
                          <Link
                            href={`/prix-m2/${q.slug}`}
                            className="text-sm text-cbf-gray hover:text-cbf-gold transition-colors"
                          >
                            {q.nom}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {NAV_ITEMS.slice(2).map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="px-3 py-2 text-sm text-cbf-gray hover:text-cbf-gold transition-colors"
            >
              {it.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${PHONE}`}
            className="hidden md:inline-flex items-center gap-1.5 text-xs text-cbf-gray hover:text-cbf-gold transition-colors"
          >
            <Phone className="h-3.5 w-3.5" />
            <span className="font-semibold">{PHONE_DISPLAY}</span>
          </a>
          <Link href="/estimation" className="hidden sm:inline-flex">
            <Button variant="primary" size="md">
              Estimer mon bien
            </Button>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-cbf-black hover:text-cbf-gold transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-cbf-gray-soft">
          <nav className="container py-6 space-y-1">
            {NAV_ITEMS.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-cbf-gray hover:text-cbf-gold transition-colors"
              >
                {it.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-cbf-gray-soft">
              <p className="text-[0.65rem] uppercase tracking-[0.15em] text-cbf-gold font-bold mb-2">
                Top quartiers
              </p>
              <div className="grid grid-cols-2 gap-y-1.5">
                {topQuartiers.slice(0, 6).map((q) => (
                  <Link
                    key={q.slug}
                    href={`/prix-m2/${q.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-sm text-cbf-gray hover:text-cbf-gold py-1"
                  >
                    {q.nom}
                  </Link>
                ))}
              </div>
            </div>
            <div className="pt-4">
              <Link href="/estimation" onClick={() => setOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  Estimer mon bien
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
