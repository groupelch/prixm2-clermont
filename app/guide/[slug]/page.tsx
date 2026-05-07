import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { guides, getGuideBySlug, getLatestGuides } from "@/data/guides";
import { articles } from "@/data/articles";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FaqPageSchema,
} from "@/components/common/SchemaOrg";
import { Button } from "@/components/ui/button";
import { FormEstimationCourt } from "@/components/forms/FormEstimationCourt";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/utils";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const g = getGuideBySlug(params.slug);
  if (!g) return { title: "Guide introuvable" };
  return buildMetadata({
    title: g.titre,
    description: g.description,
    path: `/guide/${g.slug}`,
  });
}

function renderContent(content: string): JSX.Element[] {
  return content
    .trim()
    .split(/\n\n+/)
    .map((block, i) => {
      if (block.startsWith("### ")) {
        return (
          <h3 key={i}>{block.replace(/^### /, "")}</h3>
        );
      }
      if (block.startsWith("## ")) {
        return <h2 key={i}>{block.replace(/^## /, "")}</h2>;
      }
      if (block.match(/^\| .+\|/m)) {
        // table markdown simple
        const lines = block.split("\n").filter(Boolean);
        const headers = lines[0]
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean);
        const rows = lines.slice(2).map((l) =>
          l
            .split("|")
            .map((s) => s.trim())
            .filter(Boolean)
        );
        return (
          <table key={i}>
            <thead>
              <tr>{headers.map((h, j) => <th key={j}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, j) => (
                <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").map((l) => l.replace(/^- /, ""));
        return (
          <ul key={i}>
            {items.map((it, j) => (
              <li key={j}>{it}</li>
            ))}
          </ul>
        );
      }
      // Paragraph - support **bold** and links
      const html = block
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
      return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />;
    });
}

export default function GuidePage({ params }: { params: Params }) {
  const g = getGuideBySlug(params.slug);
  if (!g) notFound();

  const breadcrumbItems = [
    { name: "Accueil", url: SITE_URL },
    { name: "Guides", url: `${SITE_URL}/guide` },
    { name: g.titre, url: `${SITE_URL}/guide/${g.slug}` },
  ];

  const others = getLatestGuides(4).filter((x) => x.slug !== g.slug).slice(0, 3);

  // Articles liés au thème du guide
  const themeToArticleTheme: Record<string, string[]> = {
    vendeur: ["vendeur"],
    acheteur: ["acheteur"],
    investisseur: ["investissement", "location"],
    marche: ["marche"],
  };
  const articleThemes = themeToArticleTheme[g.categorie] ?? ["marche"];
  const articlesLies = articles
    .filter((a) => articleThemes.includes(a.theme))
    .slice(0, 3);

  // Liens contextuels par catégorie de guide
  const contextLinks: Record<string, { href: string; label: string; desc: string }[]> = {
    vendeur: [
      { href: "/vendre-clermont-ferrand", label: "Méthode de vente CBF", desc: "5 étapes pour vendre vite et au bon prix" },
      { href: "/vendre", label: "Vendre par quartier", desc: "Prix, délais et stratégie dans votre secteur" },
      { href: "/estimation", label: "Estimation gratuite", desc: "Fourchette précise sous 48h, sans engagement" },
      { href: "/meilleurs-agents-immobiliers-clermont-ferrand", label: "Meilleurs agents immo", desc: "Choisir la bonne agence à Clermont-Ferrand" },
    ],
    acheteur: [
      { href: "/comparateur-quartiers", label: "Comparer les quartiers", desc: "Prix, délais, rendement côte à côte" },
      { href: "/prix-immobilier-clermont-ferrand", label: "Carte des prix", desc: "39 quartiers et communes analysés" },
      { href: "/calculateur-frais-notaire", label: "Calculer les frais de notaire", desc: "Estimation rapide selon le prix d'achat" },
      { href: "/glossaire", label: "Glossaire immobilier", desc: "Tous les termes expliqués clairement" },
    ],
    investisseur: [
      { href: "/investir-clermont-ferrand", label: "Investir à Clermont", desc: "Stratégie et quartiers à meilleur rendement" },
      { href: "/biens-off-market-clermont-ferrand", label: "Biens off-market", desc: "Accéder aux opportunités avant tout le monde" },
      { href: "/louer-clermont-ferrand", label: "Louer à Clermont", desc: "Loyers de référence par quartier et type de bien" },
      { href: "/comparateur-quartiers", label: "Comparer les rendements", desc: "Rentabilité par secteur en un coup d'œil" },
    ],
    marche: [
      { href: "/prix-immobilier-clermont-ferrand", label: "Tous les prix par quartier", desc: "Carte interactive + tableaux complets" },
      { href: "/methodologie", label: "Notre méthodologie", desc: "Comment nos prix sont calculés et sourcés" },
      { href: "/comparateur-quartiers", label: "Comparateur de quartiers", desc: "Comparer les indicateurs clés facilement" },
      { href: "/estimation-quartier", label: "Estimer par quartier", desc: "Valeur précise selon la localisation exacte" },
    ],
  };
  const ctxLinks = contextLinks[g.categorie] ?? contextLinks.marche;

  return (
    <>
      <ArticleSchema
        title={g.titre}
        description={g.description}
        datePublished={g.datePublication}
        url={`${SITE_URL}/guide/${g.slug}`}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      {g.faq && g.faq.length > 0 && <FaqPageSchema items={g.faq} />}

      <article className="bg-cbf-ivory pt-10 pb-20">
        <div className="container max-w-3xl">
          <BreadcrumbNav
            items={[
              { name: "Accueil", href: "/" },
              { name: "Guides", href: "/guide" },
              { name: g.titre },
            ]}
          />
          <div className="mt-8 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold rounded-sm border border-cbf-gold/30">
              {g.categorie}
            </span>
          </div>
          <h1 className="font-playfair text-display-lg text-cbf-black font-bold mb-5 leading-tight">
            {g.titre}
          </h1>
          <p className="text-lg text-cbf-gray mb-6">{g.description}</p>
          <div className="flex items-center gap-4 text-xs text-cbf-gray-light pb-8 border-b border-cbf-gray-soft mb-10">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {g.tempsLecture} de lecture
            </span>
            <span>·</span>
            <span>
              Publié le{" "}
              {new Date(g.datePublication).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="prose-cbf">{renderContent(g.contenu)}</div>

          <div className="mt-12 p-8 bg-white border border-cbf-gray-soft rounded-sm">
            <h3 className="font-playfair text-2xl font-bold text-cbf-black mb-3">
              Demander une estimation gratuite
            </h3>
            <p className="text-sm text-cbf-gray mb-5">
              Nos experts CBF Conseils analysent votre bien sous 48h.
            </p>
            <FormEstimationCourt sourcePage={`/guide/${g.slug}`} />
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container max-w-5xl">
            <h2 className="font-playfair text-2xl md:text-3xl text-cbf-black font-bold mb-8">
              Continuer la lecture
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/guide/${o.slug}`}
                  className="group block bg-cbf-ivory p-6 hover:bg-white border border-transparent hover:border-cbf-gold transition-all"
                >
                  <span className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold">
                    {o.categorie}
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-cbf-black mt-2 mb-2 group-hover:text-cbf-gold transition-colors">
                    {o.titre}
                  </h3>
                  <p className="text-xs text-cbf-gray-light flex items-center gap-1">
                    Lire le guide <ArrowRight className="h-3 w-3" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Liens contextuels selon la catégorie du guide */}
      <section className="py-14 md:py-16 bg-cbf-ivory border-t border-cbf-gray-soft">
        <div className="container max-w-5xl">
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-6">
            Ressources liées
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {ctxLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group block bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
              >
                <p className="font-playfair font-bold text-cbf-black text-sm mb-1 group-hover:text-cbf-gold transition-colors leading-snug">
                  {l.label}
                </p>
                <p className="text-xs text-cbf-gray-light">{l.desc}</p>
              </Link>
            ))}
          </div>

          {articlesLies.length > 0 && (
            <>
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
                Articles à lire
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {articlesLies.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="group block bg-white border border-cbf-gray-soft hover:border-cbf-gold transition-all rounded-sm p-5"
                  >
                    <h4 className="font-playfair text-sm font-bold text-cbf-black group-hover:text-cbf-gold transition-colors leading-snug mb-2">
                      {a.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-xs text-cbf-gold font-semibold mt-auto">
                      Lire <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {g.faq && g.faq.length > 0 && (
        <FaqAccordion items={g.faq} title="Questions fréquentes" />
      )}
    </>
  );
}
