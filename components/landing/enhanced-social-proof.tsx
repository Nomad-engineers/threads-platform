'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote, Star, TrendingUp, Users, ArrowUpRight, Play, CheckCircle, Verified } from 'lucide-react';

interface TestimonialProps {
  name: string;
  handle: string;
  avatar: string;
  role: string;
  content: string;
  beforeMetrics: {
    followers: string;
    engagement: string;
    reach: string;
  };
  afterMetrics: {
    followers: string;
    engagement: string;
    reach: string;
  };
  timeAgo: string;
  verified: boolean;
}

// Enhanced testimonial component with before/after metrics
function EnhancedTestimonial({ testimonial }: { testimonial: TestimonialProps }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {testimonial.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <Verified className="h-3 w-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                {testimonial.verified && (
                  <Badge variant="outline" className="text-xs">Verified</Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{testimonial.handle}</p>
              <p className="text-xs text-gray-500">{testimonial.role}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-yellow-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-gray-500">{testimonial.timeAgo}</p>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-100" />
          <p className={`text-gray-700 leading-relaxed ${isExpanded ? '' : 'line-clamp-3'}`}>
            {testimonial.content}
          </p>
          {testimonial.content.length > 200 && (
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-blue-600"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </Button>
          )}
        </div>

        {/* Before/After Metrics */}
        <div className="border-t pt-4">
          <div className="text-sm font-semibold text-gray-900 mb-3">Results after 3 months:</div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {testimonial.beforeMetrics.followers}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-lg font-bold text-green-600">
                    {testimonial.afterMetrics.followers}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Followers</p>
              </div>
            </div>
            <div className="text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {testimonial.beforeMetrics.engagement}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-lg font-bold text-green-600">
                    {testimonial.afterMetrics.engagement}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Engagement</p>
              </div>
            </div>
            <div className="text-center">
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-lg font-bold text-gray-400 line-through">
                    {testimonial.beforeMetrics.reach}
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <span className="text-lg font-bold text-green-600">
                    {testimonial.afterMetrics.reach}
                  </span>
                </div>
                <p className="text-xs text-gray-600">Reach</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Live stats ticker
function LiveStatsTicker() {
  const [stats, setStats] = useState({
    totalPosts: 2847239,
    activeUsers: 51234,
    growthRate: 342,
    satisfaction: 94
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalPosts: prev.totalPosts + Math.floor(Math.random() * 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        growthRate: Math.min(400, prev.growthRate + Math.random() * 0.1),
        satisfaction: Math.min(99, prev.satisfaction + Math.random() * 0.01)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      label: 'Posts Analyzed',
      value: stats.totalPosts.toLocaleString(),
      change: '+2.8M this month',
      icon: TrendingUp
    },
    {
      label: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      change: '+12% this week',
      icon: Users
    },
    {
      label: 'Avg Growth Rate',
      value: `${stats.growthRate.toFixed(0)}%`,
      change: 'Industry leading',
      icon: ArrowUpRight
    },
    {
      label: 'Satisfaction',
      value: `${stats.satisfaction.toFixed(1)}%`,
      change: '4.9/5 rating',
      icon: CheckCircle
    }
  ];

  return (
    <div className="bg-white border-y border-gray-100 py-8 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Icon className="h-5 w-5 text-blue-500" />
                  <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <div className="text-sm font-medium text-gray-700">{stat.label}</div>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  {stat.change}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Real-time activity feed
function RealTimeActivity() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      user: 'Emma Wilson',
      action: 'just hit 50K followers using our AI scheduler',
      time: '30 seconds ago',
      metric: '+452% growth',
      avatar: '/avatars/emma.jpg'
    },
    {
      id: 2,
      user: 'TechStartup',
      action: 'increased engagement by 324% this week',
      time: '2 minutes ago',
      metric: '12.5K likes',
      avatar: '/avatars/techstartup.jpg'
    },
    {
      id: 3,
      user: 'Alex Chen',
      action: 'achieved 95% post virality rate',
      time: '5 minutes ago',
      metric: 'Top 1% creator',
      avatar: '/avatars/alex.jpg'
    },
    {
      id: 4,
      user: 'MarketingPro',
      action: 'saved 15 hours/week with automation',
      time: '8 minutes ago',
      metric: '+89% efficiency',
      avatar: '/avatars/marketing.jpg'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivities = [
        {
          id: Date.now(),
          user: ['Sarah M.', 'John D.', 'Lisa K.', 'Mike R.'][Math.floor(Math.random() * 4)],
          action: [
            'doubled their thread reach',
            'increased engagement by 200%',
            'reached 10K followers milestone',
            'got featured by Threads'
          ][Math.floor(Math.random() * 4)],
          time: 'just now',
          metric: `+${Math.floor(Math.random() * 500)}% growth`,
          avatar: `/avatars/user${Math.floor(Math.random() * 10)}.jpg`
        },
        ...activities.slice(0, 3)
      ];
      setActivities(newActivities);
    }, 10000);

    return () => clearInterval(interval);
  }, [activities]);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">🔥 Live Success Stories</h3>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-white rounded-lg p-3 flex items-center gap-3 hover:shadow-md transition-shadow"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.avatar} alt={activity.user} />
              <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{activity.user}</span> {activity.action}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs text-green-600 border-green-200 bg-green-50">
                  {activity.metric}
                </Badge>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main enhanced social proof component
