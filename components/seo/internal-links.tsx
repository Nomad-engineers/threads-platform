'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BarChart3, Calendar, MessageSquare, TrendingUp, Star, Users, Zap, Shield, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LinkItem {
  href: string;
  title: string;
  description: string;
  icon?: any;
  badge?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface InternalLinksProps {
  context?: string;
  maxItems?: number;
  columns?: 1 | 2 | 3 | 4;
  showBadges?: boolean;
  className?: string;
}

// Strategic internal linking configuration
const linkStrategies = {
  // Homepage links
  homepage: {
    primary: [
      {
        href: '/auth',
        title: 'Start Free Trial',
        description: 'Connect your Threads account and unlock powerful analytics',
        icon: Zap,
        badge: 'Popular',
        priority: 'high' as const
      },
      {
        href: '/dashboard/analytics',
        title: 'Analytics Dashboard',
        description: 'Deep insights into your Threads performance and growth',
        icon: BarChart3,
        badge: 'Core Feature',
        priority: 'high' as const
      },
      {
        href: '/pricing',
        title: 'Pricing Plans',
        description: 'Choose the perfect plan for your Threads growth strategy',
        icon: Star,
        priority: 'medium' as const
      }
    ],
    secondary: [
      {
        href: '/features',
        title: 'All Features',
        description: 'Explore our complete suite of Threads analytics tools',
        icon: Globe,
        priority: 'low' as const
      },
      {
        href: '/blog',
        title: 'Blog & Tips',
        description: 'Learn how to grow your Threads audience effectively',
        icon: MessageSquare,
        priority: 'low' as const
      }
    ]
  },

  // Dashboard links
  dashboard: {
    primary: [
      {
        href: '/dashboard/analytics',
        title: 'Analytics Overview',
        description: 'Comprehensive performance metrics and insights',
        icon: BarChart3,
        badge: 'Most Used',
        priority: 'high' as const
      },
      {
        href: '/dashboard/content',
        title: 'Content Management',
        description: 'Schedule and optimize your Threads content',
        icon: Calendar,
        priority: 'high' as const
      },
      {
        href: '/dashboard/activities',
        title: 'Recent Activities',
        description: 'Track your latest engagement and interactions',
        icon: MessageSquare,
        priority: 'medium' as const
      }
    ],
    secondary: [
      {
        href: '/dashboard/competitors',
        title: 'Competitor Analysis',
        description: 'Monitor and learn from successful creators',
        icon: Users,
        priority: 'medium' as const
      }
    ]
  },

  // Analytics page links
  analytics: {
    primary: [
      {
        href: '/dashboard/content',
        title: 'Content Scheduling',
        description: 'Schedule posts at optimal times for maximum engagement',
        icon: Calendar,
        badge: 'Recommended',
        priority: 'high' as const
      },
      {
        href: '/dashboard/activities',
        title: 'Engagement Tracking',
        description: 'Monitor comments, likes, and shares in real-time',
        icon: MessageSquare,
        priority: 'high' as const
      }
    ],
    secondary: [
      {
        href: '/pricing',
        title: 'Upgrade Plan',
        description: 'Unlock advanced analytics features and insights',
        icon: Star,
        badge: 'Pro Feature',
        priority: 'medium' as const
      }
    ]
  },

  // Legal/support links
  legal: {
    primary: [
      {
        href: '/privacy',
        title: 'Privacy Policy',
        description: 'How we protect your data and privacy',
        icon: Shield,
        priority: 'medium' as const
      },
      {
        href: '/terms',
        title: 'Terms of Service',
        description: 'Our terms and conditions for using Threads-Boost',
        icon: Globe,
        priority: 'medium' as const
      }
    ],
    secondary: [
      {
        href: '/refund',
        title: 'Refund Policy',
        description: 'Our hassle-free refund guarantee',
        icon: Star,
        priority: 'low' as const
      }
    ]
  }
};

