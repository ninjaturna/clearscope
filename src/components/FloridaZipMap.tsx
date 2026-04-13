import { ZipStatus } from '../data/zipLookup'

interface FloridaZipMapProps {
  highlightedZip?: string
  highlightedStatus?: ZipStatus
  onCtaClick?: () => void
}

// Florida territory dots — approximate lat/lon mapped to SVG viewport
// viewBox: 0 0 300 400 (portrait — FL panhandle top, Keys bottom)
const TERRITORY_DOTS = [
  // Live
  { id: 'nmb',       cx: 248, cy: 262, status: 'live'         as ZipStatus, label: 'North Miami Beach' },

  // Coming soon — Miami-Dade cluster
  { id: 'miami-bch', cx: 252, cy: 270, status: 'coming_soon'  as ZipStatus, label: 'Miami Beach' },
  { id: 'miami-dt',  cx: 245, cy: 275, status: 'coming_soon'  as ZipStatus, label: 'Downtown Miami' },
  { id: 'brickell',  cx: 244, cy: 280, status: 'coming_soon'  as ZipStatus, label: 'Brickell' },
  { id: 'cg',        cx: 238, cy: 284, status: 'coming_soon'  as ZipStatus, label: 'Coral Gables' },
  { id: 'coconut',   cx: 240, cy: 288, status: 'coming_soon'  as ZipStatus, label: 'Coconut Grove' },
  { id: 'aventura',  cx: 250, cy: 257, status: 'coming_soon'  as ZipStatus, label: 'Aventura' },
  { id: 'kendall',   cx: 235, cy: 292, status: 'coming_soon'  as ZipStatus, label: 'Kendall' },
  { id: 'hialeah',   cx: 240, cy: 268, status: 'coming_soon'  as ZipStatus, label: 'Hialeah' },

  // Coming soon — Broward cluster
  { id: 'hollywood', cx: 247, cy: 250, status: 'coming_soon'  as ZipStatus, label: 'Hollywood' },
  { id: 'ftlaud',    cx: 244, cy: 244, status: 'coming_soon'  as ZipStatus, label: 'Fort Lauderdale' },
  { id: 'pompano',   cx: 245, cy: 237, status: 'coming_soon'  as ZipStatus, label: 'Pompano Beach' },
  { id: 'sunrise',   cx: 238, cy: 244, status: 'coming_soon'  as ZipStatus, label: 'Sunrise' },
  { id: 'weston',    cx: 233, cy: 248, status: 'coming_soon'  as ZipStatus, label: 'Weston' },
  { id: 'crspr',     cx: 236, cy: 236, status: 'coming_soon'  as ZipStatus, label: 'Coral Springs' },
  { id: 'ppines',    cx: 237, cy: 253, status: 'coming_soon'  as ZipStatus, label: 'Pembroke Pines' },
  { id: 'miramar',   cx: 239, cy: 257, status: 'coming_soon'  as ZipStatus, label: 'Miramar' },
] as const

const DOT_COLOR: Record<ZipStatus, string> = {
  live:         '#39D353',
  coming_soon:  'rgba(57,211,83,0.30)',
  unserved:     'rgba(57,211,83,0.08)',
}

const DOT_GLOW: Record<ZipStatus, string> = {
  live:         '0 0 8px #39D353, 0 0 16px rgba(57,211,83,0.4)',
  coming_soon:  '0 0 4px rgba(57,211,83,0.2)',
  unserved:     'none',
}

