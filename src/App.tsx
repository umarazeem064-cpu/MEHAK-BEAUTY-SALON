import { useCallback, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BookingSection, type BookingPrefill } from './components/BookingSection';
import { TeamSection } from './components/TeamSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FooterContactSection } from './components/FooterContactSection';
import { ColorModeDrawer } from './components/ColorModeDrawer';
import type { SalonService, TeamMember } from './data/salonData';

function SalonAppContent() {
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | null>(null);

  const scrollToBooking = useCallback(() => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectServiceForBooking = useCallback(
    (service: SalonService) => {
      setBookingPrefill({
        serviceId: service.id,
        stylistName: service.recommendedStylist,
        nonce: Date.now(),
      });
      scrollToBooking();
    },
    [scrollToBooking]
  );

  const handleBookWithStylist = useCallback(
    (member: TeamMember) => {
      setBookingPrefill({
        stylistName: member.name,
        nonce: Date.now(),
      });
      scrollToBooking();
    },
    [scrollToBooking]
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--salon-bg)] text-[var(--salon-text)]">
      <Header onBookNowClick={scrollToBooking} />

      <main className="flex-1">
        <HeroSection onBookNowClick={scrollToBooking} />
        <AboutSection />
        <ServicesSection onSelectServiceForBooking={handleSelectServiceForBooking} />
        <BookingSection prefill={bookingPrefill} />
        <TeamSection onBookWithStylist={handleBookWithStylist} />
        <GallerySection />
        <TestimonialsSection />
      </main>

      <FooterContactSection />
      <ColorModeDrawer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SalonAppContent />
    </ThemeProvider>
  );
}
