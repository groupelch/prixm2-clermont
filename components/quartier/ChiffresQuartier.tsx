"use client";

import { motion } from "framer-motion";
import { Building2, Home, TrendingUp, Clock } from "lucide-react";
import type { Quartier } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

export function ChiffresQuartier({ quartier }: { quartier: Quartier }) {
  const topItems = [
    {
      icon: Building2,
      label: "Prix appartement",
      value: formatPricePerM2(quartier.prixAppartement),
    },
    {
      icon: Home,
      label: "Prix maison",
      value: quartier.prixMaison ? formatPricePerM2(quartier.prixMaison) : "Marché rare",
    },
    {
      icon: Clock,
      label: "Délai moyen de vente",
      value: `${quartier.delaiVente} jours`,
      sub: "En 2026, le marché clermontois s'est allongé",
    },
  ];

  const evoItems = [
    { label: "12 derniers mois", value: quartier.evolution12m },
    { label: "5 ans", value: quartier.evolution5ans },
    { label: "10 ans", value: quartier.evolution10ans },
  ];

  function evoColor(v: string) {
    if (v.startsWith("+")) return "text-cbf-success";
    if (v.startsWith("-")) return "text-red-500";
    return "text-cbf-black";
  }

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="container">
        <div className="max-w-2xl mb-8">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Données clés
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2">
            Le marché de {quartier.nom} en chiffres
          </h2>
        </div>

        {/* Prix principaux */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cbf-gray-soft border border-cbf-gray-soft mb-px">
          {topItems.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-white p-6 md:p-8 hover:bg-cbf-ivory transition-colors"
              >
                <Icon className="h-5 w-5 text-cbf-gold mb-3" />
                <p className="font-playfair text-2xl md:text-3xl font-bold text-cbf-black leading-none mb-2">
                  {it.value}
                </p>
                <p className="text-xs text-cbf-gray-light uppercase tracking-wider font-semibold">
                  {it.label}
                </p>
                {it.sub && (
                  <p className="text-[0.7rem] text-cbf-gray mt-1 italic">{it.sub}</p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Évolutions multi-périodes */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-cbf-ivory border border-cbf-gray-soft p-6 md:p-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="h-4 w-4 text-cbf-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Évolution des prix
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {evoItems.map((e, i) => (
              <div key={i} className="text-center">
                <p className={`font-playfair text-3xl md:text-4xl font-bold leading-none ${evoColor(e.value)}`}>
                  {e.value}
                </p>
                <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gray-light font-semibold mt-2">
                  {e.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[0.7rem] text-cbf-gray mt-5 italic border-t border-cbf-gray-soft pt-4">
            Données indicatives basées sur les transactions DVF et les observations de terrain CBF Conseils.
            À valider avec un expert avant toute décision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
