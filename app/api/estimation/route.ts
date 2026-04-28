import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getQuartierBySlug } from "@/data/quartiers";

const ETAT_COEFS: Record<string, number> = {
  excellent: 1.1,
  bon: 1,
  renover: 0.9,
  "renover-tout": 0.8,
};
const DPE_COEFS: Record<string, number> = {
  "A-B": 1.05,
  "C-D": 1,
  "E-F-G": 0.92,
  inconnu: 1,
};

const inputSchema = z.object({
  type_bien: z.enum(["appartement", "maison", "local"]),
  surface: z.coerce.number().positive(),
  etat: z.enum(["excellent", "bon", "renover", "renover-tout"]).default("bon"),
  dpe: z.enum(["A-B", "C-D", "E-F-G", "inconnu"]).default("inconnu"),
  quartier: z.string(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Payload invalide" }, { status: 400 });
  }
  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Validation échouée", errors: parsed.error.flatten() },
      { status: 422 }
    );
  }
  const d = parsed.data;
  const q = getQuartierBySlug(d.quartier);
  if (!q) {
    return NextResponse.json({ ok: false, message: "Quartier inconnu" }, { status: 404 });
  }

  const refPrix =
    d.type_bien === "maison"
      ? q.prixMaison ?? q.prixAppartement
      : q.prixAppartement ?? q.prixMaison;
  if (!refPrix) {
    return NextResponse.json({ ok: false, message: "Pas de référence prix" }, { status: 400 });
  }

  const coefEtat = ETAT_COEFS[d.etat] ?? 1;
  const coefDpe = DPE_COEFS[d.dpe] ?? 1;
  const prixM2 = Math.round(refPrix * coefEtat * coefDpe);
  const central = Math.round(prixM2 * d.surface);

  return NextResponse.json({
    ok: true,
    estimation: {
      central,
      bas: Math.round(central * 0.9),
      haut: Math.round(central * 1.1),
      prixM2,
    },
    quartier: { slug: q.slug, nom: q.nom },
  });
}
