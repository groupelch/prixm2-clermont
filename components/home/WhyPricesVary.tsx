"use client";

import { motion } from "framer-motion";
import { MapPin, Sparkles, Train, Home, Building2, Trees } from "lucide-react";

const factors = [
  {
    icon: MapPin,
    title: "Localisation",
    desc: "Centre vs périphérie : écart de 1 à 1,5. Jaude et Chamalières dépassent souvent 2 700 €/m², La Plaine reste sous 2 000 €.",
  },
  {
    icon: Train,
    title: "Transports",
    desc: "Tram A à 5 min : +5 à 10 % de valeur. Quartiers desservis (Centre, Jaude, Cézeaux) tirent les prix vers le haut.",
  },
  {
    icon: Sparkles,
    title: "DPE",
    desc: "Une classe E coûte -5 %, une F/G perd 10 à 15 % vs équivalent classé D. Critère n°1 en 2026.",
  },
  {
    icon: Home,
    title: "État du bien",
    desc: "Un bien rénové vaut +10 à 15 % vs équivalent à rafraîchir. Cuisine, salle de bain et fenêtres = leviers prioritaires.",
  },
  {
    icon: Trees,
    title: "Extérieurs",
    desc: "Balcon : +3 à 5 %. Terrasse : +8 à 12 %. Jardin : +15 à 25 %. Critère encore plus discriminant depuis le COVID.",
  },
  {
    icon: Building2,
    title: "Étage et lumière",
    desc: "Dernier étage avec ascenseur : +5 à 10 %. RDC sur rue : -5 à 10 %. Exposition sud/ouest : +3 à 5 %.",
  },
];

export function WhyPricesVary() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Comprendre le marché
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-3 mb-4">
            Pourquoi les prix varient autant à Clermont-Ferrand ?
          </h2>
          <p className="text-cbf-gray text-lg">
            Six facteurs structurent la valeur d'un bien immobilier sur Clermont-Ferrand.
            Les comprendre, c'est éviter de surévaluer ou de sous-vendre son bien.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-cbf-gray-soft border border-cbf-gray-soft">
          {factors.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white p-8 hover:bg-cbf-ivory transition-colors group"
              >
                <div className="w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center mb-5 group-hover:bg-cbf-gold group-hover:text-cbf-black transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-cbf-black mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-cbf-gray leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
