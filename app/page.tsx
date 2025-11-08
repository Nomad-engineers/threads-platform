import Link from 'next/link';
import { ArrowRight, BarChart3, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Threadlytics</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex-1">
        <div className="container px-4 py-20 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">
              Analytics & Automation for Threads
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
              Track your performance, schedule content, and grow your audience with data-driven insights.
              The comprehensive platform for Threads creators and businesses.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/register">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#features">View Features</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="container px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">Everything you need to grow on Threads</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Powerful analytics and automation tools designed for Threads creators and businesses
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-brand-500" />
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>
                    Track engagement, identify viral content, and understand your audience with detailed insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Engagement rate tracking</li>
                    <li>• Viral post prediction</li>
                    <li>• Competitor benchmarking</li>
                    <li>• Custom date ranges</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Calendar className="h-8 w-8 text-brand-500" />
                  <CardTitle>Smart Scheduling</CardTitle>
                  <CardDescription>
                    Schedule posts for optimal times and automate your content strategy with AI-powered suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• AI-powered timing</li>
                    <li>• Content calendar</li>
                    <li>• Bulk scheduling</li>
                    <li>• Auto-posting</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-brand-500" />
                  <CardTitle>Comment Management</CardTitle>
                  <CardDescription>
                    Stay on top of your engagement with advanced comment management and response tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Unified inbox</li>
                    <li>• Bulk responses</li>
                    <li>• VIP highlighting</li>
                    <li>• Response templates</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader>
                  <Sparkles className="h-8 w-8 text-brand-500" />
                  <CardTitle>AI-Powered Insights</CardTitle>
                  <CardDescription>
                    Get intelligent recommendations to optimize your content strategy and grow faster
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Content suggestions</li>
                    <li>• Hashtag optimization</li>
                    <li>• Growth predictions</li>
                    <li>• Performance analysis</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="bg-muted/50">
          <div className="container px-4 py-20">
            <div className="mx-auto max-w-6xl text-center">
              <h2 className="text-3xl font-bold sm:text-4xl mb-4">Simple, transparent pricing</h2>
              <p className="text-lg text-muted-foreground mb-16">
                Start free, scale as you grow. No hidden fees.
              </p>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="relative">
                  <CardHeader>
                    <CardTitle className="text-xl">Free</CardTitle>
                    <div className="text-3xl font-bold">$0</div>
                    <CardDescription>Perfect for getting started</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li>✓ 10 scheduled posts/week</li>
                      <li>✓ Basic analytics</li>
                      <li>✓ 30 days data history</li>
                      <li>✓ Community support</li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Start Free
                    </Button>
                  </CardContent>
                </Card>

                <Card className="relative border-brand-200 dark:border-brand-800">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">Creator</CardTitle>
                    <div className="text-3xl font-bold">$6<span className="text-lg font-normal">/mo</span></div>
                    <CardDescription>For individual creators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li>✓ Unlimited scheduling</li>
                      <li>✓ Advanced analytics</li>
                      <li>✓ 3 months data history</li>
                      <li>✓ AI suggestions</li>
                      <li>✓ Email support</li>
                    </ul>
                    <Button className="w-full">
                      Start Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader>
                    <CardTitle className="text-xl">Professional</CardTitle>
                    <div className="text-3xl font-bold">$16<span className="text-lg font-normal">/mo</span></div>
                    <CardDescription>For growing creators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li>✓ Everything in Creator</li>
                      <li>✓ Comment management</li>
                      <li>✓ Competitor tracking</li>
                      <li>✓ 1 year data history</li>
                      <li>✓ Priority support</li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Start Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="relative">
                  <CardHeader>
                    <CardTitle className="text-xl">Business</CardTitle>
                    <div className="text-3xl font-bold">$39<span className="text-lg font-normal">/mo</span></div>
                    <CardDescription>For teams and agencies</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li>✓ Everything in Pro</li>
                      <li>✓ Team collaboration</li>
                      <li>✓ API access</li>
                      <li>✓ White-label reports</li>
                      <li>✓ Phone support</li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Threadlytics</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Analytics and automation platform for Threads creators and businesses.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/api" className="hover:text-foreground">API</Link></li>
                <li><Link href="/integrations" className="hover:text-foreground">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:text-foreground">Refund Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Threadlytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}