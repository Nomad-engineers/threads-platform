'use client'

import { Suspense } from 'react'
import { useThreadsAuth } from '@/hooks/use-threads-auth'
import { AuthForm } from './(components)/auth-form'
import { AuthSkeleton } from './(components)/auth-skeleton'
import Head from 'next/head'
import { generateStructuredJSONLD, getPrimaryKeywords } from '@/lib/seo'
import { Breadcrumb, breadcrumbPresets } from '@/components/seo/breadcrumb'

function AuthPageContent() {
  const { isLoading, isRedirecting, handleAuthWithThreads } = useThreadsAuth()

  // Show skeleton while redirecting
  if (isRedirecting) {
    return <AuthSkeleton />
  }

  // Show auth form
  return <AuthForm isLoading={isLoading} onAuthWithThreads={handleAuthWithThreads} />
}

export default function AuthPage() {
  const keywords = [
    'one-click Threads connect',
    'instant Threads login',
    'secure Threads authentication',
    'privacy-focused Threads login',
    'end-to-end encrypted Threads access',
    'compliant Threads data protection',
    'zero-knowledge Threads analytics',
    'Threads analytics without complexity',
    'better than Meta Insights',
    'enterprise-grade Threads tracking',
    'creator-friendly Threads login',
    'business Threads analytics login',
    'Threads analytics quick start',
    'first-time Threads analytics',
    'get started with Threads analytics',
    'Threads OAuth login',
    'hassle-free Threads login',
    'seamless Threads integration',
    'Threads account security',
    'professional Threads monitoring',
    'Threads analytics for new users',
    'advanced Threads insights',
    'Threads data access security',
    'privacy-first Threads analytics'
  ];

  const seoData = {
    title: 'Sign In to Threads-Boost | Connect Your Threads Account',
    description: 'Secure login to access the #1 Threads analytics platform. Connect your Meta Threads account to unlock advanced analytics, automation tools, and growth insights.',
    keywords
  };

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seoData.title,
      description: seoData.description,
      url: "https://threads-boost.online/auth"
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Threads-Boost",
      description: seoData.description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser"
    }
  ];

  return (
    <>
      <Head>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords.join(', ')} />

        {/* Open Graph */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content="https://threads-boost.online/auth" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />

        {/* Canonical URL */}
        <link rel="canonical" href="https://threads-boost.online/auth" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateStructuredJSONLD(structuredData)
          }}
        />
      </Head>

      <div className="min-h-screen">
        <Breadcrumb items={breadcrumbPresets.auth} className="container mx-auto px-4 py-4" />
        <Suspense fallback={<AuthSkeleton />}>
          <AuthPageContent />
        </Suspense>
      </div>
    </>
  );
}