/**
 * Mapping IRIS INSEE → slug quartier CBF Conseils
 * 42 zones IRIS de Clermont-Ferrand (code commune 63113)
 */
export const IRIS_TO_QUARTIER: Record<string, string> = {
  // Identités directes
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
};
