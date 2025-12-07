'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThreadsIcon } from '@/components/ui/threads-icon';
import { ArrowRight, CheckCircle, Lock, Zap, TrendingUp, Users, BarChart3, Clock, Shield, ChevronRight } from 'lucide-react';

interface SignupBenefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  immediate: boolean;
}

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  time: string;
  completed: boolean;
}

// Value preview cards
function ValuePreview() {
  const benefits: SignupBenefit[] = [
    {
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: "Instant Analytics",
      description: "Get immediate insights into your Threads performance",
      value: "Save 15+ hours/week",
      immediate: true
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "AI Content Suggestions",
      description: "Receive personalized content ideas that drive engagement",
      value: "4x more viral content",
      immediate: true
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      title: "Growth Tracking",
      description: "Monitor your progress with detailed metrics and trends",
      value: "300% faster growth",
      immediate: true
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Best Time to Post",
      description: "AI-powered scheduling for maximum visibility",
      value: "2x higher reach",
      immediate: true
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      title: "Audience Insights",
      description: "Understand your followers and their preferences",
      value: "Better engagement",
      immediate: true
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Competitor Analysis",
      description: "See what's working for others in your niche",
      value: "Stay ahead of trends",
      immediate: false
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {benefits.map((benefit, index) => (
        <Card key={index} className={`border-2 ${benefit.immediate ? 'border-green-200 bg-green-50' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`rounded-lg p-2 ${benefit.immediate ? 'bg-green-100' : 'bg-gray-100'}`}>
                {benefit.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                  {benefit.immediate && (
                    <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-100">
                      Immediate
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{benefit.description}</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-medium text-green-600">{benefit.value}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Progressive onboarding steps
function ProgressiveOnboarding() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 'connect',
      title: 'Connect Your Threads Account',
      description: 'Secure OAuth connection in 30 seconds. No passwords required.',
      icon: <ThreadsIcon className="h-6 w-6" />,
      time: '~30 seconds',
      completed: false
    },
    {
      id: 'analyze',
      title: 'Instant Account Analysis',
      description: 'Our AI analyzes your past 90 days of content and engagement.',
      icon: <BarChart3 className="h-6 w-6" />,
      time: '~2 minutes',
      completed: false
    },
    {
      id: 'recommendations',
      title: 'Get Personalized Recommendations',
      description: 'Receive your custom growth strategy based on your data.',
      icon: <Zap className="h-6 w-6" />,
      time: '~1 minute',
      completed: false
    },
    {
      id: 'first-win',
      title: 'Schedule Your First Optimized Post',
      description: 'Use our scheduler to post at your optimal engagement time.',
      icon: <Clock className="h-6 w-6" />,
      time: '~2 minutes',
      completed: false
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Setup in 5 Minutes</h3>
        <p className="text-sm text-gray-600">You'll start seeing value from the very first step</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-blue-600">{currentStep + 1} of {steps.length} steps</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
              index === currentStep
                ? 'border-blue-500 bg-blue-50'
                : index < currentStep
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className={`rounded-full p-2 ${
              index === currentStep
                ? 'bg-blue-100 text-blue-600'
                : index < currentStep
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {index < currentStep ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                step.icon
              )}
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold ${
                index === currentStep ? 'text-blue-900' : 'text-gray-900'
              }`}>
                {step.title}
              </h4>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            <div className="text-right">
              <Badge variant="outline" className={
                index === currentStep ? 'text-blue-600 border-blue-200' : ''
              }>
                {step.time}
              </Badge>
              {index === currentStep && (
                <ChevronRight className="h-4 w-4 text-blue-500 mt-2 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Micro-commitments checklist
function MicroCommitments() {
  const commitments = [
    { text: "See my best performing posts", checked: true },
    { text: "Find my optimal posting time", checked: true },
    { text: "Get AI content suggestions", checked: false },
    { text: "Track follower growth", checked: false },
    { text: "Analyze competitor strategies", checked: false },
    { text: "Automate post scheduling", checked: false }
  ];

  return (
    <div className="bg-blue-50 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-4">What You'll Discover in Your Free Account:</h3>
      <div className="space-y-3">
        {commitments.map((commitment, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`rounded-full p-1 ${
              commitment.checked
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-500'
            }`}>
              {commitment.checked ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <div className="h-4 w-4 border-2 border-current rounded-full"></div>
              )}
            </div>
            <span className={`text-sm ${
              commitment.checked ? 'text-gray-700 font-medium' : 'text-gray-600'
            }`}>
              {commitment.text}
            </span>
            {commitment.checked && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-100">
                Free forever
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Risk reversal section
function RiskReversal() {
  return (
    <div className="grid md:grid-cols-3 gap-4 text-center">
      <div className="space-y-2">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Lock className="h-6 w-6 text-green-600" />
        </div>
        <h4 className="font-semibold text-gray-900">No Credit Card Required</h4>
        <p className="text-sm text-gray-600">Start your free trial instantly. No payment information needed.</p>
      </div>
      <div className="space-y-2">
        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Shield className="h-6 w-6 text-blue-600" />
        </div>
        <h4 className="font-semibold text-gray-900">30-Day Money Back</h4>
        <p className="text-sm text-gray-600">Not satisfied? Get a full refund, no questions asked.</p>
      </div>
      <div className="space-y-2">
        <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <Users className="h-6 w-6 text-purple-600" />
        </div>
        <h4 className="font-semibold text-gray-900">Cancel Anytime</h4>
        <p className="text-sm text-gray-600">No contracts or hidden fees. You're in complete control.</p>
      </div>
    </div>
  );
}

export function FrictionlessSignup() {
  const [activeTab, setActiveTab] = useState('value');

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section header */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              NO RISK, ALL REWARD
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Start Seeing Results in 5 Minutes, Not 5 Weeks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlike other tools that require weeks of setup, you'll get actionable insights immediately after signing up.
            </p>
          </div>

          {/* Main content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left column - Content */}
            <div className="space-y-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="value">Immediate Value</TabsTrigger>
                  <TabsTrigger value="onboarding">Quick Setup</TabsTrigger>
                  <TabsTrigger value="commitments">What You Get</TabsTrigger>
                </TabsList>

                <TabsContent value="value" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">What You Get Immediately After Signup:</h3>
                    <ValuePreview />
                  </div>
                </TabsContent>

                <TabsContent value="onboarding" className="mt-6">
                  <ProgressiveOnboarding />
                </TabsContent>

                <TabsContent value="commitments" className="mt-6">
                  <MicroCommitments />
                </TabsContent>
              </Tabs>

              {/* Trust indicators */}
              <RiskReversal />
            </div>

            {/* Right column - CTA */}
            <div className="space-y-6">
              <Card className="border-2 border-blue-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Start Your Free Trial Now
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Immediate benefits */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800">You'll get these instantly:</h4>
                    </div>
                    <ul className="space-y-1 text-sm text-green-700">
                      <li>• Complete analytics dashboard</li>
                      <li>• 90-day performance analysis</li>
                      <li>• AI-powered content suggestions</li>
                      <li>• Optimal posting times</li>
                    </ul>
                  </div>

                  {/* CTA button */}
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-lg font-semibold"
                  >
                    🚀 Start Growing Free (No Card Required)
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  {/* Alternative CTAs */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      📊 See Live Demo Account
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
                    >
                      📈 Calculate Your Growth Potential
                    </Button>
                  </div>

                  {/* Security notice */}
                  <div className="text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Secure OAuth Connection</span>
                    </div>
                    <p className="text-xs">We never store your passwords. All data is encrypted and secure.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Social proof */}
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-4 bg-yellow-400 rounded-sm"></div>
                    ))}
                  </div>
                  <span className="font-semibold">4.9/5 from 2,847 reviews</span>
                </div>
                <p className="text-xs text-gray-500">
                  ⚡ 50,000+ creators and businesses trust us with their growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}