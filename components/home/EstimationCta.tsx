"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Estimation gratuite et sans engagement",
  "Réponse sous 48 heures par un expert local",
  "Données croisées DVF + connaissance terrain",
  "Stratégie de vente personnalisée",
];

export function EstimationCta() {
  return (
    <section className="py-20 md:py-28 bg-dark-gradient text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cbf-gold opacity-10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cbf-navy opacity-15 blur-3xl rounded-full pointer-events-none" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold"
            >
              Estimation gratuite
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-playfair text-display-lg font-bold mt-3 mb-6"
            >
              Combien vaut votre bien à Clermont-Ferrand ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-cbf-gray-light text-lg leading-relaxed mb-8 max-w-xl"
            >
              Nos experts CBF Conseils analysent votre bien gratuitement, en
              tenant compte de tous les critères locaux : quartier, état, DPE,
              extérieurs, étage…
            </motion.p>

            <ul className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                  className="flex items-start gap-3 text-white/90"
                >
                  <CheckCircle2 className="h-5 w-5 text-cbf-gold flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>

            <Link href="/estimation">
              <Button variant="primary" size="xl" className="group">
                Démarrer mon estimation
                <ArrowRight className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white text-cbf-black rounded-sm p-8 md:p-10"
          >
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-3">
              Méthode CBF Conseils
            </p>
            <ol className="space-y-5">
              {[
                {
                  n: "01",
                  t: "Vous décrivez votre bien",
                  d: "Surface, quartier, état, extérieurs… 3 minutes en ligne.",
                },
                {
                  n: "02",
                  t: "Nous analysons en profondeur",
                  d: "Comparables DVF, marché local, critères différenciants.",
                },
                {
                  n: "03",
                  t: "Nous vous remettons une fourchette précise",
                  d: "Estimation chiffrée + recommandations stratégiques sous 48h.",
                },
              ].map((s) => (
                <li key={s.n} className="flex items-start gap-4">
                  <span className="font-playfair text-2xl text-cbf-gold font-bold leading-none w-10 flex-shrink-0">
                    {s.n}
                  </span>
                  <div>
                    <p className="font-playfair text-lg font-bold text-cbf-black">
                      {s.t}
                    </p>
                    <p className="text-sm text-cbf-gray mt-0.5">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
