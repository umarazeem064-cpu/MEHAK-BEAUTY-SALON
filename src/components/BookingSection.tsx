import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
} from 'lucide-react';
import {
  SALON_INFO,
  SALON_SERVICES,
  SERVICE_CATEGORIES,
  TEAM_MEMBERS,
  formatServicePrice,
} from '../data/salonData';

export interface BookingPrefill {
  serviceId?: string;
  stylistName?: string;
  nonce: number;
}

interface BookingSectionProps {
  prefill: BookingPrefill | null;
}

interface ConfirmedBooking {
  referenceId: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  serviceId: string;
  serviceName: string;
  servicePriceLabel: string;
  serviceDuration: string;
  stylist: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
}

const TIME_SLOTS = [
  '07:30 AM (Early Bridal Call)',
  '09:00 AM (Early Bridal Call)',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
  '07:30 PM',
  '08:45 PM',
] as const;

const STORAGE_BOOKINGS_KEY = 'mehak_salon_confirmed_bookings_v1';

function getTodayIso(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function BookingSection({ prefill }: BookingSectionProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsPhone, setSameAsPhone] = useState(true);
  const [serviceId, setServiceId] = useState(SALON_SERVICES[0].id);
  const [stylist, setStylist] = useState('First Available Master Stylist');
  const [date, setDate] = useState(getTodayIso());
  const [time, setTime] = useState<string>('12:00 PM');
  const [notes, setNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [latestConfirmation, setLatestConfirmation] =
    useState<ConfirmedBooking | null>(null);
  const [savedBookings, setSavedBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BOOKINGS_KEY);
      if (raw) {
        return JSON.parse(raw) as ConfirmedBooking[];
      }
    } catch {
      // Ignore invalid stored payload
    }
    return [];
  });

  // React to "Book This" clicks from Services or Team cards
  useEffect(() => {
    if (!prefill) return;
    if (prefill.serviceId) {
      setServiceId(prefill.serviceId);
    }
    if (prefill.stylistName) {
      setStylist(prefill.stylistName);
    }
    setLatestConfirmation(null);
    setErrorMessage(null);
  }, [prefill]);

  // Keep WhatsApp synced when checkbox is checked
  useEffect(() => {
    if (sameAsPhone) {
      setWhatsapp(phone);
    }
  }, [phone, sameAsPhone]);

  const selectedService = useMemo(
    () => SALON_SERVICES.find((s) => s.id === serviceId) ?? SALON_SERVICES[0],
    [serviceId]
  );

  const groupedServiceOptions = useMemo(
    () =>
      SERVICE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => ({
        label: cat.label,
        items: SALON_SERVICES.filter((s) => s.category === cat.id),
      })),
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedWhatsapp = (sameAsPhone ? trimmedPhone : whatsapp).trim();

    if (trimmedName.length < 2) {
      setErrorMessage('Please enter your full name so we can reserve your suite.');
      return;
    }

    const digitsOnly = trimmedPhone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setErrorMessage('Please enter a valid 10+ digit phone number (e.g., 0318 5199560).');
      return;
    }

    if (!date) {
      setErrorMessage('Please choose your preferred appointment date.');
      return;
    }

    const refNum = `MBS-${Math.floor(10000 + Math.random() * 90000)}`;
    const booking: ConfirmedBooking = {
      referenceId: refNum,
      fullName: trimmedName,
      phone: trimmedPhone,
      whatsapp: trimmedWhatsapp || trimmedPhone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      servicePriceLabel: formatServicePrice(selectedService.pricePKR, 'PKR'),
      serviceDuration: selectedService.duration,
      stylist,
      date,
      time,
      notes: notes.trim(),
      createdAt: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const nextList = [booking, ...savedBookings].slice(0, 4);
    setSavedBookings(nextList);
    setLatestConfirmation(booking);

    try {
      localStorage.setItem(STORAGE_BOOKINGS_KEY, JSON.stringify(nextList));
    } catch {
      // Ignore storage errors
    }
  };

  const buildWhatsappConfirmHref = (booking: ConfirmedBooking) => {
    const lines = [
      `Assalam-o-Alaikum Mehak Beauty Salon!`,
      `Booking Reference: ${booking.referenceId}`,
      `Client: ${booking.fullName}`,
      `Phone: ${booking.phone}`,
      `WhatsApp: ${booking.whatsapp}`,
      `Service: ${booking.serviceName} (${booking.servicePriceLabel})`,
      `Stylist: ${booking.stylist}`,
      `Preferred Date & Time: ${booking.date} at ${booking.time}`,
      booking.notes ? `Special Notes: ${booking.notes}` : '',
    ].filter(Boolean);
    return `https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  };

  const handleBookAnother = () => {
    setLatestConfirmation(null);
    setNotes('');
  };

  return (
    <section
      id="booking"
      className="w-full py-20 lg:py-28 bg-[var(--salon-bg)] border-b border-[var(--salon-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Booking Guidance, Hours & Direct Concierge */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-wide text-[var(--salon-accent)]">
                03. Online Reservations
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-[var(--salon-text)] text-balance-safe">
                Reserve Your Private Suite
              </h2>
              <p className="text-[15px] leading-relaxed text-[var(--salon-secondary)]">
                Select your treatment, preferred specialist, and time slot below. Instant
                appointment confirmation is generated immediately, and our reception desk at Hostel
                City confirms bridal or color preparations directly via WhatsApp.
              </p>
            </div>

            {/* Concierge Details (clean hairline rows) */}
            <div className="divide-y divide-[var(--salon-border)] border-t border-b border-[var(--salon-border)] text-sm">
              <div className="py-4 flex items-start gap-3.5">
                <Clock className="w-4 h-4 mt-1 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[var(--salon-text)]">Salon Hours</div>
                  <div className="text-[var(--salon-muted)] mt-0.5">{SALON_INFO.hoursRegular}</div>
                  <div className="text-xs text-[var(--salon-accent)] mt-0.5">
                    {SALON_INFO.hoursBridal}
                  </div>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <Phone className="w-4 h-4 mt-1 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[var(--salon-text)]">Direct Reception</div>
                  <a
                    href={SALON_INFO.phoneHref}
                    className="text-[var(--salon-muted)] hover:text-[var(--salon-text)] tabular-nums mt-0.5 inline-block"
                  >
                    {SALON_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="py-4 flex items-start gap-3.5">
                <MapPin className="w-4 h-4 mt-1 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-semibold text-[var(--salon-text)]">Studio Address</div>
                  <div className="text-[var(--salon-muted)] mt-0.5 leading-relaxed">
                    {SALON_INFO.addressFull}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Service Live Summary */}
            <div className="p-5 rounded-xl bg-[var(--salon-surface)] border border-[var(--salon-border)] space-y-2">
              <div className="text-xs font-medium text-[var(--salon-muted)]">
                Currently Selected Treatment
              </div>
              <div className="font-display text-xl font-semibold text-[var(--salon-text)]">
                {selectedService.name}
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--salon-secondary)] tabular-nums">
                <span>{selectedService.duration}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[var(--salon-accent)]">
                  {formatServicePrice(selectedService.pricePKR, 'PKR')}
                </span>
              </div>
            </div>

            {/* Previously Confirmed Appointments (persisted locally for returning visitor convenience) */}
            {savedBookings.length > 0 && !latestConfirmation && (
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-[var(--salon-muted)]">
                  Your Recent Requests on This Device
                </div>
                <div className="space-y-2">
                  {savedBookings.slice(0, 2).map((item) => (
                    <div
                      key={item.referenceId}
                      className="p-3.5 rounded-lg border border-[var(--salon-border)] bg-[var(--salon-card)] text-xs flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-semibold text-[var(--salon-text)] truncate">
                          {item.serviceName}
                        </div>
                        <div className="text-[var(--salon-muted)] tabular-nums">
                          {item.date} · {item.time} · Ref {item.referenceId}
                        </div>
                      </div>
                      <a
                        href={buildWhatsappConfirmHref(item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--salon-accent)] hover:underline font-medium whitespace-nowrap shrink-0"
                      >
                        WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Booking Form OR Live Confirmation Receipt */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-9 rounded-2xl bg-[var(--salon-card)] border border-[var(--salon-border)]">
              {latestConfirmation ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="space-y-6"
                >
                  <div className="flex items-start gap-4 pb-5 border-b border-[var(--salon-border)]">
                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--salon-accent-soft)] text-[var(--salon-accent)] shrink-0">
                      <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[var(--salon-accent)] tabular-nums">
                        Booking Confirmed · Reference {latestConfirmation.referenceId}
                      </p>
                      <h3 className="font-display text-3xl font-semibold text-[var(--salon-text)] mt-1">
                        We Look Forward to Welcoming You, {latestConfirmation.fullName}
                      </h3>
                      <p className="text-sm text-[var(--salon-muted)] mt-1.5 leading-relaxed">
                        Your appointment request has been recorded. Send your summary via WhatsApp
                        below for instant bridal/chair slot locking with our front desk.
                      </p>
                    </div>
                  </div>

                  {/* Receipt Summary Grid */}
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="p-4 rounded-xl bg-[var(--salon-surface)] border border-[var(--salon-border)]">
                      <dt className="text-xs text-[var(--salon-muted)]">Selected Service</dt>
                      <dd className="font-semibold text-[var(--salon-text)] mt-1">
                        {latestConfirmation.serviceName}
                      </dd>
                      <dd className="text-xs text-[var(--salon-accent)] tabular-nums mt-0.5">
                        {latestConfirmation.servicePriceLabel} · {latestConfirmation.serviceDuration}
                      </dd>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--salon-surface)] border border-[var(--salon-border)]">
                      <dt className="text-xs text-[var(--salon-muted)]">Specialist &amp; Schedule</dt>
                      <dd className="font-semibold text-[var(--salon-text)] mt-1">
                        {latestConfirmation.stylist}
                      </dd>
                      <dd className="text-xs text-[var(--salon-secondary)] tabular-nums mt-0.5">
                        {latestConfirmation.date} at {latestConfirmation.time}
                      </dd>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--salon-surface)] border border-[var(--salon-border)]">
                      <dt className="text-xs text-[var(--salon-muted)]">Phone / WhatsApp</dt>
                      <dd className="font-semibold text-[var(--salon-text)] tabular-nums mt-1">
                        {latestConfirmation.phone}
                      </dd>
                      <dd className="text-xs text-[var(--salon-muted)] tabular-nums mt-0.5">
                        WhatsApp: {latestConfirmation.whatsapp}
                      </dd>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--salon-surface)] border border-[var(--salon-border)]">
                      <dt className="text-xs text-[var(--salon-muted)]">Location</dt>
                      <dd className="font-semibold text-[var(--salon-text)] mt-1">
                        {SALON_INFO.brandName}
                      </dd>
                      <dd className="text-xs text-[var(--salon-muted)] mt-0.5">
                        {SALON_INFO.addressShort}
                      </dd>
                    </div>
                  </dl>

                  {latestConfirmation.notes && (
                    <div className="p-4 rounded-xl bg-[var(--salon-surface)] border border-[var(--salon-border)] text-sm">
                      <div className="text-xs text-[var(--salon-muted)] mb-1">Special Request</div>
                      <p className="text-[var(--salon-secondary)]">{latestConfirmation.notes}</p>
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsappConfirmHref(latestConfirmation)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] hover:bg-[var(--salon-cta-hover)] transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Confirm via WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleBookAnother}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-[var(--salon-border)] text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      <span>Book Another Appointment</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-4 border-b border-[var(--salon-border)]">
                    <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[var(--salon-text)]">
                      Online Appointment Request
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--salon-muted)] mt-1">
                      Complete your details below—no advance card payment required for standard
                      studio visits.
                    </p>
                  </div>

                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-lg border border-red-400/50 bg-red-500/10 text-sm text-red-700 dark:text-red-300"
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Row 1: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-name"
                        className="block text-xs font-semibold text-[var(--salon-text)]"
                      >
                        Full Name <span className="text-[var(--salon-accent)]">*</span>
                      </label>
                      <input
                        id="booking-name"
                        name="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Ayesha Siddiqui"
                        className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] placeholder:text-[var(--salon-muted)]/70 focus:border-[var(--salon-accent)] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-phone"
                        className="block text-xs font-semibold text-[var(--salon-text)]"
                      >
                        Phone Number <span className="text-[var(--salon-accent)]">*</span>
                      </label>
                      <input
                        id="booking-phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+92 318 0000000"
                        className="w-full px-4 py-3 rounded-lg text-sm tabular-nums bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] placeholder:text-[var(--salon-muted)]/70 focus:border-[var(--salon-accent)] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: WhatsApp Number */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="booking-whatsapp"
                        className="block text-xs font-semibold text-[var(--salon-text)]"
                      >
                        WhatsApp Number
                      </label>
                      <label className="inline-flex items-center gap-2 text-xs text-[var(--salon-muted)] cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={sameAsPhone}
                          onChange={(e) => setSameAsPhone(e.target.checked)}
                          className="rounded border-[var(--salon-border)] accent-[var(--salon-accent)]"
                        />
                        <span>Same as phone number</span>
                      </label>
                    </div>
                    <input
                      id="booking-whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={whatsapp}
                      disabled={sameAsPhone}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+92 318 0000000"
                      className="w-full px-4 py-3 rounded-lg text-sm tabular-nums bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] placeholder:text-[var(--salon-muted)]/70 disabled:opacity-65 focus:border-[var(--salon-accent)] transition-colors"
                    />
                  </div>

                  {/* Row 3: Select Service & Select Stylist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-service"
                        className="block text-xs font-semibold text-[var(--salon-text)]"
                      >
                        Select Service <span className="text-[var(--salon-accent)]">*</span>
                      </label>
                      <select
                        id="booking-service"
                        name="service"
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] focus:border-[var(--salon-accent)] transition-colors"
                      >
                        {groupedServiceOptions.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.items.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.name} — {formatServicePrice(item.pricePKR, 'PKR')}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-stylist"
                        className="block text-xs font-semibold text-[var(--salon-text)]"
                      >
                        Select Stylist / Expert
                      </label>
                      <select
                        id="booking-stylist"
                        name="stylist"
                        value={stylist}
                        onChange={(e) => setStylist(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] focus:border-[var(--salon-accent)] transition-colors"
                      >
                        <option value="First Available Master Stylist">
                          First Available Master Stylist
                        </option>
                        {TEAM_MEMBERS.map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name} — {member.role}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Date & Time Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-date"
                        className="block text-xs font-semibold text-[var(--salon-text)]"
                      >
                        Preferred Date <span className="text-[var(--salon-accent)]">*</span>
                      </label>
                      <input
                        id="booking-date"
                        name="date"
                        type="date"
                        min={getTodayIso()}
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm tabular-nums bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] focus:border-[var(--salon-accent)] transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-time"
                        className="block text-xs font-semibold text-[var(--salon-text)]"
                      >
                        Preferred Time <span className="text-[var(--salon-accent)]">*</span>
                      </label>
                      <select
                        id="booking-time"
                        name="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg text-sm tabular-nums bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] focus:border-[var(--salon-accent)] transition-colors"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Special Notes */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-notes"
                      className="block text-xs font-semibold text-[var(--salon-text)]"
                    >
                      Special Notes or Skin / Bridal Requests
                    </label>
                    <textarea
                      id="booking-notes"
                      name="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Share event outfit tones, hair length, skin sensitivities, or group party booking counts..."
                      className="w-full px-4 py-3 rounded-lg text-sm bg-[var(--salon-surface)] text-[var(--salon-text)] border border-[var(--salon-border)] placeholder:text-[var(--salon-muted)]/70 focus:border-[var(--salon-accent)] transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-semibold bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] hover:bg-[var(--salon-cta-hover)] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span>Confirm Appointment Request</span>
                    </button>

                    <span className="text-xs text-[var(--salon-muted)]">
                      Free rescheduling up to 4 hours before visit.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
