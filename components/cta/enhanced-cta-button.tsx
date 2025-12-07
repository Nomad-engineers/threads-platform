'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Loader2, Lock, Zap, Shield } from 'lucide-react';
import { useState } from 'react';

interface EnhancedCTAButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  badge?: string;
  icon?: React.ReactNode;
  urgency?: boolean;
  className?: string;
}

export function EnhancedCTAButton({
  variant = 'primary',
  size = 'lg',
  children,
  href,
  onClick,
  loading = false,
  disabled = false,
  badge,
  icon,
  urgency = false,
  className = '',
}: EnhancedCTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = 'relative overflow-hidden group transition-all duration-300 font-semibold';

  const variantClasses = {
    primary: urgency
      ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
      : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg transform hover:scale-105',
    tertiary: 'border-2 border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 hover:shadow-lg transform hover:scale-105'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-lg',
    xl: 'px-10 py-5 text-xl rounded-xl'
  };

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const ButtonContent = () => (
    <>
      {/* Shimmer effect for primary button */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}

      <div className="relative flex items-center justify-center gap-2">
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            {icon || <Zap className="h-5 w-5" />}
            <span>{children}</span>
            {!loading && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </>
        )}
      </div>

      {/* Badge overlay */}
      {badge && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 px-2 py-1 text-xs font-bold animate-pulse"
        >
          {badge}
        </Badge>
      )}

      {/* Urgency pulse for primary button */}
      {variant === 'primary' && urgency && (
        <div className="absolute inset-0 rounded-lg bg-red-500 opacity-20 animate-ping" />
      )}
    </>
  );

  const buttonElement = (
    <button
      className={`${allClasses} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ButtonContent />
    </button>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${allClasses} inline-block text-center no-underline`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ButtonContent />
      </a>
    );
  }

  return buttonElement;
}