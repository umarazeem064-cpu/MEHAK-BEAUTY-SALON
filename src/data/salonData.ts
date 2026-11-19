export type ServiceCategoryId =
  | 'all'
  | 'hair'
  | 'skincare'
  | 'grooming'
  | 'bridal'
  | 'nails';

export type CurrencyCode = 'PKR' | 'USD' | 'GBP';

export interface SalonService {
  id: string;
  category: Exclude<ServiceCategoryId, 'all'>;
  categoryLabel: string;
  name: string;
  description: string;
  duration: string;
  pricePKR: number;
  featuredNote?: string;
  recommendedStylist: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  bio: string;
  image: string;
  imageAlt: string;
  socials: {
    instagram: string;
    facebook?: string;
    tiktok?: string;
  };
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Bridal & Glam' | 'Hair Artistry' | 'Skin & Nails' | 'Salon Ambiance';
  serviceTag: string;
  image: string;
  alt: string;
  aspectClass: string;
  description: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  neighborhood: string;
  service: string;
  rating: number;
  date: string;
  quote: string;
  outcome: string;
  image: string;
  imageAlt: string;
}

export interface ThemePreset {
  id: string;
  name: string;
  subtitle: string;
  isDark: boolean;
  swatchBg: string;
  swatchAccent: string;
  tokens: {
    bg: string;
    surface: string;
    card: string;
    text: string;
    secondary: string;
    muted: string;
    border: string;
    accent: string;
    accentSoft: string;
    accentFg: string;
    cta: string;
    ctaHover: string;
    ctaFg: string;
    ring: string;
  };
}

export const SALON_INFO = {
  brandName: 'Mehak Beauty Salon',
  tagline: 'Hair, Bridal Couture & Clinical Skin Studio',
  addressFull:
    'Hostel City, Lane 10, Street 3, Meherban Colony, Chatta Bakhtawar, Chak Shahzad, Islamabad, 44000, Pakistan',
  addressShort: 'Hostel City, Lane 10, Chatta Bakhtawar, Islamabad',
  landmark: 'Off Park Road near COMSATS & Chak Shahzad, Islamabad',
  coordinates: '33.6575° N, 73.1567° E',
  phoneDisplay: '+92 318 5199560',
  phoneHref: 'tel:+923185199560',
  whatsappRaw: '923185199560',
  whatsappHref:
    'https://wa.me/923185199560?text=Assalam-o-Alaikum%20Mehak%20Beauty%20Salon%2C%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment.',
  email: 'appointments@mehakbeautysalon.pk',
  mapsUrl: 'https://maps.app.goo.gl/gcc9mQFoFCnkyd3b8',
  hoursRegular: 'Monday – Sunday: 10:00 AM – 10:00 PM',
  hoursBridal: 'Early Bridal & On-Call Appointments: Open 24 Hours by Booking',
  establishedYears: '12+ Years',
  socials: {
    instagram: 'https://instagram.com/mehakbeautysalon.isb',
    facebook: 'https://facebook.com/mehakbeautysalonislamabad',
    tiktok: 'https://tiktok.com/@mehakbeautysalon.isb',
    whatsapp: 'https://wa.me/923185199560',
  },
} as const;

export const IMAGES = {
  heroInterior: '/src/assets/images/hero_mehak_interior_1795095682529.jpg',
  aboutCraft: '/src/assets/images/about_salon_craft_1795095657465.jpg',
  galleryBridal: '/src/assets/images/gallery_bridal_glam_1795095657903.jpg',
  galleryHair: '/src/assets/images/gallery_hair_balayage_1795095657584.jpg',
  galleryParty: '/src/assets/images/gallery_party_glam_1795095657781.jpg',
  galleryFacial: '/src/assets/images/gallery_facial_spa_1795095657527.jpg',
  galleryManicure: '/src/assets/images/gallery_manicure_nails_1795095657806.jpg',
  stylistMehak: '/src/assets/images/stylist_mehak_tariq_1795095657874.jpg',
  stylistSana: '/src/assets/images/stylist_sana_khalid_1795095657968.jpg',
  stylistAyesha: '/src/assets/images/stylist_ayesha_rehman_1795095658129.jpg',
  stylistZainab: '/src/assets/images/stylist_zainab_farooq_1795095657296.jpg',
  clientHira: '/src/assets/images/client_hira_malik_1795095658408.jpg',
  clientAmna: '/src/assets/images/client_amna_sheikh_1795095657362.jpg',
  clientFatima: '/src/assets/images/client_fatima_noor_1795095658784.jpg',
} as const;

