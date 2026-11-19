import { ArrowRight, Calendar } from 'lucide-react';
import { IMAGES, SALON_INFO } from '../data/salonData';
import { SalonImage } from './SalonImage';

interface HeroSectionProps {
  onBookNowClick: () => void;
}

const SALON_FACTS = [
  {
    value: '12+ Years',
    label: 'Master Bridal & Hair Artistry',
  },
  {
    value: '4,800+',
    label: 'Islamabad Clients & Brides Styled',
  },
  {
    value: '100% Sealed',
    label: 'Autoclave Sterilized Tools & Suites',
  },
  {
    value: 'Open Daily',
    label: '10 AM – 10 PM · 24/7 Early Bridal Calls',
  },
] as const;

export function HeroSection({ onBookNowClick }: HeroSectionProps) {
  return (
    <section id="home" className="w-full bg-[var(--salon-bg)]">
      {/* Main Architectural Full-Width Hero Media Frame */}
      <div className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center overflow-hidden">
        {/* Background .jpg Image */}
        <SalonImage
          src={IMAGES.heroInterior}
          alt="Sunlit luxury interior of Mehak Beauty Salon in Islamabad with arched backlit mirrors and travertine styling counters"
          loading="eager"
          fallbackTitle="Mehak Beauty Salon Interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Calibrated Editorial Contrast Scrim (ensures >7:1 WCAG AA readability across all light/dark themes) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#0F0E0D]/85 via-[#0F0E0D]/62 to-[#0F0E0D]/28"
        />

        {/* Foreground Editorial Copy */}
        <div className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wide text-[#E7D3AD]">
              Chak Shahzad &amp; Hostel City, Islamabad · Hair, Bridal Couture &amp; Skin Care
            </p>

            <h1
              className="font-display font-semibold text-white leading-[1.06] tracking-tight text-balance-safe"
              style={{ fontSize: 'clamp(2.5rem, 4.8vw, 4.25rem)' }}
            >
              Refined Hair, Bridal Artistry &amp; Clinical Skincare
            </h1>

            <p className="text-[15px] sm:text-base text-white/88 leading-relaxed max-w-xl">
              Step into a serene, private beauty atelier at {SALON_INFO.brandName}. Our certified
              stylists pair L’Oréal Professionnel hair restoration, luminous Pakistani bridal
              makeup, and clinical facials tailored exclusively to your features.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookNowClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-sm font-semibold bg-white text-[#141413] hover:bg-[#F3ECE0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Book Appointment Now</span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold text-white border border-white/50 bg-black/25 backdrop-blur-xs hover:bg-white/15 hover:border-white transition-colors whitespace-nowrap shrink-0"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Structural Proof Row (below hero split) */}
      <div className="w-full border-b border-[var(--salon-border)] bg-[var(--salon-surface)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--salon-border)]">
            {SALON_FACTS.map((fact) => (
              <div key={fact.label} className="py-6 px-3 sm:px-6 first:pl-0 last:pr-0">
                <div className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[var(--salon-text)] tabular-nums leading-tight">
                  {fact.value}
                </div>
                <div className="mt-1 text-xs sm:text-[13px] text-[var(--salon-muted)]">
                  {fact.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
