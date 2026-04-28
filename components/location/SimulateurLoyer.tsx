"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { quartiers, getQuartierBySlug } from "@/data/quartiers";
import { formatPrice } from "@/lib/utils";

type TypeBien = "studio" | "T2" | "T3" | "T4" | "maison";
type Etat = "neuf" | "bon" | "moyen" | "renover";
type Meuble = "meuble" | "nu";

interface FormData {
  typeBien: TypeBien;
  surface: number;
  quartier: string;
  etat: Etat;
  meuble: Meuble;
}

interface ResultLoyer {
  loyerBas: number;
  loyerHaut: number;
  loyerMoyen: number;
  rendementBrut: number;
  rendementNet: number;
  prixAchatEstime: number;
}

// Coefficients par type de bien (multiplicateur du loyer médian / m²)
const TYPE_BIEN_COEF: Record<TypeBien, number> = {
  studio: 1.25, // /m² plus élevé sur les studios
  T2: 1.05,
  T3: 0.95,
  T4: 0.88,
  maison: 0.85,
};

const ETAT_COEF: Record<Etat, number> = {
  neuf: 1.08,
  bon: 1.0,
  moyen: 0.92,
  renover: 0.82,
};

const MEUBLE_COEF: Record<Meuble, number> = {
  meuble: 1.15,
  nu: 1.0,
};

/**
 * Hypothèse marché : rendement brut moyen 5 % à Clermont (selon quartier).
 * loyer/m²/mois ≈ prixAchat/m² * 5% / 12.
 * Ajusté par type de bien, état, meublé.
 */
function computeLoyer(d: FormData): ResultLoyer | null {
  const q = getQuartierBySlug(d.quartier);
  if (!q || !d.surface) return null;
  const refPrix = q.prixAppartement ?? q.prixMaison;
  if (!refPrix) return null;

  const rendementCible = 0.05; // 5 % brut moyen
  const loyerM2Base = (refPrix * rendementCible) / 12;

  const coef =
    TYPE_BIEN_COEF[d.typeBien] *
    ETAT_COEF[d.etat] *
    MEUBLE_COEF[d.meuble];

  const loyerMoyen = Math.round(loyerM2Base * coef * d.surface);
  const loyerBas = Math.round(loyerMoyen * 0.92);
  const loyerHaut = Math.round(loyerMoyen * 1.08);

  const prixAchatEstime = Math.round(refPrix * d.surface);
  const rendementBrut = ((loyerMoyen * 12) / prixAchatEstime) * 100;
  // Net : on retire ~22 % de charges (taxe foncière, copro, vacance, gestion)
  const rendementNet = rendementBrut * 0.78;

  return {
    loyerMoyen,
    loyerBas,
    loyerHaut,
    rendementBrut,
    rendementNet,
    prixAchatEstime,
  };
}

export function SimulateurLoyer() {
  const [data, setData] = useState<FormData>({
    typeBien: "T2",
    surface: 45,
    quartier: "",
    etat: "bon",
    meuble: "nu",
  });
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => computeLoyer(data), [data]);

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setShowResult(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="bg-white border border-cbf-gray-soft rounded-sm shadow-lg p-6 md:p-10">
      <div className="flex items-center gap-2 mb-6">
        <HomeIcon className="h-5 w-5 text-cbf-gold" />
        <h3 className="font-playfair text-2xl font-bold text-cbf-black">
          Simulateur de loyer & rendement
        </h3>
      </div>
      <p className="text-sm text-cbf-gray mb-6">
        Estimation indicative basée sur le marché clermontois 2026.
      </p>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Type de bien</Label>
            <Select
              value={data.typeBien}
              onChange={(e) => update("typeBien", e.target.value as TypeBien)}
            >
              <option value="studio">Studio</option>
              <option value="T2">T2</option>
              <option value="T3">T3</option>
              <option value="T4">T4</option>
              <option value="maison">Maison</option>
            </Select>
          </div>
          <div>
            <Label>Surface (m²)</Label>
            <Input
              type="number"
              min={9}
              max={500}
              value={data.surface}
              onChange={(e) => update("surface", Number(e.target.value))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Quartier ou commune</Label>
            <Select
              value={data.quartier}
              onChange={(e) => update("quartier", e.target.value)}
            >
              <option value="" disabled>
                Sélectionner…
              </option>
              <optgroup label="Clermont-Ferrand">
                {quartiers
                  .filter((q) => q.type === "quartier")
                  .map((q) => (
                    <option key={q.slug} value={q.slug}>
                      {q.nom}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Communes agglo">
                {quartiers
                  .filter((q) => q.type === "commune")
                  .map((q) => (
                    <option key={q.slug} value={q.slug}>
                      {q.nom}
                    </option>
                  ))}
              </optgroup>
            </Select>
          </div>
          <div>
            <Label>État du bien</Label>
            <Select
              value={data.etat}
              onChange={(e) => update("etat", e.target.value as Etat)}
            >
              <option value="neuf">Neuf ou rénové</option>
              <option value="bon">Bon état</option>
              <option value="moyen">État moyen</option>
              <option value="renover">À rafraîchir</option>
            </Select>
          </div>
          <div>
            <Label>Type de location</Label>
            <Select
              value={data.meuble}
              onChange={(e) => update("meuble", e.target.value as Meuble)}
            >
              <option value="nu">Nue</option>
              <option value="meuble">Meublée</option>
            </Select>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!data.quartier || !data.surface}
        >
          <Sparkles className="h-4 w-4" />
          Estimer le loyer et le rendement
        </Button>
      </form>

      {showResult && result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-8 p-6 md:p-8 bg-gradient-to-br from-cbf-black to-cbf-anthracite text-white rounded-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-cbf-gold" />
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
              Estimation indicative
            </span>
          </div>

          <p className="text-sm text-cbf-gray-light mb-1">Loyer mensuel estimé</p>
          <p className="font-playfair text-3xl md:text-4xl font-bold mb-1">
            {formatPrice(result.loyerBas)} — {formatPrice(result.loyerHaut)}
            <span className="text-base font-normal text-cbf-gray-light"> /mois</span>
          </p>
          <p className="text-cbf-gray-light text-sm mb-6">
            Médiane : {formatPrice(result.loyerMoyen)} /mois
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t border-white/10">
            <div className="bg-white/5 border border-white/10 rounded-sm p-4">
              <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold mb-1 flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3" /> Rendement brut
              </p>
              <p className="font-playfair text-2xl font-bold">
                {result.rendementBrut.toFixed(1)} %
              </p>
              <p className="text-xs text-cbf-gray-light mt-1">
                Loyer × 12 / prix d'achat
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-sm p-4">
              <p className="text-[0.6rem] uppercase tracking-wider text-cbf-gold font-bold mb-1">
                Rendement net (estimé)
              </p>
              <p className="font-playfair text-2xl font-bold">
                {result.rendementNet.toFixed(1)} %
              </p>
              <p className="text-xs text-cbf-gray-light mt-1">
                Après charges, taxe foncière, vacance
              </p>
            </div>
          </div>

          <div className="mt-5 bg-white/10 border border-white/20 rounded-sm p-4 text-xs leading-relaxed text-cbf-gray-light">
            Estimation basée sur les prix moyens du quartier et un rendement brut
            cible de 5 %. Pour une analyse précise (loyer optimal, fiscalité,
            choix nu/meublé/LMNP), nos experts vous accompagnent gratuitement.
          </div>
        </motion.div>
      )}
    </div>
  );
}
