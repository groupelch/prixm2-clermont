"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPricePerM2 } from "@/lib/utils";
import { getPrixMoyenAppartement } from "@/data/quartiers";

const MOIS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const now = new Date();
const DATE_MAJ = `${MOIS_FR[now.getMonth()]} ${now.getFullYear()}`;

export function HeroSection() {
  const prixMoyen = getPrixMoyenAppartement();
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 bg-cbf-ivory overflow-hidden">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Gold accent */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cbf-gold rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-96 h-96 bg-cbf-navy rounded-full opacity-5 blur-3xl pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-cbf-gold/30 rounded-full mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cbf-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cbf-gold" />
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cbf-black font-semibold">
                Données mises à jour — {DATE_MAJ}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-playfair text-display-xl text-cbf-black font-bold mb-6"
            >
              Prix m² à <span className="text-cbf-gold">Clermont-Ferrand</span>
              <br />
              <span className="text-cbf-anthracite">
                Estimez votre bien quartier par quartier
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-lg text-cbf-gray max-w-2xl mb-8 leading-relaxed"
            >
              Un outil local pour comprendre les prix immobiliers à
              Clermont-Ferrand, comparer les quartiers et obtenir une estimation
              personnalisée — par les experts de CBF Conseils.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <Link href="/estimation">
                <Button variant="primary" size="xl" className="group">
                  Estimer mon bien
                  <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#carte">
                <Button variant="outline" size="xl">
                  <MapPin className="h-5 w-5" />
                  Explorer la carte
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 max-w-lg"
            >
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cbf-gray-light font-semibold">
                  Quartiers analysés
                </p>
                <p className="font-playfair text-2xl text-cbf-black font-bold mt-1">31</p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cbf-gray-light font-semibold">
                  Source ouverte
                </p>
                <p className="font-playfair text-2xl text-cbf-black font-bold mt-1">DVF</p>
              </div>
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.2em] text-cbf-gray-light font-semibold">
                  Estimation
                </p>
                <p className="font-playfair text-2xl text-cbf-black font-bold mt-1">48h</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-white border border-cbf-gray-soft rounded-sm p-8 shadow-2xl">
              <div className="absolute -top-4 left-8 inline-flex items-center gap-1.5 bg-cbf-black text-white px-3 py-1.5 rounded-sm text-[0.65rem] uppercase tracking-[0.18em] font-semibold">
                <TrendingUp className="h-3 w-3 text-cbf-gold" />
                Indicateur clé
              </div>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gray-light font-semibold mb-3">
                Prix moyen appartement
              </p>
              <p className="font-playfair text-display-lg text-cbf-black font-bold leading-none">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  {formatPricePerM2(prixMoyen)}
                </motion.span>
              </p>
              <p className="text-sm text-cbf-gray mt-3">
                à Clermont-Ferrand intra-muros · {DATE_MAJ}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-cbf-gray-soft">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gray-light font-semibold mb-1">
                    Évolution 12 mois
                  </p>
                  <p className="font-playfair text-xl text-cbf-success font-bold">+3,2 %</p>
                </div>
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gray-light font-semibold mb-1">
                    Délai moyen
                  </p>
                  <p className="font-playfair text-xl text-cbf-black font-bold">60 j</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
