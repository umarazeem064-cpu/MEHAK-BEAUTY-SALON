import { useEffect, useState } from 'react';
import { MapPin, Menu, MessageCircle, Palette, Phone, X } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { useSalonTheme } from '../context/ThemeContext';

interface HeaderProps {
  onBookNowClick: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services & Pricing' },
  { href: '#team', label: 'Our Team' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Header({ onBookNowClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { activeLabel, setDrawerOpen } = useSalonTheme();

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Non-sticky top direct contact utility strip (keeps sticky bar lean and under 15% mobile height) */}
      <div className="w-full border-b border-[var(--salon-border)] bg-[var(--salon-surface)] text-[var(--salon-secondary)] text-xs">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 min-w-0">
            <a
              href={SALON_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--salon-text)] transition-colors truncate max-w-full"
            >
              <MapPin className="w-3.5 h-3.5 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
              <span className="truncate">{SALON_INFO.addressShort}</span>
            </a>

            <span className="hidden sm:inline text-[var(--salon-border)]" aria-hidden="true">
              |
            </span>

            <a
              href={SALON_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium tabular-nums hover:text-[var(--salon-text)] transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
              <span>{SALON_INFO.phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href={SALON_INFO.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-[var(--salon-text)] hover:text-[var(--salon-accent)] transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
              <span>WhatsApp Chat</span>
            </a>

            <span className="text-[var(--salon-border)]" aria-hidden="true">
              |
            </span>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 font-medium text-[var(--salon-secondary)] hover:text-[var(--salon-text)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Palette className="w-3.5 h-3.5 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
              <span>Mode: {activeLabel}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-[var(--salon-border)] bg-[var(--salon-bg)]/95 backdrop-blur-md">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single text element) */}
          <a
            href="#home"
            className="font-display text-2xl sm:text-[1.65rem] font-semibold tracking-tight text-[var(--salon-text)] whitespace-nowrap shrink-0"
          >
            {SALON_INFO.brandName}
          </a>

          {/* Zone 2: Clean single-line editorial navigation links */}
          <nav
            aria-label="Primary navigation"
            className="hidden xl:flex items-center gap-6 text-[13.5px] font-medium text-[var(--salon-secondary)]"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link-editorial hover:text-[var(--salon-text)] transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Single primary CTA + mobile drawer button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onBookNowClick}
              className="px-5 py-2.5 rounded-lg text-xs sm:text-[13px] font-semibold bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] hover:bg-[var(--salon-cta-hover)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Book Now
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[var(--salon-border)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-[var(--salon-border)] bg-[var(--salon-bg)] px-4 sm:px-6 py-5">
            <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-2 text-sm font-medium text-[var(--salon-text)] border-b border-[var(--salon-border)]/70 hover:text-[var(--salon-accent)] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="mt-5 pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--salon-muted)]">
              <a
                href={SALON_INFO.phoneHref}
                className="inline-flex items-center gap-1.5 font-medium text-[var(--salon-text)] tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-[var(--salon-accent)]" />
                {SALON_INFO.phoneDisplay}
              </a>
              <a
                href={SALON_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--salon-accent)]"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp Support
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
