'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Make alt required for SEO
  fallbackSrc?: string;
  lazy?: boolean;
  caption?: string;
  figureClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  lazy = true,
  caption,
  className,
  figureClassName,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  // Generate SEO-friendly alt text if not provided
  const generateAltText = (src: string): string => {
    if (alt && alt.length > 0) return alt;

    // Extract filename from src
    const filename = src.split('/').pop()?.split('.')[0] || '';

    // Convert filename to readable text
    const readableText = filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    return readableText || 'Image';
  };

  const finalAlt = generateAltText(typeof src === 'string' ? src : '');

  return (
    <figure className={cn('relative', figureClassName)}>
      {loading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}

      <Image
        src={error ? fallbackSrc : src}
        alt={finalAlt}
        className={cn(
          'transition-opacity duration-300',
          loading ? 'opacity-0' : 'opacity-100',
          error && 'grayscale',
          className
        )}
        loading={lazy && !priority ? 'lazy' : 'eager'}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />

      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// SEO Image helper utilities
export const imageSEOhelpers = {
  // Generate descriptive alt text
  generateAltText: (src: string, context?: string): string => {
    const filename = src.split('/').pop()?.split('.')[0] || '';
    const readableText = filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());

    return context ? `${readableText} - ${context}` : readableText;
  },

  // Generate SEO-friendly filename
  generateFilename: (description: string): string => {
    return description
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
  },

  // Generate structured data for images
  generateImageObject: (src: string, caption: string, width: number, height: number) => ({
    '@type': 'ImageObject',
    contentUrl: src,
    caption,
    width,
    height,
    author: {
      '@type': 'Organization',
      name: 'Threads-Boost',
    },
    license: 'https://creativecommons.org/licenses/by/4.0/',
  }),

  // Validate image SEO
  validateImageSEO: (alt: string, width: number, height: number, file_size_kb: number) => {
    const issues = [];

    if (!alt || alt.length === 0) {
      issues.push('Alt text is missing');
    } else if (alt.length > 125) {
      issues.push('Alt text is too long (max 125 characters)');
    }

    if (width < 1200 && file_size_kb > 100) {
      issues.push('Image should be at least 1200px wide for better SEO');
    }

    if (file_size_kb > 500) {
      issues.push('Image file size is too large (should be under 500KB)');
    }

    if (width / height < 16/9 || width / height > 21/9) {
      issues.push('Image aspect ratio should be between 16:9 and 21:9 for optimal display');
    }

    return {
      isOptimal: issues.length === 0,
      issues,
      score: Math.max(0, 100 - (issues.length * 20)),
    };
  },
};

export default OptimizedImage;