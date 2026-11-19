import { Check, ShieldCheck, Sparkles } from 'lucide-react';
import { IMAGES, SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

const SALON_STANDARDS = [
  {
    title: 'Hospital-Grade Sterilization',
    detail:
      'Every comb, facial extraction instrument, and manicure kit is sanitized in UV and medical autoclave pouches before each guest.',
  },
  {
    title: 'Authentic Global Beauty Houses',
    detail:
      'We work strictly with original sealed formulas from L’Oréal Professionnel, Kérastase, MAC, Huda Beauty, NARS, and Janssen Cosmetics.',
  },
  {
    title: 'Private, Unhurried Suites',
    detail:
      'Dedicated ladies-only bridal and skincare rooms designed for complete privacy, calm acoustic comfort, and unhurried one-on-one consultations.',
  },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="w-full py-20 lg:py-28 bg-[var(--salon-bg)] border-b border-[var(--salon-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Left Column: Full-height Editorial Salon Craftsmanship Photograph (.jpg) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[380px] lg:min-h-[520px] rounded-2xl overflow-hidden border border-[var(--salon-border)] bg-[var(--salon-surface)]">
              <SalonImage
                src={IMAGES.aboutCraft}
                alt="Master hair stylist finishing a glossy silk blowout inside Mehak Beauty Salon's sunlit studio in Islamabad"
                fallbackTitle="Master Styling Studio"
                className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--salon-muted)]">
              <span>Mehak Beauty Salon Atelier · Chak Shahzad, Islamabad</span>
              <span className="tabular-nums font-medium text-[var(--salon-text)]">
                Est. 12+ Years of Industry Excellence
              </span>
            </div>
          </div>

          {/* Right Column: Founding Story, Mission & Hygiene Commitment */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-7">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-wide text-[var(--salon-accent)]">
                01. Our Heritage &amp; Philosophy
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-[var(--salon-text)] text-balance-safe">
                Thoughtful Craftsmanship Built Around Skin &amp; Hair Health
              </h2>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-[var(--salon-secondary)]">
              <p>
                Founded by Creative Director Mehak Tariq, <strong>{SALON_INFO.brandName}</strong>{' '}
                began with a quiet conviction: clients living around Hostel City, Chatta Bakhtawar,
                Park Road, and Chak Shahzad deserve metropolitan couture artistry without having to
                compromise on hygiene, authentic products, or calm privacy.
              </p>
              <p>
                Across more than a decade of styling brides, university graduates, and busy
                professionals in Islamabad, our senior specialists have built a studio where every
                appointment starts with an honest diagnostic consultation—whether matching undertones
                for a Barat bridal look, repairing heat-stressed hair with amino keratin, or restoring
                skin barrier luminosity.
              </p>
            </div>

            {/* Structured Standards List (separated with clean hairlines, zero card-in-card clutter) */}
            <div className="pt-2 divide-y divide-[var(--salon-border)] border-t border-b border-[var(--salon-border)]">
              {SALON_STANDARDS.map((item) => (
                <div key={item.title} className="py-4 flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--salon-accent-soft)] text-[var(--salon-accent)] shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans-body text-sm font-semibold text-[var(--salon-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-[var(--salon-muted)]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quiet Trust Row */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--salon-secondary)] pt-1">
              <span className="inline-flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-[var(--salon-accent)]" aria-hidden="true" />
                Certified Bridal &amp; Dermal Specialists
              </span>
              <span className="inline-flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-[var(--salon-accent)]" aria-hidden="true" />
                Zero Ammonia &amp; Formaldehyde-Free Options
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
