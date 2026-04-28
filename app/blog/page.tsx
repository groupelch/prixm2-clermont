"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  articles,
  ARTICLE_THEMES,
  getArticleImage,
  getArticleAuteur,
  type ArticleTheme,
} from "@/data/articles";
import { cn } from "@/lib/utils";

type CategoryFilter = "tous" | ArticleTheme;

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "tous", label: "Tous" },
  ...ARTICLE_THEMES.map((t) => ({ id: t.id as CategoryFilter, label: t.label })),
];

export default function BlogPage() {
  const [filter, setFilter] = useState<CategoryFilter>("tous");

  const filtered = useMemo(() => {
    const sorted = [...articles].sort((a, b) =>
      b.datePublished.localeCompare(a.datePublished)
    );
    if (filter === "tous") return sorted;
    return sorted.filter((a) => a.theme === filter);
  }, [filter]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <article className="bg-cbf-ivory pt-10 pb-20 min-h-screen">
      <div className="container max-w-6xl">
        <BreadcrumbNav
          items={[
            { name: "Accueil", href: "/" },
            { name: "Blog" },
          ]}
        />

        <header className="mt-8 mb-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm border border-cbf-gold/30 mb-4">
            Blog immobilier
          </span>
          <h1 className="font-playfair text-display-lg text-cbf-black font-bold mb-5 leading-tight">
            Blog immobilier Clermont-Ferrand
          </h1>
          <p className="text-lg text-cbf-gray">
            Analyses de marché, guides d'estimation, conseils vendeur, acheteur,
            investisseur et bailleur. Rédigé par les experts CBF Conseils — sur
            la base des données réelles du marché clermontois.
          </p>
        </header>

        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-cbf-gray-soft">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={cn(
                "px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-sm border transition-all",
                filter === cat.id
                  ? "bg-cbf-black text-white border-cbf-black"
                  : "bg-white text-cbf-gray border-cbf-gray-soft hover:border-cbf-gold hover:text-cbf-gold"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-cbf-gray-light text-sm">
            Aucun article dans cette catégorie pour le moment.
          </p>
        ) : (
          <>
            {/* Article mis en avant */}
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-white p-6 md:p-10 mb-10 border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm"
              >
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div className="md:col-span-3">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-[0.6rem] uppercase tracking-wider">
                      <span className="px-2.5 py-1 bg-cbf-gold text-cbf-black font-bold rounded-sm">
                        À la une
                      </span>
                      <span className="text-cbf-gold font-bold">
                        {ARTICLE_THEMES.find((t) => t.id === featured.theme)?.label}
                      </span>
                      <span className="text-cbf-gray-light flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featured.readTime} min
                      </span>
                    </div>
                    <h2 className="font-playfair text-2xl md:text-3xl font-bold text-cbf-black mb-3 leading-tight group-hover:text-cbf-gold transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-cbf-gray leading-relaxed mb-4">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-2.5 mb-4">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-cbf-black text-cbf-gold text-[0.65rem] font-bold">
                        {getArticleAuteur(featured).initiales}
                      </span>
                      <span className="text-xs text-cbf-gray">
                        Par <strong className="text-cbf-black">{getArticleAuteur(featured).nom}</strong> · {getArticleAuteur(featured).titre}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm text-cbf-gold font-semibold">
                      Lire l'article <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="md:col-span-2 hidden md:block">
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                      <Image
                        src={getArticleImage(featured.theme)}
                        alt={featured.title}
                        fill
                        sizes="(max-width: 768px) 0px, 40vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cbf-black/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Liste des autres */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm overflow-hidden"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={getArticleImage(a.theme)}
                      alt={a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-cbf-ivory text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm border border-cbf-gold/30">
                      {ARTICLE_THEMES.find((t) => t.id === a.theme)?.label}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.65rem] text-cbf-gray-light">
                      <Clock className="h-3 w-3" />
                      {a.readTime} min
                    </span>
                  </div>
                  <h2 className="font-playfair text-xl font-bold text-cbf-black mb-3 leading-snug group-hover:text-cbf-gold transition-colors">
                    {a.title}
                  </h2>
                  <p className="text-sm text-cbf-gray flex-1 mb-4 leading-relaxed">
                    {a.description}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-cbf-black text-cbf-gold text-[0.55rem] font-bold">
                      {getArticleAuteur(a).initiales}
                    </span>
                    <span className="text-[0.7rem] text-cbf-gray-light truncate">
                      {getArticleAuteur(a).nom}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-cbf-gray-soft">
                    <span className="text-[0.65rem] text-cbf-gray-light">
                      {new Date(a.datePublished).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold">
                      Lire <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}
