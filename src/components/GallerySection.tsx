import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS, type GalleryItem } from '../data/salonData';
import { SalonImage } from './SalonImage';

type GalleryFilter = 'All' | GalleryItem['category'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'All',
  'Bridal & Glam',
  'Hair Artistry',
  'Skin & Nails',
  'Salon Ambiance',
];

export function GallerySection() {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const visibleItems = useMemo(() => {
    if (filter === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === filter);
  }, [filter]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % visibleItems.length
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + visibleItems.length) % visibleItems.length
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, visibleItems.length]);

  const activeLightboxItem =
    lightboxIndex !== null ? visibleItems[lightboxIndex] ?? null : null;

  return (
    <section
      id="gallery"
      className="w-full py-20 lg:py-28 bg-[var(--salon-bg)] border-b border-[var(--salon-border)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[var(--salon-accent)]">
              05. Transformations &amp; Atelier Gallery
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.12] text-[var(--salon-text)] text-balance-safe">
              Bridal Couture, Hair Gloss &amp; Studio Serenity
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter salon gallery"
            className="flex flex-wrap items-center gap-2"
          >
            {GALLERY_FILTERS.map((cat) => {
              const active = filter === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => {
                    setFilter(cat);
                    setLightboxIndex(null);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                    active
                      ? 'bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] border-[var(--salon-cta)]'
                      : 'bg-[var(--salon-surface)] text-[var(--salon-secondary)] border-[var(--salon-border)] hover:border-[var(--salon-accent)]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Uniform Editorial 3-Column Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item, idx) => (
            <figure
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-[var(--salon-border)] bg-[var(--salon-surface)] flex flex-col"
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(idx)}
                aria-label={`Inspect ${item.title} full screen`}
                className="relative w-full aspect-[4/4.5] overflow-hidden cursor-pointer text-left block"
              >
                <SalonImage
                  src={item.image}
                  alt={item.alt}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/45 text-white backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Expand className="w-4 h-4" />
                </span>
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-[11.5px] text-white/80 mb-1">{item.serviceTag}</div>
                  <div className="font-display text-xl font-semibold leading-snug">
                    {item.title}
                  </div>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeLightboxItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeLightboxItem.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/88 backdrop-blur-xs"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[var(--salon-card)] border border-[var(--salon-border)] shadow-2xl grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close gallery preview"
              className="absolute top-3.5 right-3.5 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:col-span-7 bg-black/95 flex items-center justify-center max-h-[70vh] md:max-h-[82vh]">
              <SalonImage
                src={activeLightboxItem.image}
                alt={activeLightboxItem.alt}
                fallbackTitle={activeLightboxItem.title}
                className="w-full h-full object-contain max-h-[70vh] md:max-h-[82vh]"
              />
            </div>

            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[var(--salon-card)] text-[var(--salon-text)]">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[var(--salon-accent)]">
                  {activeLightboxItem.category}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight">
                  {activeLightboxItem.title}
                </h3>
                <p className="text-xs text-[var(--salon-muted)]">
                  {activeLightboxItem.serviceTag}
                </p>
                <p className="pt-2 text-sm leading-relaxed text-[var(--salon-secondary)]">
                  {activeLightboxItem.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--salon-border)] flex items-center justify-between">
                <span className="text-xs text-[var(--salon-muted)] tabular-nums">
                  {lightboxIndex + 1} / {visibleItems.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + visibleItems.length) %
                          visibleItems.length
                      )
                    }
                    aria-label="Previous photo"
                    className="p-2 rounded-lg border border-[var(--salon-border)] hover:border-[var(--salon-accent)] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % visibleItems.length)
                    }
                    aria-label="Next photo"
                    className="p-2 rounded-lg border border-[var(--salon-border)] hover:border-[var(--salon-accent)] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
