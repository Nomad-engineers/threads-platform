'use client';

import Link from 'next/link';
import { ArrowRight, BarChart3, Calendar, MessageSquare, TrendingUp, Check, Users, Zap, Shield, Globe, Target, Eye, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useState, useEffect, useRef, useCallback } from 'react';

// Profile picture URLs for Threads users
const profilePictures = {
  sarahcreates: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  marcusdigital: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  emmawrites: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  alexkimmusic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  lisacreates: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahcreates",
    avatar: profilePictures.sarahcreates,
    rating: 5,
    message: "Threads-Boost has completely transformed my content strategy. I've seen a 300% increase in engagement in just 3 months!"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    username: "@marcusdigital",
    avatar: profilePictures.marcusdigital,
    rating: 5,
    message: "The analytics are incredibly detailed. I finally understand what content resonates with my audience. Game changer!"
  },
  {
    id: 3,
    name: "Emma Thompson",
    username: "@emmawrites",
    avatar: profilePictures.emmawrites,
    rating: 5,
    message: "Scheduling posts has saved me so much time. The AI suggestions for optimal posting times are remarkably accurate."
  },
  {
    id: 4,
    name: "Alex Kim",
    username: "@alexkimmusic",
    avatar: profilePictures.alexkimmusic,
    rating: 5,
    message: "The comment management features are brilliant. I can engage with my community much more effectively now."
  },
  {
    id: 5,
    name: "Lisa Anderson",
    username: "@lisacreates",
    avatar: profilePictures.lisacreates,
    rating: 5,
    message: "Best investment I've made for my social media growth. The insights are priceless and the scheduling is seamless."
  }
];

// Simple AutoSlider Component with continuous CSS animation
const AutoSlider: React.FC = () => {
  // Duplicate content for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const handleTestimonialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

      <div className="overflow-hidden">
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .scroll-animation {
            animation: scroll-left 60s linear infinite;
          }
        `}</style>

        <div className="flex gap-6 scroll-animation" style={{ display: 'flex', width: 'fit-content' }}>
          {duplicatedTestimonials.map((testimonial, index) => (
            <Card
              key={`${testimonial.id}-${index}`}
              className="group relative bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer flex-shrink-0 w-80 h-48 mx-3"
              onClick={() => handleTestimonialClick(`https://threads.net${testimonial.username}`)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleTestimonialClick(`https://threads.net${testimonial.username}`);
                }
              }}
              aria-label={`View ${testimonial.name}'s Threads profile: ${testimonial.message}`}
            >
              <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic line-clamp-3 flex-grow">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s profile picture`}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-black text-sm truncate">{testimonial.name}</div>
                    <div className="text-xs text-gray-600 truncate">{testimonial.username}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Accessibility indicator */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Auto-scrolling testimonials carousel with continuous movement.
      </div>
    </div>
  );
};

