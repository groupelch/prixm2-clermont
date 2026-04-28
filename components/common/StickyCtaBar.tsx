"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

interface StickyCtaBarProps {
  /** ID de l'élément qui, s'il est visible, masque la bar (ex: "estimation"). */
  hideWhenVisibleId?: string;
  /** Pourcentage de scroll (0-1) à partir duquel la bar apparaît. */
  threshold?: number;
}

/**
 * Bar fixe en bas de page, apparaît après [threshold]% de scroll, masquée si
 * l'élément #hideWhenVisibleId est dans le viewport. Fermable avec un X
 * (mémorisé pour la session via sessionStorage).
 */
export function StickyCtaBar({
  hideWhenVisibleId = "estimation",
  threshold = 0.5,
}: StickyCtaBarProps) {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);
  const [estimVisible, setEstimVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("stickyCtaClosed") === "1") {
      setClosed(true);
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? scrollTop / docHeight : 0;
      setShow(ratio > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  useEffect(() => {
    if (!hideWhenVisibleId) return;
    const target = document.getElementById(hideWhenVisibleId);
    if (!target) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setEstimVisible(entry.isIntersecting));
      },
      { threshold: 0.15 },
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, [hideWhenVisibleId]);

  const visible = show && !closed && !estimVisible;

  const handleClose = () => {
    setClosed(true);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("stickyCtaClosed", "1");
    }
  };

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="bg-cbf-black text-white shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.45)] border-t border-cbf-gold/30">
        <div className="container py-3 md:py-3.5 flex items-center gap-3 md:gap-5">
          <p className="flex-1 text-sm md:text-base leading-snug">
            <span className="font-semibold text-cbf-gold">
              Estimer mon bien gratuitement
            </span>
            <span className="hidden sm:inline text-cbf-gray-light">
              {" "}— réponse sous 48h
            </span>
          </p>
          <Link
            href="/estimation"
            className="bg-cbf-gold text-cbf-black font-semibold rounded-sm px-4 py-2 text-sm hover:bg-cbf-gold-light transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Démarrer</span>
            <span className="sm:hidden">Estimer</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fermer la barre"
            className="text-cbf-gray-light hover:text-white transition-colors p-1 -mr-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
