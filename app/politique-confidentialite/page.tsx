import type { Metadata } from "next";
import { BreadcrumbNav } from "@/components/common/BreadcrumbNav";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et traitement des données personnelles sur prixm2clermontferrand.fr.",
  path: "/politique-confidentialite",
  noIndex: false,
});

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container max-w-3xl">
        <BreadcrumbNav
          items={[{ name: "Accueil", href: "/" }, { name: "Politique de confidentialité" }]}
        />
        <h1 className="font-playfair text-display-lg text-cbf-black font-bold mt-8 mb-8">
          Politique de confidentialité
        </h1>

        <div className="prose-cbf">
          <p>
            La présente politique de confidentialité décrit la manière dont CBF Conseils
            collecte, utilise et protège les données personnelles des utilisateurs du
            site prixm2clermontferrand.fr.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement est <strong>CBF Conseils</strong>, agence
            immobilière située à Clermont-Ferrand. Pour toute question relative à
            vos données : contact@cbfconseils.com.
          </p>

          <h2>2. Données collectées</h2>
          <p>Nous collectons les données suivantes lorsque vous utilisez nos formulaires :</p>
          <ul>
            <li>Identité : prénom, nom</li>
            <li>Coordonnées : email, téléphone, adresse du bien</li>
            <li>Informations sur le bien : type, surface, état, quartier</li>
            <li>Données de navigation : pages consultées, sources UTM</li>
          </ul>

          <h2>3. Finalités du traitement</h2>
          <p>Vos données sont utilisées exclusivement pour :</p>
          <ul>
            <li>Traiter votre demande d'estimation ou de rappel</li>
            <li>Vous proposer un accompagnement personnalisé pour votre projet</li>
            <li>Améliorer la qualité de notre site et de nos services</li>
          </ul>

          <h2>4. Base légale</h2>
          <p>
            Le traitement repose sur votre consentement (case RGPD cochée lors du formulaire)
            et sur l'exécution de mesures précontractuelles à votre demande.
          </p>

          <h2>5. Durée de conservation</h2>
          <p>
            Vos données sont conservées pendant la durée nécessaire au traitement de votre
            demande, et au maximum 3 ans à compter du dernier contact actif.
          </p>

          <h2>6. Destinataires</h2>
          <p>
            Vos données sont strictement réservées aux équipes CBF Conseils en charge de
            votre dossier. Aucune donnée n'est revendue ou cédée à des tiers à des fins
            commerciales.
          </p>

          <h2>7. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit d'effacement</li>
            <li>Droit à la portabilité</li>
            <li>Droit d'opposition</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </ul>
          <p>
            Pour exercer vos droits : envoyez votre demande à contact@cbfconseils.com en
            joignant une copie d'une pièce d'identité. Vous pouvez également déposer une
            réclamation auprès de la CNIL (www.cnil.fr).
          </p>

          <h2>8. Cookies</h2>
          <p>
            Le site utilise des cookies de mesure d'audience (Google Analytics) anonymisés.
            Aucun cookie publicitaire n'est déposé sans votre consentement explicite.
          </p>

          <h2>9. Sécurité</h2>
          <p>
            Nous mettons en place des mesures techniques et organisationnelles
            appropriées pour protéger vos données contre tout accès non autorisé,
            altération ou perte.
          </p>

          <p className="text-sm text-cbf-gray-light italic mt-10">
            Dernière mise à jour : 2025
          </p>
        </div>
      </div>
    </section>
  );
}
