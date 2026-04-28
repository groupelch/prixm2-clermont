"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AlertTriangle, TrendingDown, Clock, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const erreurs = [
  {
    icon: TrendingDown,
    titre: "Surévaluer son bien : le piège le plus coûteux",
    probleme:
      "Un vendeur qui affiche 300 000 € pour un bien qui vaut réellement 260 000 € pense avoir une marge de négociation. En réalité, il se condamne à ne pas vendre.",
    consequence:
      "Les acheteurs sont très bien informés aujourd'hui. Ils comparent, analysent, et passent leur chemin dès qu'un prix s'écarte du marché. Après 2-3 mois sans offre, le bien est « brûlé » : tout le monde l'a vu, personne n'en veut.",
    chiffre: "−8 à −15 %",
    chiffreLabel: "La décote finale sur un bien trop longtemps sur le marché",
    color: "border-red-200 bg-red-50",
    iconColor: "text-red-500",
  },
  {
    icon: Clock,
    titre: "Le temps qui passe coûte de l'argent",
    probleme:
      "Chaque mois supplémentaire sur le marché représente un coût réel : taxes foncières, charges de copropriété, crédits qui tournent, opportunités manquées.",
    consequence:
      "Sur le marché clermontois en 2025, le délai moyen de vente est de 3 à 5 mois selon le secteur. Un bien mal pricé peut rester 12 mois ou plus — ce qui représente 12 mois de charges, et souvent une décote finale imposée par l'acheteur qui sait que le vendeur est pressé.",
    chiffre: "3 à 12 mois",
    chiffreLabel: "La différence entre un bien bien pricé et un bien surévalué",
    color: "border-orange-200 bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: Users,
    titre: "Les premiers acheteurs sont les meilleurs acheteurs",
    probleme:
      "Les visiteurs les plus sérieux passent dans les 3 premières semaines. Ce sont eux qui achètent. Après, seuls restent les chasseurs d'affaires.",
    consequence:
      "Un bien affiché au juste prix déclenche plusieurs visites la première semaine, parfois plusieurs offres en simultané. Cette pression naturelle évite la négociation et peut même faire monter le prix final. À l'inverse, attendre de baisser progressivement signale la faiblesse du vendeur.",
    chiffre: "3 semaines",
    chiffreLabel: "La fenêtre d'or où les meilleurs acheteurs se manifestent",
    color: "border-amber-200 bg-amber-50",
    iconColor: "text-amber-600",
  },
];

const bonnesPratiques = [
  "Faire estimer son bien par 2 experts locaux indépendants — pas une seule agence",
  "Comparer les ventes réelles récentes dans le quartier (données DVF consultables)",
  "Tenir compte du DPE : un bien F ou G subit une décote obligatoire de 5 à 15 %",
  "Intégrer l'état réel du bien — les travaux visibles sont une raison pour baisser, pas pour augmenter",
  "Ne pas confondre prix de mise en vente et prix de vente : la différence, c'est le temps perdu",
  "Définir un objectif de délai avant de fixer le prix : vendre en 3 mois ou en 6 mois n'est pas le même prix",
];

export function PrixJustePedagogie() {
  return (
    <section className="py-16 md:py-24 bg-cbf-ivory">
      <div className="container max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Ce que tout vendeur doit savoir
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-4">
            Pourquoi le prix juste est votre meilleur allié
          </h2>
          <p className="text-lg text-cbf-gray leading-relaxed">
            En immobilier, on croit souvent qu'afficher haut laisse de la marge. C'est l'erreur la plus
            répandue — et la plus coûteuse. Voici pourquoi un bien mal pricé peut vous faire perdre des
            dizaines de milliers d'euros.
          </p>
        </motion.div>

        {/* 3 erreurs */}
        <div className="space-y-5 mb-14">
          {erreurs.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`border rounded-sm p-6 md:p-8 ${e.color}`}
              >
                <div className="flex items-start gap-5">
                  <div className={`flex-shrink-0 mt-0.5 ${e.iconColor}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-cbf-black mb-3">
                      {e.titre}
                    </h3>
                    <p className="text-cbf-gray mb-3 leading-relaxed">{e.probleme}</p>
                    <p className="text-cbf-gray leading-relaxed">{e.consequence}</p>
                    <div className="mt-5 inline-flex items-baseline gap-2 bg-white border border-current/20 px-4 py-2 rounded-sm">
                      <span className={`font-playfair text-2xl font-bold ${e.iconColor}`}>
                        {e.chiffre}
                      </span>
                      <span className="text-xs text-cbf-gray">{e.chiffreLabel}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Illustration graphique : le cycle du bien surévalué */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-cbf-gray-soft rounded-sm p-6 md:p-10 mb-14"
        >
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-cbf-gold" />
            <h3 className="font-playfair text-xl font-bold text-cbf-black">
              Le cycle du bien surévalué — anatomie d'une vente ratée
            </h3>
          </div>
          <div className="grid md:grid-cols-5 gap-2">
            {[
              { step: "01", label: "Mise en vente à prix trop haut", icon: "📈", sub: "Semaine 1" },
              { step: "02", label: "Peu de visites, pas d'offre", icon: "😶", sub: "Mois 1-2" },
              { step: "03", label: "Le bien est « brûlé »", icon: "🔥", sub: "Mois 3" },
              { step: "04", label: "Baisse forcée du prix", icon: "📉", sub: "Mois 4-6" },
              { step: "05", label: "Offre basse, négociation dure", icon: "😬", sub: "Mois 6+" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-[0.55rem] uppercase tracking-widest text-cbf-gold font-bold mb-1">{s.step}</div>
                <p className="text-xs text-cbf-black font-semibold leading-tight mb-1">{s.label}</p>
                <p className="text-[0.65rem] text-cbf-gray">{s.sub}</p>
                {i < 4 && (
                  <div className="hidden md:flex justify-end absolute top-1/2 right-0 transform -translate-y-1/2 text-cbf-gray-light text-lg">→</div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-cbf-gray-soft bg-red-50 rounded-sm px-5 py-4">
            <p className="text-sm text-red-700 font-medium text-center">
              Résultat final : vente à un prix souvent <strong>inférieur</strong> à ce qu'elle aurait été avec un bon prix dès le départ — en ayant perdu 6 à 12 mois.
            </p>
          </div>
        </motion.div>

        {/* Bonnes pratiques */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-cbf-gray-soft rounded-sm p-6 md:p-10 mb-10"
        >
          <h3 className="font-playfair text-xl font-bold text-cbf-black mb-6">
            Les 6 règles pour bien fixer son prix dès le départ
          </h3>
          <ul className="space-y-3">
            {bonnesPratiques.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cbf-success flex-shrink-0 mt-0.5" />
                <span className="text-cbf-gray text-sm leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-cbf-black text-white rounded-sm p-8 md:p-10 text-center"
        >
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-3">
            Estimation professionnelle gratuite
          </p>
          <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-3">
            Connaître la vraie valeur de votre bien, c'est vendre mieux.
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-7 text-sm leading-relaxed">
            Nos experts CBF Conseils analysent votre bien avec les données réelles du marché local —
            pas un algorithme, pas une estimation automatique. Une évaluation humaine, argumentée,
            gratuite et sans engagement.
          </p>
          <Link href="/estimation">
            <Button variant="primary" size="lg" className="group">
              Obtenir mon estimation gratuite
              <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
