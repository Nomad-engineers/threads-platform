'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateStructuredJSONLD } from '@/lib/seo';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  // Generate structured data for breadcrumbs
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        ...(item.href && { item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://threads-boost.online'}${item.href}` }),
      })),
    },
  ];

  return (
    <>
      <nav
        className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}
        aria-label="Breadcrumb"
      >
        <Link
          href="/"
          className="flex items-center hover:text-foreground transition-colors"
          aria-label="Home"
        >
          <Home className="h-4 w-4" />
        </Link>

        {items.map((item, index) => (
          <div key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  item.current ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Structured Data */}
      {generateStructuredJSONLD(structuredData)}
    </>
  );
}

// Preset breadcrumb configurations for common pages
export const breadcrumbPresets = {
  home: [],
  dashboard: [
    { label: 'Dashboard', href: '/dashboard', current: true },
  ],
  analytics: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics', href: '/dashboard/analytics', current: true },
  ],
  content: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Content', href: '/dashboard/content', current: true },
  ],
  activities: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Activities', href: '/dashboard/activities', current: true },
  ],
  auth: [
    { label: 'Authentication', href: '/auth', current: true },
  ],
  privacy: [
    { label: 'Privacy Policy', href: '/privacy', current: true },
  ],
  terms: [
    { label: 'Terms of Service', href: '/terms', current: true },
  ],
  refund: [
    { label: 'Refund Policy', href: '/refund', current: true },
  ],
};