export function InternalLinks({
  context = 'homepage',
  maxItems = 3,
  columns = 3,
  showBadges = true,
  className
}: InternalLinksProps) {
  const strategy = linkStrategies[context as keyof typeof linkStrategies];

  if (!strategy) {
    return null;
  }

  // Combine primary and secondary links, limit by maxItems
  const allLinks = [...strategy.primary, ...strategy.secondary]
    .slice(0, maxItems)
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

  if (allLinks.length === 0) {
    return null;
  }

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'grid gap-4',
        columns === 1 && 'grid-cols-1',
        columns === 2 && 'grid-cols-1 md:grid-cols-2',
        columns === 3 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      )}>
        {allLinks.map((link, index) => (
          <Link key={link.href} href={link.href}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md hover:border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {link.icon && <link.icon className="h-6 w-6 text-primary" />}
                </div>
                <CardTitle className="text-lg flex items-center justify-center gap-2">
                  {link.title}
                  {showBadges && link.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {link.badge}
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {link.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-center text-primary group-hover:translate-x-1 transition-transform">
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Context-aware linking component
export function ContextualLinks({
  currentPath,
  keywords = []
}: {
  currentPath: string;
  keywords?: string[];
}) {
  // Smart link suggestions based on current page and keywords
  const getContextualLinks = (): LinkItem[] => {
    const baseLinks: LinkItem[] = [];

    // Add authentication link if not authenticated
    if (!currentPath.startsWith('/dashboard')) {
      baseLinks.push({
        href: '/auth',
        title: 'Start Free Trial',
        description: 'Connect your Threads account and get started',
        icon: Zap,
        badge: 'Get Started',
        priority: 'high'
      });
    }

    // Add analytics link based on keywords
    if (keywords.includes('analytics') || keywords.includes('data') || keywords.includes('metrics')) {
      baseLinks.push({
        href: '/dashboard/analytics',
        title: 'Advanced Analytics',
        description: 'Deep dive into your performance metrics',
        icon: BarChart3,
        priority: 'high'
      });
    }

    // Add content scheduling link
    if (keywords.includes('schedule') || keywords.includes('posting') || keywords.includes('content')) {
      baseLinks.push({
        href: '/dashboard/content',
        title: 'Content Scheduler',
        description: 'Schedule posts at optimal times',
        icon: Calendar,
        priority: 'high'
      });
    }

    // Add engagement link
    if (keywords.includes('engagement') || keywords.includes('comments') || keywords.includes('audience')) {
      baseLinks.push({
        href: '/dashboard/activities',
        title: 'Engagement Hub',
        description: 'Manage comments and interactions',
        icon: MessageSquare,
        priority: 'medium'
      });
    }

    // Add growth link
    if (keywords.includes('growth') || keywords.includes('audience') || keywords.includes('followers')) {
      baseLinks.push({
        href: '/dashboard/analytics',
        title: 'Growth Insights',
        description: 'Track your audience growth over time',
        icon: TrendingUp,
        priority: 'medium'
      });
    }

    // Add pricing link
    if (keywords.includes('pricing') || keywords.includes('plans') || keywords.includes('upgrade')) {
      baseLinks.push({
        href: '/pricing',
        title: 'Pricing Plans',
        description: 'Choose the perfect plan for your needs',
        icon: Star,
        priority: 'medium'
      });
    }

    return baseLinks.slice(0, 3);
  };

  const links = getContextualLinks();

  if (links.length === 0) {
    return null;
  }

  return (
    <section className="border-t pt-8 mt-8">
      <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
      <InternalLinks
        context="homepage"
        maxItems={3}
        columns={3}
        showBadges={true}
      />
    </section>
  );
}

// Related content suggestions based on path
export function RelatedContent({ currentPath }: { currentPath: string }) {
  const getRelatedContent = () => {
    if (currentPath === '/') {
      return [
        {
          href: '/blog/how-to-grow-threads',
          title: 'How to Grow Your Threads Audience',
          description: 'Proven strategies for rapid audience growth'
        },
        {
          href: '/blog/threads-analytics-guide',
          title: 'Complete Guide to Threads Analytics',
          description: 'Understanding your performance metrics'
        }
      ];
    }

    if (currentPath.startsWith('/dashboard')) {
      return [
        {
          href: '/help/threads-api',
          title: 'Threads API Integration Guide',
          description: 'Connect multiple accounts and automate workflows'
        },
        {
          href: '/blog/best-times-to-post',
          title: 'Best Times to Post on Threads',
          description: 'Data-driven insights for optimal scheduling'
        }
      ];
    }

    return [];
  };

  const related = getRelatedContent();

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="border-t pt-8 mt-8">
      <h3 className="text-lg font-semibold mb-4">Learn More</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {related.map((item, index) => (
          <Link key={item.href} href={item.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <h4 className="font-medium text-primary mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}