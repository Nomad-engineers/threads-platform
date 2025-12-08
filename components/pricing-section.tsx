import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingSectionProps {
  isAnnual: boolean;
}

interface Feature {
  name: string;
  description?: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: Feature[];
  highlighted: boolean;
  cta: string;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for individual creators beginning their journey",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { name: "10 scheduled posts per week", description: "Schedule up to 10 posts weekly", included: true },
      { name: "Basic analytics dashboard", description: "Track your last 10 posts", included: true },
      { name: "Content calendar view", description: "Visual content planning", included: true },
      { name: "Single Threads account", description: "Connect one account", included: true },
      { name: "Community support", description: "Get help from forums", included: true },
      { name: "30 days data history", description: "Access past month data", included: true },
      { name: "Advanced analytics", description: "Complete performance insights", included: false },
      { name: "AI-powered insights", description: "Smart recommendations", included: false }
    ],
    highlighted: false,
    cta: "Start Free"
  },
  {
    name: "Creator",
    description: "Most popular choice for growing creators",
    monthlyPrice: 8,
    annualPrice: 6,
    features: [
      { name: "10 scheduled posts per week", description: "Schedule up to 10 posts weekly", included: true },
      { name: "Basic analytics dashboard", description: "Track your last 10 posts", included: true },
      { name: "Content calendar view", description: "Visual content planning", included: true },
      { name: "Single Threads account", description: "Connect one account", included: true },
      { name: "Community support", description: "Get help from forums", included: true },
      { name: "30 days data history", description: "Access past month data", included: true },
      { name: "Advanced analytics", description: "Complete performance insights", included: true },
      { name: "AI-powered insights", description: "Smart recommendations", included: true },
      { name: "Unlimited scheduled posts", description: "No posting limits", included: true },
      { name: "Competitor benchmarking", description: "Track 3 competitors", included: true }
    ],
    highlighted: true,
    cta: "Start 14-Day Trial"
  },
  {
    name: "Professional",
    description: "For professional creators and businesses",
    monthlyPrice: 20,
    annualPrice: 16,
    features: [
      { name: "10 scheduled posts per week", description: "Schedule up to 10 posts weekly", included: true },
      { name: "Basic analytics dashboard", description: "Track your last 10 posts", included: true },
      { name: "Content calendar view", description: "Visual content planning", included: true },
      { name: "Single Threads account", description: "Connect one account", included: true },
      { name: "Community support", description: "Get help from forums", included: true },
      { name: "30 days data history", description: "Access past month data", included: true },
      { name: "Advanced analytics", description: "Complete performance insights", included: true },
      { name: "AI-powered insights", description: "Smart recommendations", included: true },
      { name: "Unlimited scheduled posts", description: "No posting limits", included: true },
      { name: "Unlimited competitor tracking", description: "Track up to 10 accounts", included: true },
      { name: "Data export (CSV, PDF)", description: "Export your analytics", included: true },
      { name: "Custom branding", description: "Add your brand to reports", included: true }
    ],
    highlighted: false,
    cta: "Start 14-Day Trial"
  },
  {
    name: "Business",
    description: "For teams and agencies requiring advanced features",
    monthlyPrice: 49,
    annualPrice: 39,
    features: [
      { name: "Everything in Professional", description: "All professional features", included: true },
      { name: "Team collaboration", description: "Up to 3 team members", included: true },
      { name: "ROI tracking analytics", description: "Business-level insights", included: true },
      { name: "White-label reporting", description: "Custom branded reports", included: true },
      { name: "API access", description: "Reasonable rate limits", included: true },
      { name: "Priority support", description: "24-hour email response", included: true },
      { name: "Phone support", description: "Business hours support", included: true },
      { name: "Unlimited data history", description: "Access all historical data", included: true },
      { name: "Custom integrations", description: "Zapier & webhooks", included: true },
      { name: "Compliance features", description: "GDPR & data controls", included: true }
    ],
    highlighted: false,
    cta: "Contact Sales"
  }
];

interface PricingCardProps {
  plan: PricingPlan;
  isAnnual: boolean;
}

function PricingCard({ plan, isAnnual }: PricingCardProps) {
  const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
  const isFree = currentPrice === 0;

  return (
    <div
      className={cn(
        "relative group transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-2xl",
        plan.highlighted
          ? "scale-105 lg:scale-110"
          : "hover:scale-105"
      )}
    >
      {/* Popular Badge */}
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-1.5 bg-black text-white px-4 py-1.5 rounded-full text-xs font-medium">
            <Sparkles className="h-3 w-3" />
            Most Popular
            <Sparkles className="h-3 w-3" />
          </div>
        </div>
      )}

      <Card
        className={cn(
          "relative h-full p-8 transition-all duration-300",
          "border bg-white",
          plan.highlighted
            ? "border-black shadow-xl"
            : "border-gray-200 hover:border-gray-400"
        )}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <CardTitle className={cn(
            "text-2xl font-semibold mb-3 tracking-tight",
            plan.highlighted ? "text-black" : "text-gray-900"
          )}>
            {plan.name}
          </CardTitle>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {plan.description}
          </p>

          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-light text-black tracking-tight">
                {isFree ? 'Free' : `$${currentPrice}`}
              </span>
              {!isFree && (
                <span className="text-lg font-normal text-gray-600">/mo</span>
              )}
            </div>
            {!isFree && plan.monthlyPrice > 0 && plan.annualPrice > 0 && (
              <p className="text-xs text-gray-500 mt-2">
                ${isAnnual ? plan.monthlyPrice : plan.annualPrice}/month billed {isAnnual ? 'annually' : 'monthly'}
              </p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            className={cn(
              "w-full h-12 font-medium transition-all duration-200",
              "hover:scale-105 active:scale-95",
              plan.highlighted
                ? "bg-black text-white hover:bg-gray-900 shadow-lg hover:shadow-xl"
                : "bg-white text-black border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-100"
            )}
            variant={plan.highlighted ? "default" : "outline"}
          >
            {plan.cta}
          </Button>
        </div>

        {/* Features List */}
        <div className="space-y-3">
          {plan.features.map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className={cn(
                "flex items-start gap-3 text-sm",
                "transition-colors duration-200",
                feature.included
                  ? "text-gray-700"
                  : "text-gray-400"
              )}
            >
              <div className={cn(
                "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                "transition-all duration-200",
                feature.included
                  ? plan.highlighted
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                  : "bg-gray-50 text-gray-400"
              )}>
                <Check className="h-3 w-3" />
              </div>
              <span className={cn(
                "leading-relaxed",
                feature.included ? "text-gray-700" : "text-gray-400 line-through"
              )}>
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Subtle glow effect for highlighted card */}
      {plan.highlighted && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
      )}
    </div>
  );
}

export default function PricingSection({ isAnnual }: PricingSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {plans.map((plan) => (
        <PricingCard
          key={plan.name}
          plan={plan}
          isAnnual={isAnnual}
        />
      ))}
    </div>
  );
}