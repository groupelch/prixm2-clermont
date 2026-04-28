/**
 * Stockage des leads via Neon (PostgreSQL serverless).
 * Variable d'env requise : DATABASE_URL (connection string Neon)
 *
 * Table à créer dans Neon :
 *   create table leads (
 *     id uuid primary key default gen_random_uuid(),
 *     created_at timestamptz default now(),
 *     type text,
 *     source_page text,
 *     source_quartier text,
 *     utm_source text, utm_medium text, utm_campaign text,
 *     prenom text, nom text, email text, telephone text,
 *     adresse text, type_bien text, surface numeric,
 *     nb_pieces int, etat text, delai_vente text, objectif text,
 *     message text, consentement_rgpd bool default false,
 *     payload jsonb
 *   );
 */

import { neon } from "@neondatabase/serverless";

export interface LeadRecord {
  type: string;
  source_page: string;
  source_quartier?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  prenom: string;
  nom?: string;
  email?: string;
  telephone: string;
  adresse?: string | null;
  type_bien?: string | null;
  surface?: number | null;
  nb_pieces?: number | null;
  etat?: string | null;
  delai_vente?: string | null;
  objectif?: string | null;
  message?: string | null;
  consentement_rgpd: boolean;
  payload?: Record<string, unknown>;
}

export async function storeLead(lead: LeadRecord): Promise<{ ok: boolean; reason?: string }> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.warn("[db] DATABASE_URL non configuré — lead loggé seulement.");
    console.log("[lead]", JSON.stringify(lead, null, 2));
    return { ok: false, reason: "no_credentials" };
  }

  try {
    const sql = neon(url);
    await sql`
      insert into prixm2_leads (
        type, source_page, source_quartier,
        utm_source, utm_medium, utm_campaign,
        prenom, nom, email, telephone,
        adresse, type_bien, surface, nb_pieces,
        etat, delai_vente, objectif, message,
        consentement_rgpd, payload
      ) values (
        ${lead.type}, ${lead.source_page}, ${lead.source_quartier ?? null},
        ${lead.utm_source ?? null}, ${lead.utm_medium ?? null}, ${lead.utm_campaign ?? null},
        ${lead.prenom}, ${lead.nom ?? null}, ${lead.email ?? null}, ${lead.telephone},
        ${lead.adresse ?? null}, ${lead.type_bien ?? null}, ${lead.surface ?? null}, ${lead.nb_pieces ?? null},
        ${lead.etat ?? null}, ${lead.delai_vente ?? null}, ${lead.objectif ?? null}, ${lead.message ?? null},
        ${lead.consentement_rgpd}, ${JSON.stringify(lead.payload ?? {})}
      )
    `;
    return { ok: true };
  } catch (err) {
    console.error("[db] Erreur insert lead:", err);
    return { ok: false, reason: "db_error" };
  }
}
