import { useEffect } from 'react';
import { Check, Moon, Palette, RotateCcw, Sun, X } from 'lucide-react';
import { CUSTOM_SPECTRUM_SWATCHES, THEME_PRESETS } from '../data/salonData';
import { useSalonTheme } from '../context/ThemeContext';

/**
 * White Mode & All-Colors Mode Studio Drawer
 * Lets visitors keep the signature Pure White default or switch seamlessly
 * across curated luxury themes and any custom full-spectrum accent color.
 */
export function ColorModeDrawer() {
  const {
    activePresetId,
    customAccent,
    customIsDark,
    selectPreset,
    applyCustomColor,
    drawerOpen,
    setDrawerOpen,
  } = useSalonTheme();

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, setDrawerOpen]);

  return (
    <>
      {/* Subtle bottom-right floating palette launcher (respects mobile sticky cap) */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open White and All-Colors Theme Studio"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-full border border-[var(--salon-border)] bg-[var(--salon-card)] text-[var(--salon-text)] shadow-lg hover:border-[var(--salon-accent)] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
      >
        <Palette className="w-4 h-4 text-[var(--salon-accent)] shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">Color Modes</span>
      </button>

      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-labelledby="color-mode-studio-title"
        >
          {/* Scrim */}
          <div
            className="fixed inset-0 bg-black/45 transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-md h-full overflow-y-auto bg-[var(--salon-card)] text-[var(--salon-text)] border-l border-[var(--salon-border)] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-7">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--salon-border)]">
                <div>
                  <p className="text-xs font-medium text-[var(--salon-accent)] mb-1">
                    White Mode &amp; All-Colors Studio
                  </p>
                  <h2
                    id="color-mode-studio-title"
                    className="font-display text-3xl font-semibold leading-tight text-[var(--salon-text)]"
                  >
                    Salon Appearance
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close Color Modes"
                  className="p-2 rounded-lg border border-[var(--salon-border)] text-[var(--salon-muted)] hover:text-[var(--salon-text)] hover:border-[var(--salon-accent)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Curated Luxury Presets */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans-body text-sm font-semibold text-[var(--salon-text)]">
                    Curated Luxury Palettes
                  </h3>
                  <button
                    type="button"
                    onClick={() => selectPreset('white')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--salon-muted)] hover:text-[var(--salon-text)] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset to Pure White
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {THEME_PRESETS.map((preset) => {
                    const selected = activePresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => selectPreset(preset.id)}
                        className={`w-full flex items-center justify-between gap-4 p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                          selected
                            ? 'border-[var(--salon-accent)] bg-[var(--salon-accent-soft)]'
                            : 'border-[var(--salon-border)] bg-[var(--salon-bg)] hover:border-[var(--salon-accent)]'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span
                            className="w-9 h-9 rounded-lg border border-black/15 shrink-0 flex items-center justify-center"
                            style={{ backgroundColor: preset.swatchBg }}
                            aria-hidden="true"
                          >
                            <span
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: preset.swatchAccent }}
                            />
                          </span>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-[var(--salon-text)] truncate">
                              {preset.name}
                            </div>
                            <div className="text-xs text-[var(--salon-muted)] truncate">
                              {preset.subtitle}
                            </div>
                          </div>
                        </div>
                        {selected && (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--salon-accent)] text-[var(--salon-accent-fg)] shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* All-Colors Custom Spectrum Builder */}
              <div className="pt-5 border-t border-[var(--salon-border)] space-y-4">
                <div>
                  <h3 className="font-sans-body text-sm font-semibold text-[var(--salon-text)]">
                    All-Colors Custom Accent
                  </h3>
                  <p className="text-xs text-[var(--salon-muted)] mt-1">
                    Pick any color across the full spectrum paired with Pure White or Obsidian Dark canvas.
                  </p>
                </div>

                {/* Base Canvas Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[var(--salon-surface)] border border-[var(--salon-border)]">
                  <button
                    type="button"
                    onClick={() => applyCustomColor(customAccent, false)}
                    className={`inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activePresetId === 'custom' && !customIsDark
                        ? 'bg-[var(--salon-card)] text-[var(--salon-text)] shadow-sm'
                        : 'text-[var(--salon-muted)] hover:text-[var(--salon-text)]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    White Canvas
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCustomColor(customAccent, true)}
                    className={`inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      activePresetId === 'custom' && customIsDark
                        ? 'bg-[var(--salon-card)] text-[var(--salon-text)] shadow-sm'
                        : 'text-[var(--salon-muted)] hover:text-[var(--salon-text)]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    Dark Canvas
                  </button>
                </div>

                {/* Quick Luxury Swatches */}
                <div className="grid grid-cols-4 gap-2.5">
                  {CUSTOM_SPECTRUM_SWATCHES.map((swatch) => {
                    const isCurrent =
                      activePresetId === 'custom' &&
                      customAccent.toLowerCase() === swatch.hex.toLowerCase();
                    return (
                      <button
                        key={swatch.hex}
                        type="button"
                        onClick={() => applyCustomColor(swatch.hex, customIsDark)}
                        title={swatch.label}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          isCurrent
                            ? 'border-[var(--salon-accent)] bg-[var(--salon-accent-soft)]'
                            : 'border-[var(--salon-border)] hover:border-[var(--salon-accent)]'
                        }`}
                      >
                        <span
                          className="w-6 h-6 rounded-full border border-black/15"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="text-[11px] leading-tight text-[var(--salon-muted)] truncate w-full">
                          {swatch.label.split(' ')[1] ?? swatch.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Full Spectrum Native Color Picker */}
                <label className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--salon-border)] bg-[var(--salon-surface)] cursor-pointer">
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold text-[var(--salon-text)]">
                      Full Spectrum Color Picker
                    </span>
                    <span className="block text-[11px] text-[var(--salon-muted)] tabular-nums uppercase">
                      Active Hex: {customAccent}
                    </span>
                  </div>
                  <input
                    type="color"
                    value={customAccent}
                    onChange={(e) => applyCustomColor(e.target.value, customIsDark)}
                    aria-label="Choose custom salon theme color"
                    className="w-10 h-10 rounded-lg border border-[var(--salon-border)] cursor-pointer bg-transparent p-0.5 shrink-0"
                  />
                </label>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[var(--salon-border)]">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-full py-3 px-5 rounded-lg text-sm font-medium bg-[var(--salon-cta)] text-[var(--salon-cta-fg)] hover:bg-[var(--salon-cta-hover)] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
