import type { Metadata } from "next";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site prixm2clermontferrand.fr.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container max-w-3xl">
        <BreadcrumbNav items={[{ name: "Accueil", href: "/" }, { name: "Mentions légales" }]} />
        <h1 className="font-playfair text-display-lg text-cbf-black font-bold mt-8 mb-8">
          Mentions légales
        </h1>
        <div className="prose-cbf">
          <h2>Éditeur du site</h2>
          <p>
            Le site prixm2clermontferrand.fr est édité par <strong>CBF Conseils</strong>.
            <br />
            Adresse : Clermont-Ferrand · Puy-de-Dôme · France
            <br />
            Email : contact@cbfconseils.com
          </p>
          <p className="text-sm text-cbf-gray-light italic">
            Numéro SIREN, RCS, capital social, carte T : à compléter avant mise en
            ligne définitive.
          </p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>
            <br />
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
            <br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble du site (textes, données, graphismes, logos, images) est la
            propriété de CBF Conseils. Toute reproduction, même partielle, est
            interdite sans autorisation écrite préalable.
          </p>

          <h2>Données et estimations</h2>
          <p>
            Les prix indiqués sur ce site sont des estimations indicatives basées
            sur la base DVF, les annonces actives et l'expertise CBF Conseils. Ils
            ne constituent pas un engagement de valeur. Toute valorisation précise
            d'un bien nécessite une visite et une analyse personnalisée.
          </p>

          <h2>Crédits</h2>
          <p>
            Cartes : OpenStreetMap, sous licence ODbL.
            <br />
            Polices : Google Fonts.
          </p>
        </div>
      </div>
    </section>
  );
}
