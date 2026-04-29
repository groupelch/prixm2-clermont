"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PrixBadge } from "@/components/common/PrixBadge";
import type { Quartier } from "@/data/quartiers";
import { formatPricePerM2 } from "@/lib/utils";

export function QuartierHero({ quartier }: { quartier: Quartier }) {
  const refPrix = quartier.prixAppartement ?? quartier.prixMaison;
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 bg-cbf-ivory overflow-hidden">
      {/* Image de fond subtile (rue Clermont-Ferrand) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12]">
        <Image
          src="https://images.unsplash.com/photo-1650056221902-3972989f2d19?w=1600&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-cbf-ivory/60 via-cbf-ivory/40 to-cbf-ivory pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-cbf-gold rounded-full opacity-10 blur-3xl pointer-events-none" />
      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-cbf-gold/30 rounded-full mb-6"
            >
              <MapPin className="h-3 w-3 text-cbf-gold" />
              <span className="text-[0.7rem] uppercase tracking-[0.18em] text-cbf-black font-semibold">
                {quartier.type === "quartier" ? "Quartier" : "Commune"} · {quartier.ville}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-playfair text-display-xl text-cbf-black font-bold mb-5"
            >
              Prix m² à <span className="text-cbf-gold">{quartier.nom}</span>
              <br />
              <span className="text-cbf-anthracite text-[0.7em]">
                Analyse <time dateTime="2026-04-01">2026</time>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="text-lg text-cbf-gray max-w-2xl mb-5 leading-relaxed"
            >
              Appartements, maisons, investissement : tout ce qu'il faut savoir
              sur le marché immobilier à {quartier.nom} — données chiffrées et
              expertise CBF Conseils.
            </motion.p>

            {quartier.point_essentiel && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="flex items-start gap-3 bg-white border-l-4 border-cbf-gold px-4 py-3 rounded-sm max-w-xl mb-8"
              >
                <MapPin className="h-4 w-4 text-cbf-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-cbf-gray leading-relaxed">
                  {quartier.point_essentiel}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.26 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/estimation">
                <Button variant="primary" size="xl" className="group">
                  Estimer mon bien à {quartier.nom}
                  <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/#carte">
                <Button variant="outline" size="xl">
                  <MapPin className="h-5 w-5" />
                  Voir la carte
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="lg:col-span-5 bg-white border border-cbf-gray-soft rounded-sm p-8 shadow-xl"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gray-light font-semibold mb-2">
              Prix moyen au m²
            </p>
            <p className="font-playfair text-display-lg text-cbf-black font-bold leading-none">
              {formatPricePerM2(refPrix)}
            </p>
            <p className="text-sm text-cbf-gray mt-2 mb-6">
              Fourchette : {quartier.prixBas.toLocaleString("fr-FR")} €/m² —{" "}
              {quartier.prixHaut.toLocaleString("fr-FR")} €/m²
            </p>
            <div className="pt-5 border-t border-cbf-gray-soft space-y-4">
              <p className="text-[0.6rem] uppercase tracking-[0.18em] text-cbf-gray-light font-semibold flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-cbf-success" />
                Évolution des prix
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "12 mois", value: quartier.evolution12m },
                  { label: "5 ans", value: quartier.evolution5ans },
                  { label: "10 ans", value: quartier.evolution10ans },
                ].map((e) => (
                  <div key={e.label}>
                    <p className={`font-playfair text-xl font-bold leading-none ${e.value.startsWith("+") ? "text-cbf-success" : "text-red-500"}`}>
                      {e.value}
                    </p>
                    <p className="text-[0.55rem] uppercase tracking-wider text-cbf-gray-light mt-1">{e.label}</p>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-cbf-gray-soft flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-cbf-gray-light flex-shrink-0" />
                <p className="text-xs text-cbf-gray">
                  Délai moyen de vente : <span className="font-bold text-cbf-black">{quartier.delaiVente} jours</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
