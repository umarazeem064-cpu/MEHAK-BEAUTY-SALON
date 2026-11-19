import { ExternalLink, Star } from 'lucide-react';
import { CLIENT_TESTIMONIALS, SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="w-full py-20 lg:py-28 bg-[var(--salon-surface)] border-b border-[var(--salon-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[var(--salon-accent)]">
              06. Client Stories &amp; Reviews
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-[var(--salon-text)] text-balance-safe">
              Trusted Across Chak Shahzad &amp; Islamabad
            </h2>
            <p className="text-[15px] text-[var(--salon-muted)] leading-relaxed">
              Verified feedback from local brides, university students around Hostel City, and
              returning skincare guests who trust our atelier week after week.
            </p>
          </div>

          <a
            href={SALON_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold border border-[var(--salon-border)] bg-[var(--salon-card)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors self-start lg:self-end whitespace-nowrap shrink-0"
          >
            <span>View on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[var(--salon-accent)]" aria-hidden="true" />
          </a>
        </div>

        {/* 3-Column Client Review Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CLIENT_TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col justify-between p-7 rounded-2xl bg-[var(--salon-card)] border border-[var(--salon-border)]"
            >
              <div className="space-y-5">
                {/* 5-Star Rating + Date */}
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-1 text-[var(--salon-accent)]"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-semibold text-[var(--salon-text)] tabular-nums">
                      5.0
                    </span>
                  </div>
                  <span className="text-xs text-[var(--salon-muted)]">{review.date}</span>
                </div>

                {/* Quote */}
                <blockquote className="text-[15px] leading-relaxed text-[var(--salon-secondary)]">
                  “{review.quote}”
                </blockquote>

                {/* Concrete Outcome Line */}
                <p className="text-xs font-medium text-[var(--salon-accent)]">
                  Result: {review.outcome}
                </p>
              </div>

              {/* Client Portrait (.jpg) & Attribution */}
              <div className="mt-6 pt-5 border-t border-[var(--salon-border)] flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--salon-border)] shrink-0 bg-[var(--salon-surface)]">
                  <SalonImage
                    src={review.image}
                    alt={review.imageAlt}
                    fallbackTitle={review.clientName}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[var(--salon-text)] truncate">
                    {review.clientName}
                  </div>
                  <div className="text-xs text-[var(--salon-muted)] truncate">
                    {review.service} · {review.neighborhood}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
