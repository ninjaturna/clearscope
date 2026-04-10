import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ClearScope Brand Identity System v1.1
        // Scope Black — page canvas
        'cs-bg':          '#141414',
        // Level 1 sections
        'cs-section':     '#1C1B1B',
        // Level 2 cards
        'cs-card':        '#2A2A2A',
        // Document White — content surfaces
        'cs-surface':     '#F0EDE6',
        // Scope Green — ONLY accent color
        'cs-green':       '#39D353',
        // Text on Scope Green buttons
        'cs-green-text':  '#0D2010',
        // Body text on dark surfaces
        'cs-text':        '#E8E4DC',
        // Body text on light surfaces
        'cs-text-dark':   '#1A1A1A',
        // Muted / secondary text
        'cs-muted':       '#6B7280',
        // Ghost border
        'cs-border':      'rgba(61,74,59,0.20)',
        // Error / diagnosis red
        'cs-red':         '#EF4444',
        // Outline variant
        'cs-outline':     '#3D4A3B',
      },
      fontFamily: {
        // Headlines — all h1-h3, CTAs, display
        headline: ['Syne', 'sans-serif'],
        // Body — residential pages
        body:     ['Inter', 'sans-serif'],
        // Body — commercial / operator pages
        pro:      ['IBM Plex Sans', 'sans-serif'],
        // Data, labels, prices, mono elements
        mono:     ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        // Zero radius everywhere — no exceptions
        none:    '0px',
        DEFAULT: '0px',
        sm:      '0px',
        md:      '0px',
        lg:      '0px',
        xl:      '0px',
        '2xl':   '0px',
        full:    '0px',
      },
      boxShadow: {
        // Scope Green ambient glow — only allowed shadow
        'cs-glow': '0 0 24px rgba(57, 211, 83, 0.12)',
        // No soft shadows — ever
      },
    },
  },
  plugins: [],
} satisfies Config
