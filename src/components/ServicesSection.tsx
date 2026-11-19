import { useMemo, useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import {
  CURRENCY_RATES,
  SALON_SERVICES,
  SERVICE_CATEGORIES,
  formatServicePrice,
  type CurrencyCode,
  type SalonService,
  type ServiceCategoryId,
} from '../data/salonData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: SalonService) => void;
}

const CURRENCIES: CurrencyCode[] = ['PKR', 'USD', 'GBP'];

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategoryId>('all');
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');

  const filteredServices = useMemo(() => {
    if (activeCategory === 'all') return SALON_SERVICES;
    return SALON_SERVICES.filter((svc) => svc.category === activeCategory);
  }, [activeCategory]);

  // Group services by category when viewing "All Services" for clean editorial scanning
  const groupedSections = useMemo(() => {
    if (activeCategory !== 'all') {
      const cat = SERVICE_CATEGORIES.find((c) => c.id === activeCategory);
      return [
        {
          id: activeCategory,
          label: cat?.label ?? 'Services',
          items: filteredServices,
        },
      ];
    }

    return SERVICE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => ({
      id: cat.id,
      label: cat.label,
      items: SALON_SERVICES.filter((s) => s.category === cat.id),
    }));
  }, [activeCategory, filteredServices]);

  return (
    <section
      id="services"
      className="w-full py-20 lg:py-28 bg-[var(--salon-surface)] border-b border-[var(--salon-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Currency Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-[var(--salon-border)]">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[var(--salon-accent)]">
              02. Services &amp; Transparent Pricing
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-[var(--salon-text)] text-balance-safe">
              Curated Beauty, Hair &amp; Bridal Menu
            </h2>
            <p className="text-[15px] text-[var(--salon-muted)] leading-relaxed">
              Every service includes an individualized consultation and original salon-grade
              formulations. Click “Book This” on any treatment to reserve your time immediately.
            </p>
          </div>

          {/* Interactive Currency Switcher (PKR / USD / GBP) */}
          <div className="flex items-center gap-3 self-start lg:self-end shrink-0">
            <span className="text-xs font-medium text-[var(--salon-muted)] whitespace-nowrap">
              Currency:
            </span>
            <div
              role="group"
              aria-label="Select pricing currency"
              className="inline-flex items-center p-1 rounded-lg bg-[var(--salon-card)] border border-[var(--salon-border)]"
            >
              {CURRENCIES.map((code) => {
                const active = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[var(--salon-cta)] text-[var(--salon-cta-fg)]'
                        : 'text-[var(--salon-muted)] hover:text-[var(--salon-text)]'
                    }`}
                  >
                    {CURRENCY_RATES[code].label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Filter Bar (Functional Segmented Buttons) */}
        <div
          role="tablist"
          aria-label="Filter services by category"
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          {SERVICE_CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            const count =
              category.id === 'all'
                ? SALON_SERVICES.length
                : SALON_SERVICES.filter((s) => s.category === category.id).length;
            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] border-[var(--salon-cta)]'
                    : 'bg-[var(--salon-card)] text-[var(--salon-secondary)] border-[var(--salon-border)] hover:border-[var(--salon-accent)] hover:text-[var(--salon-text)]'
                }`}
              >
                <span>{category.label}</span>
                <span className="ml-1.5 opacity-70 tabular-nums">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grouped Services Grid */}
        <div className="mt-10 space-y-12">
          {groupedSections.map((group) => (
            <div key={group.id} className="space-y-5">
              <div className="flex items-baseline justify-between gap-4 border-b border-[var(--salon-border)] pb-3">
                <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[var(--salon-text)]">
                  {group.label}
                </h3>
                <span className="text-xs text-[var(--salon-muted)] tabular-nums whitespace-nowrap">
                  {group.items.length} treatments
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.items.map((service) => (
                  <article
                    key={service.id}
                    className="group flex flex-col justify-between p-6 rounded-xl bg-[var(--salon-card)] border border-[var(--salon-border)] hover:border-[var(--salon-accent)] transition-colors duration-200"
                  >
                    <div>
                      {/* Quiet 1-line unboxed metadata */}
                      <div className="flex items-center justify-between gap-3 text-xs text-[var(--salon-muted)] mb-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="inline-flex items-center gap-1 tabular-nums whitespace-nowrap">
                            <Clock className="w-3.5 h-3.5 text-[var(--salon-accent)]" aria-hidden="true" />
                            {service.duration}
                          </span>
                          {service.featuredNote && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-medium text-[var(--salon-accent)] truncate">
                                {service.featuredNote}
                              </span>
                            </>
                          )}
                        </div>
                        <span className="font-sans-body text-base font-bold text-[var(--salon-text)] tabular-nums whitespace-nowrap shrink-0">
                          {formatServicePrice(service.pricePKR, currency)}
                        </span>
                      </div>

                      <h4 className="font-display text-xl sm:text-[1.35rem] font-semibold text-[var(--salon-text)] leading-snug">
                        {service.name}
                      </h4>

                      <p className="mt-2 text-sm leading-relaxed text-[var(--salon-muted)]">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--salon-border)] flex items-center justify-between gap-4">
                      <span className="text-xs text-[var(--salon-muted)] truncate">
                        Specialist: <strong className="font-medium text-[var(--salon-secondary)]">{service.recommendedStylist}</strong>
                      </span>

                      <button
                        type="button"
                        onClick={() => onSelectServiceForBooking(service)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] group-hover:bg-[var(--salon-cta)] group-hover:text-[var(--salon-cta-fg)] group-hover:border-[var(--salon-cta)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Book This</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-[var(--salon-muted)]">
          Prices shown in {currency} are standard studio rates. Final quotes for extra-long hair
          balayage or bespoke bridal jewelry packages are confirmed transparently before beginning
          any treatment.
        </p>
      </div>
    </section>
  );
}
