"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE, PHONE_DISPLAY } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="py-20 md:py-28 bg-cbf-ivory border-t border-cbf-gray-soft">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-white rounded-sm p-10 md:p-16 text-center relative overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1639736161901-a3da485ebe59?w=1600&q=80&auto=format&fit=crop"
            alt="Clermont-Ferrand vue de nuit"
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover -z-10"
          />
          <div className="absolute inset-0 bg-cbf-black/80 -z-10" />
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 -right-10 w-72 h-72 bg-cbf-gold rounded-full blur-3xl" />
            <div className="absolute bottom-0 -left-10 w-72 h-72 bg-cbf-navy rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Prêt à vendre ou estimer ?
            </span>
            <h2 className="font-playfair text-display-lg font-bold mt-4 mb-5">
              Une seule question :
              <br />
              <span className="text-cbf-gold">Combien vaut votre bien ?</span>
            </h2>
            <p className="text-cbf-gray-light max-w-xl mx-auto mb-9">
              Nos experts CBF Conseils sont à Clermont-Ferrand depuis plus de 10 ans.
              Estimation sous 48h, gratuite et sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/estimation">
                <Button variant="primary" size="xl" className="group w-full sm:w-auto">
                  Estimer mon bien gratuitement
                  <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href={`tel:${PHONE}`}>
                <Button variant="outline-gold" size="xl" className="w-full sm:w-auto">
                  <Phone className="h-5 w-5" />
                  Appeler {PHONE_DISPLAY}
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
        <p className="max-w-4xl mx-auto text-[0.65rem] text-cbf-gray-light/50 mt-2 text-right">Photo : Unsplash</p>
      </div>
    </section>
  );
}