export const CURRENCY_RATES: Record<
  CurrencyCode,
  { symbol: string; rateFromPKR: number; label: string }
> = {
  PKR: { symbol: 'PKR ', rateFromPKR: 1, label: 'PKR' },
  USD: { symbol: '$', rateFromPKR: 1 / 278, label: 'USD' },
  GBP: { symbol: '£', rateFromPKR: 1 / 352, label: 'GBP' },
};

export function formatServicePrice(pricePKR: number, currency: CurrencyCode): string {
  if (currency === 'PKR') {
    return `PKR ${pricePKR.toLocaleString('en-PK')}`;
  }
  const { symbol, rateFromPKR } = CURRENCY_RATES[currency];
  const converted = Math.max(5, Math.round(pricePKR * rateFromPKR));
  return `${symbol}${converted.toLocaleString('en-US')}`;
}

export const SERVICE_CATEGORIES: { id: ServiceCategoryId; label: string }[] = [
  { id: 'all', label: 'All Services' },
  { id: 'hair', label: 'Hair Styling & Cuts' },
  { id: 'skincare', label: 'Skincare & Facials' },
  { id: 'grooming', label: 'Grooming & Beard' },
  { id: 'bridal', label: 'Bridal & Party Makeup' },
  { id: 'nails', label: 'Manicure & Pedicure' },
];

