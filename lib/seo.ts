import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  structuredData?: Record<string, any>[];
  alternateLang?: Record<string, string>;
  // Enhanced 2025 SEO properties
  schemaType?: 'Article' | 'Product' | 'Service' | 'VideoObject' | 'Organization' | 'WebSite';
  author?: string;
  category?: string;
  tags?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  readingTime?: number;
  wordCount?: number;
  featuredImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://threads-boost.online';
const DEFAULT_OG_IMAGE = '/og-image.png';

// Enhanced target keywords for Threads analytics platform (2025 optimized)
const TARGET_KEYWORDS = {
  // Primary high-volume keywords
  primary: [
    'Threads analytics',
    'Threads automation',
    'social media analytics',
    'content scheduling',
    'Threads growth',
    'Threads insights',
    'social media automation',
    'Threads performance tracking',
    'AI Threads analytics',
    'Threads marketing platform'
  ],

  // Competitor-focused keywords
  competitor: [
    'Threads alternative to Hootsuite',
    'Threads alternative to Buffer',
    'Threads alternative to Sprout Social',
    'Threads scheduler like Later',
    'Threads analytics tool comparison',
    'best Threads analytics tool 2025',
    'Threads vs Instagram analytics',
    'Threads vs Hootsuite',
    'social media management with Threads',
    'best Threads management tool'
  ],

  // User intent keywords (informational)
  informational: [
    'how to track Threads analytics',
    'how to schedule Threads posts',
    'best time to post on Threads',
    'Threads engagement metrics',
    'Threads hashtag analytics',
    'Threads audience demographics',
    'Threads content strategy',
    'measure Threads ROI',
    'Threads reporting dashboard',
    'Threads API analytics',
    'what are Threads analytics',
    'understanding Threads algorithm',
    'Threads insights explained'
  ],

  // Commercial keywords
  commercial: [
    'Threads marketing tool',
    'Threads business analytics',
    'Threads automation software',
    'Threads social media management',
    'Threads enterprise analytics',
    'Threads creator tools',
    'Threads agency platform',
    'Threads scheduling service',
    'Threads analytics pricing',
    'Threads automation solution',
    'buy Threads analytics tool',
    'Threads enterprise demo',
    'Threads subscription pricing'
  ],

  // Feature-specific keywords
  features: [
    'Threads post scheduler',
    'Threads engagement calculator',
    'Threads hashtag tracker',
    'Threads competitor analyzer',
    'Threads sentiment analysis',
    'Threads trend detection',
    'Threads content optimizer',
    'Threads auto-reply tool',
    'Threads bulk scheduler',
    'Threads analytics API',
    'Threads video analytics',
    'Threads AI content suggestions',
    'Threads performance tracking'
  ],

  // Long-tail keywords
  longTail: [
    'automated Threads posting tool',
    'real-time Threads analytics platform',
    'comprehensive Threads dashboard',
    'Threads content performance insights',
    'social media automation for Threads',
    'best Threads analytics for creators',
    'Threads marketing automation software',
    'schedule Threads posts in advance',
    'track Threads growth metrics',
    'Threads audience engagement analyzer',
    'Meta Threads business tools',
    'Threads analytics for agencies',
    'multi-platform Threads management',
    'Threads content calendar planner',
    'social listening for Threads',
    'AI-powered Threads content optimization',
    'enterprise Threads management platform',
    'mobile-first Threads analytics'
  ],

  // Trend and trending keywords
  trending: [
    'Threads analytics 2025',
    'Threads automation trends',
    'social media automation AI',
    'Threads marketing strategy',
    'creator economy tools',
    'social media dashboard 2025',
    'Threads API integration',
    'AI-powered Threads analytics',
    'Threads growth hacking',
    'viral Threads analytics',
    'machine learning Threads insights',
    'predictive analytics Threads growth'
  ],

  // Location-based keywords (if applicable)
  geoTargeted: [
    'Threads analytics USA',
    'Threads automation tool global',
    'social media management worldwide',
    'international Threads scheduler',
    'Threads analytics UK',
    'Threads analytics Europe'
  ],

  // NEW: Voice search keywords (2025 Priority)
  voiceSearch: [
    'best Threads analytics tool voice search',
    'how to check Threads analytics on voice',
    'Threads analytics assistant voice command',
    'Threads growth tips voice search',
    'automate Threads posts with voice',
    'Threads insights AI voice assistant'
  ],

  // NEW: AI/ML Related Keywords (2025 Trend)
  aiRelated: [
    'AI-powered Threads analytics',
    'machine learning content optimization Threads',
    'predictive analytics Threads growth',
    'AI content suggestions for Threads',
    'automated hashtag optimization Threads AI',
    'smart scheduling Threads AI',
    'natural language processing Threads insights',
    'deep learning Threads performance',
    'AI-driven Threads automation',
    'machine learning audience analysis Threads'
  ],

  // NEW: Video-Specific Keywords (2024-2025 Trend)
  videoOptimization: [
    'Threads video analytics',
    'video performance tracking Threads',
    'Threads video content optimization',
    'reel performance Threads analytics',
    'video engagement Threads metrics',
    'Threads video hashtag strategy',
    'Threads video content analysis',
    'Instagram reel Threads analytics'
  ],

  // NEW: Enterprise/B2B Keywords
  enterprise: [
    'Threads enterprise analytics platform',
    'B2B Threads management solution',
    'team collaboration Threads analytics',
    'enterprise social media automation',
    'Threads API for enterprise',
    'brand monitoring Threads platform',
    'compliance analytics Threads enterprise',
    'custom reporting Threads business',
    'enterprise Threads management tools'
  ],

  // NEW: Search Intent Categories
  searchIntent: {
    informational: [
      'what are Threads analytics metrics',
      'how to measure Threads success',
      'understanding Threads algorithm',
      'Threads analytics explained'
    ],
    navigational: [
      'official Threads app',
      'Threads login analytics',
      'Threads management tools',
      'best Threads dashboard'
    ],
    transactional: [
      'buy Threads analytics tool',
      'Threads automation pricing',
      'Threads enterprise demo',
      'subscribe Threads insights'
    ],
    commercial: [
      'best Threads analytics platform comparison',
      'Threads vs Instagram analytics features',
      'Threads vs Hootsuite review'
    ]
  },

  // NEW: Performance & UX SEO
  performanceSEO: {
    coreWebVitals: [
      'fast Threads analytics dashboard',
      'performance optimized social media tools',
      'quick Threads analytics loading',
      'mobile first Threads platform'
    ],
    userExperience: [
      'intuitive Threads interface',
      'easy to use analytics dashboard',
      'simple Threads automation setup',
      'user-friendly Threads reporting'
    ]
  },

  // NEW: Accessibility & Inclusivity
  accessibility: [
    'accessible Threads analytics dashboard',
    'inclusive social media analytics',
    'screen reader compatible Threads tools',
    'accessibility-first Threads automation',
    'inclusive content strategy Threads'
  ]
};

