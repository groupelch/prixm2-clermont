/**
 * Mapping IRIS INSEE → slug quartier CBF Conseils
 * 94 zones IRIS : 42 Clermont-Ferrand (63113) + 52 communes limitrophes
 */
export const IRIS_TO_QUARTIER: Record<string, string> = {
  // ── Clermont-Ferrand — Identités directes ────────────────────────────────
  "631132401": "clermont-ferrand-brezet",
  "631132201": "clermont-ferrand-champratel",
  "631132501": "clermont-ferrand-la-pardieu",
  "631131001": "clermont-ferrand-oradou",
  "631130701": "clermont-ferrand-montferrand",
  "631131601": "clermont-ferrand-salins",
  "631132101": "clermont-ferrand-la-plaine",
  "631130601": "clermont-ferrand-chanturgue",
  "631130301": "clermont-ferrand-trudaine",
  "631131301": "clermont-ferrand-saint-jacques",

  // Centre & péri-centre
  "631130401": "clermont-ferrand-jaude",
  "631130403": "clermont-ferrand-jaude",
  "631130402": "clermont-ferrand-delille",
  "631130802": "clermont-ferrand-carmes",
  "631130201": "clermont-ferrand-blaise-pascal",
  "631130302": "clermont-ferrand-salins",
  "631131401": "clermont-ferrand-la-pradelle",
  "631131405": "clermont-ferrand-la-glaciere",

  // Ouest / Fontgieve
  "631130501": "clermont-ferrand-fontgieve",
  "631131701": "clermont-ferrand-fontgieve",
  "631131801": "clermont-ferrand-fontgieve",
  "631131802": "clermont-ferrand-la-glaciere",

  // Nord / Chanturgue / Croix-de-Neyrat
  "631130602": "clermont-ferrand-chanturgue",
  "631131902": "clermont-ferrand-chanturgue",
  "631131903": "clermont-ferrand-chanturgue",
  "631131803": "clermont-ferrand-chanturgue",
  "631132003": "clermont-ferrand-croix-de-neyrat",
  "631132001": "clermont-ferrand-croix-de-neyrat",
  "631132002": "clermont-ferrand-brezet",

  // Est / Montferrand
  "631132301": "clermont-ferrand-montferrand",
  "631130202": "clermont-ferrand-la-plaine",
  "631130102": "clermont-ferrand-blaise-pascal",
  "631130901": "clermont-ferrand-la-plaine",
  "631130902": "clermont-ferrand-la-plaine",

  // Sud / Oradou / Champratel / La Pardieu
  "631131404": "clermont-ferrand-oradou",
  "631131101": "clermont-ferrand-champratel",
  "631131901": "clermont-ferrand-oradou",
  "631132202": "clermont-ferrand-champratel",

  // Divers
  "631131702": "clermont-ferrand-blaise-pascal",
  "631131201": "clermont-ferrand-cote-blatin",
  "631131501": "clermont-ferrand-vallieres",
  "631131502": "clermont-ferrand-saint-jacques",

  // ── Communes limitrophes ─────────────────────────────────────────────────

  // Chamalières (63075) — 8 zones
  "630750101": "chamalieres",
  "630750102": "chamalieres",
  "630750103": "chamalieres",
  "630750104": "chamalieres",
  "630750105": "chamalieres",
  "630750106": "chamalieres",
  "630750107": "chamalieres",
  "630750108": "chamalieres",

  // Aubière (63014) — 5 zones
  "630140101": "aubiere",
  "630140102": "aubiere",
  "630140103": "aubiere",
  "630140104": "aubiere",
  "630140105": "aubiere",

  // Beaumont (63032) — 5 zones
  "630320101": "beaumont",
  "630320102": "beaumont",
  "630320103": "beaumont",
  "630320104": "beaumont",
  "630320105": "beaumont",

  // Ceyrat (63070) — 2 zones
  "630700101": "ceyrat",
  "630700102": "ceyrat",

  // Cébazat (63063) — 4 zones
  "630630101": "cebazat",
  "630630102": "cebazat",
  "630630103": "cebazat",
  "630630104": "cebazat",

  // Durtol (63141) — 1 zone
  "631410000": "durtol",

  // Lempdes (63193) — 5 zones
  "631930101": "lempdes",
  "631930102": "lempdes",
  "631930103": "lempdes",
  "631930104": "lempdes",
  "631930105": "lempdes",

  // Romagnat (63307) — 3 zones
  "633070101": "romagnat",
  "633070102": "romagnat",
  "633070103": "romagnat",

  // Pérignat-lès-Sarliève (63272) — 1 zone
  "632720000": "perignat-les-sarlieves",

  // Royat (63308) — 1 zone
  "633080000": "royat",

  // Riom (63300) — 11 zones
  "633000101": "riom",
  "633000102": "riom",
  "633000103": "riom",
  "633000104": "riom",
  "633000105": "riom",
  "633000106": "riom",
  "633000107": "riom",
  "633000108": "riom",
  "633000109": "riom",
  "633000110": "riom",
  "633000111": "riom",

  // Châtel-Guyon (63103) — 2 zones
  "631030101": "chatel-guyon",
  "631030102": "chatel-guyon",

  // Pont-du-Château (63284) — 4 zones
  "632840101": "pont-du-chateau",
  "632840102": "pont-du-chateau",
  "632840103": "pont-du-chateau",
  "632840104": "pont-du-chateau",
};
