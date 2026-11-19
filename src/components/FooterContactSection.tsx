import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Facebook,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export function FooterContactSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsletterError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="contact" className="w-full bg-[var(--salon-bg)] text-[var(--salon-text)]">
      {/* Upper Contact & Visit Band */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-b border-[var(--salon-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Brand, Direct Contact & Opening Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2.5">
              <p className="text-xs font-semibold tracking-wide text-[var(--salon-accent)]">
                07. Visit &amp; Contact Us
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[var(--salon-text)] leading-tight">
                {SALON_INFO.brandName}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--salon-muted)]">
                Your serene luxury destination for hair artistry, bridal couture, clinical facials,
                and spa grooming in Chak Shahzad, Islamabad.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[var(--salon-text)]">Business Address</div>
                  <p className="text-[var(--salon-muted)] mt-0.5 leading-relaxed">
                    {SALON_INFO.addressFull}
                  </p>
                  <p className="text-xs text-[var(--salon-accent)] mt-0.5">
                    {SALON_INFO.landmark}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-1 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[var(--salon-text)]">
                    Direct Phone &amp; WhatsApp
                  </div>
                  <div className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <a
                      href={SALON_INFO.phoneHref}
                      className="text-[var(--salon-secondary)] hover:text-[var(--salon-accent)] font-medium tabular-nums"
                    >
                      {SALON_INFO.phoneDisplay}
                    </a>
                    <span className="text-[var(--salon-border)]" aria-hidden="true">
                      ·
                    </span>
                    <a
                      href={SALON_INFO.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[var(--salon-accent)] font-semibold hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Click to Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-1 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[var(--salon-text)]">Opening Hours</div>
                  <p className="text-[var(--salon-muted)] mt-0.5">{SALON_INFO.hoursRegular}</p>
                  <p className="text-xs text-[var(--salon-muted)] mt-0.5">
                    {SALON_INFO.hoursBridal}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={SALON_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border border-[var(--salon-border)] bg-[var(--salon-surface)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors whitespace-nowrap"
              >
                <Instagram className="w-3.5 h-3.5 text-[var(--salon-accent)]" aria-hidden="true" />
                <span>Instagram</span>
              </a>
              <a
                href={SALON_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border border-[var(--salon-border)] bg-[var(--salon-surface)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors whitespace-nowrap"
              >
                <Facebook className="w-3.5 h-3.5 text-[var(--salon-accent)]" aria-hidden="true" />
                <span>Facebook</span>
              </a>
              <a
                href={SALON_INFO.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border border-[var(--salon-border)] bg-[var(--salon-surface)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors whitespace-nowrap"
              >
                <span>TikTok</span>
              </a>
              <a
                href={SALON_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border border-[var(--salon-border)] bg-[var(--salon-surface)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[var(--salon-accent)]" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quick Links, Google Maps Card & Newsletter */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Navigation Mirror */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="font-sans-body text-xs font-semibold uppercase tracking-wider text-[var(--salon-muted)]">
                Explore Salon
              </h3>
              <ul className="space-y-2.5 text-sm text-[var(--salon-secondary)]">
                <li>
                  <a href="#home" className="hover:text-[var(--salon-accent)] transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[var(--salon-accent)] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[var(--salon-accent)] transition-colors"
                  >
                    Services &amp; Pricing
                  </a>
                </li>
                <li>
                  <a href="#booking" className="hover:text-[var(--salon-accent)] transition-colors">
                    Online Booking
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-[var(--salon-accent)] transition-colors">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[var(--salon-accent)] transition-colors">
                    Transformation Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-[var(--salon-accent)] transition-colors"
                  >
                    Client Testimonials
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter + Google Maps Directions Card */}
            <div className="md:col-span-8 space-y-6">
              {/* Google Maps Verified Location Card */}
              <div className="p-6 rounded-2xl bg-[var(--salon-surface)] border border-[var(--salon-border)] space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs text-[var(--salon-muted)]">
                  <span className="font-medium text-[var(--salon-text)]">
                    Google Maps Verified Location
                  </span>
                  <span className="tabular-nums">{SALON_INFO.coordinates}</span>
                </div>
                <p className="text-sm text-[var(--salon-secondary)] leading-relaxed">
                  Easily accessible from Park Road, COMSATS Islamabad, Tramri Chowk, and Chak
                  Shahzad via Hostel City Lane 10, Street 3.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={SALON_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] hover:bg-[var(--salon-cta-hover)] transition-colors whitespace-nowrap"
                  >
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={SALON_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold border border-[var(--salon-border)] bg-[var(--salon-card)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[var(--salon-accent)]" aria-hidden="true" />
                    <span>WhatsApp Pin</span>
                  </a>
                </div>
              </div>

              {/* Newsletter Subscription Form */}
              <div className="p-6 rounded-2xl bg-[var(--salon-surface)] border border-[var(--salon-border)] space-y-3">
                <h3 className="font-display text-2xl font-semibold text-[var(--salon-text)]">
                  Seasonal Beauty Notes &amp; Bridal Privileges
                </h3>
                <p className="text-xs sm:text-sm text-[var(--salon-muted)] leading-relaxed">
                  Receive Islamabad seasonal hair care routines, bridal booking slot alerts, and
                  private client privileges—sent once a month.
                </p>

                {subscribed ? (
                  <div
                    role="status"
                    className="flex items-center gap-2.5 p-3.5 rounded-lg bg-[var(--salon-card)] border border-[var(--salon-accent)] text-sm text-[var(--salon-text)]"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[var(--salon-accent)] shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      You are subscribed to Mehak Beauty Salon seasonal notes and bridal offers.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <label htmlFor="newsletter-email" className="sr-only">
                        Email address
                      </label>
                      <input
                        id="newsletter-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="flex-1 min-w-0 px-4 py-2.5 rounded-lg text-sm bg-[var(--salon-card)] text-[var(--salon-text)] border border-[var(--salon-border)] placeholder:text-[var(--salon-muted)]/75 focus:border-[var(--salon-accent)]"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] hover:bg-[var(--salon-cta-hover)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <span>Subscribe</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </div>
                    {newsletterError && (
                      <p className="text-xs text-red-600 dark:text-red-400">{newsletterError}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiet Bottom Copyright & Developer Credit Row */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--salon-muted)]">
        <p>
          © {new Date().getFullYear()} {SALON_INFO.brandName}, Chak Shahzad, Islamabad. All rights
          reserved.
        </p>
        <p>
          Crafted with care for Mehak Beauty Salon · Web Experience by Studio Atelier Dev
        </p>
      </div>
    </footer>
  );
}
