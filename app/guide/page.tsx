import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { guides } from "@/data/guides";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Guides immobiliers Clermont-Ferrand 2026 — Vendre, Acheter, Investir",
  description:
    "Guides pratiques sur l'immobilier à Clermont-Ferrand : vendre son appartement, acheter au bon prix, investir dans le locatif. Rédigés par les experts CBF Conseils.",
  path: "/guide",
});

const CATEGORIES = [
  { id: "vendeur",      label: "Vendeur",      color: "bg-rose-50 text-rose-700 border-rose-200" },
  { id: "acheteur",     label: "Acheteur",     color: "bg-sky-50 text-sky-700 border-sky-200" },
  { id: "investisseur", label: "Investisseur", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  { id: "marche",       label: "Marché",       color: "bg-amber-50 text-amber-700 border-amber-200" },
] as const;

function categoryColor(cat: string) {
  return CATEGORIES.find((c) => c.id === cat)?.color ?? "bg-cbf-ivory text-cbf-gold border-cbf-gold/30";
}
function categoryLabel(cat: string) {
  return CATEGORIES.find((c) => c.id === cat)?.label ?? cat;
}

export default function GuidesPage() {
  const sorted = [...guides].sort((a, b) =>
    b.datePublication.localeCompare(a.datePublication)
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="bg-cbf-ivory min-h-screen pt-10 pb-20">
      <div className="container max-w-6xl">
        <BreadcrumbNav
          items={[{ name: "Accueil", href: "/" }, { name: "Guides" }]}
        />

        <header className="mt-8 mb-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm border border-cbf-gold/30 mb-4">
            <BookOpen className="h-3 w-3" /> Guides immobiliers
          </span>
          <h1 className="font-playfair text-display-lg text-cbf-black font-bold mb-5 leading-tight">
            Guides immobiliers Clermont-Ferrand
          </h1>
          <p className="text-lg text-cbf-gray">
            Conseils pratiques pour vendre, acheter, louer ou investir à
            Clermont-Ferrand. Rédigés par les experts terrain CBF Conseils sur
            la base des données réelles du marché.
          </p>
        </header>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-cbf-gray-soft">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.id}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider font-bold rounded-sm border ${cat.color}`}
            >
              {cat.label}
            </span>
          ))}
        </div>

        {/* Guide mis en avant */}
        {featured && (
          <Link
            href={`/guide/${featured.slug}`}
            className="group block bg-white p-6 md:p-10 mb-10 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3 text-[0.6rem] uppercase tracking-wider">
                  <span className="px-2.5 py-1 bg-cbf-gold text-cbf-black font-bold rounded-sm">
                    Guide complet
                  </span>
                  <span className={`px-2.5 py-1 rounded-sm border text-[0.6rem] font-bold ${categoryColor(featured.categorie)}`}>
                    {categoryLabel(featured.categorie)}
                  </span>
                  <span className="text-cbf-gray-light flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.tempsLecture}
                  </span>
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-cbf-black mb-3 leading-tight group-hover:text-cbf-gold transition-colors">
                  {featured.titre}
                </h2>
                <p className="text-cbf-gray leading-relaxed mb-4">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                  Lire le guide <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grille tous les guides */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-sm border text-[0.6rem] uppercase tracking-wider font-bold ${categoryColor(g.categorie)}`}>
                  {categoryLabel(g.categorie)}
                </span>
                <span className="inline-flex items-center gap-1 text-[0.65rem] text-cbf-gray-light">
                  <Clock className="h-3 w-3" /> {g.tempsLecture}
                </span>
              </div>
              <h2 className="font-playfair text-lg font-bold text-cbf-black leading-snug group-hover:text-cbf-gold transition-colors mb-3 flex-1">
                {g.titre}
              </h2>
              <p className="text-sm text-cbf-gray line-clamp-2 mb-4">
                {g.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-cbf-gray-soft">
                <span className="text-[0.65rem] text-cbf-gray-light">
                  {new Date(g.datePublication).toLocaleDateString("fr-FR", {
                    month: "long", year: "numeric",
                  })}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                  Lire <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
