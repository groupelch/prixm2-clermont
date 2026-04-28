"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { estimationSchema, type EstimationFormData } from "@/lib/schema";
import { quartiers, getQuartierBySlug } from "@/data/quartiers";
import { formatPrice } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Coefficients moteur d'estimation
// -----------------------------------------------------------------------------

const ETAT_COEFS: Record<string, number> = {
  excellent: 1.1,
  bon: 1.0,
  renover: 0.9,
  "renover-tout": 0.8,
};
const DPE_COEFS: Record<string, number> = {
  "A-B": 1.05,
  "C-D": 1.0,
  "E-F-G": 0.92,
  inconnu: 1.0,
};
const EXPOSITION_COEFS: Record<string, number> = {
  sud: 1.03,
  traversant: 1.04,
  est: 1.01,
  ouest: 1.0,
  nord: 0.98,
  inconnu: 1.0,
};
const VUE_COEFS: Record<string, number> = {
  degagee: 1.04,
  normale: 1.0,
  bouchee: 0.97,
};
const TYPE_IMMEUBLE_COEFS: Record<string, number> = {
  haussmannien: 1.07,
  "ancien-pierre": 1.05,
  "annees-30-50": 1.02,
  "annees-60-80": 0.97,
  recent: 1.02,
  neuf: 1.05,
  autre: 1.0,
};

interface SimResult {
  bas: number;
  haut: number;
  central: number;
  prixM2: number;
  details: {
    coefEtat: number;
    coefDpe: number;
    coefExpo: number;
    coefVue: number;
    coefImmeuble: number;
    coefEtage: number;
    bonusParking: number;
    bonusTravaux: number;
  };
}

function computeEstimation(data: EstimationFormData): SimResult | null {
  const q = getQuartierBySlug(data.quartier);
  if (!q) return null;
  const refPrix =
    data.type_bien === "maison"
      ? q.prixMaison ?? q.prixAppartement
      : q.prixAppartement ?? q.prixMaison;
  if (!refPrix) return null;

  const coefEtat = ETAT_COEFS[data.etat] ?? 1;
  const coefDpe = DPE_COEFS[data.dpe] ?? 1;
  const coefExpo = EXPOSITION_COEFS[data.exposition ?? "inconnu"] ?? 1;
  const coefVue = VUE_COEFS[data.vue ?? "normale"] ?? 1;
  const coefImmeuble = TYPE_IMMEUBLE_COEFS[data.type_immeuble ?? "autre"] ?? 1;

  // Étage : appart uniquement
  let coefEtage = 1;
  if (data.type_bien === "appartement" && typeof data.etage === "number") {
    if (data.etage >= 3 && !data.ascenseur) {
      coefEtage = 0.97; // -3 % étage haut sans ascenseur
    } else if (data.etage >= 4 && data.ascenseur) {
      coefEtage = 1.05; // dernier étage avec ascenseur
    } else if (data.etage === 0) {
      coefEtage = 0.96; // RDC
    }
  }

  // Travaux récents : +3 % chacun cuisine/sdb, +2 % isolation
  let coefTravaux = 1;
  if (data.travaux_cuisine_recents) coefTravaux *= 1.03;
  if (data.travaux_sdb_recents) coefTravaux *= 1.03;
  if (data.travaux_isolation) coefTravaux *= 1.02;
  const bonusTravaux =
    (data.travaux_cuisine_recents ? 0.03 : 0) +
    (data.travaux_sdb_recents ? 0.03 : 0) +
    (data.travaux_isolation ? 0.02 : 0);

  // Prix m² ajusté
  const prixM2 =
    refPrix *
    coefEtat *
    coefDpe *
    coefExpo *
    coefVue *
    coefImmeuble *
    coefEtage *
    coefTravaux;

  // Forfaits fixes
  const bonusParking = data.parking ? 12000 : 0;
  const bonusCave = data.cave ? 4000 : 0;
  const bonusGardien = data.digicode_gardien ? 3000 : 0;

  const central =
    prixM2 * data.surface + bonusParking + bonusCave + bonusGardien;

  return {
    central: Math.round(central),
    bas: Math.round(central * 0.92),
    haut: Math.round(central * 1.08),
    prixM2: Math.round(prixM2),
    details: {
      coefEtat,
      coefDpe,
      coefExpo,
      coefVue,
      coefImmeuble,
      coefEtage,
      bonusParking,
      bonusTravaux,
    },
  };
}

// -----------------------------------------------------------------------------
// Composant principal
// -----------------------------------------------------------------------------

const STEPS = [
  { n: 1, label: "Votre bien" },
  { n: 2, label: "État & adresse" },
  { n: 3, label: "Critères premium" },
  { n: 4, label: "Situation & travaux" },
  { n: 5, label: "Coordonnées" },
];

