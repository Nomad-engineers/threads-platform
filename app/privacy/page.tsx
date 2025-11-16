import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Lock, Globe, Cookie, FileText, Users, AlertCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
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
              <Shield className="h-3 w-3 mr-1" />
              Legal Document
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              How we collect, use, and protect your information
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Last Updated: November 3, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>Effective Date: November 3, 2025</span>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Threads-Boost (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and personal data.
                This Privacy Policy explains how we collect, use, store, and protect your information when you use our
                social media analytics platform for Meta&apos;s Threads.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By using Threads-Boost, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                1. Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">1.1 Account Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Personal Details:</strong> Name, email address, company name (if applicable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Contact Information:</strong> Phone number (optional), mailing address (for billing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Account Credentials:</strong> Username, encrypted password, two-factor authentication settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Billing Information:</strong> Payment method details (processed securely by third-party providers)</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">1.2 Threads Platform Data</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Performance Analytics:</strong> Post engagement metrics, follower counts, response times</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Content Data:</strong> Scheduled posts, comment drafts, response templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Engagement Patterns:</strong> User interaction data, content performance trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>API Data:</strong> Threads account connections and authentication tokens</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">1.3 Usage and Behavioral Data</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Platform Usage:</strong> Features accessed, dashboard interactions, time spent on platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>API Usage:</strong> Request frequency, data synchronization activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Device Information:</strong> Browser type, operating system, device identifiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Network Data:</strong> IP address, geolocation (country/region level)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Your Information */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Globe className="h-6 w-6 text-primary" />
                2. How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">2.1 Service Delivery</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-1 mt-2 flex-shrink-0"></span>
                    <span><strong>Core Functionality:</strong> Provide analytics, scheduling, and automation features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-1 mt-2 flex-shrink-0"></span>
                    <span><strong>Account Management:</strong> Maintain your account and authenticate your access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-1 mt-2 flex-shrink-0"></span>
                    <span><strong>Content Processing:</strong> Schedule posts, manage comments, and generate analytics</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">2.2 Platform Improvement</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0"></span>
                    <span><strong>Feature Development:</strong> Analyze usage patterns to improve our services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0"></span>
                    <span><strong>Performance Optimization:</strong> Monitor and enhance platform speed and reliability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0"></span>
                    <span><strong>User Experience:</strong> Personalize interface and recommend relevant features</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Data Storage and Security */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                3. Data Storage and Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">3.1 Data Protection Measures</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Encryption:</strong> AES-256 encryption for data at rest, TLS 1.3 for data in transit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Access Controls:</strong> Role-based access restrictions and authentication requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Regular Audits:</strong> Security assessments and penetration testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Monitoring:</strong> 24/7 security monitoring and threat detection</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">3.2 Data Retention Periods</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Free Tier</h4>
                    <p className="text-sm text-muted-foreground">30 days retention for analytics data</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Creator Tier</h4>
                    <p className="text-sm text-muted-foreground">90 days retention for analytics data</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Professional Tier</h4>
                    <p className="text-sm text-muted-foreground">1 year retention for analytics data</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Business Tier</h4>
                    <p className="text-sm text-muted-foreground">Unlimited retention for analytics data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights and Choices */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                5. Your Rights and Choices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">5.1 Access Rights</h3>
                <p className="text-muted-foreground mb-3">You have the right to:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Request Access:</strong> Obtain a copy of your personal data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Data Portability:</strong> Receive your data in a structured, machine-readable format</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Account Export:</strong> Download your account data and content</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">5.4 Exercise Your Rights</h3>
                <p className="text-muted-foreground mb-4">To exercise these rights:</p>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="font-medium">Email: privacy@threads-boost.online</span>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>• Response Time: We respond within 30 days (extended to 60 days for complex requests)</p>
                    <p>• Verification: We may request identity verification before processing requests</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Cookie className="h-6 w-6 text-primary" />
                7. Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">7.1 Essential Cookies</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Authentication:</strong> Maintain login sessions and security</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Functionality:</strong> Remember preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Security:</strong> Protect against fraud and unauthorized access</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">7.4 Cookie Management</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-5 mt-2 flex-shrink-0"></span>
                    <span><strong>Consent:</strong> Obtain consent for non-essential cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-5 mt-2 flex-shrink-0"></span>
                    <span><strong>Controls:</strong> Browser settings and cookie preference controls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-5 mt-2 flex-shrink-0"></span>
                    <span><strong>Transparency:</strong> Clear cookie information and management options</span>
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
                11. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">11.1 Privacy Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">privacy@threadlytics.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-sm text-muted-foreground">[Your Company Address]</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted-foreground">[Your Contact Number]</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">11.2 Data Protection Officer</h3>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span className="font-medium">Email: dpo@threads-boost.online</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Responsibilities: Oversee data protection compliance and user rights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Breach Notification */}
          <Card className="mb-8 border-0 shadow-xl border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-orange-500" />
                8. Data Breach Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">8.1 Notification Procedures</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Timely Notice:</strong> Notify affected users within 72 hours of discovery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Information Provided:</strong> Nature of breach, data affected, protective measures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Guidance:</strong> Steps users can take to protect their information</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Closing Statement */}
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-6">
              <strong>Questions or Concerns?</strong><br />
              If you have any questions about this Privacy Policy or our data practices,
              please contact us at
            </p>
            <p className="text-muted-foreground mb-6">
              privacy@threads-boost.online
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/terms">View Terms of Service</Link>
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
                  <Shield className="h-5 w-5 text-primary-foreground" />
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