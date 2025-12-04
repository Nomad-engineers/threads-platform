'use client';

import Head from 'next/head';
import { generateStructuredJSONLD, generateCanonicalUrl } from '@/lib/seo';
import { ReactNode } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  structuredData?: Record<string, any>[];
  children?: ReactNode;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  structuredData = [],
  children,
}: SEOHeadProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://threads-boost.online';
  const defaultTitle = 'Threads-Boost - Analytics & Automation for Threads';
  const defaultDescription = 'Comprehensive analytics and automation platform for Meta Threads. Track performance, schedule posts, and grow your audience with AI-powered insights.';
  const defaultOgImage = `${siteUrl}/og-image.png`;

  const finalTitle = title ? `${title} | Threads-Boost` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonical = canonical || generateCanonicalUrl();
  const finalOgImage = ogImage || defaultOgImage;

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{finalTitle}</title>
        <meta name="description" content={finalDescription} />
        {keywords && keywords.length > 0 && (
          <meta name="keywords" content={keywords.join(', ')} />
        )}

        {/* Canonical URL */}
        <link rel="canonical" href={finalCanonical} />

        {/* Robots */}
        <meta
          name="robots"
          content={noIndex ? 'noindex,nofollow' : 'index,follow'}
        />

        {/* Open Graph */}
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:url" content={finalCanonical} />
        <meta property="og:site_name" content="Threads-Boost" />
        <meta property="og:image" content={finalOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={finalTitle} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={finalDescription} />
        <meta name="twitter:image" content={finalOgImage} />
        <meta name="twitter:creator" content="@threadsboost" />
        <meta name="twitter:site" content="@threadsboost" />

        {/* Additional Meta Tags */}
        <meta name="author" content="Threads-Boost Team" />
        <meta name="publisher" content="Threads-Boost" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Verification tags (if available) */}
        {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_BING_VERIFICATION && (
          <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION} />
        )}
        {process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && (
          <meta name="yandex-verification" content={process.env.NEXT_PUBLIC_YANDEX_VERIFICATION} />
        )}

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Structured Data */}
        {structuredData.length > 0 && generateStructuredJSONLD(structuredData)}
      </Head>

      {children}
    </>
  );
}

export default SEOHead;