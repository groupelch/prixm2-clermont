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
  ARTICLE_THEMES,
} from "@/data/articles";
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
                {formatDate(article.datePublished)}
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
            dangerouslySetInnerHTML={{ __html: article.content }}
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
