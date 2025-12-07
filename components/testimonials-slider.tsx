'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { OptimizedAvatar } from '@/components/ui/optimized-avatar';

// Profile picture URLs for Threads users - optimized with Next.js Image domain
const profilePictures = {
  sarahcreates: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format,compress&q=80&fm=webp",
  marcusdigital: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format,compress&q=80&fm=webp",
  emmawrites: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format,compress&q=80&fm=webp",
  alexkimmusic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format,compress&q=80&fm=webp",
  lisacreates: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format,compress&q=80&fm=webp"
};

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

export default function TestimonialSlider() {
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
                    <svg key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4 italic line-clamp-3 flex-grow">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center gap-3">
                  <OptimizedAvatar
                    src={testimonial.avatar}
                    alt={`${testimonial.name}'s profile picture`}
                    size={40}
                    priority={index < 3}
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
}