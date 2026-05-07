import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight, Tag } from "lucide-react";
import {
  articles,
  getArticleBySlug,
  getRelatedArticles,
  getArticleImage,
  getArticleAuteur,
  ARTICLE_THEMES,
} from "@/data/articles";
import { getQuartierBySlug } from "@/data/quartiers";
import { getGuidesByCategory } from "@/data/guides";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  ArticleSchema,
  BreadcrumbSchema,
} from "@/components/common/SchemaOrg";
import { Button } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return { title: "Article introuvable" };
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
  });
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticlePage({ params }: { params: Params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const themeLabel = ARTICLE_THEMES.find((t) => t.id === article.theme)?.label ?? article.theme;
  const related = getRelatedArticles(article.slug, 3);
  const auteur = getArticleAuteur(article);

  // Quartiers liés à cet article (via le champ article.quartiers)
  const quartiersLies = (article.quartiers ?? [])
    .map((slug) => getQuartierBySlug(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getQuartierBySlug>>[];

  // Guides liés — mapping thème article → catégorie guide
  const themeToCat: Record<string, "vendeur" | "acheteur" | "investisseur" | "marche"> = {
    vendeur: "vendeur",
    acheteur: "acheteur",
    investissement: "investisseur",
    location: "investisseur",
    marche: "marche",
  };
  const guideCat = themeToCat[article.theme] ?? "marche";
  const guidesLies = getGuidesByCategory(guideCat).slice(0, 3);

  // Ressources contextuelles par thème
  const ressourcesParTheme: Record<string, { href: string; label: string }[]> = {
    vendeur: [
      { href: "/meilleurs-agents-immobiliers-clermont-ferrand", label: "Meilleurs agents immobiliers" },
      { href: "/meilleurs-diagnostiqueurs-dpe-clermont-ferrand", label: "Diagnostiqueurs DPE certifiés" },
      { href: "/calculateur-frais-notaire", label: "Calculateur frais de notaire" },
      { href: "/vendre", label: "Stratégie de vente par quartier" },
    ],
    acheteur: [
      { href: "/comparateur-quartiers", label: "Comparateur de quartiers" },
      { href: "/calculateur-frais-notaire", label: "Calculateur frais de notaire" },
      { href: "/glossaire", label: "Glossaire immobilier" },
      { href: "/prix-immobilier-clermont-ferrand", label: "Prix par quartier" },
    ],
    investissement: [
      { href: "/biens-off-market-clermont-ferrand", label: "Biens off-market" },
      { href: "/comparateur-quartiers", label: "Comparer les rendements" },
      { href: "/louer-clermont-ferrand", label: "Louer à Clermont-Ferrand" },
      { href: "/estimation-quartier", label: "Estimation par quartier" },
    ],
    location: [
      { href: "/louer-clermont-ferrand", label: "Louer à Clermont-Ferrand" },
      { href: "/glossaire", label: "Glossaire immobilier" },
      { href: "/biens-off-market-clermont-ferrand", label: "Biens off-market" },
      { href: "/meilleurs-architectes-interieur-clermont-ferrand", label: "Architectes d'intérieur" },
    ],
    marche: [
      { href: "/prix-immobilier-clermont-ferrand", label: "Prix par quartier" },
      { href: "/methodologie", label: "Notre méthodologie" },
      { href: "/comparateur-quartiers", label: "Comparateur de quartiers" },
      { href: "/estimation-quartier", label: "Estimer son bien" },
    ],
  };
  const ressources = ressourcesParTheme[article.theme] ?? ressourcesParTheme.marche;

  const breadcrumb = [
    { name: "Accueil", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: article.title, url: `${SITE_URL}/blog/${article.slug}` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumb} />
      <ArticleSchema
        title={article.title}
        description={article.description}
        datePublished={article.datePublished}
        url={`${SITE_URL}/blog/${article.slug}`}
        authorName={auteur.nom}
        authorType={auteur.id === "louis" ? "Person" : "Organization"}
      />

      <article className="bg-cbf-ivory pt-10 pb-16">
        <div className="container max-w-3xl">
          <BreadcrumbNav
            items={[
              { name: "Accueil", href: "/" },
              { name: "Blog", href: "/blog" },
              { name: article.title },
            ]}
          />

          <header className="mt-8 mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-5 text-[0.65rem] uppercase tracking-[0.18em]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-cbf-gold font-bold rounded-sm border border-cbf-gold/30">
                <Tag className="h-3 w-3" /> {themeLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-cbf-gray-light">
                <Calendar className="h-3 w-3" />
                <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5 text-cbf-gray-light">
                <Clock className="h-3 w-3" />
                {article.readTime} min de lecture
              </span>
            </div>
            <h1 className="font-playfair text-display-lg text-cbf-black font-bold leading-tight mb-5">
              {article.title}
            </h1>
            <p className="text-lg text-cbf-gray leading-relaxed">
              {article.description}
            </p>
            <div className="flex items-center gap-3 mt-6 pt-5 border-t border-cbf-gray-soft">
              <span className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-cbf-black text-cbf-gold text-sm font-bold">
                {auteur.initiales}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold text-cbf-black">{auteur.nom}</p>
                <p className="text-xs text-cbf-gray-light">{auteur.titre}</p>
              </div>
            </div>
            <div className="relative aspect-video w-full mt-8 rounded-sm overflow-hidden shadow-md">
              <Image
                src={getArticleImage(article.theme)}
                alt={article.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
            <p className="text-[0.65rem] text-cbf-gray-light/50 mt-1.5 text-right">Photo : Unsplash</p>
          </header>

          <div
            className="prose-article"
            dangerouslySetInnerHTML={{
              __html: article.content.replace(
                /href="\/estimation"/g,
                `href="/estimation?utm_source=article&utm_medium=blog&utm_campaign=${article.slug}"`
              ),
            }}
          />

          {/* CTA fin d'article */}
          <div className="mt-14 bg-cbf-black text-white rounded-sm p-8 md:p-10 text-center">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-3">
              Estimation gratuite
            </p>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3">
              Vous souhaitez connaître la vraie valeur de votre bien ?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
              Nos experts CBF Conseils analysent votre bien gratuitement, en
              croisant les données DVF, les ventes récentes locales et
              l'expertise terrain. Réponse sous 48 heures.
            </p>
            <Link href="/estimation">
              <Button variant="primary" size="lg" className="group">
                Obtenir mon estimation gratuite
                <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Quartiers liés — maillage interne vers /prix-m2/[slug] */}
          {quartiersLies.length > 0 && (
            <section className="mt-12 pt-8 border-t border-cbf-gray-soft">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
                Prix m² par quartier
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {quartiersLies.map((q) => (
                  <Link
                    key={q.slug}
                    href={`/prix-m2/${q.slug}`}
                    className="group flex items-center justify-between gap-4 bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-4"
                  >
                    <div>
                      <p className="font-playfair text-base font-bold text-cbf-black group-hover:text-cbf-gold transition-colors">
                        {q.nom}
                      </p>
                      <p className="text-xs text-cbf-gray-light mt-0.5">
                        {q.prixAppartement
                          ? `${q.prixAppartement.toLocaleString("fr-FR")} €/m² · appart.`
                          : q.prixMaison
                          ? `${q.prixMaison.toLocaleString("fr-FR")} €/m² · maison`
                          : "Voir les données"}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className={`text-sm font-bold ${q.evolution12m?.startsWith("+") ? "text-cbf-success" : "text-red-500"}`}>
                        {q.evolution12m}
                      </p>
                      <p className="text-[0.6rem] text-cbf-gray-light">12 mois</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Guides approfondis */}
          {guidesLies.length > 0 && (
            <section className="mt-12 pt-8 border-t border-cbf-gray-soft">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
                Guides complets
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {guidesLies.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/guide/${g.slug}`}
                    className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-4"
                  >
                    <h4 className="font-playfair text-sm font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-snug mb-2">
                      {g.titre}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold mt-auto">
                      Lire le guide <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Ressources utiles */}
          <section className="mt-10 pt-8 border-t border-cbf-gray-soft">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
              Ressources utiles
            </p>
            <div className="flex flex-wrap gap-2">
              {ressources.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-cbf-gray-soft hover:border-cbf-gold hover:text-cbf-gold text-sm text-cbf-black rounded-sm transition-all"
                >
                  {r.label} <ArrowRight className="h-3 w-3 text-cbf-gold" />
                </Link>
              ))}
            </div>
          </section>

          {/* Articles liés */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-cbf-gray-soft">
              <h3 className="font-playfair text-2xl text-cbf-black font-bold mb-6">
                Articles liés
              </h3>
              <div className="grid md:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group flex flex-col bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm overflow-hidden"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={getArticleImage(r.theme)}
                        alt={r.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <span className="inline-flex items-center px-2 py-0.5 bg-cbf-ivory text-[0.55rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm border border-cbf-gold/30 mb-3 self-start">
                        {ARTICLE_THEMES.find((t) => t.id === r.theme)?.label ?? r.theme}
                      </span>
                      <h4 className="font-playfair text-base font-bold text-cbf-black leading-snug group-hover:text-cbf-gold transition-colors mb-2">
                        {r.title}
                      </h4>
                      <p className="text-xs text-cbf-gray-light mt-auto">
                        {r.readTime} min · {formatDate(r.datePublished)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
