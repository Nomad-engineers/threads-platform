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
    default: 'Threadlytics - Analytics for Threads',
    template: '%s | Threadlytics',
  },
  description: 'Comprehensive analytics and automation platform for Meta\'s Threads. Track performance, schedule posts, and grow your audience with data-driven insights.',
  keywords: [
    'Threads analytics',
    'social media analytics',
    'content scheduling',
    'Threads automation',
    'social media management',
    'Instagram Threads',
    'Meta Threads',
    'content creator tools',
    'social media metrics',
    'audience growth',
  ],
  authors: [{ name: 'Threadlytics Team' }],
  creator: 'Threadlytics',
  publisher: 'Threadlytics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://threadlytics.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://threadlytics.com',
    title: 'Threadlytics - Analytics for Threads',
    description: 'Comprehensive analytics and automation platform for Meta\'s Threads. Track performance, schedule posts, and grow your audience.',
    siteName: 'Threadlytics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Threadlytics - Analytics for Threads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Threadlytics - Analytics for Threads',
    description: 'Comprehensive analytics and automation platform for Meta\'s Threads.',
    images: ['/og-image.png'],
    creator: '@threadlytics',
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
          defaultTheme="system"
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