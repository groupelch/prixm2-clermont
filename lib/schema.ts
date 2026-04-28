import { z } from "zod";

export const leadSchemaCourt = z.object({
  prenom: z.string().min(2, "Prénom requis"),
  nom: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z
    .string()
    .min(10, "Téléphone invalide")
    .regex(/^[\d\s+().-]{10,}$/, "Téléphone invalide"),
  type_bien: z.enum(["appartement", "maison", "local", "terrain"]).optional(),
  surface: z.coerce.number().positive().optional(),
  quartier: z.string().optional(),
  adresse: z.string().optional(),
  message: z.string().optional(),
  consentement_rgpd: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }),
  }),
  source_page: z.string().default("/"),
  source_quartier: z.string().nullable().optional(),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
});

export type LeadCourt = z.infer<typeof leadSchemaCourt>;

export const leadSchemaComplet = leadSchemaCourt.extend({
  nb_pieces: z.coerce.number().int().min(1).max(20).optional(),
  etage: z.coerce.number().int().optional(),
  exterieur: z.enum(["balcon", "terrasse", "jardin", "aucun"]).optional(),
  parking: z.boolean().optional(),
  etat: z.enum(["excellent", "bon", "renover", "renover-tout"]).optional(),
  dpe: z.enum(["A-B", "C-D", "E-F-G", "inconnu"]).optional(),
  delai_vente: z.enum(["urgent", "3-6mois", "6-12mois", "reflechis"]).optional(),
  objectif: z.enum(["vente", "succession", "divorce", "investissement", "autre"]).optional(),
});

export type LeadComplet = z.infer<typeof leadSchemaComplet>;

export const leadSchemaRappel = z.object({
  prenom: z.string().min(2, "Prénom requis"),
  telephone: z.string().min(10, "Téléphone invalide"),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  consentement_rgpd: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }),
  }),
  source_page: z.string().default("/"),
});

export type LeadRappel = z.infer<typeof leadSchemaRappel>;

export const estimationSchema = z.object({
  // Étape 1 — Bien
  type_bien: z.enum(["appartement", "maison", "local"]),
  surface: z.coerce.number().positive("Surface invalide"),
  nb_pieces: z.coerce.number().int().min(1).max(20),
  etage: z.coerce.number().int().optional(),
  exterieur: z.enum(["balcon", "terrasse", "jardin", "aucun"]).default("aucun"),
  parking: z.boolean().default(false),
  // Étape 2 — État & adresse
  etat: z.enum(["excellent", "bon", "renover", "renover-tout"]),
  dpe: z.enum(["A-B", "C-D", "E-F-G", "inconnu"]).default("inconnu"),
  adresse: z.string().min(5, "Adresse requise"),
  quartier: z.string().min(1, "Sélectionnez un quartier"),
  // Étape 3 — Critères premium
  exposition: z
    .enum(["nord", "sud", "est", "ouest", "traversant", "inconnu"])
    .default("inconnu"),
  vue: z.enum(["degagee", "normale", "bouchee"]).default("normale"),
  ascenseur: z.boolean().default(false),
  cave: z.boolean().default(false),
  digicode_gardien: z.boolean().default(false),
  type_immeuble: z
    .enum(["haussmannien", "ancien-pierre", "annees-30-50", "annees-60-80", "recent", "neuf", "autre"])
    .default("autre"),
  // Étape 4 — Situation & travaux
  delai_vente: z.enum(["urgent", "3-6mois", "6-12mois", "reflechis"]),
  objectif: z.enum(["vente", "succession", "divorce", "investissement", "autre"]),
  travaux_cuisine_recents: z.boolean().default(false),
  travaux_sdb_recents: z.boolean().default(false),
  travaux_isolation: z.boolean().default(false),
  // Étape 5 — Coordonnées
  prenom: z.string().min(2, "Prénom requis"),
  nom: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(10, "Téléphone invalide"),
  consentement_rgpd: z.literal(true, {
    errorMap: () => ({ message: "Vous devez accepter la politique de confidentialité" }),
  }),
});

export type EstimationFormData = z.infer<typeof estimationSchema>;
