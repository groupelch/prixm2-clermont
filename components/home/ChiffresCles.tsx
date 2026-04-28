"use client";

import { motion } from "framer-motion";
import { Building2, Home, TrendingUp, Clock } from "lucide-react";
import { formatPricePerM2 } from "@/lib/utils";
import { getPrixMoyenAppartement, getPrixMoyenMaison } from "@/data/quartiers";

const items = [
  {
    icon: Building2,
    label: "Prix m² appartement",
    value: () => formatPricePerM2(getPrixMoyenAppartement()),
    sub: "moyenne intra-muros",
  },
  {
    icon: Home,
    label: "Prix m² maison",
    value: () => formatPricePerM2(getPrixMoyenMaison()),
    sub: "moyenne intra-muros",
  },
  {
    icon: TrendingUp,
    label: "Évolution 12 mois",
    value: () => "+3,2 %",
    sub: "marché global",
  },
  {
    icon: Clock,
    label: "Délai moyen de vente",
    value: () => "60 j",
    sub: "biens bien positionnés",
  },
];

export function ChiffresCles() {
  return (
    <section className="bg-cbf-black text-white py-20">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Marché clermontois 2026
          </span>
          <h2 className="font-playfair text-display-md font-bold mt-3 mb-4">
            Le marché immobilier de Clermont-Ferrand en chiffres
          </h2>
          <p className="text-cbf-gray-light max-w-2xl">
            Des données croisées des notaires, de la base DVF et de l'expertise terrain
            de CBF Conseils — mises à jour 2026.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cbf-anthracite border border-cbf-anthracite">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-cbf-black p-8 hover:bg-cbf-anthracite transition-colors"
              >
                <Icon className="h-6 w-6 text-cbf-gold mb-4" />
                <p className="font-playfair text-3xl md:text-4xl font-bold leading-none mb-3">
                  {it.value()}
                </p>
                <p className="text-sm text-white/90 mb-1">{it.label}</p>
                <p className="text-xs text-cbf-gray-light italic">{it.sub}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
