'use client';

import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

interface SEOHeadingProps extends ComponentProps<'h1'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  highlight?: boolean;
  gradient?: boolean;
}

export function SEOHeading({
  level = 2,
  children,
  className,
  highlight = false,
  gradient = false,
  ...props
}: SEOHeadingProps) {
  const baseClasses = "font-bold tracking-tight";

  const headingStyles = {
    h1: "text-4xl md:text-6xl lg:text-7xl mb-6", // Main page title
    h2: "text-3xl md:text-4xl lg:text-5xl mb-4", // Section headers
    h3: "text-2xl md:text-3xl lg:text-4xl mb-3", // Subsection headers
    h4: "text-xl md:text-2xl lg:text-3xl mb-2", // Feature titles
    h5: "text-lg md:text-xl lg:text-2xl mb-2", // Small section titles
    h6: "text-base md:text-lg lg:text-xl mb-1"  // Minor titles
  };

  const highlightStyles = highlight
    ? "relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary after:rounded-full"
    : "";

  const gradientStyles = gradient
    ? "bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
    : "";

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={cn(
        baseClasses,
        headingStyles[`h${level}`],
        highlightStyles,
        gradientStyles,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Page title component (H1)
export function PageTitle({
  children,
  className,
  highlight = true,
  ...props
}: Omit<SEOHeadingProps, 'level'>) {
  return (
    <SEOHeading
      level={1}
      highlight={highlight}
      gradient={true}
      className={cn("text-center", className)}
      {...props}
    >
      {children}
    </SEOHeading>
  );
}

// Section header component (H2)
export function SectionHeader({
  children,
  className,
  highlight = false,
  ...props
}: Omit<SEOHeadingProps, 'level'>) {
  return (
    <SEOHeading
      level={2}
      highlight={highlight}
      className={className}
      {...props}
    >
      {children}
    </SEOHeading>
  );
}

// Subsection header component (H3)
export function SubsectionHeader({
  children,
  className,
  ...props
}: Omit<SEOHeadingProps, 'level'>) {
  return (
    <SEOHeading
      level={3}
      className={className}
      {...props}
    >
      {children}
    </SEOHeading>
  );
}

// Feature title component (H4)
export function FeatureTitle({
  children,
  className,
  ...props
}: Omit<SEOHeadingProps, 'level'>) {
  return (
    <SEOHeading
      level={4}
      className={cn("text-center", className)}
      {...props}
    >
      {children}
    </SEOHeading>
  );
}

// SEO validation utilities for headings
export const headingSEOhelpers = {
  // Validate heading hierarchy
  validateHeadingHierarchy: (headings: Array<{ level: number; text: string }>) => {
    const issues = [];
    let previousLevel = 0;

    headings.forEach((heading, index) => {
      // Check for skipped heading levels
      if (index > 0 && heading.level > previousLevel + 1) {
        issues.push(`Skipped heading level: H${previousLevel} to H${heading.level} in "${heading.text}"`);
      }

      // Check for multiple H1 tags
      if (heading.level === 1 && headings.filter(h => h.level === 1).length > 1) {
        issues.push(`Multiple H1 tags found. Only one H1 per page is recommended.`);
      }

      previousLevel = heading.level;
    });

    return {
      isValid: issues.length === 0,
      issues,
      headingCount: headings.length,
      h1Count: headings.filter(h => h.level === 1).length
    };
  },

  // Generate heading suggestions based on content
  generateHeadings: (content: string, maxHeadings: number = 6) => {
    const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
    const headings = [];

    paragraphs.forEach((paragraph, index) => {
      if (index < maxHeadings && paragraph.length > 50 && paragraph.length < 200) {
        // Extract first sentence as potential heading
        const firstSentence = paragraph.split('.')[0] + '.';

        // Clean up and format as heading
        const heading = firstSentence
          .replace(/^(The|A|An)\s+/i, '') // Remove articles
          .substring(0, 60) // Limit length
          .trim();

        if (heading.length > 10) {
          headings.push({
            text: heading,
            suggestedLevel: index === 0 ? 2 : Math.min(3, 2 + Math.floor(index / 2))
          });
        }
      }
    });

    return headings;
  },

  // Generate SEO-optimized heading text
  optimizeHeadingText: (text: string, targetKeywords: string[] = []) => {
    // Remove unnecessary words
    const optimized = text
      .replace(/\b(how to|learn about|what is)\s+/gi, '')
      .replace(/\s+for\s+your\s+/gi, ' for ')
      .trim();

    // Check if target keywords are included
    const hasKeywords = targetKeywords.some(keyword =>
      optimized.toLowerCase().includes(keyword.toLowerCase())
    );

    return {
      text: optimized,
      hasKeywords,
      suggestions: !hasKeywords ? targetKeywords : []
    };
  },

  // Analyze keyword distribution in headings
  analyzeKeywordDistribution: (headings: Array<{ level: number; text: string }>, keywords: string[]) => {
    const distribution = keywords.map(keyword => ({
      keyword,
      count: headings.filter(h => h.text.toLowerCase().includes(keyword.toLowerCase())).length,
      inImportantHeadings: headings.filter(h =>
        h.level <= 3 && h.text.toLowerCase().includes(keyword.toLowerCase())
      ).length
    }));

    return {
      distribution,
      totalKeywordHeadings: distribution.reduce((sum, d) => sum + d.count, 0),
      importantKeywordHeadings: distribution.reduce((sum, d) => sum + d.inImportantHeadings, 0),
      suggestions: distribution
        .filter(d => d.count === 0)
        .map(d => `Consider using "${d.keyword}" in important headings`)
    };
  }
};

// Hook to extract headings from page content
export function useHeadingExtraction() {
  const extractHeadings = (elementId?: string) => {
    const selector = elementId ? `#${elementId} h1, #${elementId} h2, #${elementId} h3, #${elementId} h4, #${elementId} h5, #${elementId} h6`
                             : 'h1, h2, h3, h4, h5, h6';

    const headingElements = document.querySelectorAll(selector);

    return Array.from(headingElements).map((heading) => ({
      level: parseInt(heading.tagName.charAt(1)),
      text: heading.textContent || '',
      id: heading.id,
      element: heading
    }));
  };

  const generateTableOfContents = (headings: Array<{ level: number; text: string; id: string }>) => {
    return headings
      .filter(h => h.level <= 3) // Only H1-H3 for ToC
      .map(h => ({
        ...h,
        indent: (h.level - 1) * 16 // 16px indentation per level
      }));
  };

  return {
    extractHeadings,
    generateTableOfContents
  };
}

// Table of contents component
export function TableOfContents({
  headings,
  className
}: {
  headings: Array<{ level: number; text: string; id: string; indent: number }>;
  className?: string;
}) {
  return (
    <nav className={cn("sticky top-4 space-y-2", className)}>
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
        Table of Contents
      </h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginLeft: `${heading.indent}px` }}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}