export default function FloridaZipMap({
  highlightedStatus,
  onCtaClick,
}: FloridaZipMapProps) {
  return (
    <div className="relative w-full" style={{ background: '#0E0E0E' }}>
      {/* Map header */}
      <div className="px-6 pt-8 pb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.25em] mb-1">DEPLOYMENT MAP // FLORIDA</p>
          <p className="font-mono text-[9px] text-[#6B7280] uppercase">ENTER ANY ZIP TO CHECK YOUR STATUS</p>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { color: '#39D353',              label: 'LIVE NOW' },
            { color: 'rgba(57,211,83,0.35)', label: 'COMING SOON' },
            { color: 'rgba(57,211,83,0.12)', label: 'NOT YET SERVED' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-2 h-2 shrink-0" style={{ background: item.color }} />
              <span className="font-mono text-[8px] text-[#6B7280] uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Florida SVG */}
      <div className="relative px-4 pb-4">
        <svg
          viewBox="0 0 300 400"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ maxHeight: '320px' }}
          aria-label="Florida service territory map"
        >
          {/* Florida state outline — simplified path */}
          <path
            d="M30,40 L270,40 L270,100 L260,110 L260,180 L265,200 L268,230 L265,250 L262,265 L258,275 L252,285 L248,295 L245,310 L242,325 L238,340 L234,355 L228,368 L220,378 L210,385 L198,390 L188,385 L180,378 L172,368 L164,355 L158,340 L155,325 L154,310 L155,295 L158,280 L162,265 L168,250 L174,235 L178,218 L180,200 L182,180 L185,160 L188,140 L190,120 L192,100 L190,80 L185,65 L180,55 L170,48 L160,44 L150,42 L140,40 L30,40 Z"
            fill="rgba(57,211,83,0.04)"
            stroke="rgba(57,211,83,0.20)"
            strokeWidth="0.8"
          />

          {/* Keys outline — simplified */}
          <path
            d="M228,368 L222,374 L214,380 L206,384 L198,386 L192,384 L186,380 L180,376"
            fill="none"
            stroke="rgba(57,211,83,0.15)"
            strokeWidth="0.6"
          />

          {/* Grid overlay lines */}
          {[100, 140, 180, 220, 260, 300, 340, 380].map(y => (
            <line key={`h${y}`} x1={0} y1={y} x2={300} y2={y}
              stroke="rgba(61,74,59,0.08)" strokeWidth="0.5" />
          ))}
          {[50, 100, 150, 200, 250].map(x => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={400}
              stroke="rgba(61,74,59,0.08)" strokeWidth="0.5" />
          ))}

          {/* Territory dots */}
          {TERRITORY_DOTS.map(dot => (
            <g key={dot.id}>
              {/* Outer glow ring for live dots */}
              {dot.status === 'live' && (
                <circle
                  cx={dot.cx} cy={dot.cy} r={7}
                  fill="none"
                  stroke="rgba(57,211,83,0.20)"
                  strokeWidth="1"
                />
              )}
              {/* Main dot */}
              <circle
                cx={dot.cx}
                cy={dot.cy}
                r={dot.status === 'live' ? 4 : 2.5}
                fill={DOT_COLOR[dot.status]}
                style={{ filter: dot.status === 'live' ? DOT_GLOW.live : 'none' }}
              />
            </g>
          ))}

          {/* Highlighted user ZIP dot (if lookup ran and status=live) */}
          {highlightedStatus === 'live' && (
            <>
              {/* Pulse ring */}
              <circle cx={248} cy={262} r={10}
                fill="none" stroke="#39D353" strokeWidth="1.5"
                opacity={0.6}
              />
              {/* YOU ARE HERE label */}
              <text x={255} y={259}
                fill="#39D353"
                style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '6px' }}
              >
                YOU ARE HERE
              </text>
            </>
          )}

          {/* NMB label — always shown */}
          <text x={251} y={260}
            fill="rgba(57,211,83,0.70)"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '5.5px' }}
          >
            NMB
          </text>

          {/* Miami label */}
          <text x={232} y={278}
            fill="rgba(57,211,83,0.35)"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '5px' }}
          >
            MIAMI
          </text>

          {/* Fort Lauderdale label */}
          <text x={225} y={244}
            fill="rgba(57,211,83,0.35)"
            style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '5px' }}
          >
            FT LAUD
          </text>
        </svg>

        {/* Scan line overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(57,211,83,0.03) 1px, transparent 1px)',
            backgroundSize: '100% 6px',
          }}
        />
      </div>

      {/* Map bottom CTA strip */}
      <div
        className="mx-4 mb-6 p-5 flex flex-col gap-3"
        style={{ background: '#1C1B1B', borderTop: '2px solid #39D353' }}
      >
        <div className="flex items-start gap-3">
          <span className="w-2 h-2 bg-[#39D353] mt-1 shrink-0 animate-pulse" />
          <div>
            <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest font-bold">
              {highlightedStatus === 'live'
                ? 'YOUR ZIP IS LIVE — CLAIM YOUR SPOT'
                : highlightedStatus === 'coming_soon'
                ? 'COMING TO YOUR ZIP — GET FIRST ACCESS'
                : 'JOIN THE WAITLIST — ANY ZIP ACCEPTED'}
            </p>
            <p className="font-mono text-[9px] text-[#6B7280] mt-1">
              {highlightedStatus === 'live'
                ? 'You\'re in an active service area. Founding rate locked at $149.'
                : highlightedStatus === 'coming_soon'
                ? 'Sign up now and you\'ll be first to book when we launch in your area.'
                : 'Every signup outside our current territory tells us where to expand next.'}
            </p>
          </div>
        </div>
        <button
          onClick={onCtaClick}
          className="w-full bg-[#39D353] text-[#0D2010] py-4 font-mono text-[11px] font-bold uppercase tracking-widest"
        >
          {highlightedStatus === 'live' ? 'CLAIM MY SPOT →' : 'JOIN THE WAITLIST — FREE →'}
        </button>
      </div>
    </div>
  )
}
