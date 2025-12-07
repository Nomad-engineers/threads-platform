import Image from 'next/image';
import { ComponentProps } from 'react';

interface OptimizedAvatarProps extends Omit<ComponentProps<typeof Image>, 'src' | 'alt'> {
  src: string;
  alt: string;
  size?: number;
  priority?: boolean;
}

// Generate a simple blur placeholder for the Image component
const generateBlurDataURL = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, width, height);

    // Add a simple pattern
    ctx.fillStyle = '#d1d5db';
    for (let i = 0; i < width; i += 8) {
      for (let j = 0; j < height; j += 8) {
        if ((i + j) % 16 === 0) {
          ctx.fillRect(i, j, 4, 4);
        }
      }
    }
  }

  return canvas.toDataURL();
};

export function OptimizedAvatar({
  src,
  alt,
  size = 150,
  priority = false,
  className = "",
  ...props
}: OptimizedAvatarProps) {
  const blurDataURL = typeof window !== 'undefined'
    ? generateBlurDataURL(size, size)
    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A";

  return (
    <div className={`relative overflow-hidden rounded-full ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="object-cover"
        priority={priority}
        placeholder="blur"
        blurDataURL={blurDataURL}
        sizes="(max-width: 768px) 80px, 150px"
        {...props}
      />
    </div>
  );
}