import type { Metadata } from "next";
import Link from "next/link";
import { Database, Filter, BarChart3, RefreshCw, AlertCircle } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema, ArticleSchema, DatasetSchema, DataCatalogSchema } from "@/components/common/SchemaOrg";
import { FinalCta } from "@/components/home/FinalCta";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Méthodologie — Comment sont calculés les prix m² à Clermont-Ferrand",
  description:
    "Comment prixm²clermontferrand.fr calcule ses prix au m² : source DVF (16 882 transactions), filtres appliqués, calcul de la médiane, enrichissement DPE, fréquence de mise à jour.",
  path: "/methodologie",
});

const etapes = [
  {
    n: "01",
    icon: Database,
    titre: "Extraction DVF",
    detail:
      "Nous téléchargeons les fichiers DVF (Demandes de Valeurs Foncières) publiés par la Direction Générale des Finances Publiques sur data.gouv.fr. Ces fichiers contiennent toutes les transactions immobilières enregistrées par les notaires : prix, date, adresse, surface, type de bien (appartement / maison), nombre de pièces.",
  },
  {
    n: "02",
    icon: Filter,
    titre: "Filtrage et nettoyage",
    detail:
      "Nous appliquons plusieurs filtres pour éliminer les données aberrantes : exclusion des transactions inférieures à 20 000 € (ventes entre indivisaires, garages isolés), exclusion des surfaces inférieures à 9 m² ou supérieures à 500 m², exclusion des prix/m² inférieurs à 500 € ou supérieurs à 15 000 € (valeurs extrêmes non représentatives du marché). Sur les 19 400 lignes DVF brutes couvrant Clermont-Ferrand et l'agglomération, 16 882 transactions passent ces filtres.",
  },
  {
    n: "03",
    icon: BarChart3,
    titre: "Calcul de la médiane par quartier",
    detail:
      "Nous calculons le prix médian au m² par quartier (et non la moyenne, trop sensible aux valeurs extrêmes). La médiane signifie que 50 % des transactions ont eu lieu en dessous de ce prix et 50 % au-dessus. Pour les quartiers ayant moins de 30 transactions sur la période, nous élargissons le rayon géographique ou la fenêtre temporelle pour maintenir la robustesse statistique. Les calculs sont distincts pour les appartements et les maisons.",
  },
  {
    n: "04",
    icon: RefreshCw,
    titre: "Enrichissement DPE",
    detail:
      "Les données de la base DPE de l'ADEME (Agence de la Transition Écologique) sont croisées avec les transactions DVF par géolocalisation. Cela permet d'estimer la répartition des étiquettes énergétiques (A à G) pour chaque quartier et d'analyser l'impact du DPE sur les prix (décote logements F/G).",
  },
];

const limites = [
  {
    titre: "Délai de publication DVF",
    texte:
      "La DVF est publiée avec un délai de 6 à 12 mois. Les données les plus récentes disponibles couvrent 2024. Les transactions de 2025 ne seront intégrées qu'à la prochaine mise à jour annuelle.",
  },
  {
    titre: "Granularité géographique",
    texte:
      "La DVF ne contient pas le numéro d'étage, l'orientation, l'état général du bien ou la présence d'une terrasse. Ces critères influencent le prix réel. Nos médianes reflètent le stock transactionnel moyen, pas un bien précis.",
  },
  {
    titre: "Transactions hors marché",
    texte:
      "Les ventes entre membres d'une même famille, les adjudications judiciaires et certaines ventes de particulier à particulier peuvent introduire un biais si elles ne sont pas filtrées. Nos filtres de prix/m² éliminent les cas les plus évidents.",
  },
  {
    titre: "Dynamique de marché récente",
    texte:
      "En période de hausse ou de baisse rapide des taux d'intérêt, les prix des transactions notariées reflètent des compromis signés 3 à 6 mois plus tôt. Nos données terrain permettent d'ajuster qualitativement les tendances récentes.",
  },
];

