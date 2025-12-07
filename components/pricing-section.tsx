import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PricingSectionProps {
  isAnnual: boolean;
}

const plans = [
  {
    name: "Starter",
    description: "Perfect for individual creators getting started",
    monthlyPrice: 29,
    yearlyPrice: 23,
    features: [
      "Basic Analytics Dashboard",
      "Post Scheduling (30 posts/month)",
      "Growth Tracking",
      "Email Support",
      "Basic AI Insights"
    ],
    highlighted: false
  },
  {
    name: "Professional",
    description: "Ideal for growing creators and small businesses",
    monthlyPrice: 79,
    yearlyPrice: 63,
    features: [
      "Advanced Analytics",
      "Unlimited Post Scheduling",
      "AI-Powered Content Ideas",
      "Competitor Tracking",
      "Priority Support",
      "Custom Reports",
      "API Access"
    ],
    highlighted: true
  },
  {
    name: "Enterprise",
    description: "For agencies and large teams",
    monthlyPrice: 199,
    yearlyPrice: 159,
    features: [
      "Everything in Professional",
      "Team Collaboration (10 seats)",
      "White-label Reports",
      "Dedicated Account Manager",
      "Custom Integrations",
      "Advanced AI Automation",
      "SLA Guarantee"
    ],
    highlighted: false
  }
];

export default function PricingSection({ isAnnual }: PricingSectionProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {plans.map((plan, index) => (
        <Card
          key={index}
          className={`relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
            plan.highlighted
              ? 'border-blue-500 shadow-xl ring-4 ring-blue-100'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          {plan.highlighted && (
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
              MOST POPULAR
            </div>
          )}

          <CardHeader className="text-center pb-8">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {plan.name}
            </CardTitle>
            <p className="text-gray-600 mb-6">
              {plan.description}
            </p>
            <div className="mb-6">
              <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold text-gray-900">
                  ${isAnnual ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-gray-600 ml-2 text-lg">/mo</span>
              </div>
              {isAnnual && (
                <p className="text-sm text-green-600 font-semibold mt-2">
                  Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                </p>
              )}
            </div>
            <Button
              size="lg"
              className={`w-full py-3 text-lg font-semibold ${
                plan.highlighted
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              Start Free Trial
            </Button>
          </CardHeader>

          <CardContent className="pt-0">
            <ul className="space-y-3">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}