import { useState } from 'react'
import { lookupZip, ZIP_STATUS_COPY, ZipStatus, ZipEntry } from '../data/zipLookup'

interface FloridaZipMapProps {
  onCtaClick?: () => void
  // Callback so WaitlistPage can sync its zip state with the map input
  onZipChange?: (zip: string, entry: ZipEntry | null) => void
}

// Florida state outline — viewBox 0 0 280 520
// Peninsula runs top-center to bottom-center, panhandle extends left at top.
const FL_PATH = `
  M 20,30
  L 240,30
  L 240,75
  L 228,88
  L 220,105
  L 218,125
  L 220,150
  L 224,175
  L 226,200
  L 228,225
  L 226,248
  L 222,268
  L 218,286
  L 214,302
  L 210,318
  L 206,335
  L 200,350
  L 194,364
  L 186,376
  L 176,385
  L 164,392
  L 152,395
  L 140,392
  L 128,385
  L 118,376
  L 110,364
  L 104,350
  L 100,335
  L 98,318
  L 98,302
  L 100,286
  L 104,268
  L 108,248
  L 110,225
  L 112,200
  L 114,175
  L 116,150
  L 116,125
  L 114,105
  L 108,88
  L 100,75
  L 100,30
  Z
`

// Keys — small chain below the peninsula tip
const KEYS_PATH = `
  M 152,395
  L 148,402
  L 140,410
  L 130,418
  L 118,424
  L 106,428
  L 94,430
`

// Territory dots — cx/cy in viewBox 0 0 280 520 coordinates
const DOTS: { id: string; cx: number; cy: number; status: ZipStatus; label: string }[] = [
  // LIVE
  { id: 'nmb',        cx: 186, cy: 356, status: 'live',        label: 'North Miami Beach' },

  // COMING SOON — Miami-Dade tight cluster around NMB
  { id: 'aventura',   cx: 185, cy: 348, status: 'coming_soon', label: 'Aventura' },
  { id: 'miami-bch',  cx: 192, cy: 362, status: 'coming_soon', label: 'Miami Beach' },
  { id: 'miami-dt',   cx: 183, cy: 366, status: 'coming_soon', label: 'Downtown Miami' },
  { id: 'brickell',   cx: 182, cy: 372, status: 'coming_soon', label: 'Brickell' },
  { id: 'cg',         cx: 176, cy: 375, status: 'coming_soon', label: 'Coral Gables' },
  { id: 'coconut',    cx: 178, cy: 380, status: 'coming_soon', label: 'Coconut Grove' },
  { id: 'hialeah',    cx: 178, cy: 362, status: 'coming_soon', label: 'Hialeah' },
  { id: 'kendall',    cx: 172, cy: 382, status: 'coming_soon', label: 'Kendall' },
  { id: 'cutler',     cx: 174, cy: 390, status: 'coming_soon', label: 'Cutler Bay' },

  // COMING SOON — Broward cluster above NMB
  { id: 'hollywood',  cx: 183, cy: 340, status: 'coming_soon', label: 'Hollywood' },
  { id: 'miramar',    cx: 178, cy: 344, status: 'coming_soon', label: 'Miramar' },
  { id: 'ppines',     cx: 174, cy: 340, status: 'coming_soon', label: 'Pembroke Pines' },
  { id: 'ftlaud',     cx: 181, cy: 330, status: 'coming_soon', label: 'Fort Lauderdale' },
  { id: 'sunrise',    cx: 174, cy: 330, status: 'coming_soon', label: 'Sunrise' },
  { id: 'weston',     cx: 169, cy: 338, status: 'coming_soon', label: 'Weston' },
  { id: 'pompano',    cx: 183, cy: 320, status: 'coming_soon', label: 'Pompano Beach' },
  { id: 'crspr',      cx: 172, cy: 318, status: 'coming_soon', label: 'Coral Springs' },
]

const DOT_FILL: Record<ZipStatus, string> = {
  live:        '#39D353',
  coming_soon: 'rgba(57,211,83,0.40)',
  unserved:    'rgba(57,211,83,0.10)',
}