// Generate comprehensive metadata
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    noIndex = false,
    alternateLang,
    schemaType,
    author,
    category,
    tags,
    publishedTime,
    modifiedTime,
    readingTime,
    wordCount,
    featuredImage
  } = config;

  // If no keywords provided, use primary keywords by default
  const metaKeywords = keywords || getPrimaryKeywords();

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | Threads-Boost`,
    },
    description,
    keywords: Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords,
    authors: author ? [{ name: author }] : [{ name: 'Threads-Boost Team' }],
    creator: 'Threads-Boost',
    publisher: 'Threads-Boost',
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: ogType as 'website' | 'article',
      locale: 'en_US',
      url: canonical || SITE_URL,
      title,
      description,
      siteName: 'Threads-Boost',
      images: [
        {
          url: featuredImage?.url || ogImage,
          width: featuredImage?.width || 1200,
          height: featuredImage?.height || 630,
          alt: featuredImage?.alt || title,
        },
      ],
      ...(category && { articleSection: category }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(readingTime && { 'article:published_time': publishedTime }),
      ...(tags && { tags: tags.join(',') }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage?.url || ogImage],
      creator: '@threadsboost',
      site: '@threadsboost',
    },
    alternates: {
      canonical: canonical || SITE_URL,
      languages: alternateLang,
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
    },
    other: {
      ...(publishedTime && { 'article:published_time': publishedTime }),
      ...(modifiedTime && { 'article:modified_time': modifiedTime }),
      ...(wordCount && { 'article:word_count': wordCount }),
      ...(readingTime && { 'article:reading_time': readingTime }),
      'theme-color': '#000000',
      'msapplication-TileColor': '#000000',
      'apple-mobile-web-app-status-bar-style': 'default',
    },
  };

  return metadata;
}

// Generate structured data for different types
export const structuredDataGenerators = {
  // Organization structured data
  organization: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Threads-Boost',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Comprehensive analytics and automation platform for Meta Threads',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://twitter.com/threadsboost',
      'https://instagram.com/threadsboost',
    ],
    foundingDate: '2023',
    founder: {
      '@type': 'Person',
      name: 'Threads-Boost Team',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'San Francisco',
      addressCountry: 'US',
    },
  }),

  // Website structured data
  website: () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Threads-Boost',
    url: SITE_URL,
    description: 'Analytics and automation platform for Threads creators',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    hasPart: {
      '@type': 'WebPageElement',
      name: 'Main navigation',
      cssSelector: 'nav',
    },
  }),

  // Software application structured data
  softwareApplication: () => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Threads-Boost',
    url: SITE_URL,
    description: 'Advanced analytics and automation platform for Threads',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free plan available',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '100',
      bestRating: '5',
    },
    softwareVersion: '2.0',
    releaseNotes: 'Enhanced AI-powered insights and automation features',
    installUrl: SITE_URL,
  }),

  // NEW: Article schema for blog/content pages
  article: (articleData: {
    headline: string;
    description: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    image: string;
    section?: string;
    wordCount?: number;
    keywords: string[];
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleData.headline,
    description: articleData.description,
    datePublished: articleData.datePublished,
    ...(articleData.dateModified && { dateModified: articleData.dateModified }),
    author: {
      '@type': 'Person',
      name: articleData.author,
    },
    image: {
      '@type': 'ImageObject',
      url: articleData.image,
    },
    ...(articleData.section && { articleSection: articleData.section }),
    ...(articleData.wordCount && { wordCount: articleData.wordCount }),
    keywords: articleData.keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'Threads-Boost',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  }),

  // NEW: Product schema for pricing pages
  product: (productData: {
    name: string;
    description: string;
    sku: string;
    brand: string;
    offers: {
      price: string;
      priceCurrency: string;
      availability: string;
      url?: string;
    };
    aggregateRating?: {
      ratingValue: string;
      reviewCount: string;
    };
    image?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.name,
    description: productData.description,
    sku: productData.sku,
    brand: {
      '@type': 'Brand',
      name: productData.brand,
    },
    offers: {
      '@type': 'Offer',
      price: productData.offers.price,
      priceCurrency: productData.offers.priceCurrency,
      availability: productData.offers.availability,
      ...(productData.offers.url && { url: productData.offers.url }),
    },
    ...(productData.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: productData.aggregateRating.ratingValue,
        reviewCount: productData.aggregateRating.reviewCount,
      },
    }),
    ...(productData.image && {
      image: {
        '@type': 'ImageObject',
        url: productData.image,
      },
    }),
  }),

  // NEW: Video object schema
  videoObject: (videoData: {
    name: string;
    description: string;
    thumbnailUrl: string;
    uploadDate: string;
    duration?: string;
    embedUrl?: string;
    genre?: string;
    keywords: string[];
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: videoData.name,
    description: videoData.description,
    thumbnailUrl: videoData.thumbnailUrl,
    uploadDate: videoData.uploadDate,
    ...(videoData.duration && { duration: videoData.duration }),
    ...(videoData.embedUrl && { embedUrl: videoData.embedUrl }),
    ...(videoData.genre && { genre: videoData.genre }),
    keywords: videoData.keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'Threads-Boost',
    },
  }),

  // Enhanced Product/Service structured data
  service: (name: string, description: string, price?: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Threads-Boost',
    },
    serviceType: 'Analytics and Automation',
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
  }),

  // Enhanced Breadcrumb structured data
  breadcrumbs: (breadcrumbs: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }),

  // Enhanced FAQ structured data
  faq: (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }),

  // Enhanced Review/Rating structured data
  review: (review: {
    author: string;
    rating: number;
    comment: string;
    date?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: review.comment,
    datePublished: review.date || new Date().toISOString(),
  }),

  // NEW: HowTo schema for tutorials/guides
  howTo: (howToData: {
    name: string;
    description: string;
    totalTime?: string;
    estimatedCost?: string;
    supply: Array<{ name: string; requiredQuantity?: string }>;
    tool: Array<{ name: string }>;
    step: Array<{
      name: string;
      text: string;
      url?: string;
      image?: string;
    }>;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howToData.name,
    description: howToData.description,
    ...(howToData.totalTime && { totalTime: howToData.totalTime }),
    ...(howToData.estimatedCost && { estimatedCost: howToData.estimatedCost }),
    supply: howToData.supply,
    tool: howToData.tool,
    step: howToData.step,
  }),

  // NEW: Event schema for webinars/events
  event: (eventData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    location?: string;
    organizer: string;
    image?: string;
    url?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventData.name,
    description: eventData.description,
    startDate: eventData.startDate,
    endDate: eventData.endDate,
    ...(eventData.location && {
      location: {
        '@type': 'Place',
        name: eventData.location,
      },
    }),
    organizer: {
      '@type': 'Organization',
      name: eventData.organizer,
    },
    ...(eventData.image && {
      image: {
        '@type': 'ImageObject',
        url: eventData.image,
      },
    }),
    ...(eventData.url && { url: eventData.url }),
  }),

  // NEW: Local Business schema for local SEO
  localBusiness: (businessData: {
    name: string;
    description: string;
    address: string;
    telephone?: string;
    email?: string;
    openingHours?: string;
    priceRange?: string;
    image?: string;
  }) => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessData.name,
    description: businessData.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessData.address,
    },
    ...(businessData.telephone && { telephone: businessData.telephone }),
    ...(businessData.email && { email: businessData.email }),
    ...(businessData.openingHours && { openingHours: businessData.openingHours }),
    ...(businessData.priceRange && { priceRange: businessData.priceRange }),
    ...(businessData.image && {
      image: {
        '@type': 'ImageObject',
        url: businessData.image,
      },
    }),
  }),
};

// Generate JSON-LD structured data script
export function generateStructuredJSONLD(data: Record<string, any>[]): string {
  return data.map(item => JSON.stringify(item, null, 2)).join('\n');
}


// Generate canonical URL
export function generateCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanPath ? `${SITE_URL}/${cleanPath}` : SITE_URL;
}

// Get keywords by category or all keywords
export function getKeywordsByCategory(category?: keyof typeof TARGET_KEYWORDS): string[] {
  if (!category) {
    // Return all keywords flattened
    return Object.values(TARGET_KEYWORDS).flat();
  }
  return TARGET_KEYWORDS[category] || [];
}

// Generate keywords based on content and context
export function generateKeywords(
  content: string,
  additionalKeywords: string[] = [],
  categories: (keyof typeof TARGET_KEYWORDS)[] = ['primary', 'competitor', 'informational']
): string[] {
  // Get keywords from specified categories
  const baseKeywords = categories.flatMap(cat => TARGET_KEYWORDS[cat] || []);
  const contentWords = content.toLowerCase().split(/\s+/);

  // Extract relevant terms from content
  const relevantTerms = contentWords.filter(word =>
    word.length > 3 &&
    !['that', 'this', 'with', 'from', 'they', 'have', 'been', 'said'].includes(word)
  );

  // Combine and deduplicate, prioritizing base keywords
  return [...new Set([...baseKeywords, ...additionalKeywords, ...relevantTerms.slice(0, 5)])];
}

// Get primary keywords for important pages
export function getPrimaryKeywords(): string[] {
  return TARGET_KEYWORDS.primary;
}

// Get long-tail keywords for blog/content pages
export function getLongTailKeywords(): string[] {
  return TARGET_KEYWORDS.longTail;
}

// Get competitor keywords for comparison pages
export function getCompetitorKeywords(): string[] {
  return TARGET_KEYWORDS.competitor;
}

// Get commercial keywords for pricing/landing pages
export function getCommercialKeywords(): string[] {
  return TARGET_KEYWORDS.commercial;
}


// SEO validation utilities
export const seoValidators = {
  validateTitle: (title: string) => {
    return {
      isValid: title.length >= 30 && title.length <= 60,
      length: title.length,
      recommendation: title.length < 30 ? 'Title is too short' : title.length > 60 ? 'Title is too long' : 'Good length',
    };
  },

  validateDescription: (description: string) => {
    return {
      isValid: description.length >= 120 && description.length <= 160,
      length: description.length,
      recommendation: description.length < 120 ? 'Description is too short' : description.length > 160 ? 'Description is too long' : 'Good length',
    };
  },

  validateKeywordDensity: (content: string, keyword: string) => {
    const words = content.toLowerCase().split(/\s+/);
    const keywordCount = words.filter(word => word.includes(keyword.toLowerCase())).length;
    const density = (keywordCount / words.length) * 100;

    return {
      density: Math.round(density * 100) / 100,
      isOptimal: density >= 1 && density <= 3,
      recommendation: density < 1 ? 'Keyword density too low' : density > 3 ? 'Keyword density too high' : 'Optimal density',
    };
  },

  // NEW: Enhanced content validation
  validateContent: (content: string) => {
    const wordCount = content.split(/\s+/).length;
    const sentences = content.split(/[.!?]+/).length;
    const avgWordsPerSentence = wordCount / sentences;
    const readabilityScore = Math.max(0, 100 - (1.015 * avgWordsPerSentence + 84.6));

    return {
      wordCount,
      sentenceCount: sentences,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      readabilityScore: Math.round(readabilityScore),
      isReadable: readabilityScore >= 60,
      recommendation: readabilityScore < 60
        ? 'Content may be difficult to read. Consider shorter sentences and simpler vocabulary.'
        : 'Good readability score for search engines.',
    };
  },

  // NEW: Mobile optimization validation
  validateMobileOptimization: (config: SEOConfig) => {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check viewport meta tag (would need to be passed in or checked from HTML)
    if (!config.ogImage) {
      issues.push('Missing optimized social sharing image');
      recommendations.push('Add a properly sized image for social sharing');
    }

    // Check for mobile-friendly structured data
    if (!structuredDataGenerators.website()) {
      issues.push('Missing mobile-optimized structured data');
      recommendations.push('Add mobile-specific structured data');
    }

    // Check meta viewport (would need HTML parsing)
    if (!config.alternateLang) {
      issues.push('Missing hreflang tags for multilingual support');
      recommendations.push('Add hreflang tags for international SEO');
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations,
      mobileScore: 100 - (issues.length * 10),
    };
  },

  // NEW: Technical SEO validation
  validateTechnicalSEO: (config: SEOConfig) => {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Check canonical URL
    if (!config.canonical) {
      issues.push('Missing canonical URL');
      recommendations.push('Add canonical URL to prevent duplicate content issues');
    }

    // Check structured data
    if (!config.structuredData || config.structuredData.length === 0) {
      issues.push('Missing structured data');
      recommendations.push('Add JSON-LD structured data for better search understanding');
    }

    // Check meta robots
    if (config.noIndex) {
      issues.push('Page set to noindex');
      recommendations.push('Consider removing noindex if this page should be indexed');
    }

    return {
      isValid: issues.length === 0,
      issues,
      recommendations,
      technicalScore: 100 - (issues.length * 15),
    };
  }
};

// NEW: Image optimization utilities
export const imageOptimization = {
  generateAltText: (filename: string, context: string): string => {
    // Enhanced alt text generation logic
    const descriptiveParts = filename.split(/[-_]/);
    const contextKeywords = context.toLowerCase().split(' ');
    const relevantParts = descriptiveParts.filter(part =>
      part.length > 2 &&
      !['jpg', 'png', 'gif', 'svg', 'image'].includes(part.toLowerCase()) &&
      contextKeywords.some(keyword => keyword.includes(part.toLowerCase()) || part.includes(keyword))
    );

    return relevantParts.length > 0
      ? `Threads ${relevantParts.join(' ').replace(/([a-z])([A-Z])/g, '$1 $2')}`
      : 'Threads analytics dashboard';
  },

  generateImageMetadata: (src: string, width: number, height: number, alt: string) => ({
    src,
    width,
    height,
    alt,
    loading: 'lazy',
    decoding: 'async',
    fetchpriority: src.includes('hero') ? 'high' : 'auto',
    fetchpriorityAttribute: src.includes('hero') ? 'high' : 'auto',
  }),

  generateWebpUrl: (originalUrl: string): string => {
    // Convert to WebP format for better compression
    return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  },

  generateOptimizedSizes: (src: string): { [key: number]: string } => {
    // Generate responsive image sizes
    const baseName = src.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    const extension = src.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';

    return {
      320: `${baseName}-320${extension}`,
      640: `${baseName}-640${extension}`,
      768: `${baseName}-768${extension}`,
      1024: `${baseName}-1024${extension}`,
      1280: `${baseName}-1280${extension}`,
      1920: `${baseName}-1920${extension}`,
    };
  }
};

// NEW: Performance SEO utilities
export const performanceSEO = {
  generateCLSConfig: () => ({
    trackingId: process.env.NEXT_PUBLIC_GA_ID,
    attribution: true,
    threshold: 0.1,
  }),

  generateLCPConfig: () => ({
    reportChanges: true,
    threshold: 2500,
    metricName: 'LCP',
  }),

  generateFIDConfig: () => ({
    reportChanges: true,
    threshold: 100,
    metricName: 'FID',
  }),

  generateINPConfig: () => ({
    reportChanges: true,
    threshold: 200,
    metricName: 'INP',
    metricVars: {
      INP: {
        name: 'Interaction to Next Paint',
        id: 'INP',
        description: 'Measures the latency of all interactions.',
        threshold: 200,
      },
    },
  }),

  generateCoreWebVitalsReport: () => ({
    CLS: imageOptimization.generateCLSConfig(),
    LCP: performanceSEO.generateLCPConfig(),
    FID: performanceSEO.generateFIDConfig(),
    INP: performanceSEO.generateINPConfig(),
    loadTimes: {
      firstContentfulPaint: 1800,
      largestContentfulPaint: 2500,
      firstInputDelay: 100,
      cumulativeLayoutShift: 0.1,
    },
    recommendations: [
      'Optimize images for faster loading',
      'Minimize CSS and JavaScript',
      'Enable browser caching',
      'Use CDN for static assets',
      'Consider lazy loading for non-critical resources',
    ],
  })
};

// NEW: International SEO utilities
export const internationalSEO = {
  generateHreflangTags: (urls: {
    'en-us': string;
    'en-gb': string;
    'en-au': string;
    'es-es': string;
    'fr-fr': string;
    'de-de': string;
  }) => Object.entries(urls).map(([lang, url]) => ({
    rel: 'alternate',
    hreflang: lang,
    href: url,
  })),

  generateCanonicalWithLocale: (path: string, locale: string): string => {
    return `${SITE_URL}/${locale}${path}`;
  },

  generateLanguageTargeting: (targetCountry: string) => ({
    'target-country': targetCountry,
    'target-language': getLanguageForCountry(targetCountry),
    'hreflang-prefix': getHreflangPrefix(targetCountry),
  }),

  getLanguageForCountry: (country: string): string => {
    const countryToLanguage: Record<string, string> = {
      'US': 'en',
      'GB': 'en',
      'AU': 'en',
      'CA': 'en',
      'DE': 'de',
      'FR': 'fr',
      'ES': 'es',
      'IT': 'it',
      'BR': 'pt',
      'JP': 'ja',
      'KR': 'ko',
    };
    return countryToLanguage[country.toUpperCase()] || 'en';
  },

  getHreflangPrefix: (country: string): string => {
    const prefixes: Record<string, string> = {
      'US': 'en-us',
      'GB': 'en-gb',
      'AU': 'en-au',
      'CA': 'en-ca',
      'DE': 'de-de',
      'FR': 'fr-fr',
      'ES': 'es-es',
      'IT': 'it-it',
      'BR': 'pt-br',
      'JP': 'ja-jp',
      'KR': 'ko-kr',
    };
    return prefixes[country.toUpperCase()] || 'en';
  }
};

// NEW: Content optimization tools
export const contentOptimization = {
  optimizeContentForSEO: (content: string, targetKeywords: string[]) => {
    const wordCount = content.split(' ').length;
    const keywordDensity = calculateKeywordDensity(content, targetKeywords);
    const readabilityScore = calculateReadability(content);

    return {
      originalContent: content,
      optimizedContent: applySEOOptimizations(content, targetKeywords),
      recommendations: generateOptimizationSuggestions({
        wordCount,
        keywordDensity,
        readabilityScore,
        targetKeywords,
      }),
      score: calculateOverallScore({
        wordCount,
        keywordDensity,
        readabilityScore,
      }),
    };
  },

  calculateKeywordDensity: (content: string, keywords: string[]): number => {
    const words = content.toLowerCase().split(/\s+/);
    const matches = keywords.reduce((count, keyword) => {
      return count + words.filter(word => word.includes(keyword.toLowerCase())).length;
    }, 0);
    return (matches / words.length) * 100;
  },

  calculateReadability: (content: string): number => {
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const avgWordsPerSentence = words / sentences;
    return Math.max(0, 100 - (1.015 * avgWordsPerSentence + 84.6));
  },

  applySEOOptimizations: (content: string, targetKeywords: string[]): string => {
    // Implement content optimization logic
    let optimizedContent = content;

    // Add semantic variations of keywords
    targetKeywords.forEach(keyword => {
      const variations = [keyword, keyword.replace(/threads/gi, 'threads-boost')];
      variations.forEach(variation => {
        optimizedContent = optimizedContent.replace(
          new RegExp(`\\b${keyword}\\b`, 'gi'),
          `<strong>${variation}</strong>`
        );
      });
    });

    return optimizedContent;
  },

  generateOptimizationSuggestions: (metrics: {
    wordCount: number;
    keywordDensity: number;
    readabilityScore: number;
    targetKeywords: string[];
  }): string[] => {
    const suggestions: string[] = [];

    if (metrics.wordCount < 300) {
      suggestions.push('Content is too short. Aim for at least 300 words for better SEO.');
    }

    if (metrics.keywordDensity < 1) {
      suggestions.push('Low keyword density. Consider adding relevant target keywords naturally.');
    }

    if (metrics.keywordDensity > 3) {
      suggestions.push('Keyword density is too high. Avoid keyword stuffing.');
    }

    if (metrics.readabilityScore < 60) {
      suggestions.push('Content readability is low. Use shorter sentences and simpler language.');
    }

    if (metrics.targetKeywords.length === 0) {
      suggestions.push('Add target keywords to improve SEO relevance.');
    }

    return suggestions;
  },

  calculateOverallScore: (metrics: {
    wordCount: number;
    keywordDensity: number;
    readabilityScore: number;
  }): number => {
    let score = 0;

    // Word count score (0-25)
    if (metrics.wordCount >= 300) score += 25;
    else if (metrics.wordCount >= 100) score += 15;
    else score += 5;

    // Keyword density score (0-35)
    if (metrics.keywordDensity >= 1 && metrics.keywordDensity <= 3) score += 35;
    else if (metrics.keywordDensity >= 0.5 && metrics.keywordDensity <= 5) score += 20;
    else score += 10;

    // Readability score (0-40)
    if (metrics.readabilityScore >= 80) score += 40;
    else if (metrics.readabilityScore >= 60) score += 25;
    else score += 15;

    return Math.min(100, score);
  }
};

// NEW: Advanced SEO analytics
export const seoAnalytics = {
  calculateSERPPosition: (keyword: string, position: number) => {
    // Mock implementation - in real app, would fetch actual SERP data
    return {
      keyword,
      position,
      change: calculatePositionChange(keyword),
      difficulty: getKeywordDifficulty(keyword),
      opportunity: getRankingOpportunity(keyword),
      topCompetitors: getTopCompetitors(keyword),
    };
  },

  calculatePositionChange: (keyword: string): number => {
    // Mock implementation
    return Math.floor(Math.random() * 10) - 5; // Random change between -5 and +5
  },

  getKeywordDifficulty: (keyword: string): number => {
    // Mock implementation based on keyword length and complexity
    return Math.min(100, Math.max(0, keyword.length * 5 + Math.random() * 20));
  },

  getRankingOpportunity: (keyword: string): string => {
    const difficulty = getKeywordDifficulty(keyword);
    if (difficulty < 30) return 'High';
    if (difficulty < 70) return 'Medium';
    return 'Low';
  },

  getTopCompetitors: (keyword: string): string[] => {
    // Mock implementation
    const competitorPool = [
      'hootsuite.com',
      'buffer.com',
      'sproutsocial.com',
      'later.com',
      'socialbakers.com',
    ];
    return competitorPool.slice(0, Math.floor(Math.random() * 3) + 2);
  },

  trackKeywordRankings: (keywords: string[]) => keywords.map(keyword => ({
    keyword,
    currentPosition: getCurrentPosition(keyword),
    previousPosition: getPreviousPosition(keyword),
    trend: getRankingTrend(keyword),
  })),
};

// Helper functions for SEO analytics
const calculatePositionChange = (keyword: string): number => {
  // Mock implementation
  return Math.floor(Math.random() * 10) - 5;
};

const getKeywordDifficulty = (keyword: string): number => {
  // Mock implementation
  return Math.min(100, Math.max(0, keyword.length * 5 + Math.random() * 20));
};

const getCurrentPosition = (keyword: string): number => {
  // Mock implementation
  return Math.floor(Math.random() * 50) + 1;
};

const getPreviousPosition = (keyword: string): number => {
  // Mock implementation
  return getCurrentPosition(keyword) + calculatePositionChange(keyword);
};

const getRankingTrend = (keyword: string): 'up' | 'down' | 'stable' => {
  const change = calculatePositionChange(keyword);
  if (change > 0) return 'up';
  if (change < 0) return 'down';
  return 'stable';
};

// NEW: Technical SEO monitoring
export const technicalSEO = {
  generateSiteAudit: async (urls: string[]) => {
    // Mock implementation
    return {
      performance: {
        score: 85,
        issues: ['Large images detected', 'Render-blocking resources'],
        recommendations: ['Optimize images', 'Minify CSS and JavaScript'],
      },
      accessibility: {
        score: 90,
        issues: ['Color contrast issues'],
        recommendations: ['Improve color contrast for text'],
      },
      seo: {
        score: 95,
        issues: ['Missing alt text on some images'],
        recommendations: ['Add descriptive alt text to all images'],
      },
      bestPractices: {
        score: 80,
        issues: ['Mixed content detected'],
        recommendations: ['Ensure all resources use HTTPS'],
      },
    };
  },

  crawlSite: async (baseUrl: string): Promise<any> => {
    // Mock implementation
    return {
      totalUrls: 50,
      crawledUrls: 48,
      errors: 2,
      warnings: 5,
      redirects: 3,
    };
  },

  generateXMLSitemap: (pages: Array<{ url: string; lastModified: string; changeFrequency: string; priority: number }>): string => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;
  },

  generateRobotsTxt: (rules: string[]): string => {
    return `# *
User-agent: *
${rules.map(rule => `${rule}`).join('\n')}

# Googlebot
User-agent: Googlebot
${rules.map(rule => `${rule}`).join('\n')}

# Host
Host: ${SITE_URL}

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/server-sitemap.xml`;
  }
};

// NEW: Enhanced slug generation
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

// NEW: Generate reading time with improved accuracy
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Standard reading speed
  const words = content.trim().split(/\s+/).length;
  // Add extra time for images and complex content
  const imageCount = (content.match(/<img|<svg/gi) || []).length;
  const adjustedWords = words + (imageCount * 50); // Add 50 words per image
  return Math.ceil(adjustedWords / wordsPerMinute);
}

// NEW: Generate enhanced excerpt with better context
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove HTML tags
  const cleanContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

  if (cleanContent.length <= maxLength) return cleanContent;

  // Try to end at a sentence boundary
  const truncated = cleanContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  const lastSentenceIndex = Math.max(
    truncated.lastIndexOf('.'),
    truncated.lastIndexOf('!'),
    truncated.lastIndexOf('?')
  );

  // If we found a sentence end, use it
  if (lastSentenceIndex > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceIndex + 1);
  }

  // Otherwise, use the last word boundary
  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
}