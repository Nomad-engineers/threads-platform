/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://threads-boost.online',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 1.0,
  exclude: ['/server-sitemap.xml'],
  transform: async (config, path) => {
    // custom transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async (config) => {
    // Additional paths to include in sitemap
    return [
      {
        loc: '/analytics',
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: '/scheduling',
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        loc: '/pricing',
        changefreq: 'monthly',
        priority: 0.7,
      },
    ];
  },
};