export default function FloridaZipMap({ onCtaClick, onZipChange }: FloridaZipMapProps) {
  const [zip, setZip] = useState('')
  const [entry, setEntry] = useState<ZipEntry | null>(null)
  const [inputFocused, setInputFocused] = useState(false)

  const handleZipChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 5)
    setZip(clean)
    if (clean.length === 5) {
      const found = lookupZip(clean)
      setEntry(found)
      onZipChange?.(clean, found)
    } else {
      setEntry(null)
      onZipChange?.(clean, null)
    }
  }

  // ZIP_STATUS_COPY is imported but used only if needed for future expansion
  void ZIP_STATUS_COPY

  const city = entry?.city ?? 'North Miami Beach'

  const statusColor = !entry ? '#6B7280'
    : entry.status === 'live' ? '#39D353'
    : entry.status === 'coming_soon' ? 'rgba(57,211,83,0.6)'
    : '#6B7280'

  const statusText = !entry ? null
    : entry.status === 'live' ? `● LIVE — ${city}`
    : entry.status === 'coming_soon' ? `◎ COMING SOON — ${city}`
    : `○ NOT YET SERVED — ${city}`

  return (
    <div style={{ background: '#0E0E0E', width: '100%' }}>

      {/* ── ZIP LOOKUP INPUT ── top of component, full-width padding */}
      <div className="px-6 pt-8 pb-6">
        <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.25em] mb-5">
          DEPLOYMENT MAP // FLORIDA — ENTER YOUR ZIP
        </p>

        <div className="relative">
          <label className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest block mb-3">
            ZIP CODE — CHECK YOUR AREA
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            placeholder="ENTER ZIP CODE"
            onChange={e => handleZipChange(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            className="w-full bg-transparent text-white font-mono text-2xl py-3 px-0 placeholder-[#353534] tracking-widest"
            style={{
              borderBottom: `2px solid ${inputFocused || zip.length > 0 ? '#39D353' : 'rgba(61,74,59,0.40)'}`,
              outline: 'none',
              caretColor: '#39D353',
            }}
          />
          {/* Live status badge — directly below input */}
          <div className="h-7 flex items-center mt-3" style={{ minHeight: '28px' }}>
            {statusText ? (
              <span
                className="font-mono text-[11px] uppercase tracking-widest font-bold"
                style={{ color: statusColor }}
              >
                {statusText}
              </span>
            ) : (
              <span className="font-mono text-[10px] text-[#353534] uppercase tracking-widest">
                ENTER 5-DIGIT ZIP TO CHECK STATUS
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── FLORIDA SVG MAP ── full-width, no side padding */}
      <div className="relative w-full" style={{ background: '#0A0A0A' }}>

        {/* Legend — top-right overlay */}
        <div
          className="absolute top-4 right-4 z-10 flex flex-col gap-2"
          style={{ background: 'rgba(14,14,14,0.85)', padding: '10px 12px' }}
        >
          {[
            { color: '#39D353',              size: 8, label: 'LIVE NOW' },
            { color: 'rgba(57,211,83,0.45)', size: 5, label: 'COMING SOON' },
            { color: 'rgba(57,211,83,0.15)', size: 4, label: 'NOT YET SERVED' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <svg width={16} height={16} viewBox="0 0 16 16">
                <circle cx={8} cy={8} r={item.size / 2 + 1} fill={item.color} />
              </svg>
              <span className="font-mono text-[8px] text-[#6B7280] uppercase tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(57,211,83,0.025) 1px, transparent 1px)',
            backgroundSize: '100% 5px',
          }}
        />

        {/* Florida SVG — fills full component width */}
        <svg
          viewBox="0 0 280 520"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', display: 'block', maxHeight: '480px' }}
          aria-label="Florida service territory map"
        >
          {/* Grid lines */}
          {[80, 160, 240, 320, 400, 480].map(y => (
            <line key={`h${y}`} x1={0} y1={y} x2={280} y2={y}
              stroke="rgba(61,74,59,0.12)" strokeWidth="0.4" />
          ))}
          {[70, 140, 210].map(x => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={520}
              stroke="rgba(61,74,59,0.12)" strokeWidth="0.4" />
          ))}

          {/* Florida state fill */}
          <path
            d={FL_PATH}
            fill="rgba(57,211,83,0.04)"
            stroke="rgba(57,211,83,0.25)"
            strokeWidth="1"
            strokeLinejoin="round"
          />

          {/* Keys */}
          <path
            d={KEYS_PATH}
            fill="none"
            stroke="rgba(57,211,83,0.18)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />

          {/* Territory dots */}
          {DOTS.map(dot => (
            <g key={dot.id}>
              {dot.status === 'live' && (
                <>
                  <circle cx={dot.cx} cy={dot.cy} r={16}
                    fill="rgba(57,211,83,0.05)" />
                  <circle cx={dot.cx} cy={dot.cy} r={12}
                    fill="none" stroke="rgba(57,211,83,0.20)" strokeWidth="1" />
                </>
              )}
              <circle
                cx={dot.cx}
                cy={dot.cy}
                r={dot.status === 'live' ? 6 : 3.5}
                fill={DOT_FILL[dot.status]}
              />
            </g>
          ))}

          {/* 'YOU ARE HERE' marker — shown when user's ZIP is live */}
          {entry?.status === 'live' && (
            <g>
              <circle cx={186} cy={356} r={20}
                fill="none" stroke="rgba(57,211,83,0.25)" strokeWidth="1.5" />
              <text
                x={196} y={348}
                fill="#39D353"
                fontSize="6.5"
                fontFamily="IBM Plex Mono, monospace"
                letterSpacing="0.05em"
              >
                YOU ARE HERE
              </text>
            </g>
          )}

          {/* Coming-soon marker */}
          {entry?.status === 'coming_soon' && (
            <text
              x={155} y={310}
              fill="rgba(57,211,83,0.50)"
              fontSize="6"
              fontFamily="IBM Plex Mono, monospace"
              letterSpacing="0.05em"
            >
              YOUR AREA: COMING SOON
            </text>
          )}

          {/* Fixed labels */}
          <text x={189} y={353}
            fill="rgba(57,211,83,0.80)"
            fontSize="6"
            fontFamily="IBM Plex Mono, monospace"
          >NMB</text>

          <text x={163} y={373}
            fill="rgba(57,211,83,0.35)"
            fontSize="5.5"
            fontFamily="IBM Plex Mono, monospace"
          >MIAMI</text>

          <text x={165} y={325}
            fill="rgba(57,211,83,0.30)"
            fontSize="5.5"
            fontFamily="IBM Plex Mono, monospace"
          >FT LAUD</text>
        </svg>
      </div>

      {/* ── MAP BOTTOM CTA STRIP ── */}
      <div
        className="px-4 py-5 flex flex-col gap-3"
        style={{ background: '#1C1B1B', borderTop: '2px solid #39D353' }}
      >
        <div className="flex items-start gap-3">
          <span className="w-2 h-2 bg-[#39D353] mt-0.5 shrink-0 animate-pulse" />
          <div>
            <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest font-bold">
              {!entry
                ? 'JOIN THE WAITLIST — ANY ZIP ACCEPTED'
                : entry.status === 'live'
                ? 'YOUR ZIP IS LIVE — CLAIM YOUR SPOT'
                : entry.status === 'coming_soon'
                ? `COMING TO ${city.toUpperCase()} — GET FIRST ACCESS`
                : `YOU'RE THE FIRST IN ${city.toUpperCase()}`}
            </p>
            <p className="font-mono text-[9px] text-[#6B7280] mt-1">
              {!entry
                ? 'Every signup outside our current territory tells us where to expand next.'
                : entry.status === 'live'
                ? "You're in an active service area. Founding rate locked at $149."
                : entry.status === 'coming_soon'
                ? "Sign up now and you'll be first to book when we launch in your area."
                : 'Your ZIP becomes a demand signal. When enough neighbors sign up, we launch there next.'}
            </p>
          </div>
        </div>
        <button
          onClick={onCtaClick}
          className="w-full bg-[#39D353] text-[#0D2010] py-4 font-mono text-[11px] font-bold uppercase tracking-widest"
        >
          {!entry || entry.status !== 'live'
            ? 'JOIN THE WAITLIST — FREE →'
            : 'CLAIM MY EARLY ACCESS SPOT →'}
        </button>
      </div>
    </div>
  )
}