export default function MethodologiePage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Méthodologie", url: `${SITE_URL}/methodologie` },
        ]}
      />
      <ArticleSchema
        title="Méthodologie — Comment sont calculés les prix m² à Clermont-Ferrand"
        description="Comment prixm²clermontferrand.fr calcule ses prix au m² : source DVF (16 882 transactions), filtres appliqués, calcul de la médiane, enrichissement DPE, fréquence de mise à jour."
        datePublished="2024-01-15"
        dateModified="2025-04-01"
        url={`${SITE_URL}/methodologie`}
        authorName="Louis Combret, Directeur CBF Conseils"
        authorType="Person"
      />
      <DatasetSchema />
      <DataCatalogSchema />

      {/* HERO */}
      <section className="bg-cbf-ivory pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="container max-w-4xl">
          <BreadcrumbNav
            items={[
              { name: "Accueil", href: "/" },
              { name: "Méthodologie" },
            ]}
          />
          <div className="mt-8">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Transparence des données
            </span>
            <h1 className="font-playfair text-display-xl text-cbf-black font-bold mt-3 mb-5">
              Comment sont calculés
              <br />
              <span className="text-cbf-gold">nos prix au m² ?</span>
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed max-w-2xl">
              Tous les prix publiés sur prixm²clermontferrand.fr sont calculés
              à partir de transactions réelles enregistrées par les notaires.
              Voici notre méthode, étape par étape.
            </p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { val: "16 882", label: "Transactions analysées" },
              { val: "2021–2024", label: "Période couverte" },
              { val: "DVF + DPE", label: "Sources officielles" },
              { val: "Annuelle", label: "Fréquence de mise à jour" },
            ].map((k) => (
              <div
                key={k.label}
                className="bg-white border border-cbf-gray-soft rounded-sm p-5 text-center"
              >
                <p className="font-playfair text-xl font-bold text-cbf-black">
                  {k.val}
                </p>
                <p className="text-[0.6rem] text-cbf-gray-light uppercase tracking-wider mt-1">
                  {k.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ÉTAPES */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Process en 4 étapes
          </span>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-10">
            De la transaction notariée au prix publié
          </h2>
          <div className="space-y-8">
            {etapes.map((e) => {
              const Icon = e.icon;
              return (
                <div
                  key={e.n}
                  className="flex gap-6 p-7 bg-cbf-ivory border border-cbf-gray-soft rounded-sm"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[0.6rem] font-bold text-cbf-gold uppercase tracking-widest">
                        Étape {e.n}
                      </span>
                      <h3 className="font-playfair text-lg font-bold text-cbf-black">
                        {e.titre}
                      </h3>
                    </div>
                    <p className="text-sm text-cbf-gray leading-relaxed">
                      {e.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MÉDIANE vs MOYENNE */}
      <section className="py-14 md:py-20 bg-cbf-black text-white">
        <div className="container max-w-4xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Pourquoi la médiane ?
          </span>
          <h2 className="font-playfair text-display-md text-white font-bold mt-2 mb-6">
            Médiane vs moyenne : une différence qui compte
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-sm p-7">
              <h3 className="font-playfair text-lg font-bold text-white mb-3">
                La moyenne — trop sensible aux extrêmes
              </h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Si un appartement de prestige se vend 8 000 €/m² dans un quartier
                dont les autres transactions sont à 2 000 €/m², la moyenne gonfle
                artificiellement le prix de référence. Les portails qui publient
                des moyennes surestiment souvent les quartiers hétérogènes.
              </p>
            </div>
            <div className="bg-cbf-gold/10 border border-cbf-gold/30 rounded-sm p-7">
              <h3 className="font-playfair text-lg font-bold text-cbf-gold mb-3">
                La médiane — représentative du marché réel
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                La médiane divise les transactions en deux moitiés égales : 50 %
                des ventes ont eu lieu en dessous, 50 % au-dessus. Elle est
                insensible aux valeurs extrêmes et représente mieux le prix auquel
                un bien ordinaire se vend réellement dans le quartier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIMITES */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-5 w-5 text-cbf-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Limites à connaître
            </span>
          </div>
          <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-1 mb-8">
            Ce que nos données ne peuvent pas faire
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {limites.map((l) => (
              <div
                key={l.titre}
                className="bg-cbf-ivory border border-cbf-gray-soft rounded-sm p-6"
              >
                <h3 className="font-semibold text-sm text-cbf-black mb-2">
                  {l.titre}
                </h3>
                <p className="text-xs text-cbf-gray leading-relaxed">{l.texte}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-cbf-gray mt-8 p-5 bg-cbf-ivory border border-cbf-gold/20 rounded-sm">
            Pour une estimation précise d'un bien spécifique, seul un professionnel
            habilité peut prendre en compte l'ensemble des critères. CBF Conseils
            propose une estimation gratuite et sans engagement.{" "}
            <Link href="/estimation" className="text-cbf-gold font-semibold hover:underline">
              Demander une estimation →
            </Link>
          </p>
        </div>
      </section>

      {/* FRÉQUENCE MAJ */}
      <section className="py-10 bg-cbf-ivory border-t border-cbf-gray-soft">
        <div className="container max-w-4xl">
          <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
            Mise à jour des données
          </span>
          <h2 className="font-playfair text-xl font-bold text-cbf-black mt-2 mb-4">
            Fréquence et planning
          </h2>
          <p className="text-sm text-cbf-gray leading-relaxed max-w-2xl">
            La DVF est publiée une à deux fois par an par la DGFiP. Nous intégrons
            chaque nouvelle livraison dans les semaines qui suivent sa publication.
            La dernière mise à jour des données couvre les transactions jusqu'à
            fin 2024. Les données terrain (délais de vente, marges de négociation)
            sont révisées trimestriellement par nos négociateurs.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-xs">
            <Link href="/a-propos" className="text-cbf-gold hover:underline">
              En savoir plus sur CBF Conseils →
            </Link>
            <a
              href="https://www.data.gouv.fr/fr/datasets/demandes-de-valeurs-foncieres/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cbf-gold hover:underline"
            >
              Accéder aux données DVF brutes →
            </a>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
