/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.prixm2clermontferrand.fr",
  generateRobotsTxt: false,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  transform: async (config, path) => {
    let priority = 0.7;
    if (path === "/") priority = 1.0;
    else if (path === "/prix-immobilier-clermont-ferrand") priority = 0.95;
    else if (path === "/estimation") priority = 0.95;
    else if (
      path === "/vendre-clermont-ferrand" ||
      path === "/investir-clermont-ferrand" ||
      path === "/louer-clermont-ferrand"
    ) priority = 0.9;
    else if (path === "/blog") priority = 0.85;
    else if (path.startsWith("/prix-m2/")) priority = 0.8;
    else if (path.startsWith("/estimation-quartier/")) priority = 0.85;
    else if (path.startsWith("/vendre/")) priority = 0.85;
    else if (path.startsWith("/blog/")) priority = 0.75;
    else if (path.startsWith("/guide/")) priority = 0.7;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
