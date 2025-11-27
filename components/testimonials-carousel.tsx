'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThreads } from '@fortawesome/free-brands-svg-icons';
import { creators, Creator } from '@/data/testimonials';

interface TestimonialCardProps {
  creator: Creator;
  onCardClick: (url: string) => void;
  onThreadsClick: (url: string) => void;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ creator, onCardClick, onThreadsClick }) => {
  const handleCardClick = () => {
    onCardClick(creator.threadsUrl);
  };

  const handleThreadsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onThreadsClick(creator.threadsUrl);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <Card
      className="group relative bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer flex-shrink-0 w-80 h-48 mx-3"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${creator.name}'s Threads profile: ${creator.message}`}
    >
      <CardContent className="p-6 h-full flex flex-col justify-between">
        {/* Threads Icon Button */}
        <button
          onClick={handleThreadsClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform"
          aria-label={`Open ${creator.name}'s Threads profile in new tab`}
          title={`Open ${creator.name}'s Threads profile`}
        >
          <FontAwesomeIcon icon={faThreads} className="h-4 w-4" />
        </button>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(creator.rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
          ))}
        </div>

        {/* Message */}
        <p className="text-gray-700 text-sm mb-4 italic line-clamp-3 flex-grow">
          "{creator.message}"
        </p>

        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <div className="text-2xl flex-shrink-0">{creator.avatar}</div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold text-black text-sm truncate">{creator.name}</div>
            <div className="text-xs text-gray-600 truncate">{creator.username}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const TestimonialsCarousel: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Clone creators for infinite scroll effect
  const duplicatedCreators = [...creators, ...creators, ...creators];

  const scrollToUrl = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const animate = useCallback(() => {
    if (!scrollContainerRef.current || isPaused) return;

    const container = scrollContainerRef.current;
    const scrollSpeed = 1; // pixels per frame
    const newScrollPosition = scrollPosition + scrollSpeed;

    // Reset scroll position when we've scrolled through one set of creators
    if (newScrollPosition >= creators.length * 336) { // card width (320px) + margin (16px)
      container.scrollLeft = 0;
      setScrollPosition(0);
    } else {
      container.scrollLeft = newScrollPosition;
      setScrollPosition(newScrollPosition);
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused, scrollPosition, creators.length]);

  useEffect(() => {
    if (!isPaused) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Touch events for mobile
  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const scrollAmount = 336; // card width + margin

    switch (e.key) {
      case 'ArrowLeft':
        container.scrollLeft -= scrollAmount;
        break;
      case 'ArrowRight':
        container.scrollLeft += scrollAmount;
        break;
      case 'Home':
        container.scrollLeft = 0;
        break;
      case 'End':
        container.scrollLeft = container.scrollWidth - container.clientWidth;
        break;
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
      return () => {
        container.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [handleKeyDown]);

  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-0 overflow-x-hidden scrollbar-hide"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Testimonials carousel"
        tabIndex={0}
        style={{
          scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
        }}
      >
        {duplicatedCreators.map((creator, index) => (
          <TestimonialCard
            key={`${creator.id}-${index}`}
            creator={creator}
            onCardClick={scrollToUrl}
            onThreadsClick={scrollToUrl}
          />
        ))}
      </div>

      {/* Scroll indicator for accessibility */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Auto-scrolling testimonials carousel. Use arrow keys to navigate or hover to pause.
      </div>

      {/* Mobile scroll hint */}
      <div className="md:hidden text-center mt-4 text-sm text-gray-600">
        <span className="inline-flex items-center gap-2">
          Swipe to explore more testimonials
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
};