import { HeroSection } from "@/components/home/HeroSection";
import { QuickLinks } from "@/components/home/QuickLinks";
import { QuartierSearch } from "@/components/home/QuartierSearch";
import { MapWrapper } from "@/components/home/MapWrapper";
import { ChiffresCles } from "@/components/home/ChiffresCles";
import { TopQuartiers } from "@/components/home/TopQuartiers";
import { WhyPricesVary } from "@/components/home/WhyPricesVary";
import { EstimationCta } from "@/components/home/EstimationCta";
import { TestimonialsBlock } from "@/components/home/TestimonialsBlock";
import { GuideCards } from "@/components/home/GuideCards";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { FinalCta } from "@/components/home/FinalCta";
import { DatasetSchema } from "@/components/common/SchemaOrg";

export default function HomePage() {
  return (
    <>
      <DatasetSchema />
      <HeroSection />

      <QuickLinks />

      <section id="carte" className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-8">
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Carte interactive
            </span>
            <h2 className="font-playfair text-display-md text-cbf-black font-bold mt-2 mb-3">
              Tous les prix m² de la métropole
            </h2>
            <p className="text-cbf-gray">
              Cliquez sur une bulle pour voir le prix moyen et accéder au
              décryptage du quartier.
            </p>
          </div>
          <MapWrapper />
        </div>
      </section>

      <QuartierSearch />
      <ChiffresCles />
      <TopQuartiers />
      <WhyPricesVary />
      <EstimationCta />
      <TestimonialsBlock />
      <GuideCards />
      <FaqAccordion />
      <FinalCta />
    </>
  );
}
