import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ScanOverlay from '../components/ScanOverlay'
import StickyBar from '../components/StickyBar'
import FloridaZipMap from '../components/FloridaZipMap'
import { lookupZip, ZIP_STATUS_COPY, ZipEntry } from '../data/zipLookup'

type PropertyType = 'residential' | 'commercial'
type Situation = 'slow-drain' | 'got-quote' | 'buying-selling' | 'planning-ahead'
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistPage() {
  const [propertyType, setPropertyType] = useState<PropertyType>('residential')
  const [situations, setSituations] = useState<Situation[]>([])
  const [email, setEmail] = useState('')
  const [zip, setZip] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [zipEntry, setZipEntry] = useState<ZipEntry | null>(null)

  const toggleSituation = (s: Situation) =>
    setSituations(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('loading')
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyEojhBboxKI2-3oHCwK_QQlZOWOVvaLsV-JRmJZ2DGEzn0q2wgDZUHYWSfNvj0AwUI/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'clearscope_waitlist',
          email,
          zip,
          zipStatus: zipEntry?.status ?? 'unknown',
          city: zipEntry?.city ?? '',
          propertyType,
          situations,
          timestamp: new Date().toISOString(),
          source: 'clearscope.pro/waitlist',
        }),
      })
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  const scrollToForm = () =>
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })

  const situationOptions: { id: Situation; label: string }[] = [
    { id: 'slow-drain',     label: 'SLOW DRAIN' },
    { id: 'got-quote',      label: 'GOT A REPAIR QUOTE' },
    { id: 'buying-selling', label: 'BUYING / SELLING' },
    { id: 'planning-ahead', label: 'JUST PLANNING AHEAD' },
  ]

  return (
    <div className="bg-[#141414] min-h-screen text-[#E8E4DC] font-body pb-20">

      {/* ── NAV ── */}
      <Nav ctaLabel="JOIN WAITLIST" onCtaClick={scrollToForm} />

      {/* ── ANNOUNCEMENT BANNER ── */}
      <div className="mt-16 bg-[#1C1B1B] py-3 px-4 flex items-center gap-3 overflow-hidden" style={{ borderBottom: '1px solid rgba(57,211,83,0.15)' }}>
        <div className="w-2 h-2 bg-[#39D353] animate-pulse shrink-0" />
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#39D353] uppercase whitespace-nowrap">
          NORTH MIAMI BEACH LAUNCH // NOW ACCEPTING EARLY SIGNUPS
        </p>
      </div>

      {/* ── HERO ── */}
      <header className="px-6 py-12 relative overflow-hidden">
        {/* Background pipe image */}
        <div className="absolute inset-0 z-0 opacity-15 grayscale scale-110">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAU9L0wY6433eA69S0cM9oCR7wEYZog43my76s6QG9N0ExWUDD2uYYogu98yRdkF-LL_jlqQiMNXDeCc3KaPeWLo5eKRM2kX8C5S_0QyxuUIwAhUcykcd3zQ00zB1fjWBu9jbblqLBxTFGHA_MCIaoSJW6SkwG2WgaSxa3owxGxoAziocSJlnY4gzxrWLJvdgaWgIp8bCMvv_5Y0C7h-27oYllRMXBS_9lvo9O1L8FqAJEGNPnlS_bmqBSc0TxKaBH11NfO6SuwND0"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* Grid texture */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(61,74,59,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(61,74,59,0.12) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#39D353]" />
            <span className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.18em]">COMING TO NORTH MIAMI BEACH</span>
          </div>
          {/* Hero headline */}
          <h1 className="font-headline text-[42px] leading-[0.9] text-white mb-6 uppercase tracking-tighter">
            CLEARSCOPE IS TAKING APPOINTMENTS.
          </h1>
          {/* Sub-headline */}
          <p className="text-[#9CA3AF] font-body text-base mb-8 leading-relaxed max-w-[320px]">
            $149 sewer camera inspections. No repairs. No agenda. Just video proof of what's in your pipes.
          </p>
          {/* Primary CTA */}
          <button
            onClick={scrollToForm}
            className="w-full bg-[#39D353] text-[#0D2010] py-5 font-headline font-extrabold text-lg uppercase tracking-tight active:scale-[0.98]"
          >
            CLAIM MY EARLY ACCESS SPOT
          </button>
          {/* Tagline */}
          <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-[0.2em] text-center mt-4">
            WE LOOK. WE DON'T TOUCH.
          </p>
          {/* Orientation */}
          <p className="font-body text-[12px] text-[#6B7280] text-center mt-2">
            We send a camera through your sewer line, record everything we find, and deliver the video — same day. We don't sell repairs.
          </p>
        </div>
      </header>

      {/* ── SOCIAL PROOF GRID ── */}
      <section className="grid grid-cols-3 bg-[#141414]" style={{ borderTop: '1px solid rgba(61,74,59,0.20)', borderBottom: '1px solid rgba(61,74,59,0.20)' }}>
        {[
          { value: '[0]',  label: 'Early Signups' },
          { value: '$149', label: 'Founding Rate' },
          { value: '30m',  label: 'Inspection Time' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 flex flex-col gap-1 ${i < 2 ? 'border-r border-[rgba(61,74,59,0.20)]' : ''}`}>
            <span className="font-mono text-[#39D353] text-xl font-bold">{stat.value}</span>
            <span className="font-mono text-[8px] text-[#6B7280] uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </section>

      {/* ── FOUNDER STORY ── */}
      <section className="bg-[#141414] py-16 px-6">
        <span className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.3em] mb-4 block">WHY CLEARSCOPE EXISTS</span>
        <h2 className="font-headline text-3xl text-white mb-8 leading-none uppercase">The $8,000 Kink</h2>
        {/* Cost comparison */}
        <div className="space-y-4">
          <div className="bg-[#1C1B1B] p-6 flex justify-between items-end" style={{ borderLeft: '4px solid #EF4444' }}>
            <div>
              <p className="font-mono text-[10px] text-[#6B7280] mb-2 uppercase">PLUMBER'S DIAGNOSIS</p>
              <p className="font-headline text-4xl text-[#EF4444]">$8,000</p>
              <p className="font-mono text-[10px] text-[#6B7280] mt-1">Full cast iron line replacement</p>
            </div>
            <span className="material-symbols-outlined text-[#EF4444] text-3xl">emergency_home</span>
          </div>
          <div className="flex justify-center py-1">
            <span className="material-symbols-outlined text-[rgba(255,255,255,0.15)] text-2xl">keyboard_double_arrow_down</span>
          </div>
          <div className="bg-[#1C1B1B] p-6 flex justify-between items-end" style={{ borderLeft: '4px solid #39D353' }}>
            <div>
              <p className="font-mono text-[10px] text-[#6B7280] mb-2 uppercase">CAMERA FINDING</p>
              <p className="font-headline text-4xl text-[#39D353]">$180</p>
              <p className="font-mono text-[10px] text-[#6B7280] mt-1">Kinked flexible hose. Handyman fix.</p>
            </div>
            <span className="material-symbols-outlined text-[#39D353] text-3xl">verified</span>
          </div>
        </div>
        {/* Story body — LOCKED COPY — do not paraphrase */}
        <p className="mt-8 text-[#9CA3AF] font-body text-sm leading-relaxed">
          A plumber diagnosed our founder's slow drain as corroded cast iron pipes — full sewer line replacement,
          $8,000. A camera inspection revealed the real cause: a flexible hose under the standing tub, kinked
          because it was installed three inches too long. A handyman fixed it for under $200. That's why
          ClearScope exists — because a camera shows you what's actually there, not what someone hopes to sell you.
        </p>
        <p className="mt-4 text-[#6B7280] font-body text-sm italic">
          The handyman charged $180. It's Tuesday in this industry.
        </p>
      </section>

      {/* ── PIPE SCAN IMAGE WITH OVERLAY ── */}
      <section className="relative w-full aspect-square bg-black overflow-hidden" style={{ borderTop: '1px solid rgba(61,74,59,0.20)', borderBottom: '1px solid rgba(61,74,59,0.20)' }}>
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIJmL2_kEOF72KqY0eP6Q6mtrNc3Zxc4XGRUt9ZNu2-faXnePp8m-EOSAnAVxFT73SRGOuQIw0hcZ1t0SoT8jYIAlTQRABLgdpaJEOwvZVuxRKoAaJW1xUZgkYlD0u5zRkByF4ce729v_oi0mIJKNXxZEnsLH05Zsj1_2HPefM6f27UY0LVsvpKUiXXmd1Rlqo2b09R45KYp1NjEQWEW-6iXG9Z9GKXae1oecgEL0jyBZw1y_wRW81TGHHPiSkR_BfNWmoBZqnL5X8"
          alt="Pipe camera inspection footage — ClearScope"
          className="w-full h-full object-cover opacity-60 grayscale brightness-75 contrast-125"
        />
        <ScanOverlay />
      </section>

      {/* ── WHAT YOU GET ── */}
      <section className="bg-[#F0EDE6] py-16 px-6">
        <h2 className="font-headline text-3xl text-[#1A1A1A] mb-10 leading-none uppercase">What $149 gets you</h2>
        <div className="space-y-10">
          {[
            { n: '01', title: 'Book in 60 seconds',  body: 'Same-day or next-day appointments in North Miami Beach.' },
            { n: '02', title: '30 minutes on-site',   body: 'Our camera traverses up to 200ft of sewer line. Zero damage to landscaping.' },
            { n: '03', title: 'Video by end of day',  body: 'Full inspection video delivered to your Google Drive. Yours to keep, share with any plumber, or file with your insurance claim.' },
          ].map(step => (
            <div key={step.n} className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#1A1A1A] opacity-20">{step.n}</span>
              <div>
                <h3 className="font-headline font-bold text-[#1A1A1A] uppercase mb-2">{step.title}</h3>
                <p className="text-[#1A1A1A] opacity-70 text-sm">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIGNUP FORM ── */}
      <section className="bg-[#141414] py-16 px-6" id="waitlist-form">
        <div className="text-center mb-10">
          {(() => {
            const copy = ZIP_STATUS_COPY[zipEntry?.status ?? 'live']
            return (
              <>
                <h2 className="font-headline text-3xl text-white mb-2 uppercase">{copy.headline}</h2>
                <p className="font-mono text-[10px] text-[#39D353] tracking-widest uppercase">
                  {copy.subhead.replace('{city}', zipEntry?.city ?? 'North Miami Beach')}
                </p>
              </>
            )
          })()}
        </div>

        {submitState === 'success' ? (
          <div className="bg-[#1C1B1B] p-8 text-center" style={{ borderTop: '3px solid #39D353' }}>
            <span className="material-symbols-outlined text-[#39D353] text-5xl mb-4 block">check_circle</span>
            {(() => {
              const copy = ZIP_STATUS_COPY[zipEntry?.status ?? 'live']
              return (
                <>
                  <h3 className="font-headline text-2xl text-white uppercase mb-2">{copy.successH}</h3>
                  <p className="font-body text-[#9CA3AF] text-sm">{copy.successBody.replace('{city}', zipEntry?.city ?? 'North Miami Beach')}</p>
                </>
              )
            })()}
            <p className="font-mono text-[10px] text-[#6B7280] mt-4 uppercase tracking-widest">No payment required. Unsubscribe anytime.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" style={{ background: '#1C1B1B', padding: '24px', borderTop: '3px solid #39D353' }}>

            {/* Email */}
            <div>
              <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-2">
                Email Address <span className="text-[#39D353]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-transparent text-white font-mono text-sm py-3 px-0 placeholder-[#6B7280]"
                style={{ borderBottom: '1px solid rgba(61,74,59,0.40)', outline: 'none' }}
                onFocus={e => { e.currentTarget.style.borderBottomColor = '#39D353' }}
                onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(61,74,59,0.40)' }}
              />
            </div>

            {/* ZIP + Property Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-2">
                  ZIP Code <span className="text-[#39D353]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={e => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 5)
                    setZip(val)
                    if (val.length === 5) setZipEntry(lookupZip(val))
                    else setZipEntry(null)
                  }}
                  placeholder="33160"
                  className="w-full bg-transparent text-white font-mono text-sm py-3 px-0 placeholder-[#6B7280]"
                  style={{ borderBottom: '1px solid rgba(61,74,59,0.40)', outline: 'none' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = '#39D353' }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(61,74,59,0.40)' }}
                />
                {zipEntry && (
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="w-2 h-2 shrink-0"
                      style={{ background: zipEntry.status === 'live' ? '#39D353' : zipEntry.status === 'coming_soon' ? 'rgba(57,211,83,0.5)' : '#353534' }}
                    />
                    <span className="font-mono text-[9px] uppercase" style={{ color: zipEntry.status === 'live' ? '#39D353' : '#6B7280' }}>
                      {zipEntry.status === 'live' ? `LIVE — ${zipEntry.city}` : zipEntry.status === 'coming_soon' ? `COMING SOON — ${zipEntry.city}` : `NOT YET SERVED — ${zipEntry.city}`}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-2">
                  Property Type <span className="text-[#39D353]">*</span>
                </label>
                <div className="flex h-[52px]">
                  {(['residential', 'commercial'] as PropertyType[]).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className="flex-1 font-mono text-[10px] font-bold uppercase transition-none"
                      style={{
                        background: propertyType === type ? '#39D353' : '#2A2A2A',
                        color: propertyType === type ? '#0D2010' : 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(61,74,59,0.30)',
                      }}
                    >
                      {type === 'residential' ? 'RES' : 'COM'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Situation multi-select */}
            <div>
              <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-3">
                What describes your situation? <span className="text-[#6B7280]">(optional)</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {situationOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleSituation(opt.id)}
                    className="py-3 px-2 font-mono text-[10px] font-bold uppercase text-left transition-none"
                    style={{
                      background: situations.includes(opt.id) ? '#39D353' : '#2A2A2A',
                      color: situations.includes(opt.id) ? '#0D2010' : 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(61,74,59,0.30)',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitState === 'loading'}
              className="w-full bg-[#39D353] text-[#0D2010] py-5 font-headline font-extrabold text-lg uppercase tracking-tight disabled:opacity-60"
            >
              {submitState === 'loading' ? 'SUBMITTING...' : ZIP_STATUS_COPY[zipEntry?.status ?? 'live'].cta}
            </button>

            <p className="font-mono text-[9px] text-[#6B7280] text-center uppercase tracking-widest">
              No payment required. Unsubscribe anytime. Your information is never shared.
            </p>
          </form>
        )}
      </section>

      {/* ── BENEFIT CARDS ── */}
      <section className="px-6 py-12 space-y-4 bg-[#141414]">
        {[
          { label: 'PRIORITY BOOKING',    body: 'First on the list gets first appointment slots when we open for bookings.' },
          { label: 'FOUNDING RATE LOCKED', body: 'Early signups are locked at $149 — the lowest ClearScope will ever charge.' },
          { label: 'ZERO OBLIGATION',      body: "No payment to sign up. You book and pay only when you're ready." },
        ].map(card => (
          <div key={card.label} className="bg-[#1C1B1B] p-5" style={{ borderLeft: '2px solid #39D353' }}>
            <h4 className="font-mono text-xs text-[#39D353] mb-1 uppercase font-bold">{card.label}</h4>
            <p className="text-xs text-[#9CA3AF]">{card.body}</p>
          </div>
        ))}
      </section>

      {/* ── COMMERCIAL CALLOUT ── */}
      <section className="px-6 py-8 bg-[#1C1B1B]" style={{ borderLeft: '3px solid #39D353' }}>
        <p className="font-mono text-[10px] text-[#39D353] uppercase mb-2">COMMERCIAL PROPERTIES</p>
        <h3 className="font-headline text-xl text-white uppercase mb-2">Restaurants. HOAs. Property Managers.</h3>
        <p className="text-[#9CA3AF] font-body text-sm mb-4">
          ClearScope Commercial offers documented pipe inspections for DERM compliance, insurance claims, and property due diligence. Starting at $275.
        </p>
        <a href="mailto:info@clearscope.pro" className="font-mono text-[11px] text-[#39D353] uppercase tracking-widest">
          COMMERCIAL INQUIRIES →
        </a>
      </section>

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── DEPLOYMENT MAP ── */}
      <FloridaZipMap
        highlightedZip={zip.length === 5 ? zip : undefined}
        highlightedStatus={zipEntry?.status}
        onCtaClick={scrollToForm}
      />

      {/* ── FINAL CTA ── */}
      <section className="bg-[#0E0E0E] py-24 px-6 text-center">
        <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.3em] mb-4">NORTH MIAMI BEACH // 33160 // 33162</p>
        <h2 className="font-headline text-4xl text-white mb-8 uppercase leading-none tracking-tighter">
          KNOW WHAT'S IN YOUR PIPES BEFORE YOUR PLUMBER DOES.
        </h2>
        <button
          onClick={scrollToForm}
          className="w-full bg-[#39D353] text-[#0D2010] py-5 font-headline font-extrabold text-lg uppercase tracking-tight"
        >
          CLAIM MY EARLY ACCESS SPOT
        </button>
        <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest mt-4">WE LOOK. WE DON'T TOUCH.</p>
      </section>

      {/* ── FOOTER ── */}
      <Footer includeOperatorLink />

      <StickyBar onBookClick={scrollToForm} />
    </div>
  )
}

/* ── FAQ accordion ── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  const items = [
    {
      q: 'WHEN WILL YOU START TAKING APPOINTMENTS?',
      a: "We're validating demand in North Miami Beach now. Once we confirm enough interest, we'll announce our launch date to everyone on the waitlist — you'll be first to know and first to book.",
    },
    {
      q: 'DO I HAVE TO PAY TO SIGN UP?',
      a: "No. Joining the waitlist is completely free. You only pay when you book an actual inspection. There's no commitment and you can unsubscribe anytime.",
    },
    {
      q: 'WHY IS IT ONLY $149?',
      a: "Because we only do one thing. Plumbers charge $300–$500 for a camera inspection because they're hoping to sell you a repair on the same visit. We're not hoping to sell you anything. That's worth something.",
    },
    {
      q: 'DO YOU FIX THE PIPES YOU FIND PROBLEMS IN?',
      a: "No. ClearScope is a diagnostic service, not a plumbing contractor. We put a camera in your pipe and show you what's there — we don't touch, cut, or repair anything. Think of us like a medical imaging center: we provide the scan. You decide what to do next.",
    },
  ]

  return (
    <section className="bg-[#F0EDE6] py-16 px-6">
      <h2 className="font-headline text-3xl text-[#1A1A1A] mb-8 uppercase">Questions</h2>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(26,26,26,0.15)' }}>
            <button
              className="w-full flex justify-between items-center py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-headline text-sm text-[#1A1A1A] uppercase tracking-tight pr-4">{item.q}</span>
              <span
                className="material-symbols-outlined text-[#1A1A1A] shrink-0 transition-transform duration-150"
                style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                add
              </span>
            </button>
            {open === i && (
              <p className="text-xs text-[#1A1A1A] opacity-60 pb-5 leading-relaxed">{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