export function SimulateurEstimation() {
  const methods = useForm<EstimationFormData>({
    resolver: zodResolver(estimationSchema),
    mode: "onTouched",
    defaultValues: {
      type_bien: "appartement",
      exterieur: "aucun",
      dpe: "inconnu",
      delai_vente: "reflechis",
      objectif: "vente",
      etat: "bon",
      exposition: "inconnu",
      vue: "normale",
      ascenseur: false,
      cave: false,
      digicode_gardien: false,
      type_immeuble: "autre",
      travaux_cuisine_recents: false,
      travaux_sdb_recents: false,
      travaux_isolation: false,
      consentement_rgpd: true as unknown as true,
    },
  });

  const [step, setStep] = useState(1);
  const [result, setResult] = useState<SimResult | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const goNext = async () => {
    let fields: (keyof EstimationFormData)[] = [];
    if (step === 1) fields = ["type_bien", "surface", "nb_pieces"];
    if (step === 2) fields = ["etat", "adresse", "quartier"];
    // Steps 3-4 : pas de champs obligatoires bloquants.
    const ok = fields.length > 0 ? await methods.trigger(fields) : true;
    if (!ok) return;

    // À la fin de l'étape 4 → on calcule le résultat à montrer en étape 5.
    if (step === 4) {
      const data = methods.getValues();
      setResult(computeEstimation(data));
    }
    setStep((s) => Math.min(5, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const onFinalSubmit = async (data: EstimationFormData) => {
    setSubmitStatus("loading");
    setErrorMsg(null);
    try {
      const payload = {
        ...data,
        type: "simulateur",
        source_page: "/estimation",
        source_quartier: data.quartier,
      };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Erreur");
      }
      setSubmitStatus("success");
    } catch (e) {
      setSubmitStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Erreur");
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-white border border-cbf-gray-soft rounded-sm p-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-cbf-success mx-auto mb-4" />
        <h3 className="font-playfair text-2xl font-bold text-cbf-black mb-3">
          Demande confirmée
        </h3>
        <p className="text-cbf-gray max-w-md mx-auto">
          Un expert CBF Conseils analyse votre bien et vous recontacte sous
          48 h. Vous recevrez par email l'estimation détaillée et des
          comparables locaux récents.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="bg-white border border-cbf-gray-soft rounded-sm shadow-lg overflow-hidden">
        {/* Stepper */}
        <div className="bg-cbf-ivory px-6 md:px-10 py-5 border-b border-cbf-gray-soft">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => {
              const active = step === s.n;
              const done = step > s.n;
              return (
                <div key={s.n} className="flex-1 flex items-center gap-2">
                  <div
                    className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      done
                        ? "bg-cbf-gold text-cbf-black"
                        : active
                        ? "bg-cbf-black text-cbf-gold"
                        : "bg-white border border-cbf-gray-soft text-cbf-gray-light"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : s.n}
                  </div>
                  <div className="hidden lg:block">
                    <p
                      className={`text-[0.65rem] uppercase tracking-wider font-semibold ${
                        active || done
                          ? "text-cbf-black"
                          : "text-cbf-gray-light"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`hidden md:block flex-1 h-px ${
                        done ? "bg-cbf-gold" : "bg-cbf-gray-soft"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Step1 />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Step2 />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Step3 />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <Step4 />
              </motion.div>
            )}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {result && <ResultPreview result={result} />}
                <Step5 />
              </motion.div>
            )}
          </AnimatePresence>

          {submitStatus === "error" && errorMsg && (
            <div className="mt-6 flex items-start gap-2 p-4 bg-cbf-danger/10 border border-cbf-danger/40 rounded-sm">
              <AlertCircle className="h-4 w-4 text-cbf-danger flex-shrink-0 mt-0.5" />
              <p className="text-xs text-cbf-danger">{errorMsg}</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-cbf-gray-soft">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={goBack}
              disabled={step === 1}
              className="disabled:opacity-0"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour
            </Button>

            {step < 5 ? (
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={goNext}
              >
                Continuer
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={methods.handleSubmit(onFinalSubmit)}
                disabled={submitStatus === "loading"}
              >
                {submitStatus === "loading"
                  ? "Envoi…"
                  : "Confirmer ma demande"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

// -----------------------------------------------------------------------------
// Steps
// -----------------------------------------------------------------------------

function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <>
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold mb-2">
        Étape {n}/5
      </p>
      <h3 className="font-playfair text-2xl md:text-3xl text-cbf-black font-bold mb-6">
        {title}
      </h3>
    </>
  );
}

function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EstimationFormData>();
  return (
    <div>
      <StepHeader n={1} title="Parlez-nous de votre bien" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Type de bien</Label>
          <Select {...register("type_bien")}>
            <option value="appartement">Appartement</option>
            <option value="maison">Maison</option>
            <option value="local">Local commercial</option>
          </Select>
        </div>
        <div>
          <Label>Surface (m²)</Label>
          <Input
            type="number"
            min={1}
            placeholder="80"
            {...register("surface")}
          />
          {errors.surface && (
            <p className="text-xs text-cbf-danger mt-1">
              {errors.surface.message}
            </p>
          )}
        </div>
        <div>
          <Label>Nombre de pièces</Label>
          <Input
            type="number"
            min={1}
            max={20}
            placeholder="3"
            {...register("nb_pieces")}
          />
          {errors.nb_pieces && (
            <p className="text-xs text-cbf-danger mt-1">
              {errors.nb_pieces.message}
            </p>
          )}
        </div>
        <div>
          <Label>Étage (si appartement)</Label>
          <Input type="number" placeholder="2" {...register("etage")} />
        </div>
        <div>
          <Label>Extérieur</Label>
          <Select {...register("exterieur")}>
            <option value="aucun">Aucun</option>
            <option value="balcon">Balcon</option>
            <option value="terrasse">Terrasse</option>
            <option value="jardin">Jardin</option>
          </Select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox {...register("parking")} />
            <span className="text-sm text-cbf-gray">
              Parking ou garage inclus
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function Step2() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EstimationFormData>();
  return (
    <div>
      <StepHeader n={2} title="État et adresse du bien" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>État général</Label>
          <Select {...register("etat")}>
            <option value="excellent">Excellent (rénové récemment)</option>
            <option value="bon">Bon (rafraîchissements éventuels)</option>
            <option value="renover">À rénover (cuisine, sdb, sols…)</option>
            <option value="renover-tout">À rénover entièrement</option>
          </Select>
          {errors.etat && (
            <p className="text-xs text-cbf-danger mt-1">{errors.etat.message}</p>
          )}
        </div>
        <div>
          <Label>DPE estimé</Label>
          <Select {...register("dpe")}>
            <option value="A-B">A ou B (très performant)</option>
            <option value="C-D">C ou D (correct)</option>
            <option value="E-F-G">E, F ou G (passoire)</option>
            <option value="inconnu">Je ne sais pas</option>
          </Select>
        </div>
        <div className="sm:col-span-2">
          <Label>Adresse du bien</Label>
          <Input
            placeholder="12 rue Pascal, Clermont-Ferrand"
            {...register("adresse")}
          />
          {errors.adresse && (
            <p className="text-xs text-cbf-danger mt-1">
              {errors.adresse.message}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <Label>Quartier ou commune</Label>
          <Select {...register("quartier")} defaultValue="">
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
          {errors.quartier && (
            <p className="text-xs text-cbf-danger mt-1">
              {errors.quartier.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function Step3() {
  const { register } = useFormContext<EstimationFormData>();
  return (
    <div>
      <StepHeader n={3} title="Critères premium qui valorisent votre bien" />
      <p className="text-sm text-cbf-gray mb-6 -mt-4">
        Ces éléments font souvent la différence entre une vente correcte et une
        vente optimale.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Exposition</Label>
          <Select {...register("exposition")}>
            <option value="inconnu">À préciser</option>
            <option value="sud">Sud</option>
            <option value="est">Est</option>
            <option value="ouest">Ouest</option>
            <option value="nord">Nord</option>
            <option value="traversant">Traversant</option>
          </Select>
        </div>
        <div>
          <Label>Vue</Label>
          <Select {...register("vue")}>
            <option value="degagee">Dégagée</option>
            <option value="normale">Normale</option>
            <option value="bouchee">Bouchée (mur, vis-à-vis)</option>
          </Select>
        </div>
        <div>
          <Label>Type d'immeuble</Label>
          <Select {...register("type_immeuble")}>
            <option value="autre">À préciser</option>
            <option value="haussmannien">Haussmannien</option>
            <option value="ancien-pierre">Ancien en pierre</option>
            <option value="annees-30-50">Années 1930-50</option>
            <option value="annees-60-80">Années 1960-80</option>
            <option value="recent">Récent (1990-2010)</option>
            <option value="neuf">Neuf (2010+)</option>
          </Select>
        </div>
        <div className="space-y-3 self-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox {...register("ascenseur")} />
            <span className="text-sm text-cbf-gray">Ascenseur</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox {...register("cave")} />
            <span className="text-sm text-cbf-gray">Cave incluse</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox {...register("digicode_gardien")} />
            <span className="text-sm text-cbf-gray">
              Digicode ou gardien
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function Step4() {
  const { register } = useFormContext<EstimationFormData>();
  return (
    <div>
      <StepHeader n={4} title="Situation et travaux récents" />
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Délai de vente souhaité</Label>
          <Select {...register("delai_vente")}>
            <option value="urgent">Urgent (moins de 3 mois)</option>
            <option value="3-6mois">3 à 6 mois</option>
            <option value="6-12mois">6 à 12 mois</option>
            <option value="reflechis">Je réfléchis</option>
          </Select>
        </div>
        <div>
          <Label>Objectif</Label>
          <Select {...register("objectif")}>
            <option value="vente">Vente</option>
            <option value="succession">Succession</option>
            <option value="divorce">Divorce</option>
            <option value="investissement">Investissement</option>
            <option value="autre">Autre</option>
          </Select>
        </div>
        <div className="sm:col-span-2 mt-2">
          <p className="text-sm font-semibold text-cbf-black mb-3">
            Travaux récents à valoriser
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2 cursor-pointer p-3 border border-cbf-gray-soft hover:border-cbf-gold rounded-sm transition-colors">
              <Checkbox {...register("travaux_cuisine_recents")} />
              <span className="text-sm text-cbf-gray">Cuisine neuve</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer p-3 border border-cbf-gray-soft hover:border-cbf-gold rounded-sm transition-colors">
              <Checkbox {...register("travaux_sdb_recents")} />
              <span className="text-sm text-cbf-gray">SDB neuve</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer p-3 border border-cbf-gray-soft hover:border-cbf-gold rounded-sm transition-colors">
              <Checkbox {...register("travaux_isolation")} />
              <span className="text-sm text-cbf-gray">Isolation récente</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step5() {
  const {
    register,
    formState: { errors },
  } = useFormContext<EstimationFormData>();
  return (
    <div>
      <StepHeader n={5} title="Recevez votre estimation détaillée" />
      <p className="text-cbf-gray mb-6 -mt-4">
        Vos coordonnées pour qu'un expert CBF Conseils vous remette une analyse
        précise sous 48 heures.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Prénom</Label>
          <Input {...register("prenom")} />
          {errors.prenom && (
            <p className="text-xs text-cbf-danger mt-1">
              {errors.prenom.message}
            </p>
          )}
        </div>
        <div>
          <Label>Nom</Label>
          <Input {...register("nom")} />
          {errors.nom && (
            <p className="text-xs text-cbf-danger mt-1">{errors.nom.message}</p>
          )}
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email")} />
          {errors.email && (
            <p className="text-xs text-cbf-danger mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <Label>Téléphone</Label>
          <Input type="tel" {...register("telephone")} />
          {errors.telephone && (
            <p className="text-xs text-cbf-danger mt-1">
              {errors.telephone.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2 mt-5">
        <Checkbox {...register("consentement_rgpd")} defaultChecked />
        <label className="text-xs text-cbf-gray leading-relaxed">
          J'accepte que mes données soient utilisées pour traiter ma demande,
          conformément à la{" "}
          <a
            href="/politique-confidentialite"
            className="underline hover:text-cbf-gold"
          >
            politique de confidentialité
          </a>
          .
        </label>
      </div>
      {errors.consentement_rgpd && (
        <p className="text-xs text-cbf-danger mt-1">
          {errors.consentement_rgpd.message}
        </p>
      )}
    </div>
  );
}

function ResultPreview({ result }: { result: SimResult }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 p-6 md:p-8 bg-gradient-to-br from-cbf-black to-cbf-anthracite text-white rounded-sm"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-4 w-4 text-cbf-gold" />
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cbf-gold font-bold">
          Estimation indicative
        </span>
      </div>
      <p className="font-playfair text-3xl md:text-4xl font-bold mb-2">
        Entre {formatPrice(result.bas)} et {formatPrice(result.haut)}
      </p>
      <p className="text-cbf-gray-light text-sm mb-5">
        Soit environ {result.prixM2.toLocaleString("fr-FR")} €/m² · fourchette à
        ±8 %
      </p>
      <div className="bg-white/10 border border-white/20 rounded-sm p-4 text-sm leading-relaxed text-cbf-gray-light">
        Cette estimation intègre l'état, le DPE, l'exposition, la vue, le type
        d'immeuble et les travaux récents.
        <strong className="text-white">
          {" "}
          Pour une valorisation précise
        </strong>
        , nos experts CBF Conseils analysent votre bien gratuitement, en tenant
        compte des comparables réels du micro-secteur.
      </div>
    </motion.div>
  );
}