export default function HomePage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        { name: "10 scheduled posts per week", tooltip: "Schedule up to 10 posts each week with our calendar view" },
        { name: "Content calendar view", tooltip: "Visual calendar to manage and organize your content schedule" },
        { name: "Basic analytics (last 10 posts)", tooltip: "Track performance of your most recent 10 posts" },
        { name: "Single Threads account", tooltip: "Connect and manage one Threads account" },
        { name: "Community support", tooltip: "Get help from our community forums" },
        { name: "30 days data history", tooltip: "Access your analytics data for the past 30 days" }
      ],
      cta: { text: "Start Free", variant: "outline" as const }
    },
    {
      name: "Creator",
      description: "Most popular for growing creators",
      monthlyPrice: 8,
      annualPrice: 6,
      popular: true,
      features: [
        { name: "Unlimited scheduled posts", tooltip: "Schedule unlimited posts with advanced queue management" },
        { name: "Advanced analytics (all historical data)", tooltip: "Complete analytics access to all your historical data" },
        { name: "Basic comment management", tooltip: "Manage and respond to comments efficiently" },
        { name: "AI-powered optimal posting times", tooltip: "AI analyzes your audience to suggest best posting times" },
        { name: "3 months competitor benchmarking", tooltip: "Track and compare with up to 3 competitors" },
        { name: "Email support (48-hour response)", tooltip: "Get email support within 48 business hours" }
      ],
      cta: { text: "Start 14-Day Trial", variant: "default" as const }
    },
    {
      name: "Professional",
      description: "For professional content creators",
      monthlyPrice: 20,
      annualPrice: 16,
      popular: false,
      features: [
        { name: "Advanced comment management", tooltip: "Advanced tools for managing comments and engagement" },
        { name: "Unlimited competitor benchmarking (10 accounts)", tooltip: "Track unlimited competitors with up to 10 accounts" },
        { name: "AI content suggestions & hashtag optimization", tooltip: "AI-powered content ideas and hashtag recommendations" },
        { name: "Data export (CSV, PDF reports)", tooltip: "Export your data in multiple formats for analysis" },
        { name: "Priority email support (24-hour response)", tooltip: "Priority email support within 24 business hours" },
        { name: "1 year data history", tooltip: "Access your complete analytics data for the past year" },
        { name: "Custom branding on reports", tooltip: "Add your brand logo and colors to exported reports" }
      ],
      cta: { text: "Start 14-Day Trial", variant: "outline" as const }
    },
    {
      name: "Business",
      description: "For teams and agencies",
      monthlyPrice: 49,
      annualPrice: 39,
      popular: false,
      features: [
        { name: "Team collaboration (3 team members)", tooltip: "Invite up to 3 team members to collaborate" },
        { name: "Advanced analytics (ROI tracking)", tooltip: "Track return on investment and advanced metrics" },
        { name: "White-label reporting", tooltip: "Remove branding and add your own on reports" },
        { name: "API access (reasonable limits)", tooltip: "Access our API for custom integrations" },
        { name: "Phone support during business hours", tooltip: "Direct phone support during business hours" },
        { name: "Unlimited data history", tooltip: "Access all your historical data without limits" },
        { name: "Custom integrations (Zapier, webhooks)", tooltip: "Connect with 1000+ apps via Zapier and webhooks" },
        { name: "Compliance features (GDPR, data retention)", tooltip: "Enterprise-grade compliance and data controls" }
      ],
      cta: { text: "Contact Sales", variant: "outline" as const }
    }
  ];

  return (
    <div className="min-h-screen bg-white scroll-clamp-y">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-black">Threads-Boost</span>
          </div>
          <div className="flex items-center space-x-6">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-black">
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button asChild className="bg-black text-white hover:bg-gray-800">
              <Link href="/auth">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="mx-auto max-w-6xl text-center">
          <Badge className="mb-6 bg-black text-white border-0">
            Trusted by 100+ creators
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-black">
            Analytics & Automatization
            <br />
            for Threads
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Unlock the full potential of your Threads content with AI-powered insights,
            advanced analytics, and growth tools designed for serious creators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800 text-lg px-10 py-4 h-14">
              <Link href="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-10 py-4 h-14 border-gray-300 text-gray-700 hover:bg-gray-50">
              <Link href="/auth/threads-demo">
                <Eye className="mr-2 h-5 w-5" />
                View Demo
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "100+", label: "Creators", icon: Users },
              { number: "9k+", label: "Posts Analyzed", icon: BarChart3 },
              { number: "214%", label: "Avg. Growth", icon: TrendingUp }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <stat.icon className="h-8 w-8 text-black mb-3 mx-auto" />
                <div className="text-4xl font-bold text-black mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-black text-white border-0">
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Everything you need to
              <br />
              grow your presence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and insights designed to help you understand your audience
              and optimize your content strategy for maximum impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Deep insights into your content performance and audience behavior",
                features: ["Real-time metrics", "Growth tracking", "Content analysis"]
              },
              {
                icon: Calendar,
                title: "Smart Scheduling",
                description: "Schedule posts at optimal times for maximum engagement",
                features: ["AI timing", "Queue management", "Bulk scheduling"]
              },
              {
                icon: MessageSquare,
                title: "Comment Management",
                description: "Engage with your audience efficiently and effectively",
                features: ["Auto-responses", "Sentiment analysis", "Bulk moderation"]
              },
              {
                icon: Zap,
                title: "AI-Powered Insights",
                description: "Get personalized recommendations to accelerate your growth",
                features: ["Content ideas", "Hashtag suggestions", "Growth predictions"]
              }
            ].map((feature, index) => (
              <Card key={index} className="border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="h-16 w-16 rounded-lg bg-black flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold mb-3 text-black">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-black text-white border-0">
              Trusted by creators worldwide
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Join thousands of successful
              <br />
              Threads creators
            </h2>
          </div>

          {/* Optimized AutoSlider */}
          <div className="mb-20">
            <AutoSlider />
          </div>

          {/* Trust indicators */}
          <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "Support" },
                { number: "SSL", label: "Secured" },
                { number: "GDPR", label: "Compliant" }
              ].map((trust, index) => (
                <div key={index} className="flex flex-col items-center">
                  <Shield className="h-8 w-8 text-black mb-2" />
                  <div className="text-2xl font-bold text-black">{trust.number}</div>
                  <div className="text-sm text-gray-600">{trust.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-white">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-black text-white border-0">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
              Simple, transparent
              <br />
              pricing that scales
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start free, upgrade when you're ready to accelerate your growth
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-lg font-medium transition-colors duration-200 ${!isAnnual ? 'text-black' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-300"
              />
              <span className={`text-lg font-medium transition-colors duration-200 ${isAnnual ? 'text-black' : 'text-gray-500'}`}>
                Annual
              </span>
              <Badge className="ml-2 bg-gray-100 text-black border-gray-300">
                Save 25%
              </Badge>
            </div>
          </div>

          <TooltipProvider>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative group transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${
                    plan.popular
                      ? 'border-2 border-black bg-gray-50 shadow-xl'
                      : 'border border-gray-200 bg-white hover:shadow-lg hover:border-gray-400'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                      <div className="relative">
                        <div className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-3 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Most Popular
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <div className="absolute inset-0 bg-black rounded-full blur-lg opacity-30 -z-10"></div>
                      </div>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className={`text-2xl mb-2 ${plan.popular ? 'text-black' : 'text-gray-900'}`}>
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-5xl font-bold text-black">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      {(plan.monthlyPrice > 0 || plan.annualPrice > 0) && (
                        <span className="text-lg font-normal text-gray-600">/mo</span>
                      )}
                    </div>
                    {plan.monthlyPrice > 0 && plan.annualPrice > 0 && (
                      <CardDescription className="text-gray-600">
                        <span className="text-sm">
                          ${isAnnual ? plan.monthlyPrice : plan.annualPrice}/month billed {isAnnual ? 'annually' : 'monthly'}
                        </span>
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <Tooltip key={idx}>
                          <TooltipTrigger asChild>
                            <li className="flex items-center gap-3 text-gray-700 text-sm cursor-help group">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                plan.popular
                                  ? 'bg-black text-white group-hover:scale-110 transition-transform'
                                  : 'bg-green-100 text-green-600 group-hover:scale-110 transition-transform'
                              }`}>
                                <Check className="h-3 w-3" />
                              </div>
                              <span className="group-hover:text-black transition-colors">{feature.name}</span>
                            </li>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs p-3 bg-gray-900 text-white border-gray-700">
                            <p className="text-sm">{feature.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </ul>

                    <Button
                      variant={plan.cta.variant}
                      className={`w-full h-12 transition-all duration-300 ${
                        plan.popular
                          ? 'bg-black text-white hover:bg-gray-800 hover:scale-105 hover:shadow-lg'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 hover:scale-105'
                      }`}
                    >
                      {plan.cta.text}
                      {plan.cta.text.includes("Trial") && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TooltipProvider>

          {/* Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">
              All plans include core features • No hidden fees • Cancel anytime
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>14-day guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>100+ creators</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <Card className="border border-gray-200 bg-white">
            <CardContent className="text-center py-16">
              <Badge className="mb-6 bg-black text-white border-0">
                <Target className="h-3 w-3 mr-2" />
                Ready to grow?
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                Start your free trial today
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of creators who are already using Threads-Boost to grow their audience
                and optimize their content strategy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button size="lg" asChild className="bg-black text-white hover:bg-gray-800 text-lg px-10 py-4 h-14">
                  <Link href="/auth">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" asChild className="text-lg px-8 py-4 h-14 text-gray-600 hover:text-black">
                  <Link href="/demo">
                    Schedule Demo
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-black">Threads-Boost</span>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                The ultimate analytics platform for Threads creators and businesses who want to grow their audience with data-driven insights.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { icon: Globe, label: "Global Reach" },
                  { icon: Shield, label: "Secure" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                    <item.icon className="h-3 w-3" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-6">Product</h3>
              <ul className="space-y-3">
                {[
                  { href: "/dashboard/analytics", label: "Analytics" },
                  { href: "/dashboard/content", label: "Content" },
                  { href: "/privacy", label: "Privacy" },
                  { href: "/terms", label: "Terms" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-600 hover:text-black transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-6">Company</h3>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-600 hover:text-black transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-black mb-6">Legal</h3>
              <ul className="space-y-3">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/refund", label: "Refund Policy" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link href={item.href} className="text-gray-600 hover:text-black transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                &copy; 2026 Threads-Boost. All rights reserved.
              </p>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>Made for creators</span>
                <span>❤️</span>
                <span>Version 2.0</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}