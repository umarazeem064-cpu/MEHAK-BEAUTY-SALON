import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SalonImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackTitle?: string;
}

/**
 * Resilient luxury image container with graceful styled fallback
 * so no broken image frame can ever appear.
 */
export function SalonImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  fallbackTitle,
}: SalonImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center p-6 text-center bg-[var(--salon-surface)] text-[var(--salon-muted)] border border-[var(--salon-border)] ${className}`}
      >
        <Sparkles className="w-6 h-6 mb-2 text-[var(--salon-accent)]" aria-hidden="true" />
        <span className="font-display text-lg text-[var(--salon-text)]">
          {fallbackTitle ?? 'Mehak Beauty Salon'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
