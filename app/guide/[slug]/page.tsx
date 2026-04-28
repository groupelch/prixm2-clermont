import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { guides, getGuideBySlug, getLatestGuides } from "@/data/guides";
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
    { name: "Guides", url: `${SITE_URL}/guide/${g.slug}` },
    { name: g.titre, url: `${SITE_URL}/guide/${g.slug}` },
  ];

  const others = getLatestGuides(4).filter((x) => x.slug !== g.slug).slice(0, 3);

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
              { name: "Guides", href: "/" },
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

      {g.faq && g.faq.length > 0 && (
        <FaqAccordion items={g.faq} title="Questions fréquentes" />
      )}
    </>
  );
}