export const SALON_SERVICES: SalonService[] = [
  // Hair Styling & Cuts
  {
    id: 'hair-precision-cut',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    name: "Women's Signature Haircut & Finish",
    description:
      'Consultation-led precision layering, face-framing contour cut, nourishing wash, and polished round-brush styling.',
    duration: '60 mins',
    pricePKR: 3500,
    recommendedStylist: 'Sana Khalid',
  },
  {
    id: 'hair-silk-blowout',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    name: 'Luxury Volume Silk Blowout',
    description:
      'Heat-protected thermal blowout finished with argan gloss mist for bouncy waves or glass-smooth movement.',
    duration: '45 mins',
    pricePKR: 2800,
    recommendedStylist: 'Sana Khalid',
  },
  {
    id: 'hair-global-color',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    name: 'Ammonia-Free Global Hair Color',
    description:
      'Rich root-to-tip dimensional pigment using L’Oréal INOA formulas paired with a bond-sealing moisture mask.',
    duration: '120 mins',
    pricePKR: 12500,
    recommendedStylist: 'Sana Khalid',
  },
  {
    id: 'hair-balayage-highlights',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    name: 'Dimensional Balayage & Highlights',
    description:
      'Hand-painted caramel, mocha, or honey ribbons tailored to South Asian undertones with custom gloss toning.',
    duration: '180 mins',
    pricePKR: 19500,
    featuredNote: 'Client Favorite',
    recommendedStylist: 'Sana Khalid',
  },
  {
    id: 'hair-keratin-treatment',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    name: 'Brazilian Keratin Smoothing Therapy',
    description:
      'Formaldehyde-free amino keratin infusion that removes frizz and restores mirror shine for up to 4 months.',
    duration: '180 mins',
    pricePKR: 22000,
    featuredNote: 'Signature Treatment',
    recommendedStylist: 'Sana Khalid',
  },
  {
    id: 'hair-mens-cut',
    category: 'hair',
    categoryLabel: 'Hair Styling & Cuts',
    name: "Men's Executive Haircut & Scalp Wash",
    description:
      'Tailored scissor-and-fade precision cut in our private grooming suite with invigorating mint scalp cleanse.',
    duration: '45 mins',
    pricePKR: 2200,
    recommendedStylist: 'First Available Master Stylist',
  },

  // Skincare & Facials
  {
    id: 'skin-deep-cleansing',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    name: 'Deep Pore Cleansing Botanical Facial',
    description:
      'Ultrasonic exfoliation, gentle steam extraction, soothing clay purification, and lymphatic facial massage.',
    duration: '60 mins',
    pricePKR: 5500,
    recommendedStylist: 'Ayesha Rehman',
  },
  {
    id: 'skin-anti-aging',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    name: 'Janssen Anti-Aging Collagen Lift',
    description:
      'Peptide ampoule infusion, micro-current firming contour massage, and bio-cellulose hydration veil for taut radiance.',
    duration: '75 mins',
    pricePKR: 9500,
    recommendedStylist: 'Ayesha Rehman',
  },
  {
    id: 'skin-gold-facial',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    name: '24K Gold Radiance Bridal Facial',
    description:
      'Luminous pre-event resurfacing treatment infused with colloidal gold serum, pearl mask, and brightening massage.',
    duration: '90 mins',
    pricePKR: 11500,
    featuredNote: 'Bridal Glow',
    recommendedStylist: 'Ayesha Rehman',
  },
  {
    id: 'skin-hydra-glow',
    category: 'skincare',
    categoryLabel: 'Skincare & Facials',
    name: 'Hydra-Glow Dermabrasion & LED Therapy',
    description:
      'Multi-step vortex hydration peel paired with calming LED light therapy to refine pores and erase dullness.',
    duration: '75 mins',
    pricePKR: 8500,
    recommendedStylist: 'Ayesha Rehman',
  },

  // Grooming & Beard Trimming
  {
    id: 'grooming-brow-threading',
    category: 'grooming',
    categoryLabel: 'Grooming & Beard',
    name: 'Precision Brow Architecture & Threading',
    description:
      'Mapped symmetry eyebrow shaping and full-face organic cotton threading finished with cooling aloe-rosewater mist.',
    duration: '30 mins',
    pricePKR: 1500,
    recommendedStylist: 'Ayesha Rehman',
  },
  {
    id: 'grooming-classic-beard',
    category: 'grooming',
    categoryLabel: 'Grooming & Beard',
    name: 'Classic Beard Sculpt & Shave',
    description:
      'Crisp cheek and neckline shaping with single-use sterilized blades, warm lather, and sandalwood balm finish.',
    duration: '35 mins',
    pricePKR: 1800,
    recommendedStylist: 'First Available Master Stylist',
  },
  {
    id: 'grooming-mustache-styling',
    category: 'grooming',
    categoryLabel: 'Grooming & Beard',
    name: 'Mustache Styling & Contoured Trim',
    description:
      'Fine scissor detailing, balanced edge definition, and natural cedarwood conditioning wax application.',
    duration: '20 mins',
    pricePKR: 950,
    recommendedStylist: 'First Available Master Stylist',
  },
  {
    id: 'grooming-hot-towel',
    category: 'grooming',
    categoryLabel: 'Grooming & Beard',
    name: 'Aromatic Hot Towel Treatment',
    description:
      'Triple eucalyptus-infused hot towel compress with soothing neck tension relief and cold-pressed soothing toner.',
    duration: '30 mins',
    pricePKR: 2200,
    recommendedStylist: 'First Available Master Stylist',
  },

  // Bridal & Party Makeup
  {
    id: 'bridal-full-couture',
    category: 'bridal',
    categoryLabel: 'Bridal & Party Makeup',
    name: 'Signature Barat / Valima Bridal Makeup',
    description:
      'HD airbrush luxury base (MAC, NARS, Huda Beauty), custom eye artistry, bridal hairstyling, jewelry & dupatta setting.',
    duration: '180 mins',
    pricePKR: 45000,
    featuredNote: 'Signature Bridal',
    recommendedStylist: 'Mehak Tariq',
  },
  {
    id: 'bridal-engagement',
    category: 'bridal',
    categoryLabel: 'Bridal & Party Makeup',
    name: 'Engagement & Nikkah Couture Look',
    description:
      'Dewy luminous skin finish, soft romantic rose-champagne eyes, custom lashes, and tailored veil styling.',
    duration: '120 mins',
    pricePKR: 26000,
    recommendedStylist: 'Mehak Tariq',
  },
  {
    id: 'bridal-party-glam',
    category: 'bridal',
    categoryLabel: 'Bridal & Party Makeup',
    name: 'Soft Glam Party Makeup & Hair',
    description:
      'Long-wear sculpted complexion, feathered brows, signature eye shading, and waves or sleek updo styling.',
    duration: '90 mins',
    pricePKR: 12000,
    featuredNote: 'Most Booked',
    recommendedStylist: 'Zainab Farooq',
  },
  {
    id: 'bridal-mehndi-look',
    category: 'bridal',
    categoryLabel: 'Bridal & Party Makeup',
    name: 'Mehndi Festive Glam & Floral Hair',
    description:
      'Warm golden-bronze radiant look with intricate braided hairstyling accented by fresh jasmine gajras.',
    duration: '105 mins',
    pricePKR: 15500,
    recommendedStylist: 'Zainab Farooq',
  },

  // Manicure & Pedicure
  {
    id: 'nails-classic-manipedi',
    category: 'nails',
    categoryLabel: 'Manicure & Pedicure',
    name: 'Classic Luxury Mani-Pedi',
    description:
      'Warm rose-salt soak, gentle cuticle refinement, sugar exfoliation, tension-melting massage, and glossy polish.',
    duration: '75 mins',
    pricePKR: 4800,
    recommendedStylist: 'Zainab Farooq',
  },
  {
    id: 'nails-gel-polish',
    category: 'nails',
    categoryLabel: 'Manicure & Pedicure',
    name: 'Long-Wear Gel Polish & Nail Shaping',
    description:
      'Chip-resistant UV-cured sheer pearl, French tip, or seasonal neutral shades lasting up to 3 weeks.',
    duration: '50 mins',
    pricePKR: 3800,
    recommendedStylist: 'Zainab Farooq',
  },
  {
    id: 'nails-spa-foot',
    category: 'nails',
    categoryLabel: 'Manicure & Pedicure',
    name: 'Botanical Aromatherapy Spa Foot Treatment',
    description:
      'Heel callus renewal, peppermint clay foot mask, warm towel wrap, and reflexology pressure massage.',
    duration: '60 mins',
    pricePKR: 4200,
    recommendedStylist: 'Ayesha Rehman',
  },
  {
    id: 'nails-paraffin-renewal',
    category: 'nails',
    categoryLabel: 'Manicure & Pedicure',
    name: 'Warm Paraffin Renewal Mani-Pedi',
    description:
      'Deep hydration vitamin-E paraffin dip for silky hands and feet, ideal before weddings and winter events.',
    duration: '90 mins',
    pricePKR: 6500,
    recommendedStylist: 'Zainab Farooq',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'mehak-tariq',
    name: 'Mehak Tariq',
    role: 'Founder & Creative Bridal Director',
    experience: '12+ Years Experience',
    specialty: 'Signature Pakistani Bridal · Airbrush Couture',
    bio: 'Trained in Islamabad and Dubai, Mehak founded the salon to bring serene, unhurried bridal artistry and skin-first glam to Chak Shahzad and greater Islamabad.',
    image: IMAGES.stylistMehak,
    imageAlt: 'Portrait of Mehak Tariq, Founder and Creative Bridal Director at Mehak Beauty Salon',
    socials: {
      instagram: 'https://instagram.com/mehakbeautysalon.isb',
      facebook: 'https://facebook.com/mehakbeautysalonislamabad',
    },
  },
  {
    id: 'sana-khalid',
    name: 'Sana Khalid',
    role: 'Senior Hair Colorist & Keratin Specialist',
    experience: '9+ Years Experience',
    specialty: 'Dimensional Balayage · Amino Keratin Therapy',
    bio: 'Known across Park Road and Islamabad for damage-free brunette balayage, glossy blowouts, and customized restorative keratin protocols.',
    image: IMAGES.stylistSana,
    imageAlt: 'Portrait of Sana Khalid, Senior Hair Colorist and Keratin Specialist',
    socials: {
      instagram: 'https://instagram.com/mehakbeautysalon.isb',
      tiktok: 'https://tiktok.com/@mehakbeautysalon.isb',
    },
  },
  {
    id: 'ayesha-rehman',
    name: 'Ayesha Rehman',
    role: 'Lead Clinical Aesthetician',
    experience: '8+ Years Experience',
    specialty: '24K Gold Facials · Hydra-Dermabrasion',
    bio: 'Certified dermal therapist focused on clinical hygiene, barrier-safe exfoliation, and tailored bridal pre-event skin preparation plans.',
    image: IMAGES.stylistAyesha,
    imageAlt: 'Portrait of Ayesha Rehman, Lead Clinical Aesthetician at Mehak Beauty Salon',
    socials: {
      instagram: 'https://instagram.com/mehakbeautysalon.isb',
      facebook: 'https://facebook.com/mehakbeautysalonislamabad',
    },
  },
  {
    id: 'zainab-farooq',
    name: 'Zainab Farooq',
    role: 'Senior Makeup & Nail Studio Artist',
    experience: '7+ Years Experience',
    specialty: 'Soft Glam Party Looks · Gel Nail Architecture',
    bio: 'Specializes in luminous modern soft-glam for university formals, family receptions, and crisp pearl-finish gel manicures.',
    image: IMAGES.stylistZainab,
    imageAlt: 'Portrait of Zainab Farooq, Senior Makeup and Nail Studio Artist',
    socials: {
      instagram: 'https://instagram.com/mehakbeautysalon.isb',
      tiktok: 'https://tiktok.com/@mehakbeautysalon.isb',
    },
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-bridal',
    title: 'Ivory & Antique Gold Nikkah Bridal',
    category: 'Bridal & Glam',
    serviceTag: 'Signature Bridal Makeup · Mehak Tariq',
    image: IMAGES.galleryBridal,
    alt: 'South Asian bride with soft luminous bridal makeup, gold tikka jewelry, and ivory embroidered veil',
    aspectClass: 'aspect-[3/4]',
    description:
      'Skin-first airbrush complexion with soft champagne lids, seamless lash work, and traditional dupatta pinning.',
  },
  {
    id: 'gal-hair',
    title: 'Caramel-Espresso Dimensional Balayage',
    category: 'Hair Artistry',
    serviceTag: 'Balayage & Keratin Finish · Sana Khalid',
    image: IMAGES.galleryHair,
    alt: 'Rear three-quarter view of glossy dark espresso hair with warm caramel dimensional balayage waves',
    aspectClass: 'aspect-[3/4]',
    description:
      'Seamless hand-painted warm ribbons finished with an amino gloss seal and structured silk waves.',
  },
  {
    id: 'gal-party',
    title: 'Modern Soft Glam Evening Look',
    category: 'Bridal & Glam',
    serviceTag: 'Party Makeup & Hollywood Waves · Zainab Farooq',
    image: IMAGES.galleryParty,
    alt: 'South Asian woman with bronze soft-glam evening makeup, feathered brows, and glossy dark waves',
    aspectClass: 'aspect-[3/4]',
    description:
      'Sculpted dewy evening glam crafted to photograph naturally in both daylight and warm reception lighting.',
  },
  {
    id: 'gal-facial',
    title: '24K Gold & Botanical Skincare Suite',
    category: 'Skin & Nails',
    serviceTag: 'Clinical Facial Therapy · Ayesha Rehman',
    image: IMAGES.galleryFacial,
    alt: 'Luxury white travertine facial suite featuring botanical amber serum dropper, 24K gold mask jar, and rolled white towels',
    aspectClass: 'aspect-[4/3]',
    description:
      'Private, tranquil facial room equipped with medical-grade sterilization and European botanical formulations.',
  },
  {
    id: 'gal-nails',
    title: 'Champagne Pearl Gel Manicure',
    category: 'Skin & Nails',
    serviceTag: 'Luxury Nail Studio · Zainab Farooq',
    image: IMAGES.galleryManicure,
    alt: 'Close-up of manicured hands with glossy sheer pearl-champagne gel polish on white travertine stone',
    aspectClass: 'aspect-[4/3]',
    description:
      'Clean Russian-inspired cuticle finishing paired with long-wear sheer champagne pearl gel polish.',
  },
  {
    id: 'gal-interior',
    title: 'Main Styling Atelier — Chak Shahzad',
    category: 'Salon Ambiance',
    serviceTag: 'Hostel City, Chatta Bakhtawar · Islamabad',
    image: IMAGES.heroInterior,
    alt: 'Sunlit white and champagne-gold luxury salon interior with arched backlit mirrors and cream styling chairs',
    aspectClass: 'aspect-[4/3]',
    description:
      'Our serene, daylight-filled salon suite designed for complete comfort, privacy, and unhurried luxury care.',
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'rev-hira',
    clientName: 'Hira Malik',
    neighborhood: 'Chak Shahzad, Islamabad',
    service: 'Nikkah Bridal Makeup & Hair',
    rating: 5,
    date: 'October 2026',
    quote:
      'I wanted my Nikkah look to feel luminous and natural rather than cakey. Mehak spent twenty minutes analyzing my skin tone and dupatta embroidery—my makeup stayed flawless through eight hours of humidity and photography.',
    outcome: '8+ hours crease-free finish with zero oxidation',
    image: IMAGES.clientHira,
    imageAlt: 'Portrait of client Hira Malik from Chak Shahzad, Islamabad',
  },
  {
    id: 'rev-amna',
    clientName: 'Amna Sheikh',
    neighborhood: 'Park Road, Islamabad',
    service: '24K Gold Facial & Classic Mani-Pedi',
    rating: 5,
    date: 'September 2026',
    quote:
      'What sets Mehak Beauty Salon apart from other parlors near Hostel City is genuine hospital-level cleanliness. Every brush and cuticle tool came sealed, the facial room was peaceful, and my skin glowed for weeks.',
    outcome: 'Visible post-facial hydration and zero irritation on sensitive skin',
    image: IMAGES.clientAmna,
    imageAlt: 'Portrait of client Amna Sheikh from Park Road, Islamabad',
  },
  {
    id: 'rev-fatima',
    clientName: 'Fatima Noor',
    neighborhood: 'Hostel City, Chatta Bakhtawar',
    service: 'Brazilian Keratin & Precision Haircut',
    rating: 5,
    date: 'November 2026',
    quote:
      'After years of dry frizzy ends, Sana transformed my hair texture completely without burning or flattening my natural volume. Now I save thirty minutes every morning before university lectures.',
    outcome: 'Frizz-free gloss lasting over 14 weeks after treatment',
    image: IMAGES.clientFatima,
    imageAlt: 'Portrait of client Fatima Noor from Hostel City, Islamabad',
  },
];

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'white',
    name: 'Pure White',
    subtitle: 'Crisp Gallery Luxury (Default)',
    isDark: false,
    swatchBg: '#FFFFFF',
    swatchAccent: '#967237',
    tokens: {
      bg: '#FFFFFF',
      surface: '#F7F6F3',
      card: '#FFFFFF',
      text: '#141413',
      secondary: '#3F3F3C',
      muted: '#66655F',
      border: '#E6E4DE',
      accent: '#967237',
      accentSoft: '#F5EFE4',
      accentFg: '#FFFFFF',
      cta: '#141413',
      ctaHover: '#2C2B28',
      ctaFg: '#FFFFFF',
      ring: '#967237',
    },
  },
  {
    id: 'obsidian',
    name: 'Obsidian Gold',
    subtitle: 'Evening Couture Dark Mode',
    isDark: true,
    swatchBg: '#0C0C0E',
    swatchAccent: '#D4AF37',
    tokens: {
      bg: '#0C0C0E',
      surface: '#141418',
      card: '#1A1A20',
      text: '#F7F5F0',
      secondary: '#D4D1C9',
      muted: '#9D9A92',
      border: '#2A2A32',
      accent: '#D4AF37',
      accentSoft: '#262114',
      accentFg: '#0C0C0E',
      cta: '#D4AF37',
      ctaHover: '#E3C258',
      ctaFg: '#0C0C0E',
      ring: '#D4AF37',
    },
  },
  {
    id: 'rose',
    name: 'Rose Velvet',
    subtitle: 'Porcelain & Rosewood',
    isDark: false,
    swatchBg: '#FFFBFB',
    swatchAccent: '#9B3B5A',
    tokens: {
      bg: '#FFFDFD',
      surface: '#FAF1F4',
      card: '#FFFFFF',
      text: '#231318',
      secondary: '#4E313B',
      muted: '#73535E',
      border: '#EEDEE4',
      accent: '#9B3B5A',
      accentSoft: '#FBEBF0',
      accentFg: '#FFFFFF',
      cta: '#9B3B5A',
      ctaHover: '#7E2D47',
      ctaFg: '#FFFFFF',
      ring: '#9B3B5A',
    },
  },
  {
    id: 'emerald',
    name: 'Emerald Atelier',
    subtitle: 'Mineral White & Botanical Jade',
    isDark: false,
    swatchBg: '#F9FCFA',
    swatchAccent: '#135E46',
    tokens: {
      bg: '#FCFDFC',
      surface: '#EEF5F1',
      card: '#FFFFFF',
      text: '#0E2019',
      secondary: '#2D483E',
      muted: '#506B60',
      border: '#D9E7E0',
      accent: '#135E46',
      accentSoft: '#E5F4EE',
      accentFg: '#FFFFFF',
      cta: '#135E46',
      ctaHover: '#0D4734',
      ctaFg: '#FFFFFF',
      ring: '#135E46',
    },
  },
  {
    id: 'sapphire',
    name: 'Royal Sapphire',
    subtitle: 'Ice White & Editorial Cobalt',
    isDark: false,
    swatchBg: '#FAFCFF',
    swatchAccent: '#1E40AF',
    tokens: {
      bg: '#FCFDFF',
      surface: '#EEF3FA',
      card: '#FFFFFF',
      text: '#0F172A',
      secondary: '#334155',
      muted: '#5B6B82',
      border: '#DAE3F0',
      accent: '#1E40AF',
      accentSoft: '#E8EFFD',
      accentFg: '#FFFFFF',
      cta: '#1E40AF',
      ctaHover: '#173188',
      ctaFg: '#FFFFFF',
      ring: '#1E40AF',
    },
  },
  {
    id: 'champagne',
    name: 'Amber Silk',
    subtitle: 'Sunlit Ivory & Antique Bronze',
    isDark: false,
    swatchBg: '#FFFDF8',
    swatchAccent: '#8C5214',
    tokens: {
      bg: '#FFFDF9',
      surface: '#F7F1E5',
      card: '#FFFFFF',
      text: '#1F170F',
      secondary: '#4A3B2C',
      muted: '#6D5C4B',
      border: '#E8DDD0',
      accent: '#8C5214',
      accentSoft: '#F6E9D7',
      accentFg: '#FFFFFF',
      cta: '#8C5214',
      ctaHover: '#6E3F0D',
      ctaFg: '#FFFFFF',
      ring: '#8C5214',
    },
  },
  {
    id: 'plum',
    name: 'Midnight Plum',
    subtitle: 'Velvet Noir & Orchid Mist',
    isDark: true,
    swatchBg: '#120C16',
    swatchAccent: '#DDA5F2',
    tokens: {
      bg: '#120C16',
      surface: '#1B1321',
      card: '#23192B',
      text: '#F8F3FB',
      secondary: '#D9CBE3',
      muted: '#A895B5',
      border: '#34253E',
      accent: '#DDA5F2',
      accentSoft: '#2C1E36',
      accentFg: '#120C16',
      cta: '#DDA5F2',
      ctaHover: '#E8BEFA',
      ctaFg: '#120C16',
      ring: '#DDA5F2',
    },
  },
];

export const CUSTOM_SPECTRUM_SWATCHES = [
  { label: 'Champagne Gold', hex: '#967237' },
  { label: 'Crimson Velvet', hex: '#9F1239' },
  { label: 'Botanical Emerald', hex: '#0F6B50' },
  { label: 'Deep Cobalt', hex: '#1D4ED8' },
  { label: 'Imperial Plum', hex: '#6D28D9' },
  { label: 'Burnt Sienna', hex: '#9A3412' },
  { label: 'Ocean Teal', hex: '#0F766E' },
  { label: 'Classic Ink', hex: '#18181B' },
];
