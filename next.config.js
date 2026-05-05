/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // ─── Redirections 301 depuis l'ancien site Wix ────────────────────────────
  // Ancienne structure Wix : /prix-m2-[quartier] (plat)
  // Nouvelle structure : /prix-m2/[slug] (hiérarchique)
  async redirects() {
    return [
      // Quartiers Clermont-Ferrand
      { source: "/prix-m2-champratel",              destination: "/prix-m2/clermont-ferrand-champratel",    permanent: true },
      { source: "/prix-m2-les-salins-clermont-ferrand", destination: "/prix-m2/clermont-ferrand-salins",   permanent: true },
      { source: "/prix-m2-ballainvilliers",          destination: "/prix-m2/clermont-ferrand-jaude",        permanent: true },
      { source: "/prix-m2-la-boucle",               destination: "/prix-m2/clermont-ferrand-centre-ville", permanent: true },
      { source: "/prix-m2-oradou",                  destination: "/prix-m2/clermont-ferrand-oradou",        permanent: true },
      { source: "/prix-m2-andre-theuriet",          destination: "/prix-m2/clermont-ferrand-centre-ville", permanent: true },
      { source: "/prix-m2-montferrand",             destination: "/prix-m2/clermont-ferrand-montferrand",   permanent: true },
      { source: "/prix-m2-saint-jacques",           destination: "/prix-m2/clermont-ferrand-saint-jacques", permanent: true },
      { source: "/prix-m2-la-glaciere",             destination: "/prix-m2/clermont-ferrand-la-glaciere",   permanent: true },
      { source: "/prix-m2-fontgieve",               destination: "/prix-m2/clermont-ferrand-fontgieve",     permanent: true },
      { source: "/prix-m2-chanturgue",              destination: "/prix-m2/clermont-ferrand-chanturgue",    permanent: true },
      { source: "/prix-m2-les-cezeaux",             destination: "/prix-m2/clermont-ferrand-les-cezeaux",   permanent: true },
      { source: "/prix-m2-la-pardieu",              destination: "/prix-m2/clermont-ferrand-la-pardieu",    permanent: true },
      { source: "/prix-m2-la-plaine",               destination: "/prix-m2/clermont-ferrand-la-plaine",     permanent: true },
      { source: "/prix-m2-croix-de-neyrat",         destination: "/prix-m2/clermont-ferrand-croix-de-neyrat", permanent: true },
      { source: "/prix-m2-la-pradelle",             destination: "/prix-m2/clermont-ferrand-la-plaine",     permanent: true },
      { source: "/prix-m2-trudaine",                destination: "/prix-m2/clermont-ferrand-centre-ville",  permanent: true },
      { source: "/prix-m2-vallieres",               destination: "/prix-m2/clermont-ferrand-vallieres",     permanent: true },
      { source: "/prix-m2-cote-blatin",             destination: "/prix-m2/clermont-ferrand-centre-ville",  permanent: true },
      { source: "/prix-m2-delille",                 destination: "/prix-m2/clermont-ferrand-delille",       permanent: true },
      { source: "/prix-m2-blaise-pascal",           destination: "/prix-m2/clermont-ferrand-blaise-pascal", permanent: true },
      { source: "/prix-m2-carmes",                  destination: "/prix-m2/clermont-ferrand-carmes",        permanent: true },
      { source: "/prix-m2-la-gare",                 destination: "/prix-m2/clermont-ferrand-gare",          permanent: true },
      { source: "/prix-m2-brezet",                  destination: "/prix-m2/clermont-ferrand-brezet",        permanent: true },
      // Communes agglo
      { source: "/prix-m2-beaumont",                destination: "/prix-m2/beaumont",                       permanent: true },
      { source: "/prix-m2-chamalieres",             destination: "/prix-m2/chamalieres",                    permanent: true },
      { source: "/prix-m2-royat",                   destination: "/prix-m2/royat",                          permanent: true },
      { source: "/prix-m2-aubiere",                 destination: "/prix-m2/aubiere",                        permanent: true },
      { source: "/prix-m2-ceyrat",                  destination: "/prix-m2/ceyrat",                         permanent: true },
      { source: "/prix-m2-lempdes",                 destination: "/prix-m2/lempdes",                        permanent: true },
      { source: "/prix-m2-cournon",                 destination: "/prix-m2/cournon-d-auvergne",             permanent: true },
      { source: "/prix-m2-pont-du-chateau",         destination: "/prix-m2/pont-du-chateau",                permanent: true },
      { source: "/prix-m2-riom",                    destination: "/prix-m2/riom",                           permanent: true },
      { source: "/prix-m2-vichy",                   destination: "/prix-immobilier-clermont-ferrand",          permanent: true },
      { source: "/prix-m2-paris",                   destination: "/prix-m2/clermont-ferrand-jaude",         permanent: true },
      // Pages génériques Wix
      { source: "/estimation-immobiliere",          destination: "/estimation",                              permanent: true },
      // URLs Wix orphelines manquantes dans les redirects
      { source: "/de-prix-m2-beaumont",             destination: "/prix-m2/beaumont",                        permanent: true },
      { source: "/prix-m2-puy-de-dome",             destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-volvic",                  destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-thiers",                  destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-issoire",                 destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-le-creusot",              destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-chalon-sur-saone",        destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-saint-alyre",             destination: "/prix-m2/clermont-ferrand-salins",          permanent: true },
      { source: "/prix-m2-lecoq",                   destination: "/prix-m2/clermont-ferrand-centre-ville",    permanent: true },
      { source: "/prix-m2-anatole-france",          destination: "/prix-m2/clermont-ferrand-centre-ville",    permanent: true },
      { source: "/prix-m2-bonnabaud",               destination: "/prix-m2/clermont-ferrand-centre-ville",    permanent: true },
      { source: "/prix-m2-bergougnan",              destination: "/prix-m2/clermont-ferrand-brezet",          permanent: true },
      { source: "/prix-m2-champfleuri",             destination: "/prix-m2/clermont-ferrand-montferrand",     permanent: true },
      { source: "/prix-m2-a-duclos",                destination: "/prix-m2/clermont-ferrand-montferrand",     permanent: true },
      { source: "/prix-m2-chatel-guyon",            destination: "/prix-m2/chatel-guyon",                    permanent: true },
      { source: "/prix-m2-courpiere",               destination: "/prix-m2/clermont-ferrand-montferrand",     permanent: true },
      { source: "/prix-m2-mirefleurs",              destination: "/prix-m2/perignat-les-sarlieves",           permanent: true },
      { source: "/prix-m2-ennezat",                 destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-vic-le-comte",            destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
      { source: "/prix-m2-les-martres-de-veyre",    destination: "/prix-immobilier-clermont-ferrand",         permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
