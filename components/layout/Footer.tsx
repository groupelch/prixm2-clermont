import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { quartiers } from "@/data/quartiers";
import { PHONE, PHONE_DISPLAY } from "@/lib/utils";

export function Footer() {
  const topQuartiers = quartiers.filter((q) => q.type === "quartier").slice(0, 6);

  return (
    <footer className="bg-cbf-black text-cbf-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-playfair text-3xl font-bold leading-none">
                prixm
                <sup className="text-cbf-gold">2</sup>
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-cbf-gray-light">
                clermontferrand.fr
              </span>
            </div>
            <p className="text-sm text-cbf-gray-light leading-relaxed mb-6 max-w-xs">
              Le référentiel des prix immobiliers à Clermont-Ferrand. Données par
              quartier, estimation gratuite, conseils d'experts.
            </p>
            <p className="text-xs text-cbf-gray-light italic mb-4">
              Un service proposé par{" "}
              <a
                href="https://www.cbfconseils.com"
                target="_blank"
                rel="noopener"
                className="text-cbf-gold hover:underline"
              >
                CBF Conseils
              </a>{" "}
              — agence immobilière à Clermont-Ferrand.
            </p>
            <div className="space-y-1.5 text-xs text-cbf-gray-light">
              <p className="text-[0.6rem] uppercase tracking-[0.15em] text-cbf-gold font-bold mb-2">
                Nos services
              </p>
              <a
                href="https://www.cbfconseils.com"
                target="_blank"
                rel="noopener"
                className="block hover:text-cbf-gold transition-colors"
              >
                → Transaction immobilière CBF Conseils
              </a>
              <a
                href="https://app.mon-assureur.com"
                target="_blank"
                rel="noopener"
                className="block hover:text-cbf-gold transition-colors"
              >
                → Assurance PNO &amp; RC Pro — MonAssureur
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Accueil</Link></li>
              <li><Link href="/estimation" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Estimation</Link></li>
              <li><Link href="/vendre-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Vendre</Link></li>
              <li><Link href="/louer-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Louer</Link></li>
              <li><Link href="/investir-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Investir</Link></li>
              <li><Link href="/prix-immobilier-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Prix immobilier</Link></li>
              <li><Link href="/blog" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Blog</Link></li>
              <li><Link href="/guide" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Guides immobiliers</Link></li>
              <li><Link href="/vendre" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Vendre par quartier</Link></li>
              <li><Link href="/estimation-quartier" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Estimation par quartier</Link></li>
              <li><Link href="/faq" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">FAQ</Link></li>
              <li><Link href="/calculateur-frais-notaire" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Calculateur frais notaire</Link></li>
              <li><Link href="/comparateur-quartiers" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Comparateur quartiers</Link></li>
              <li><Link href="/glossaire" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Glossaire immobilier</Link></li>
              <li><Link href="/methodologie" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Méthodologie</Link></li>
              <li><Link href="/biens-off-market-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Biens off-market</Link></li>
              <li><Link href="/a-propos" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">À propos</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
              Ressources
            </h4>
            <ul className="space-y-2 text-sm mb-6">
              <li><Link href="/meilleurs-agents-immobiliers-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Meilleurs agents immobiliers</Link></li>
              <li><Link href="/meilleurs-architectes-interieur-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Architectes d'intérieur</Link></li>
              <li><Link href="/meilleurs-diagnostiqueurs-dpe-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Diagnostiqueurs DPE</Link></li>
              <li><Link href="/meilleurs-demenageurs-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Déménageurs Clermont</Link></li>
              <li><Link href="/meilleurs-plombiers-clermont-ferrand" className="text-cbf-gray-light hover:text-cbf-gold transition-colors">Plombiers Clermont</Link></li>
            </ul>
            <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
              Quartiers populaires
            </h4>
            <ul className="space-y-2 text-sm">
              {topQuartiers.map((q) => (
                <li key={q.slug}>
                  <Link
                    href={`/prix-m2/${q.slug}`}
                    className="text-cbf-gray-light hover:text-cbf-gold transition-colors"
                  >
                    {q.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-cbf-gray-light">
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-cbf-gold mt-0.5 flex-shrink-0" />
                <a href={`tel:${PHONE}`} className="hover:text-cbf-gold transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-cbf-gold mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contact@cbfconseils.com"
                  className="hover:text-cbf-gold transition-colors"
                >
                  contact@cbfconseils.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-cbf-gold mt-0.5 flex-shrink-0" />
                <span>Clermont-Ferrand — Puy-de-Dôme</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-cbf-anthracite">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cbf-gray-light">
          <p>
            © {new Date().getFullYear()} CBF Conseils — Tous droits réservés.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
            <Link href="/politique-confidentialite" className="hover:text-cbf-gold transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="/mentions-legales" className="hover:text-cbf-gold transition-colors">
              Mentions légales
            </Link>
            <Link href="/contact" className="hover:text-cbf-gold transition-colors">
              Contact
            </Link>
            <Link href="/a-propos" className="hover:text-cbf-gold transition-colors">
              À propos
            </Link>
            <Link href="/methodologie" className="hover:text-cbf-gold transition-colors">
              Méthodologie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
