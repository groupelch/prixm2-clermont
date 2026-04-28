"use client";

import { motion } from "framer-motion";
import { Camera, FileText, Target } from "lucide-react";
import type { Quartier } from "@/data/quartiers";

export function ConseilsVendeur({ quartier }: { quartier: Quartier }) {
  const tips = [
    {
      icon: Target,
      title: "Estimez juste, dès le départ",
      desc: `Sur ${quartier.nom}, un bien surévalué de 10 % met 2 à 3 fois plus de temps à se vendre. Le délai moyen actuel est de ${quartier.delaiVente} jours pour un bien correctement positionné.`,
    },
    {
      icon: Camera,
      title: "Soignez la mise en valeur",
      desc: `Le profil acheteur dominant sur ce secteur est ${quartier.profilAcheteur.toLowerCase()}. Adaptez la présentation : photos pro, home staging léger, désencombrement.`,
    },
    {
      icon: FileText,
      title: "Anticipez les diagnostics",
      desc: "Le DPE est aujourd'hui le critère n°1 de tri. Faites-le en amont, et adaptez votre prix à la classe énergétique réelle.",
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-cbf-ivory">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Vendre à {quartier.nom}
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
            3 conseils pour vendre vite et bien
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {tips.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-cbf-gray-soft rounded-sm p-7 hover:border-cbf-gold transition-colors"
              >
                <div className="w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-playfair text-xl font-bold text-cbf-black mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-cbf-gray leading-relaxed">{t.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
