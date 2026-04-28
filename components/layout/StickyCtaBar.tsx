"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { PHONE } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function StickyCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* Mobile */}
          <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-cbf-gray-soft shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.15)] flex">
            <a
              href={`tel:${PHONE}`}
              className="flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold text-cbf-black"
            >
              <Phone className="h-4 w-4" />
              Être rappelé
            </a>
            <Link
              href="/estimation"
              className="flex-1 flex items-center justify-center gap-1 py-4 text-sm font-semibold bg-cbf-gold text-cbf-black"
            >
              Estimer mon bien
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-cbf-black text-white shadow-2xl rounded-sm px-6 py-3 items-center gap-5">
            <span className="text-sm">
              <span className="text-cbf-gold font-semibold">Votre bien vaut combien ?</span>
              <span className="text-cbf-gray-light ml-2">Estimation gratuite, sans engagement.</span>
            </span>
            <Link
              href="/estimation"
              className="bg-cbf-gold text-cbf-black px-4 py-2 text-sm font-semibold rounded-sm hover:bg-cbf-gold-light transition-colors inline-flex items-center gap-1.5"
            >
              Estimer
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
