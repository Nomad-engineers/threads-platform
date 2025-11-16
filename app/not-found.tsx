'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  BarChart3,
  Search,
  MessageSquare,
  TrendingUp,
  Sparkles,
  Calendar,
  Zap,
  Users,
  ArrowLeft,
  HelpCircle,
  Mail,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// TypeScript interfaces
interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon?: React.ReactNode;
}

interface QuickAction {
  icon: any;
  title: string;
  description: string;
  href: string;
  color: string;
}

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  // Analytics-themed error messages
  const errorMessages = [
    {
      title: "Lost in the data?",
      subtitle: "This page seems to have gone viral in all the wrong places."
    },
    {
      title: "Analytics anomaly detected",
      subtitle: "404 engagement rate - that's not good. Let's get you back on track."
    },
    {
      title: "Thread not found",
      subtitle: "This post got lost in the algorithm. Let's find you something better."
    },
    {
      title: "Metrics gone missing",
      subtitle: "Even the best analytics can't find this page. Let's navigate back."
    },
    {
      title: "Content error detected",
      subtitle: "This URL has 0% reach. Let's find something with better engagement."
    }
  ];

  const [currentMessage, setCurrentMessage] = useState(errorMessages[0]);

  // Mock search data
  const mockSearchData: SearchResult[] = [
    {
      id: '1',
      title: 'Analytics Dashboard',
      description: 'View your Threads analytics and performance metrics',
      category: 'Analytics',
      url: '/dashboard',
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      id: '2',
      title: 'Content Scheduler',
      description: 'Schedule and manage your Threads content',
      category: 'Tools',
      url: '/dashboard/schedule',
      icon: <Calendar className="h-4 w-4" />
    },
    {
      id: '3',
      title: 'Engagement Insights',
      description: 'Deep dive into your audience engagement',
      category: 'Analytics',
      url: '/dashboard/analytics',
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      id: '4',
      title: 'Comment Management',
      description: 'Manage and respond to comments efficiently',
      category: 'Engagement',
      url: '/dashboard/comments',
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      id: '5',
      title: 'Competitor Tracking',
      description: 'Monitor competitor performance and strategies',
      category: 'Analytics',
      url: '/dashboard/competitors',
      icon: <Users className="h-4 w-4" />
    },
    {
      id: '6',
      title: 'Growth Insights',
      description: 'Discover growth opportunities and trends',
      category: 'Insights',
      url: '/dashboard/insights',
      icon: <Sparkles className="h-4 w-4" />
    }
  ];

  // Loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Animation effect
  useEffect(() => {
    if (!isLoading) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentMessage(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      }, 4000);
      return () => clearTimeout(timer);
    }
    return;
  }, [isLoading]);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Focus search input on mount
  useEffect(() => {
    if (!isLoading && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isLoading]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim().length === 0) {
        setSearchResults([]);
        setShowSuggestions(false);
        return;
      }

      setIsSearching(true);

      // Simulate API call delay
      setTimeout(() => {
        const filtered = mockSearchData.filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 5));
        setShowSuggestions(true);
        setIsSearching(false);
      }, 300);
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedSuggestionIndex(-1);
    debouncedSearch(value);
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0 && searchResults[selectedSuggestionIndex]) {
          const selected = searchResults[selectedSuggestionIndex];
          router.push(selected.url);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        suggestionsRef.current &&
        !searchInputRef.current.contains(e.target as Node) &&
        !suggestionsRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate tilt effect for 404 text
  const calculateTilt = () => {
    if (typeof window === 'undefined') return {};
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = (mousePosition.x - centerX) / centerX;
    const deltaY = (mousePosition.y - centerY) / centerY;
    return {
      transform: `perspective(1000px) rotateY(${deltaX * 3}deg) rotateX(${-deltaY * 3}deg)`,
    };
  };

  // Quick actions data
  const quickActions: QuickAction[] = [
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'View your performance metrics',
      href: '/dashboard',
      color: 'from-chart-1 to-chart-2'
    },
    {
      icon: Calendar,
      title: 'Content Calendar',
      description: 'Schedule your next posts',
      href: '/dashboard/schedule',
      color: 'from-chart-3 to-chart-4'
    },
    {
      icon: MessageSquare,
      title: 'Comment Management',
      description: 'Engage with your audience',
      href: '/dashboard/comments',
      color: 'from-chart-5 to-chart-1'
    },
    {
      icon: TrendingUp,
      title: 'Growth Insights',
      description: 'Discover growth opportunities',
      href: '/dashboard/insights',
      color: 'from-chart-2 to-chart-3'
    }
  ];

  // Help options data
  const helpOptions = [
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse our documentation',
      href: '/help',
      delay: 100
    },
    {
      icon: Mail,
      title: 'Contact Support',
      description: 'Get help from our team',
      href: '/contact',
      delay: 200
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <div className="loading-shimmer h-4 w-32 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  // Remove duplicate declarations as they are now defined above

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sidebar to-accent/20 dark:from-background dark:via-card dark:to-accent/30">
      {/* Accessibility: Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md focus:z-50"
      >
        Skip to main content
      </a>

      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="fixed inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chart-1/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-3/5 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Threads-Boost</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/dashboard">
                  Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>
        </header>

        {/* Main 404 Content */}
        <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <div className="w-full max-w-4xl mx-auto text-center">
            {/* Animated 404 Hero Section */}
            <div className={`mb-12 ${isAnimating ? 'animate-fade-in' : ''}`}>
              {/* Creative 404 Display */}
              <div className="relative mb-8 inline-block" style={calculateTilt()}>
                <div className="absolute inset-0 holographic-gradient opacity-20 blur-xl" />
                <h1 className="relative text-9xl font-black gradient-text leading-none animate-glitch" role="img" aria-label="404 Error">
                  <span className="inline-block" aria-hidden="true">4</span>
                  <span className="inline-block animate-bounce animate-float" style={{animationDelay: '0.1s'}} aria-hidden="true">
                    <Sparkles className="h-24 w-24 mx-auto" />
                  </span>
                  <span className="inline-block" aria-hidden="true">4</span>
                </h1>
                {/* Animated particles around 404 */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-primary rounded-full animate-float"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                  <Badge variant="secondary" className="animate-scale-in" aria-label="Error status">
                    Page Not Found
                  </Badge>
                </div>
              </div>

              {/* Error Message */}
              <div className="mb-8 space-y-4">
                <h2 className={`text-3xl font-bold text-foreground ${isAnimating ? 'animate-slide-up' : ''}`} style={{animationDelay: '0.2s'}}>
                  {currentMessage?.title || "Page Not Found"}
                </h2>
                <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${isAnimating ? 'animate-slide-up' : ''}`} style={{animationDelay: '0.3s'}}>
                  {currentMessage?.subtitle || "The page you're looking for doesn't exist."}
                </p>
              </div>

              {/* Search Bar */}
              <div className={`max-w-xl mx-auto mb-12 ${isAnimating ? 'animate-slide-up' : ''}`} style={{animationDelay: '0.4s'}}>
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for analytics, scheduler, or anything else..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyDown}
                      onFocus={() => {
                        if (searchResults.length > 0) {
                          setShowSuggestions(true);
                        }
                      }}
                      className={cn(
                        "pl-12 pr-20 h-14 text-lg border-2 bg-background/80 backdrop-blur-sm",
                        "focus:ring-4 focus:ring-primary/20 transition-all duration-300 search-enhanced",
                        "focus:border-primary focus:shadow-2xl focus:shadow-primary/10"
                      )}
                      aria-label="Search Threads-Boost features and documentation"
                      aria-describedby="search-description"
                      role="combobox"
                      aria-expanded={showSuggestions}
                      aria-autocomplete="list"
                      autoComplete="off"
                      spellCheck="false"
                    />
                    <Button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 hover:scale-105 transition-transform"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Search"
                      )}
                    </Button>
                  </div>

                  {/* Search Suggestions Dropdown */}
                  {showSuggestions && searchResults.length > 0 && (
                    <ul
                      ref={suggestionsRef}
                      className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-md border rounded-xl shadow-2xl overflow-hidden z-20 animate-slide-down"
                      role="listbox"
                    >
                      {searchResults.map((result, index) => (
                        <li key={result.id} role="option">
                          <Link
                            href={result.url}
                            className={cn(
                              "block px-4 py-3 hover:bg-accent/50 transition-colors first:rounded-t-lg last:rounded-b-lg",
                              "focus:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary",
                              selectedSuggestionIndex === index && "bg-accent/50"
                            )}
                            onClick={() => {
                              setShowSuggestions(false);
                              setSearchQuery("");
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {result.icon}
                                <div>
                                  <div className="font-medium">{result.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {result.description}
                                  </div>
                                </div>
                              </div>
                              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md">
                                {result.category}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </form>
                <p id="search-description" className="sr-only">
                  Use this search to find pages, features, or content on Threads-Boost
                </p>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className={`mb-12 ${isAnimating ? 'animate-slide-up' : ''}`} style={{animationDelay: '0.5s'}}>
              <h3 className="text-2xl font-semibold mb-8 text-foreground">
                Where would you like to go?
              </h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-xl glass card-hover-lift focus-within:ring-4 focus-within:ring-primary/20">
                      <CardHeader className="text-center">
                        <div className={`h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <action.icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {action.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className={`mb-12 ${isAnimating ? 'animate-slide-up' : ''}`} style={{animationDelay: '0.6s'}}>
              <Card className="max-w-2xl mx-auto border-0 shadow-xl glass">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <HelpCircle className="h-6 w-6" />
                    Still need help?
                  </CardTitle>
                  <CardDescription className="text-base">
                    Our support team is here to help you find what you're looking for
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {helpOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto p-6 flex flex-col items-center gap-3 hover:bg-accent/50 transition-all duration-300 group"
                        asChild
                        style={{animationDelay: `${option.delay}ms`}}
                      >
                        <Link href={option.href}>
                          <option.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                          <div className="text-center">
                            <div className="font-medium">{option.title}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                        </Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Analytics-themed Creative Elements */}
            <div className={`mt-12 ${isAnimating ? 'animate-slide-up' : ''}`} style={{animationDelay: '0.7s'}}>
              <div className="inline-flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-chart-1 animate-pulse" />
                  <span>Engagement: 0%</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-chart-2 animate-pulse" style={{animationDelay: '0.5s'}} />
                  <span>Reach: 1 person (you!)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-chart-3 animate-pulse" style={{animationDelay: '1s'}} />
                  <span>Status: Lost in algorithm</span>
                </div>
              </div>
            </div>

            {/* Fun Message */}
            <div className={`mt-8 text-center ${isAnimating ? 'animate-fade-in' : ''}`} style={{animationDelay: '0.8s'}}>
              <Badge variant="outline" className="text-sm px-4 py-2">
                <Zap className="h-4 w-4 mr-2" />
                Fun fact: This error page has a 100% bounce rate. Let's fix that!
              </Badge>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>&copy; 2024 Threads-Boost. Analytics & automation for Threads.</span>
              </div>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                <Separator orientation="vertical" className="h-4" />
                <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                <Separator orientation="vertical" className="h-4" />
                <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Debounce utility (local to this component)
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}