import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  Users,
  Shield,
  CreditCard,
  AlertTriangle,
  Mail,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Info,
  Lock,
  Globe,
  Eye,
  BookOpen,
  Scale,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Threads-Boost</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Scale className="h-3 w-3 mr-1" />
              Legal Agreement
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Rules and guidelines for using Threads-Boost services
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Last Updated: November 3, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                <span>Effective Date: November 3, 2025</span>
              </div>
            </div>
          </div>

          {/* Acceptance of Terms */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                1. Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                By accessing, registering for, or using Threads-Boost (&quot;the Service&quot;), you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;), our Privacy Policy, and all applicable laws and regulations.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you do not agree to these Terms, you may not access or use our Service.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 mt-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Eligibility Requirements
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• At least 13 years of age</li>
                    <li>• Parental consent if under 18</li>
                    <li>• Valid Meta Threads account</li>
                    <li>• Compliance with laws</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Account Security
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Accurate registration info</li>
                    <li>• Maintain credential security</li>
                    <li>• Responsible for account activity</li>
                    <li>• Report unauthorized access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Description */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                2. Service Description
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Threads-Boost is a social media analytics and automation platform designed for Meta&apos;s Threads. We provide tools to help content creators and businesses analyze their Threads performance, manage engagement, and optimize their content strategy.
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-4">Service Tiers</h3>
                <div className="grid gap-4">
                  {/* Free Tier */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Free Tier</h4>
                      <Badge variant="secondary">Free</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• 10 scheduled posts per month</li>
                      <li>• Basic analytics (30-day history)</li>
                      <li>• Limited comment management</li>
                      <li>• Standard support</li>
                    </ul>
                  </div>

                  {/* Creator Tier */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Creator Tier</h4>
                      <Badge variant="default">$6-8/month</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Unlimited scheduled posts</li>
                      <li>• Advanced analytics (90-day history)</li>
                      <li>• Enhanced comment management</li>
                      <li>• Email support & performance insights</li>
                    </ul>
                  </div>

                  {/* Professional Tier */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Professional Tier</h4>
                      <Badge variant="default">$16-20/month</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• All Creator features</li>
                      <li>• Bulk comment management</li>
                      <li>• AI-powered content optimization</li>
                      <li>• Priority support & custom reporting</li>
                    </ul>
                  </div>

                  {/* Business Tier */}
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Business Tier</h4>
                      <Badge variant="default">$39-49/month</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• All Professional features</li>
                      <li>• Team collaboration (up to 5 users)</li>
                      <li>• API access</li>
                      <li>• Advanced analytics & dedicated support</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Service Limitations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Service availability depends on Meta&apos;s Threads API functionality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>We do not guarantee uninterrupted or error-free service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Features may be modified, updated, or discontinued at our discretion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Some features may have rate limits or usage restrictions</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                3. User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Account Security</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Maintain strong, unique passwords for your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Enable two-factor authentication where available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Do not share your account credentials with others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Notify us immediately of any security breaches</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Acceptable Use</h3>
                <p className="text-muted-foreground mb-3">You agree not to:</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Use the Service for illegal purposes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Violate Meta&apos;s Threads API terms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Attempt to reverse engineer our systems</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Use the Service to spam or harass others</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Upload malicious code or viruses</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Use automated scripts to abuse our Service</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account & Access Rules */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                4. Account & Access Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Single Account Policy</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                    <span>Each user may maintain only one Threads-Boost account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                    <span>You may not create multiple accounts to bypass limitations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></span>
                    <span>Accounts are non-transferable without our written consent</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Account Suspension</h3>
                <p className="text-muted-foreground mb-3">We may suspend or terminate your account if you:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Violate these Terms of Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Violate Meta&apos;s Threads policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Engage in fraudulent or harmful activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Fail to pay for subscription services</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Subscription Terms */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CreditCard className="h-6 w-6 text-primary" />
                5. Payment & Subscription Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    Subscription Fees
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Charged in advance monthly/annually</li>
                    <li>• Prices subject to 30-day notice</li>
                    <li>• Non-refundable except as specified</li>
                    <li>• Taxes may apply based on location</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Auto-Renewal Policy
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Auto-renews unless cancelled</li>
                    <li>• Cancel anytime in settings</li>
                    <li>• Effect at period end</li>
                    <li>• No partial month refunds</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                <h4 className="font-medium mb-2 text-orange-800 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Free Trial Information
                </h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Free trials for new users only</li>
                  <li>• Cannot be combined with other offers</li>
                  <li>• Payment info required to start</li>
                  <li>• Auto-charges if not cancelled</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property Rights */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                6. Intellectual Property Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Your Content</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You retain full ownership and rights to all content you create or post</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You grant Threads-Boost a limited license to use your content solely to provide our Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>We do not claim ownership of your Threads posts, comments, or analytics data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You may remove your content at any time</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Threads-Boost Intellectual Property</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Threads-Boost owns all rights to our software, platform, and proprietary technology</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Our trademarks, logos, and brand elements are protected intellectual property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>You may not use our intellectual property without express written permission</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="mb-8 border-0 shadow-xl border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                7. Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Service Availability</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span>We provide our Service &quot;as is&quot; without warranties of any kind</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span>We do not guarantee uninterrupted or error-free service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span>Service availability depends on third-party platforms and infrastructure</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Financial Damages</h3>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <p className="text-sm text-orange-800 mb-2">
                    <strong>Liability Limitation:</strong> Our total liability for any claim is limited to the fees you paid in the last 3 months.
                  </p>
                  <p className="text-sm text-orange-700">
                    We are not liable for indirect, incidental, special, or consequential damages, including lost profits, data loss, or business interruption.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination Policy */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-500" />
                8. Termination Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Termination by You</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span>You may terminate your account at any time through your account settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span>Termination takes effect immediately upon account deletion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span>You will not receive refunds for partial months of service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span>Your data will be deleted according to our Privacy Policy</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Termination by Threads-Boost</h3>
                <p className="text-muted-foreground mb-3">We may terminate your account for:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Material breach of these Terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Violation of Meta&apos;s Threads policies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Fraudulent or illegal activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Extended account inactivity (12+ months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span>Non-payment of subscription fees</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law and Dispute Resolution */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Scale className="h-6 w-6 text-primary" />
                9. Governing Law and Dispute Resolution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Dispute Resolution Process</h3>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-blue-500">
                    <h4 className="font-medium mb-2 text-blue-700">Step 1: Direct Contact</h4>
                    <p className="text-sm text-muted-foreground">
                      We encourage you to contact us first to resolve any issues through our customer support channels.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-yellow-500">
                    <h4 className="font-medium mb-2 text-yellow-700">Step 2: Arbitration</h4>
                    <p className="text-sm text-muted-foreground">
                      For disputes that cannot be resolved directly, we agree to binding arbitration by a neutral third-party arbitrator.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-orange-500">
                    <h4 className="font-medium mb-2 text-orange-700">Step 3: Class Action Waiver</h4>
                    <p className="text-sm text-muted-foreground">
                      You agree to resolve disputes individually, not as part of a class action.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* General Provisions */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                10. General Provisions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    Entire Agreement
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These Terms constitute the entire agreement between you and Threads-Boost, superseding all prior agreements.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-primary" />
                    Severability
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    If any provision is unenforceable, the remaining provisions remain in full force and effect.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    Notices
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We provide notices through email, in-app notifications, or our website.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" />
                    Language
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    These Terms are provided in English. The English version governs in case of conflicts.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Modifications to Terms */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                11. Modifications to Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Change Process</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>We reserve the right to modify these Terms at any time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>We will provide reasonable notice of material changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Continued use of the Service constitutes acceptance of modified Terms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>The &quot;Last Updated&quot; date will always reflect recent changes</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                12. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">General Inquiries</div>
                      <div className="text-sm text-muted-foreground">support@threads-boost.online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Scale className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Legal Notices</div>
                      <div className="text-sm text-muted-foreground">legal@threads-boost.online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Privacy Concerns</div>
                      <div className="text-sm text-muted-foreground">privacy@threads-boost.online</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">[Your Company Address]</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Closing Statement */}
          <div className="text-center py-8">
            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 mb-6">
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">By using Threads-Boost, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                These Terms are designed to be fair and balanced, protecting both Threads-Boost and our users while enabling us to provide valuable analytics and automation services for the Threads community.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/privacy">View Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/refund">Refund Policy</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Threads-Boost</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Analytics and automation platform for Threads creators and businesses.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">SOC 2 Compliant</Badge>
                <Badge variant="outline" className="text-xs">GDPR Ready</Badge>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/api" className="hover:text-foreground transition-colors">API</Link></li>
                <li><Link href="/integrations" className="hover:text-foreground transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Threads-Boost. All rights reserved.</p>
            <div className="flex gap-4">
              <Badge variant="outline" className="text-xs">SOC 2 Compliant</Badge>
              <Badge variant="outline" className="text-xs">GDPR Ready</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}