'use client';

import Head from 'next/head';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface CanonicalUrlProps {
  path?: string;
  customCanonical?: string;
}

export function CanonicalUrl({ path, customCanonical }: CanonicalUrlProps) {
  const pathname = usePathname();

  // Get the canonical URL
  const getCanonicalUrl = () => {
    if (customCanonical) {
      return customCanonical;
    }

    const baseUrl = 'https://threads-boost.online';
    const currentPath = path || pathname;

    // Ensure path starts with /
    const normalizedPath = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;

    // Remove trailing slash except for home page
    const finalPath = normalizedPath === '/' ? '/' : normalizedPath.replace(/\/$/, '');

    return `${baseUrl}${finalPath}`;
  };

  const canonicalUrl = getCanonicalUrl();

  // This component should be used in <head> section
  useEffect(() => {
    // Update canonical link if it exists
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.href = canonicalUrl;
  }, [canonicalUrl]);

  // For SSR, return null since we handle it in useEffect
  return null;
}

// Alternative component for SSR usage
interface CanonicalLinkProps {
  href: string;
}

export function CanonicalLink({ href }: CanonicalLinkProps) {
  return <link rel="canonical" href={href} />;
}