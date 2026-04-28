import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { BreadcrumbSchema } from "@/components/common/SchemaOrg";
import { FormRappel } from "@/components/forms/FormRappel";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL, PHONE, PHONE_DISPLAY } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Contact — CBF Conseils Clermont-Ferrand",
  description:
    "Contactez CBF Conseils, agence immobilière à Clermont-Ferrand : téléphone, email, demande de rappel.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: SITE_URL },
          { name: "Contact", url: `${SITE_URL}/contact` },
        ]}
      />

      <section className="bg-cbf-ivory pt-10 pb-16 md:pt-14 md:pb-20">
        <div className="container max-w-5xl">
          <BreadcrumbNav items={[{ name: "Accueil", href: "/" }, { name: "Contact" }]} />
          <div className="mt-8 grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
                Contact
              </span>
              <h1 className="font-playfair text-display-lg text-cbf-black font-bold mt-3 mb-5">
                Parlons de votre projet immobilier
              </h1>
              <p className="text-cbf-gray text-lg mb-10 leading-relaxed">
                Une équipe d'experts à Clermont-Ferrand depuis plus de 10 ans.
                Estimation, vente, achat, investissement : on vous accompagne.
              </p>

              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                      Téléphone
                    </p>
                    <a href={`tel:${PHONE}`} className="text-lg font-semibold text-cbf-black hover:text-cbf-gold transition-colors">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:contact@cbfconseils.com"
                      className="text-lg font-semibold text-cbf-black hover:text-cbf-gold transition-colors"
                    >
                      contact@cbfconseils.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                      Adresse
                    </p>
                    <p className="text-cbf-black">
                      Clermont-Ferrand · Puy-de-Dôme
                      <br />
                      <span className="text-sm text-cbf-gray-light">Adresse complète à venir</span>
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-11 h-11 rounded-sm bg-cbf-black text-cbf-gold flex items-center justify-center">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                      Horaires
                    </p>
                    <p className="text-cbf-black text-sm">
                      Lundi — Vendredi : 9h — 19h
                      <br />
                      Samedi : 9h — 17h
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-cbf-gray-soft rounded-sm p-6 md:p-8">
              <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-2">
                Demander un rappel
              </h2>
              <p className="text-sm text-cbf-gray mb-6">
                Laissez vos coordonnées, on vous rappelle sous 24h ouvrées.
              </p>
              <FormRappel sourcePage="/contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
