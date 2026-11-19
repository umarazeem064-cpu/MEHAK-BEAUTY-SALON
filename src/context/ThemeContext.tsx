import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEME_PRESETS, type ThemePreset } from '../data/salonData';

interface ThemeContextValue {
  activePresetId: string;
  customAccent: string;
  customIsDark: boolean;
  isDark: boolean;
  activeLabel: string;
  selectPreset: (presetId: string) => void;
  applyCustomColor: (hex: string, darkBase: boolean) => void;
  toggleDarkLightQuick: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'mehak_salon_color_mode_v1';

interface StoredTheme {
  presetId: string;
  customAccent: string;
  customIsDark: boolean;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return { r: 150, g: 114, b: 55 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function getAccessibleForeground(hex: string): string {
  return getRelativeLuminance(hex) > 0.36 ? '#121212' : '#FFFFFF';
}

function adjustHexBrightness(hex: string, delta: number): string {
  const { r, g, b } = hexToRgb(hex);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const nr = clamp(r + delta);
  const ng = clamp(g + delta);
  const nb = clamp(b + delta);
  return `#${[nr, ng, nb].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function mixHex(hexA: string, hexB: string, weightB: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const mix = (c1: number, c2: number) =>
    Math.round(c1 * (1 - weightB) + c2 * weightB)
      .toString(16)
      .padStart(2, '0');
  return `#${mix(a.r, b.r)}${mix(a.g, b.g)}${mix(a.b, b.b)}`;
}

function applyTokensToDocument(
  tokens: ThemePreset['tokens'],
  isDark: boolean
): void {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.style.setProperty('--salon-bg', tokens.bg);
  root.style.setProperty('--salon-surface', tokens.surface);
  root.style.setProperty('--salon-card', tokens.card);
  root.style.setProperty('--salon-text', tokens.text);
  root.style.setProperty('--salon-secondary', tokens.secondary);
  root.style.setProperty('--salon-muted', tokens.muted);
  root.style.setProperty('--salon-border', tokens.border);
  root.style.setProperty('--salon-accent', tokens.accent);
  root.style.setProperty('--salon-accent-soft', tokens.accentSoft);
  root.style.setProperty('--salon-accent-fg', tokens.accentFg);
  root.style.setProperty('--salon-cta', tokens.cta);
  root.style.setProperty('--salon-cta-hover', tokens.ctaHover);
  root.style.setProperty('--salon-cta-fg', tokens.ctaFg);
  root.style.setProperty('--salon-ring', tokens.ring);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [activePresetId, setActivePresetId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StoredTheme;
        if (parsed.presetId) return parsed.presetId;
      }
    } catch {
      // Fall back to default Pure White mode
    }
    return 'white';
  });

  const [customAccent, setCustomAccent] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StoredTheme;
        if (parsed.customAccent) return parsed.customAccent;
      }
    } catch {
      // Ignore storage error
    }
    return '#967237';
  });

  const [customIsDark, setCustomIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as StoredTheme;
        return Boolean(parsed.customIsDark);
      }
    } catch {
      // Ignore storage error
    }
    return false;
  });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const activePreset = THEME_PRESETS.find((p) => p.id === activePresetId);
  const isDark =
    activePresetId === 'custom'
      ? customIsDark
      : activePreset?.isDark ?? false;

  const activeLabel =
    activePresetId === 'custom'
      ? `Custom ${customIsDark ? 'Dark' : 'White'}`
      : activePreset?.name ?? 'Pure White';

  useEffect(() => {
    if (activePresetId === 'custom') {
      const fg = getAccessibleForeground(customAccent);
      const hover = customIsDark
        ? adjustHexBrightness(customAccent, 18)
        : adjustHexBrightness(customAccent, -18);
      const tokens: ThemePreset['tokens'] = customIsDark
        ? {
            bg: '#0C0C0E',
            surface: '#151519',
            card: '#1C1C22',
            text: '#F7F6F3',
            secondary: '#D4D2CC',
            muted: '#9D9B94',
            border: '#2B2B33',
            accent: customAccent,
            accentSoft: mixHex('#151519', customAccent, 0.22),
            accentFg: fg,
            cta: customAccent,
            ctaHover: hover,
            ctaFg: fg,
            ring: customAccent,
          }
        : {
            bg: '#FFFFFF',
            surface: mixHex('#F8F8F6', customAccent, 0.045),
            card: '#FFFFFF',
            text: '#141413',
            secondary: '#3E3E3B',
            muted: '#65645E',
            border: mixHex('#E5E4DF', customAccent, 0.08),
            accent: customAccent,
            accentSoft: mixHex('#FFFFFF', customAccent, 0.11),
            accentFg: fg,
            cta: customAccent,
            ctaHover: hover,
            ctaFg: fg,
            ring: customAccent,
          };
      applyTokensToDocument(tokens, customIsDark);
    } else {
      const preset =
        THEME_PRESETS.find((p) => p.id === activePresetId) ?? THEME_PRESETS[0];
      applyTokensToDocument(preset.tokens, preset.isDark);
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          presetId: activePresetId,
          customAccent,
          customIsDark,
        } satisfies StoredTheme)
      );
    } catch {
      // Ignore storage quota errors
    }
  }, [activePresetId, customAccent, customIsDark]);

  const selectPreset = (presetId: string) => {
    setActivePresetId(presetId);
  };

  const applyCustomColor = (hex: string, darkBase: boolean) => {
    setCustomAccent(hex);
    setCustomIsDark(darkBase);
    setActivePresetId('custom');
  };

  const toggleDarkLightQuick = () => {
    if (isDark) {
      setActivePresetId('white');
    } else {
      setActivePresetId('obsidian');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        activePresetId,
        customAccent,
        customIsDark,
        isDark,
        activeLabel,
        selectPreset,
        applyCustomColor,
        toggleDarkLightQuick,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useSalonTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useSalonTheme must be used within a ThemeProvider');
  }
  return ctx;
}
