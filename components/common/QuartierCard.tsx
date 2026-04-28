"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Clock } from "lucide-react";
import type { Quartier } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

interface QuartierCardProps {
  quartier: Quartier;
  index?: number;
}

export function QuartierCard({ quartier, index = 0 }: QuartierCardProps) {
  const prixAffiche = quartier.prixAppartement ?? quartier.prixMaison;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        href={`/prix-m2/${quartier.slug}`}
        className="group block bg-white border border-cbf-gray-soft rounded-sm p-6 hover:border-cbf-gold hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] hover:-translate-y-1 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[0.6rem] uppercase tracking-[0.2em] text-cbf-gold font-semibold">
              {quartier.type === "quartier" ? "Quartier" : "Commune"}
            </span>
            <h3 className="font-playfair text-xl text-cbf-black mt-1 group-hover:text-cbf-gold transition-colors">
              {quartier.nom}
            </h3>
          </div>
          <ArrowUpRight className="h-5 w-5 text-cbf-gray-light group-hover:text-cbf-gold group-hover:scale-110 transition-all" />
        </div>

        <div className="mb-4">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-cbf-gray-light font-semibold">
            Prix moyen
          </p>
          <p className="font-playfair text-3xl font-bold text-cbf-black">
            {formatPricePerM2(prixAffiche)}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-cbf-gray pt-4 border-t border-cbf-gray-soft">
          <span className="inline-flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-cbf-success" />
            <span className="font-semibold text-cbf-success">{quartier.evolution}</span>
            <span className="text-cbf-gray-light">12 mois</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{quartier.delaiVente}j</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
