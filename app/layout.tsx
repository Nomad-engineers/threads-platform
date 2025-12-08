import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import ErrorBoundary from '@/components/error-boundary';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Threads Analytics & Automation Platform - Grow Your Audience',
    template: '%s | Threads-Boost',
  },
  description: 'The #1 Threads analytics platform with AI-powered insights, automation, and growth tools. Track performance, schedule posts, and boost engagement. Start your free trial today!',
  keywords: [
    'Threads analytics',
    'Threads automation',
    'Threads growth tools',
    'Threads scheduling',
    'Meta Threads management',
    'Instagram Threads analytics',
    'Threads AI assistant',
    'Threads content strategy',
    'Threads engagement tracker',
    'Threads competitor analysis',
    'Threads auto posting',
    'Threads hashtag optimization',
    'Threads performance metrics',
    'Threads ROI tracking',
    'creator dashboard Threads',
    'social media analytics Threads',
    'Threads viral content',
    'Threads audience insights',
    'Threads scheduling automation',
    'Threads business tools',
  ],
  authors: [{ name: 'Threads-Boost Team' }],
  creator: 'Threads-Boost',
  publisher: 'Threads-Boost',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://threads-boost.online'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'en-GB': '/',
      'es': '/es',
      'fr': '/fr',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://threads-boost.online',
    title: 'Threads Analytics & Automation Platform - Grow Your Audience',
    description: 'The #1 Threads analytics platform with AI-powered insights, automation, and growth tools. Track performance, schedule posts, and boost engagement. Start your free trial today!',
    siteName: 'Threads-Boost',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Threads Analytics & Automation Platform - Grow Your Audience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Threads Analytics & Automation Platform - Grow Your Audience',
    description: 'The #1 Threads analytics platform with AI-powered insights, automation, and growth tools. Track performance, schedule posts, and boost engagement.',
    images: ['/og-image.svg'],
    creator: '@threads-boost',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
  other: {
    'baidu-site-verification': 'your-baidu-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>

        {/* Organization and WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Threads-Boost",
              "url": "https://threads-boost.online",
              "logo": "https://threads-boost.online/og-image.svg",
              "description": "The #1 Threads analytics platform with AI-powered insights, automation, and growth tools",
              "foundingDate": "2024",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English"]
              },
              "sameAs": [
                "https://twitter.com/threads-boost",
                "https://linkedin.com/company/threads-boost",
                "https://instagram.com/threads-boost"
              ],
              "knowsAbout": [
                "Threads analytics",
                "Social media automation",
                "AI-powered insights",
                "Meta Threads",
                "Instagram Threads"
              ]
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Threads-Boost",
              "url": "https://threads-boost.online",
              "description": "The #1 Threads analytics platform with AI-powered insights, automation, and growth tools",
              "publisher": {
                "@type": "Organization",
                "name": "Threads-Boost",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://threads-boost.online/og-image.svg"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://threads-boost.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}