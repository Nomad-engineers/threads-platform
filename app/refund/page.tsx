import Link from 'next/link';
import { ArrowLeft, DollarSign, CreditCard, Calendar, Clock, AlertCircle, Mail, Phone, FileText, Shield, Users, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function RefundPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary-foreground" />
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
              <DollarSign className="h-3 w-3 mr-1" />
              Financial Policy
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Refund Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Fair and transparent guidelines for refunds on Threads-Boost subscriptions
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Last Updated: November 3, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
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
                At Threads-Boost, we want you to be completely satisfied with our social media analytics platform.
                This Refund Policy outlines our guidelines for refunds on our subscription-based services designed for Meta&apos;s Threads.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If you&apos;re not satisfied with our service, we&apos;re here to help make things right.
              </p>
            </CardContent>
          </Card>

          {/* Eligibility for Refunds */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                1. Eligibility for Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-chart-1" />
                  1.1 14-Day Money-Back Guarantee
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>New Customers:</strong> All first-time paid subscriptions are eligible for a full refund within 14 days of your initial payment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Coverage:</strong> Applies to Creator ($6-8/month), Professional ($16-20/month), and Business ($39-49/month) tiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Conditions:</strong> You must not have previously received a refund for the same subscription tier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Proof of Use:</strong> We may ask for feedback to help improve our service</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-chart-2" />
                  1.2 Subscription Renewal Refunds
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0"></span>
                    <span><strong>Annual Subscriptions:</strong> Eligible for pro-rated refund within 7 days of renewal charge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0"></span>
                    <span><strong>Monthly Subscriptions:</strong> Eligible for full refund within 3 days of renewal charge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-2 mt-2 flex-shrink-0"></span>
                    <span><strong>Service Interruption:</strong> Refunds available for significant service downtime exceeding 24 hours</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-chart-3" />
                  1.3 Technical Issues Refunds
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Platform Failures:</strong> If our service fails to function due to technical issues on our end for extended periods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-3 mt-2 flex-shrink-0"></span>
                    <span><strong>API Dependencies:</strong> Refunds considered if Meta&apos;s Threads API changes prevent core features from working</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-3 mt-2 flex-shrink-0"></span>
                    <span><strong>Account Issues:</strong> Refunds available if you cannot access your account due to our technical problems</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Non-refundable Items and Services */}
          <Card className="mb-8 border-0 shadow-xl border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <XCircle className="h-6 w-6 text-red-500" />
                2. Non-refundable Items and Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">2.1 Always Non-refundable</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Free Trial Period:</strong> Services used during the 14-day free trial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Setup Fees:</strong> One-time setup or onboarding fees, if applicable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Add-on Services:</strong> Premium support, custom integrations, or consulting services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Third-Party Costs:</strong> Any fees charged by external payment processors or platforms</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">2.2 Condition-Based Non-refundable</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Service Usage:</strong> Partial months of service already consumed (except during money-back guarantee period)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Account Violations:</strong> Suspensions due to violations of our Terms of Service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Data Export:</strong> Fees for custom data export or report generation already completed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Team Features:</strong> Additional user seats on Business tier that have been active</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">2.3 Subscription Management</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Cancellation:</strong> No refunds for unused time if you cancel mid-month (except during guarantee period)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Downgrades:</strong> No pro-rated refunds when downgrading to a lower tier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Feature Non-Use:</strong> Refunds not provided for unused features or lack of engagement</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How to Request a Refund */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <HelpCircle className="h-6 w-6 text-primary" />
                3. How to Request a Refund
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">3.1 Required Information</h3>
                <p className="text-muted-foreground mb-4">To request a refund, please provide:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Account Email:</strong> The email address associated with your Threads-Boost account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Subscription Details:</strong> Your current plan (Creator, Professional, or Business)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Request Reason:</strong> Brief explanation of why you&apos;re requesting a refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Request Date:</strong> When you&apos;re submitting the refund request</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Contact Information:</strong> Best way to reach you if we need follow-up information</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">3.2 Submission Methods</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-medium">Email (Preferred)</span>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Send your request to: <strong>refunds@threads-boost.online</strong></li>
                      <li>• Subject line: "Refund Request - [Your Account Email]"</li>
                      <li>• Response time: Within 24-48 hours</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="font-medium">In-App Request</span>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Log into your Threads-Boost account</li>
                      <li>• Navigate to Account Settings → Billing → Refund Request</li>
                      <li>• Fill out the refund request form</li>
                      <li>• Receive confirmation email within 1 hour</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">3.3 Supporting Information</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Technical Issues:</strong> Screenshots or descriptions of problems encountered</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Service Downtime:</strong> Dates and times when service was unavailable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Billing Errors:</strong> Receipts or transaction IDs showing incorrect charges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Feature Requests:</strong> Optional feedback on how we could improve our service</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Processing Time and Method */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                4. Processing Time and Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">4.1 Processing Timeline</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Standard Requests
                    </h4>
                    <p className="text-sm text-muted-foreground">5-7 business days from approval</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      Complex Cases
                    </h4>
                    <p className="text-sm text-muted-foreground">10-14 business days (may require additional investigation)</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Initial Response</h4>
                    <p className="text-sm text-muted-foreground">Within 24-48 hours of receiving your request</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-medium mb-2">Status Updates</h4>
                    <p className="text-sm text-muted-foreground">We&apos;ll keep you informed of any delays or additional requirements</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">4.2 Refund Methods</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-primary">Original Payment Method:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• <strong>Credit/Debit Cards:</strong> Refunded to the original card used for payment</li>
                      <li>• <strong>Digital Wallets:</strong> Refunded to the same wallet (PayPal, Apple Pay, etc.)</li>
                      <li>• <strong>Bank Transfers:</strong> Returned to the original bank account</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-primary">Processing Times by Method:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• <strong>Credit Cards:</strong> 5-7 business days to appear on your statement</li>
                      <li>• <strong>Digital Wallets:</strong> 3-5 business days</li>
                      <li>• <strong>Bank Transfers:</strong> 7-10 business days</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">4.3 Confirmation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Email Notification:</strong> You&apos;ll receive a confirmation when your refund is processed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Transaction ID:</strong> Include refund transaction ID for your records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Account Status:</strong> Your account will be downgraded to the Free tier after refund</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Data Retention:</strong> Your data will be available for 30 days post-refund for export</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact for Refund Support */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                5. Contact for Refund Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">5.1 Direct Refund Inquiries</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Refund Department</div>
                      <div className="text-sm text-muted-foreground">refunds@threads-boost.online</div>
                      <div className="text-xs text-muted-foreground">Response Time: 24-48 hours | Monday-Friday, 9 AM - 6 PM EST</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Priority Support (Business Tier)</div>
                      <div className="text-sm text-muted-foreground">business-support@threads-boost.online</div>
                      <div className="text-xs text-muted-foreground">Response Time: 12-24 hours | Phone Available Upon Request</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">5.2 General Customer Support</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Support Team</div>
                      <div className="text-sm text-muted-foreground">support@threads-boost.online</div>
                      <div className="text-xs text-muted-foreground">Live Chat Available In-App During Business Hours</div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">5.3 Escalation Process</h3>
                <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
                  <h4 className="font-medium mb-2 text-orange-800">Unresolved Issues:</h4>
                  <ol className="space-y-1 text-sm text-orange-700 ml-4">
                    <li>1. Contact refunds@threads-boost.online</li>
                    <li>2. If unresolved within 5 business days, escalate to management@threads-boost.online</li>
                    <li>3. Final escalation to customer-advocate@threads-boost.online</li>
                  </ol>
                  <h4 className="font-medium mb-2 mt-3 text-orange-800">Formal Complaints:</h4>
                  <ul className="space-y-1 text-sm text-orange-700 ml-4">
                    <li>• Email: legal@threads-boost.online</li>
                    <li>• Response: Formal response within 10 business days</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Special Circumstances */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <AlertCircle className="h-6 w-6 text-primary" />
                6. Special Circumstances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">6.1 Service Discontinuation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-1 mt-2 flex-shrink-0"></span>
                    <span><strong>Platform Shutdown:</strong> Full pro-rated refund if Threads-Boost discontinues service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-1 mt-2 flex-shrink-0"></span>
                    <span><strong>Feature Removal:</strong> Refund consideration if core features are permanently removed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-1 mt-2 flex-shrink-0"></span>
                    <span><strong>Price Changes:</strong> No refunds for price changes, but you can cancel anytime</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">6.2 Account Compromise</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Security Issues:</strong> Refunds available if your account is compromised due to our security failures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Unauthorized Charges:</strong> Full refund for any unauthorized charges to your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Data Breach:</strong> Appropriate refunds if your data is compromised due to our negligence</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">6.3 Exception Handling</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Goodwill Refunds:</strong> We may offer refunds outside our policy in exceptional circumstances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Customer Loyalty:</strong> Long-term customers may receive additional consideration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></span>
                    <span><strong>Community Members:</strong> Active community contributors may receive special handling</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card className="mb-8 border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                7. Policy Updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">7.1 Changes to This Policy</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Notification:</strong> Email notice for significant policy changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Effective Date:</strong> Changes take effect 30 days after notification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                    <span><strong>Grandfathering:</strong> Existing requests processed under the policy in effect when submitted</span>
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">7.2 Your Responsibility</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Stay Informed:</strong> Keep your contact information current to receive policy updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Review Regularly:</strong> Check this policy periodically for any changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-chart-4 mt-2 flex-shrink-0"></span>
                    <span><strong>Ask Questions:</strong> Contact us if anything in this policy is unclear</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Questions Section */}
          <div className="text-center py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Questions About This Policy?</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about our Refund Policy or need help with a refund request,
                please don&apos;t hesitate to contact us:
              </p>
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <Mail className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-medium">Refund Team</div>
                  <div className="text-sm text-muted-foreground">refunds@threads-boost.online</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-medium">General Support</div>
                  <div className="text-sm text-muted-foreground">support@threads-boost.online</div>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <Phone className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="font-medium">Urgent Issues</div>
                  <div className="text-sm text-muted-foreground">Call our support line</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-primary/5 border border-primary/20 mb-8">
              <p className="text-muted-foreground mb-4">
                <strong className="text-foreground">Our Commitment:</strong> We&apos;re committed to providing excellent service and fair refund policies.
                If you&apos;re not satisfied with Threads-Boost, we want to make it right.
              </p>
              <p className="text-sm text-muted-foreground">
                This policy is designed to be fair and transparent while protecting both our customers and our business.
                We believe in building long-term relationships with content creators and businesses who trust us with their Threads analytics needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/privacy">View Privacy Policy</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/terms">View Terms of Service</Link>
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
                  <DollarSign className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Threads-Boost</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Analytics and automation platform for Threads creators and businesses.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">Fair Refunds</Badge>
                <Badge variant="outline" className="text-xs">Customer First</Badge>
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
                <li><Link href="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Threads-Boost. All rights reserved.</p>
            <div className="flex gap-4">
              <Badge variant="outline" className="text-xs">Fair Refund Policy</Badge>
              <Badge variant="outline" className="text-xs">Customer Focused</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}