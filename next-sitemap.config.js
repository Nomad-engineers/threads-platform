/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://threads-boost.online',
  generateRobotsTxt: true, // Generate a robots.txt file
  generateIndexSitemap: true, // Generate index sitemap

  // Exclude certain routes from sitemap
  exclude: ['/dashboard', '/api/', '/login', '/register'],

  // Additional paths to include in sitemap
  additionalPaths: async (config) => {
    const result = []

    // Add any dynamic routes here if needed
    // For example, if you have dynamic blog posts:
    // const posts = await getPosts()
    // posts.forEach(post => {
    //   result.push({
    //     loc: `/blog/${post.slug}`,
    //     lastmod: new Date(post.updatedAt).toISOString(),
    //     priority: 0.8,
    //     changefreq: 'weekly'
    //   })
    // })

    return result
  },

  // Default transformation function
  transform: async (config, path) => {
    // Set default priority and changefreq based on path
    let priority = 0.7
    let changefreq = 'weekly'

    // Home page gets highest priority
    if (path === '/') {
      priority = 1.0
      changefreq = 'daily'
    }

    // Auth pages have lower priority
    if (path.startsWith('/auth')) {
      priority = 0.5
      changefreq = 'monthly'
    }

    // Static pages like privacy, terms have lower priority
    if (['/privacy', '/terms', '/refund'].includes(path)) {
      priority = 0.3
      changefreq = 'yearly'
    }

    // Dashboard and auth pages are excluded via exclude config above

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/dashboard', '/api/', '/_next/', '/admin', '/login', '/register'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard', '/api/', '/login', '/register'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://threads-boost.online'}/server-sitemap.xml`,
    ],
  },

  // Output directory
  outDir: './public',

  // Sitemap size limit
  sitemapSize: 5000,

  // Generate sitemap index if you have multiple sitemaps
  generateIndexSitemap: true,

  // Auto-format the sitemap
  pretty: true,
}