export function EnhancedSocialProof() {
  const testimonials: TestimonialProps[] = [
    {
      name: 'Sarah Martinez',
      handle: '@sarahcreates',
      avatar: '/avatars/sarah.jpg',
      role: 'Content Creator',
      verified: true,
      content: 'Threads-Boost completely transformed my social media strategy. The AI analytics helped me identify exactly what content resonates with my audience. My engagement went from 2% to 8.7% in just 60 days, and I finally hit the 100K follower milestone that seemed impossible before.',
      beforeMetrics: {
        followers: '45K',
        engagement: '2.1%',
        reach: '12K'
      },
      afterMetrics: {
        followers: '102K',
        engagement: '8.7%',
        reach: '89K'
      },
      timeAgo: '2 days ago'
    },
    {
      name: 'TechStartup Inc',
      handle: '@techstartup',
      avatar: '/avatars/techstartup.jpg',
      role: 'B2B Company',
      verified: true,
      content: 'As a B2B tech company, we struggled to find our voice on Threads. The automation features and best time recommendations have been game-changers. We\'ve seen a 425% increase in qualified leads coming from our Threads content, and our brand recognition has skyrocketed.',
      beforeMetrics: {
        followers: '2.1K',
        engagement: '1.2%',
        reach: '5K'
      },
      afterMetrics: {
        followers: '15.8K',
        engagement: '6.3%',
        reach: '156K'
      },
      timeAgo: '1 week ago'
    },
    {
      name: 'Michael Chen',
      handle: '@miketravels',
      avatar: '/avatars/michael.jpg',
      role: 'Travel Blogger',
      verified: false,
      content: 'I was skeptical about another analytics tool, but Threads-Boost blew me away. The content suggestions are spot-on, and the hashtag optimization alone increased my reach by 300%. I now spend 2 hours per week on social media instead of 15, with better results than ever.',
      beforeMetrics: {
        followers: '8.7K',
        engagement: '3.4%',
        reach: '21K'
      },
      afterMetrics: {
        followers: '67.3K',
        engagement: '11.2%',
        reach: '234K'
      },
      timeAgo: '3 days ago'
    },
    {
      name: 'Emma Williams',
      handle: '@emmafitness',
      avatar: '/avatars/emma.jpg',
      role: 'Fitness Coach',
      verified: true,
      content: 'The AI-powered content calendar has been revolutionary for my fitness coaching business. I can now plan months in advance and know exactly when to post for maximum engagement. My client inquiries from Threads have increased by 580%, and I\'ve built a community of over 50K loyal followers.',
      beforeMetrics: {
        followers: '12K',
        engagement: '2.8%',
        reach: '18K'
      },
      afterMetrics: {
        followers: '89K',
        engagement: '9.4%',
        reach: '312K'
      },
      timeAgo: '5 days ago'
    },
    {
      name: 'Digital Agency Pro',
      handle: '@digitalagency',
      avatar: '/avatars/agency.jpg',
      role: 'Marketing Agency',
      verified: true,
      content: 'We manage Threads accounts for 20+ clients, and Threads-Boost has made our workflow 10x more efficient. The client reporting features alone save us 15 hours per week. Our average client growth rate is now 425%, making us the go-to agency for Threads marketing.',
      beforeMetrics: {
        followers: '500',
        engagement: '1.8%',
        reach: '8K'
      },
      afterMetrics: {
        followers: '45K',
        engagement: '7.2%',
        reach: '445K'
      },
      timeAgo: '1 week ago'
    },
    {
      name: 'Lisa Thompson',
      handle: '@lisaphotography',
      avatar: '/avatars/lisa.jpg',
      role: 'Photographer',
      verified: false,
      content: 'As a visual creator, I struggled with the text-based nature of Threads. The content suggestions and trend analysis helped me find my voice. My photography business has seen a 320% increase in booking inquiries, and I\'ve built a network of fellow creators through strategic engagement.',
      beforeMetrics: {
        followers: '3.2K',
        engagement: '2.5%',
        reach: '9K'
      },
      afterMetrics: {
        followers: '28.7K',
        engagement: '8.9%',
        reach: '178K'
      },
      timeAgo: '4 days ago'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Section header */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
              PROVEN RESULTS
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Join 50,000+ Creators Growing Faster with Data
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See real results from real users. Track your growth with the same analytics that helped these creators achieve extraordinary results.
            </p>
          </div>

          {/* Live stats ticker */}
          <LiveStatsTicker />

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <EnhancedTestimonial
                key={index}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Real-time activity feed */}
          <div className="max-w-2xl mx-auto">
            <RealTimeActivity />
          </div>

          {/* Trust indicators */}
          <div className="text-center space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Money-back guarantee
                </Badge>
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  14-day free trial
                </Badge>
                <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Cancel anytime
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span>⚡ Featured in TechCrunch, Forbes, Social Media Examiner</span>
              <span>•</span>
              <span>🏆 Winner of Social Media Tool of the Year 2024</span>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold">
              Start Your Success Story
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
            <p className="text-sm text-gray-600 mt-3">
              Join 50,000+ creators and businesses • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}