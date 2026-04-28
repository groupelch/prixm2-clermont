"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";

type TypeBien = "ancien" | "neuf";

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);

interface Result {
  prix: number;
  typeBien: TypeBien;
  montantPret: number;
  // Frais notaire
  droitsMutation: number;
  emoluments: number;
  fraisDivers: number;
  totalFraisNotaire: number;
  pctFraisNotaire: number;
  // Frais bancaires
  fraisBancaires: number;
  // Total
  totalAcquisition: number;
}

function compute(prix: number, typeBien: TypeBien, montantPret: number): Result {
  const safePrix = Math.max(0, prix || 0);
  const safePret = Math.max(0, montantPret || 0);

  // Taux approximatifs (pédagogique)
  const taux =
    typeBien === "neuf"
      ? { mutation: 0.00715, emolu: 0.015, divers: 0.003 } // ≈ 2.5%
      : { mutation: 0.058, emolu: 0.015, divers: 0.002 }; // ≈ 7.5%

  const droitsMutation = Math.round(safePrix * taux.mutation);
  const emoluments = Math.round(safePrix * taux.emolu);
  const fraisDivers = Math.round(safePrix * taux.divers);
  const totalFraisNotaire = droitsMutation + emoluments + fraisDivers;
  const pctFraisNotaire = safePrix > 0 ? (totalFraisNotaire / safePrix) * 100 : 0;

  // Frais bancaires (~1.2% pour pédagogie : garantie + dossier)
  const fraisBancaires = Math.round(safePret * 0.012);

  const totalAcquisition = safePrix + totalFraisNotaire + fraisBancaires;

  return {
    prix: safePrix,
    typeBien,
    montantPret: safePret,
    droitsMutation,
    emoluments,
    fraisDivers,
    totalFraisNotaire,
    pctFraisNotaire,
    fraisBancaires,
    totalAcquisition,
  };
}

export function CalculateurFraisNotaire() {
  const [prix, setPrix] = useState<number>(250000);
  const [typeBien, setTypeBien] = useState<TypeBien>("ancien");
  const [pretActif, setPretActif] = useState(false);
  const [montantPret, setMontantPret] = useState<number>(200000);

  const r = useMemo(
    () => compute(prix, typeBien, pretActif ? montantPret : 0),
    [prix, typeBien, pretActif, montantPret],
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Formulaire */}
      <div className="bg-white border border-cbf-gray-soft rounded-sm p-6 md:p-8">
        <h2 className="font-playfair text-2xl font-bold text-cbf-black mb-6">
          Votre projet
        </h2>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="prix"
              className="block text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-2"
            >
              Prix du bien
            </label>
            <div className="relative">
              <input
                id="prix"
                type="number"
                min={0}
                step={1000}
                value={prix || ""}
                onChange={(e) => setPrix(Number(e.target.value))}
                className="w-full bg-cbf-ivory border border-cbf-gray-soft rounded-sm px-4 py-3 pr-12 text-lg font-semibold focus:outline-none focus:border-cbf-gold transition-colors"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cbf-gray-light font-semibold">
                €
              </span>
            </div>
          </div>

          <div>
            <span className="block text-[0.65rem] uppercase tracking-wider text-cbf-gold font-bold mb-2">
              Type de bien
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(["ancien", "neuf"] as TypeBien[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTypeBien(t)}
                  className={`px-4 py-3 text-sm font-semibold rounded-sm border transition-colors ${
                    typeBien === t
                      ? "bg-cbf-black text-white border-cbf-black"
                      : "bg-white text-cbf-black border-cbf-gray-soft hover:border-cbf-gold"
                  }`}
                >
                  {t === "ancien" ? "Ancien" : "Neuf / VEFA"}
                </button>
              ))}
            </div>
            <p className="text-xs text-cbf-gray-light mt-2">
              Ancien : ~7,5% de frais — Neuf/VEFA : ~2,5%
            </p>
          </div>

          <div className="pt-4 border-t border-cbf-gray-soft">
            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={pretActif}
                onChange={(e) => setPretActif(e.target.checked)}
                className="h-4 w-4 accent-cbf-gold"
              />
              <span className="text-sm font-semibold text-cbf-black">
                J&apos;ajoute un prêt immobilier
              </span>
            </label>
            {pretActif && (
              <div className="relative mt-3">
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={montantPret || ""}
                  onChange={(e) => setMontantPret(Number(e.target.value))}
                  placeholder="Montant emprunté"
                  className="w-full bg-cbf-ivory border border-cbf-gray-soft rounded-sm px-4 py-3 pr-12 focus:outline-none focus:border-cbf-gold transition-colors"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cbf-gray-light font-semibold">
                  €
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Résultat */}
      <div className="bg-cbf-black text-white rounded-sm p-6 md:p-8">
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
          Estimation
        </span>
        <h2 className="font-playfair text-2xl font-bold mt-1 mb-6">
          Frais de notaire
        </h2>

        <div className="mb-6 pb-6 border-b border-white/10">
          <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gray-light mb-1">
            Total frais de notaire
          </p>
          <p className="font-playfair text-5xl font-bold text-cbf-gold leading-none">
            {fmt(r.totalFraisNotaire)}
          </p>
          <p className="text-sm text-cbf-gray-light mt-2">
            soit {r.pctFraisNotaire.toFixed(2)}% du prix d&apos;achat
          </p>
        </div>

        <div className="space-y-3 text-sm mb-6">
          <Row label="Droits de mutation" value={fmt(r.droitsMutation)} />
          <Row label="Émoluments du notaire" value={fmt(r.emoluments)} />
          <Row label="Frais & débours divers" value={fmt(r.fraisDivers)} />
          {r.fraisBancaires > 0 && (
            <Row
              label="Frais bancaires (≈ 1,2%)"
              value={fmt(r.fraisBancaires)}
              accent
            />
          )}
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-[0.65rem] uppercase tracking-wider text-cbf-gray-light mb-1">
            Coût total d&apos;acquisition
          </p>
          <p className="font-playfair text-3xl font-bold text-white">
            {fmt(r.totalAcquisition)}
          </p>
        </div>

        <Link
          href="/estimation"
          className="mt-8 inline-flex items-center gap-2 bg-cbf-gold text-cbf-black px-5 py-3 text-sm font-semibold rounded-sm hover:bg-cbf-gold-light transition-colors"
        >
          Estimer mon bien
          <ArrowRight className="h-4 w-4" />
        </Link>

        <p className="mt-4 text-xs text-cbf-gray-light flex items-start gap-2">
          <Info className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
          <span>
            Estimation pédagogique. Les montants définitifs dépendent du barème
            officiel des notaires et de la nature exacte du bien.
          </span>
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-cbf-gray-light">{label}</span>
      <span
        className={`font-semibold ${accent ? "text-cbf-gold" : "text-white"}`}
      >
        {value}
      </span>
    </div>
  );
}
