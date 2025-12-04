import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Threads-Boost - Analytics for Threads',
    template: '%s | Threads-Boost',
  },
  description: 'Comprehensive analytics and automation platform for Meta\'s Threads. Track performance, schedule posts, and grow your audience with data-driven insights.',
  keywords: [
    'Threads auto posting',
    'Threads analytics',
    'Threads AI assistant',
    'Threads content scheduling',
    'Threads automation',
    'AI-powered Threads tools',
    'Threads hashtag optimizer',
    'Threads engagement tracker',
    'Instagram Threads analytics',
    'Meta Threads management',
    'Threads creator tools',
    'Threads monetization analytics',
    'Threads competitor analysis',
    'AI content generator Threads',
    'Threads viral content',
    'Threads growth tools',
    'Threads performance metrics',
    'Threads trending topics',
    'community management Threads',
    'audience insights Threads',
    'Threads smart analytics',
    'social media ROI Threads',
    'Threads scheduling automation',
    'Threads engagement booster',
    'creator dashboard Threads',
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
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://threads-boost.online',
    title: 'Threads-Boost - Analytics for Threads',
    description: 'Comprehensive analytics and automation platform for Meta\'s Threads. Track performance, schedule posts, and grow your audience.',
    siteName: 'Threads-Boost',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Threads-Boost - Analytics for Threads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Threads-Boost - Analytics for Threads',
    description: 'Comprehensive analytics and automation platform for Meta\'s Threads.',
    images: ['/og-image.png'],
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}