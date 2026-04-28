"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  question: string;
  reponse: string;
}

interface FaqAccordionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: "Quel est le prix moyen au m² à Clermont-Ferrand en 2025 ?",
    reponse:
      "Le prix moyen d'un appartement ancien à Clermont-Ferrand intra-muros s'établit autour de 2 280 €/m² en 2025, avec une fourchette allant de 1 800 €/m² (Chanturgue, La Plaine) à plus de 2 600 €/m² (Jaude, Chamalières limitrophe).",
  },
  {
    question: "Comment est calculée l'estimation gratuite ?",
    reponse:
      "Notre estimation croise trois sources : la base DVF (ventes notariales officielles), le marché actif (annonces en cours sur votre quartier) et l'expertise terrain de nos agents CBF Conseils qui visitent votre bien gratuitement.",
  },
  {
    question: "Quel est le quartier le plus cher de Clermont-Ferrand ?",
    reponse:
      "Hors commune limitrophe, Jaude reste le quartier le plus cher de Clermont-Ferrand intra-muros, avec un prix moyen autour de 2 600 €/m². Chamalières (commune voisine) reste cependant plus chère, à environ 2 700 €/m².",
  },
  {
    question: "Combien de temps pour vendre à Clermont-Ferrand ?",
    reponse:
      "Le délai moyen est de 60 jours en 2025. Les biens premium bien positionnés se vendent en 30-45 jours, les biens secondaires demandent 70-80 jours. Une bonne estimation initiale est le facteur n°1 de rapidité.",
  },
  {
    question: "Mon bien est classé F au DPE, vais-je perdre de la valeur ?",
    reponse:
      "Oui, en 2025 un bien classé F perd 8 à 12 % vs équivalent classé D, et un G perd 12 à 15 %. Trois options : vendre tel quel avec décote, faire des travaux ciblés (toiture, fenêtres, chauffage), ou vendre à un investisseur travaux.",
  },
  {
    question: "Faut-il faire estimer son bien avant ou après les diagnostics ?",
    reponse:
      "Idéalement, faites le DPE en amont. C'est le critère le plus structurant : connaître la classe énergie permet d'ajuster le prix de mise en vente et d'éviter les mauvaises surprises en cours de transaction.",
  },
];

export function FaqAccordion({ items, title, subtitle }: FaqAccordionProps) {
  const data = items ?? DEFAULT_ITEMS;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mb-10">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Questions fréquentes
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-3 mb-3">
            {title ?? "Vos questions sur le marché clermontois"}
          </h2>
          {subtitle && <p className="text-cbf-gray">{subtitle}</p>}
        </div>

        <div className="max-w-3xl space-y-3">
          {data.map((it, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="border border-cbf-gray-soft rounded-sm overflow-hidden bg-white hover:border-cbf-gold transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-playfair text-base md:text-lg text-cbf-black font-semibold pr-6">
                    {it.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cbf-ivory flex items-center justify-center">
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-cbf-gold" />
                    ) : (
                      <Plus className="h-4 w-4 text-cbf-black" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-cbf-gray leading-relaxed text-sm md:text-base">
                        {it.reponse}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
