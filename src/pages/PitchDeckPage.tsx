import { useState, useEffect, useCallback } from 'react'

const TOTAL_SLIDES = 12

// ── Shared sub-components ──────────────────────────────────────────────

function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.25em] block mb-4">
      {children}
    </span>
  )
}

function SlideHeadline({ children, size = 'lg' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  const cls = {
    xl: 'text-5xl md:text-7xl',
    lg: 'text-4xl md:text-5xl',
    md: 'text-3xl md:text-4xl',
    sm: 'text-2xl md:text-3xl',
  }[size]
  return (
    <h2 className={`font-headline font-extrabold tracking-tighter leading-[0.9] uppercase text-white ${cls}`}>
      {children}
    </h2>
  )
}

function Divider() {
  return <div className="w-12 h-0.5 bg-[#39D353] my-6" />
}

function Card({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div
      className="bg-[#1C1B1B] p-5 md:p-6"
      style={{ borderLeft: `3px solid ${accent ? '#39D353' : '#2A2A2A'}` }}
    >
      {children}
    </div>
  )
}

function RedCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1C1B1B] p-5 md:p-6" style={{ borderLeft: '3px solid #EF4444' }}>
      {children}
    </div>
  )
}

function WMBTRow({ assumption, risk, test }: { assumption: string; risk: 'LOW' | 'MEDIUM' | 'MEDIUM-HIGH' | 'HIGH'; test: string }) {
  const riskColor = { 'LOW': '#39D353', 'MEDIUM': '#F59E0B', 'MEDIUM-HIGH': '#F97316', 'HIGH': '#EF4444' }[risk]
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] gap-4 py-4" style={{ borderBottom: '1px solid rgba(61,74,59,0.20)' }}>
      <p className="font-body text-sm text-[#E8E4DC] leading-relaxed">{assumption}</p>
      <span
        className="font-mono text-[9px] font-bold uppercase px-2 py-1 self-start whitespace-nowrap"
        style={{ background: `${riskColor}20`, color: riskColor, border: `1px solid ${riskColor}40` }}
      >
        {risk}
      </span>
      <p className="font-mono text-[10px] text-[#6B7280] uppercase leading-relaxed">{test}</p>
    </div>
  )
}

function SprintRow({ week, activity, signal }: { week: string; activity: string; signal: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr_1fr] gap-4 py-3" style={{ borderBottom: '1px solid rgba(61,74,59,0.15)' }}>
      <span className="font-mono text-[10px] text-[#39D353] uppercase">{week}</span>
      <span className="font-body text-sm text-[#E8E4DC]">{activity}</span>
      <span className="font-mono text-[10px] text-[#6B7280] uppercase">{signal}</span>
    </div>
  )
}

// ── Slides ─────────────────────────────────────────────────────────────

const slides: React.FC[] = [

  // SLIDE 01 — TITLE
  () => (
    <div className="flex flex-col items-center justify-center h-full text-center relative">
      {/* Scan overlay grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(61,74,59,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(61,74,59,0.10) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Green ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(57,211,83,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 px-6">
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="w-2 h-2 bg-[#39D353] animate-pulse" />
          <span className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.3em]">NORTH MIAMI BEACH, FL // SEED ROUND</span>
        </div>
        <div
          className="inline-block px-4 py-1 mb-6 font-mono text-[10px] text-[#0D2010] font-bold uppercase tracking-widest"
          style={{ background: '#39D353' }}
        >
          CLEARSCOPE
        </div>
        <h1 className="font-headline font-extrabold text-6xl md:text-8xl tracking-tighter leading-[0.85] text-white uppercase mb-6">
          The Truth<br />
          About Your Pipes.<br />
          <span className="text-[#39D353]">$149.</span>
        </h1>
        <p className="font-body text-lg text-[#9CA3AF] max-w-lg mx-auto mb-12">
          The first camera-only sewer inspection platform. No repairs. No conflict of interest. Just video proof.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 font-mono text-[10px] text-[#6B7280] uppercase tracking-widest">
          <span>clearscope.pro</span>
          <span className="hidden md:block text-[#3D4A3B]">//</span>
          <span>Tam Danier, Founder</span>
          <span className="hidden md:block text-[#3D4A3B]">//</span>
          <span>Lead Solution Design Advisor, Launch by NTT DATA</span>
        </div>
      </div>
    </div>
  ),

  // SLIDE 02 — OBSERVATION
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 02 — The Observation</SlideLabel>
      <SlideHeadline>Every Plumber Who Diagnoses Your Pipes Also Profits From Fixing Them.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-3">
          {[
            'In Miami-Dade, a camera inspection costs $250–$650',
            'Every provider who inspects also sells the $8K–$50K repair',
            'The diagnosis and the sales pitch happen in the same visit',
            'There is no camera-only inspection company in Miami-Dade',
          ].map(item => (
            <div key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-[#39D353] shrink-0 mt-2" />
              <p className="font-body text-base text-[#E8E4DC]">{item}</p>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <RedCard>
            <p className="font-mono text-[9px] text-[#EF4444] uppercase mb-2">PLUMBER'S DIAGNOSIS</p>
            <p className="font-headline text-4xl text-[#EF4444] font-extrabold">$8,000</p>
            <p className="font-mono text-[10px] text-[#6B7280] mt-1">Full cast iron line replacement</p>
          </RedCard>
          <Card accent>
            <p className="font-mono text-[9px] text-[#39D353] uppercase mb-2">CAMERA FINDING</p>
            <p className="font-headline text-4xl text-[#39D353] font-extrabold">$180</p>
            <p className="font-mono text-[10px] text-[#6B7280] mt-1">Kinked hose. Handyman fix.</p>
          </Card>
        </div>
      </div>
      <div
        className="p-5 italic"
        style={{ borderLeft: '3px solid rgba(57,211,83,0.30)', background: '#1C1B1B' }}
      >
        <p className="font-body text-sm text-[#9CA3AF] leading-relaxed">
          "A plumber quoted $8,000 for full cast iron line replacement. A camera inspection found a kinked flexible hose installed three inches too long. A handyman fixed it for $180. That's why ClearScope exists."
        </p>
        <p className="font-mono text-[10px] text-[#39D353] mt-3 uppercase tracking-widest">— Founder, ClearScope</p>
      </div>
    </div>
  ),

  // SLIDE 03 — INSIGHT
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 03 — The Insight</SlideLabel>
      <SlideHeadline>2.5 Million Florida Homes. Zero Honest Inspection Options.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          {
            n: '01',
            title: 'The Pipe Problem',
            body: '~9,000 North Miami Beach homes built before 1975. Florida cast iron fails in 25–30 years. Every original pipe in the target area is decades past expected lifespan.',
          },
          {
            n: '02',
            title: 'The Trust Problem',
            body: 'Homeowners cannot verify a diagnosis when the diagnostician profits from the repair. Quote variance for the same condition: $2,640 → $15,000.',
          },
          {
            n: '03',
            title: 'The Market Gap',
            body: 'No dedicated camera-only inspection company operates in Miami-Dade. Every competitor bundles inspection with repair. The gap is structural and unaddressed.',
          },
        ].map(item => (
          <div key={item.n} className="bg-[#1C1B1B] p-6 relative">
            <span className="font-mono text-5xl font-bold text-white absolute top-4 right-4" style={{ opacity: 0.05 }}>{item.n}</span>
            <h3 className="font-headline text-base uppercase mb-3 text-[#39D353]">{item.title}</h3>
            <p className="font-body text-sm text-[#9CA3AF] leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-6">
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{ background: '#1C1B1B', borderTop: '2px solid #39D353' }}
        >
          <span className="font-mono text-3xl font-bold text-[#39D353]">2.5M</span>
          <span className="font-mono text-[10px] text-[#6B7280] uppercase">Florida homes with aging cast iron pipes</span>
        </div>
        <div
          className="px-6 py-4 flex items-center gap-4"
          style={{ background: '#1C1B1B', borderTop: '2px solid #EF4444' }}
        >
          <span className="font-mono text-3xl font-bold text-[#EF4444]">$0</span>
          <span className="font-mono text-[10px] text-[#6B7280] uppercase">Honest inspection options in Miami-Dade</span>
        </div>
      </div>
    </div>
  ),

  // SLIDE 04 — PROBLEM
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 04 — The Problem</SlideLabel>
      <SlideHeadline>Homeowners Can't Get an Honest Diagnosis.</SlideHeadline>
      <Divider />
      <div
        className="p-6 mb-8"
        style={{ background: '#1C1B1B', borderLeft: '4px solid #EF4444' }}
      >
        <p className="font-mono text-[10px] text-[#EF4444] uppercase tracking-widest mb-3">CONSTRAINT FORMULA</p>
        <p className="font-body text-base md:text-lg text-[#E8E4DC] leading-relaxed">
          <span className="text-white font-bold">Homeowners with pre-1975 cast iron pipes</span>{' '}
          can't get an unbiased diagnosis{' '}
          <span className="text-[#EF4444] font-bold">because</span>{' '}
          every inspection provider also sells the repair — creating an inherent conflict of interest that leads to misdiagnosis, unnecessary work, and quotes ranging from $2,640 to $15,000 for the same problem.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { seg: 'Homeowners', body: 'Slow drains, odors, aging pipes. No way to know if a $15K quote is honest or inflated.' },
          { seg: 'Buyers & Sellers', body: "Standard home inspections don't include sewer scoping. Buyers close on hidden $20K–$50K problems." },
          { seg: 'Commercial / Restaurant', body: 'DERM fines up to $1,000/day for non-compliance. No independent verifier available.' },
        ].map(item => (
          <div key={item.seg} className="bg-[#1C1B1B] p-5">
            <h3 className="font-headline text-sm uppercase mb-2 text-white">{item.seg}</h3>
            <p className="font-body text-xs text-[#9CA3AF] leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  // SLIDE 05 — OPPORTUNITY
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 05 — The Opportunity</SlideLabel>
      <SlideHeadline>A Validated Gap in a Fragmented, Fear-Driven Market.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">MARKET SIZE</p>
          <div className="space-y-3">
            {[
              { label: 'TAM', value: '$375M', desc: '2.5M Florida homes × $149' },
              { label: 'SAM', value: '$27M', desc: 'Miami-Dade + Broward (180K pre-1975 homes)' },
              { label: 'SOM (Phase 0–2)', value: '$1.6M/yr', desc: 'NMB + 8 Miami-Dade territories at 10% annual penetration' },
            ].map(item => (
              <div key={item.label} className="flex items-baseline gap-4 py-3" style={{ borderBottom: '1px solid rgba(61,74,59,0.20)' }}>
                <span className="font-mono text-[10px] text-[#6B7280] uppercase w-16 shrink-0">{item.label}</span>
                <span className="font-mono text-2xl font-bold text-[#39D353]">{item.value}</span>
                <span className="font-mono text-[10px] text-[#6B7280] uppercase">{item.desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            {[
              '28,000+ FL cast iron pipe lawsuits filed in 2016 alone',
              'Insurance carriers now requiring pipe documentation',
              'Real estate sewer scope adoption accelerating in South FL',
            ].map(s => (
              <div key={s} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#39D353] shrink-0 mt-1.5" />
                <p className="font-mono text-[10px] text-[#6B7280] uppercase">{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">COMPETITIVE LANDSCAPE</p>
          {/* 2×2 grid */}
          <div
            className="relative w-full aspect-square max-w-xs"
            style={{ border: '1px solid rgba(61,74,59,0.30)' }}
          >
            {/* Axis labels */}
            <div className="absolute bottom-full left-0 right-0 flex justify-between text-[8px] font-mono text-[#6B7280] uppercase pb-1">
              <span>BIASED</span><span>INDEPENDENT</span>
            </div>
            <div
              className="absolute top-0 bottom-0 left-full flex flex-col justify-between text-[8px] font-mono text-[#6B7280] uppercase pl-1"
              style={{ writingMode: 'vertical-rl' }}
            >
              <span>EXPENSIVE</span><span>AFFORDABLE</span>
            </div>
            {/* Grid lines */}
            <div className="absolute inset-0 flex">
              <div className="flex-1" style={{ borderRight: '1px solid rgba(61,74,59,0.30)' }} />
              <div className="flex-1" />
            </div>
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1" style={{ borderBottom: '1px solid rgba(61,74,59,0.30)' }} />
              <div className="flex-1" />
            </div>
            {/* Competitors cluster — top-left */}
            <div className="absolute top-[15%] left-[15%] text-center">
              <div className="w-3 h-3 bg-[#EF4444] opacity-60 mx-auto mb-1" />
              <span className="font-mono text-[7px] text-[#6B7280] uppercase block">Plumbers<br/>+ Pipe Co.</span>
            </div>
            <div className="absolute top-[30%] left-[25%] text-center">
              <div className="w-2 h-2 bg-[#EF4444] opacity-40 mx-auto mb-1" />
              <span className="font-mono text-[7px] text-[#6B7280] uppercase block">Home<br/>Inspectors</span>
            </div>
            {/* ClearScope — bottom-right */}
            <div className="absolute bottom-[20%] right-[20%] text-center">
              <div className="w-4 h-4 bg-[#39D353] mx-auto mb-1" style={{ boxShadow: '0 0 12px rgba(57,211,83,0.5)' }} />
              <span className="font-mono text-[8px] text-[#39D353] uppercase font-bold block">CLEARSCOPE</span>
              <span className="font-mono text-[7px] text-[#39D353] opacity-70 uppercase block">ALONE HERE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // SLIDE 06 — SOLUTION
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 06 — The Solution</SlideLabel>
      <SlideHeadline size="xl">We Look. We Don't Touch.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">ERIM VALUE LEVERS</p>
          <div className="space-y-3">
            {[
              { lever: 'Risk Reduction', strength: 5, desc: 'Video evidence prevents $8K–$50K unnecessary repairs. Supports insurance claims + real estate due diligence.' },
              { lever: 'Economic Value', strength: 4, desc: '60–70% below market pricing. $149 vs $300–$650 average.' },
              { lever: 'Image Value', strength: 3, desc: '"Truth-teller" positioning. Shareable video creates organic word-of-mouth.' },
              { lever: 'Motivation', strength: 3, desc: '30-minute service, same-day video, zero sales pitch.' },
            ].map(item => (
              <div key={item.lever}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] uppercase text-[#E8E4DC]">{item.lever}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="w-3 h-3" style={{ background: i < item.strength ? '#39D353' : '#2A2A2A' }} />
                    ))}
                  </div>
                </div>
                <p className="font-body text-xs text-[#6B7280]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">PRICING TIERS</p>
          <div className="space-y-3">
            {[
              { tier: 'Residential Basic', price: '$149', seg: 'Homeowners' },
              { tier: 'Residential Plus', price: '$199', seg: 'Insurance / Real estate' },
              { tier: 'Commercial', price: '$275–$500', seg: 'Restaurants, HOAs, multifamily' },
            ].map(item => (
              <div key={item.tier} className="flex items-center justify-between p-4 bg-[#1C1B1B]">
                <div>
                  <p className="font-headline text-sm uppercase text-white">{item.tier}</p>
                  <p className="font-mono text-[9px] text-[#6B7280] uppercase">{item.seg}</p>
                </div>
                <span className="font-mono text-2xl font-bold text-[#39D353]">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3" style={{ background: '#1C1B1B', borderTop: '2px solid #39D353' }}>
            <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest">BREAK-EVEN: 4 INSPECTIONS/MONTH</p>
          </div>
        </div>
      </div>
    </div>
  ),

  // SLIDE 07 — HYPOTHESIS
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-4xl mx-auto w-full text-center">
      <SlideLabel>Slide 07 — The Hypothesis (XYZ-T)</SlideLabel>
      <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest mb-8">THE CORE BET</p>
      <div
        className="p-8 md:p-12 mb-8 text-left"
        style={{ background: '#1C1B1B', borderLeft: '4px solid #39D353' }}
      >
        <p className="font-headline text-2xl md:text-3xl text-white leading-tight uppercase">
          If we offer a $149 camera-only sewer inspection with same-day video delivery and zero repair sales in North Miami Beach —
        </p>
        <p className="font-headline text-2xl md:text-3xl text-[#39D353] leading-tight uppercase mt-4">
          then at least 40 homeowners/month will book within 6 months, at a CAC ≤ $25, with ≥ 4.7 Google rating and ≥ 20% referral/repeat rate.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
        {[
          'Homeowners will pay for diagnostic certainty without bundled repair',
          '$149 captures demand without a loss-leader',
          'Marketing can reach NMB homeowners profitably',
          'The service can be delivered consistently and rated highly',
        ].map((item, i) => (
          <div key={i} className="bg-[#1C1B1B] p-4">
            <span className="font-mono text-[9px] text-[#39D353] block mb-2">PROVES {['A', 'B', 'C', 'D'][i]}</span>
            <p className="font-body text-xs text-[#9CA3AF]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  ),

  // SLIDE 08 — DVFU
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 08 — DVFU Pressure Test</SlideLabel>
      <SlideHeadline size="md">Every Risk Vector Stress-Tested.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-2 gap-4">
        {[
          {
            d: 'D', label: 'Desirability', risk: 'LOW',
            points: ['~9,000 NMB homes past pipe failure age', 'Insurance attorneys recommend independent inspections', 'Real estate sewer scope adoption accelerating'],
            test: '20 free inspections + $200 ad test → track booking conversion',
          },
          {
            d: 'V', label: 'Viability', risk: 'MEDIUM',
            points: ['Break-even: 4 inspections/month', 'Year 1: 475 inspections = $71,400 revenue', 'Gross margin per job: ~70%'],
            test: 'Track CAC by channel. If CAC > $30 at 60 days, pivot channels.',
          },
          {
            d: 'F', label: 'Feasibility', risk: 'LOW-MED',
            points: ['Camera inspection likely exempt from FL plumbing license', 'Legal opinion: $300–$500. Total setup: <$1,000', 'Phase 0 equipment cost: $2,200–$3,300'],
            test: 'FL attorney opinion + DBPR declaratory statement before first paid job.',
          },
          {
            d: 'U', label: 'Usability', risk: 'LOW',
            points: ['30-min on-site service', 'Same-day Google Drive video delivery', 'Jobber Core at $39/mo handles everything'],
            test: 'Time 5 test inspections end-to-end. Target <60 min total.',
          },
        ].map(item => {
          const riskColor = item.risk === 'LOW' ? '#39D353' : item.risk === 'MEDIUM' ? '#F59E0B' : item.risk === 'LOW-MED' ? '#F97316' : '#EF4444'
          return (
            <div key={item.d} className="bg-[#1C1B1B] p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold" style={{ color: riskColor }}>{item.d}</span>
                  <span className="font-headline text-base uppercase text-white">{item.label}</span>
                </div>
                <span className="font-mono text-[9px] font-bold uppercase px-2 py-1" style={{ background: `${riskColor}20`, color: riskColor }}>
                  {item.risk}
                </span>
              </div>
              <ul className="space-y-1 mb-3">
                {item.points.map(p => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-[#6B7280] shrink-0 mt-2" />
                    <span className="font-body text-xs text-[#9CA3AF]">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="font-mono text-[9px] text-[#39D353] uppercase leading-relaxed" style={{ borderTop: '1px solid rgba(61,74,59,0.20)', paddingTop: '8px' }}>
                {item.test}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  ),

  // SLIDE 09 — GTM SPRINT
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 09 — Go-to-Market: 90-Day Validation Sprint</SlideLabel>
      <SlideHeadline size="md">90 Days to Proof. $5,000 or Less.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="font-mono text-[9px] text-[#6B7280] uppercase grid grid-cols-[80px_1fr_1fr] gap-4 pb-2" style={{ borderBottom: '1px solid rgba(61,74,59,0.30)' }}>
            <span>WEEK</span><span>ACTIVITY</span><span>SUCCESS SIGNAL</span>
          </div>
          <SprintRow week="WK 1–2" activity="20 free inspections for testimonials + Google reviews" signal="10+ testimonials, 4.7+ rating" />
          <SprintRow week="WK 3–4" activity="$200 Facebook/Nextdoor ad test in ZIPs 33160/33162" signal="≥ 15 booking inquiries" />
          <SprintRow week="WK 5–8" activity="First 15 paying customers at $149" signal="CAC ≤ $25, 100% completion" />
          <SprintRow week="WK 9–12" activity="Scale to 30+ jobs/month" signal="Referral/repeat ≥ 10%" />
          <div
            className="mt-4 p-4 flex items-center gap-3"
            style={{ background: '#1C1B1B', borderLeft: '3px solid #39D353' }}
          >
            <span className="material-symbols-outlined text-[#39D353]" style={{ fontSize: '16px' }}>info</span>
            <p className="font-mono text-[9px] text-[#6B7280] uppercase">Community impact: 9,000 NMB homeowners protected from predatory repair practices</p>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">PHASE 0 BUDGET</p>
          <div className="space-y-2">
            {[
              { line: 'Equipment rental (weeks 1–3)', cost: '$1,000–1,500' },
              { line: 'Used Ridgid SeeSnake camera', cost: '$1,200–1,800' },
              { line: 'Facebook/Nextdoor ad test', cost: '$200–300' },
              { line: 'FL attorney opinion letter', cost: '$300–500' },
              { line: 'LLC + BTR + insurance', cost: '$800–1,200' },
              { line: 'Site + tech (already built)', cost: '$0' },
            ].map(item => (
              <div key={item.line} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(61,74,59,0.15)' }}>
                <span className="font-body text-xs text-[#9CA3AF]">{item.line}</span>
                <span className="font-mono text-xs text-[#E8E4DC]">{item.cost}</span>
              </div>
            ))}
            <div className="flex justify-between py-3 mt-1" style={{ background: '#1C1B1B', padding: '12px' }}>
              <span className="font-mono text-sm text-[#39D353] uppercase">TOTAL PHASE 0</span>
              <span className="font-mono text-xl font-bold text-white">$3,500–5,300</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // SLIDE 10 — PLATFORM PLAY
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 10 — The Platform Play</SlideLabel>
      <SlideHeadline size="md">One Market. Eight Territories. One Brand.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">PER-JOB ECONOMICS</p>
          <div className="space-y-2">
            {[
              { label: 'Customer pays', value: '$149', color: '#E8E4DC' },
              { label: 'Platform fee (35%)', value: '$52', color: '#39D353' },
              { label: 'Operator gross', value: '$97', color: '#E8E4DC' },
              { label: 'Operator net', value: '~$44', color: '#39D353' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-baseline py-2" style={{ borderBottom: '1px solid rgba(61,74,59,0.15)' }}>
                <span className="font-body text-xs text-[#9CA3AF]">{item.label}</span>
                <span className="font-mono text-base font-bold" style={{ color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3" style={{ background: '#1C1B1B', borderTop: '2px solid #39D353' }}>
            <p className="font-mono text-[9px] text-[#39D353] uppercase">Operator at 100 jobs/month: $4,400 net</p>
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">4-PHASE ROADMAP</p>
          <div className="space-y-3">
            {[
              { phase: '0', time: 'M1–6', goal: 'Prove unit economics — founder-operated NMB pilot', color: '#39D353' },
              { phase: '1', time: 'M7–12', goal: 'Prove operator model is teachable — first territory operator', color: '#39D353' },
              { phase: '2', time: 'M13–24', goal: 'Saturate Miami-Dade — 6–8 operators, $60K+/month gross', color: 'rgba(57,211,83,0.6)' },
              { phase: '3', time: 'M25–36', goal: 'Broward expansion — $120K+/month gross, playbook proven', color: 'rgba(57,211,83,0.35)' },
            ].map(item => (
              <div key={item.phase} className="flex items-center gap-4 p-4 bg-[#1C1B1B]">
                <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ border: `2px solid ${item.color}` }}>
                  <span className="font-mono text-sm font-bold" style={{ color: item.color }}>{item.phase}</span>
                </div>
                <div>
                  <p className="font-mono text-[9px] text-[#6B7280] uppercase mb-1">{item.time}</p>
                  <p className="font-body text-sm text-[#E8E4DC]">{item.goal}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 flex items-center gap-3" style={{ background: '#1C1B1B', borderLeft: '3px solid #39D353' }}>
            <p className="font-mono text-[9px] text-[#6B7280] uppercase">Analog: DoorDash for field services. Platform owns brand, booking, customer. Operators fulfill.</p>
          </div>
        </div>
      </div>
    </div>
  ),

  // SLIDE 11 — WMBT
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 11 — What Must Be True</SlideLabel>
      <SlideHeadline size="md">Five Assumptions That Make or Break This.</SlideHeadline>
      <Divider />
      <div className="font-mono text-[9px] text-[#6B7280] uppercase grid grid-cols-[1fr_auto_1fr] gap-4 pb-2 mb-1" style={{ borderBottom: '1px solid rgba(61,74,59,0.30)' }}>
        <span>ASSUMPTION</span><span>RISK</span><span>HOW WE TEST IT</span>
      </div>
      <WMBTRow
        assumption="Homeowners will pay for diagnostic certainty without bundled repair"
        risk="MEDIUM"
        test="Booking conversion ≥ 3% from landing page traffic within 60 days"
      />
      <WMBTRow
        assumption="$149 captures demand without a loss-leader promotional price"
        risk="LOW"
        test="Price-test vs $99 promo only if conversion is below 3% at day 60"
      />
      <WMBTRow
        assumption="Camera inspection exempt from FL plumbing license"
        risk="MEDIUM"
        test="FL attorney opinion letter + DBPR declaratory statement before first paid job"
      />
      <WMBTRow
        assumption="1099 contractor model holds legally and operationally"
        risk="MEDIUM-HIGH"
        test="Contractors use own vehicles, set own schedules, work for multiple clients"
      />
      <WMBTRow
        assumption="Operators stay loyal — won't defect and compete independently"
        risk="HIGH"
        test="ClearScope owns all customer data, reviews, phone numbers. Non-compete in operator agreement."
      />
    </div>
  ),

  // SLIDE 12 — THE ASK
  () => (
    <div className="flex flex-col justify-center h-full px-6 md:px-16 max-w-5xl mx-auto w-full">
      <SlideLabel>Slide 12 — The Ask</SlideLabel>
      <SlideHeadline>$25,000 to Prove the Hypothesis.</SlideHeadline>
      <Divider />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">USE OF FUNDS</p>
          <div className="space-y-2">
            {[
              { line: 'Phase 0 equipment', cost: '$3,000' },
              { line: 'Legal + LLC + insurance', cost: '$2,000' },
              { line: '90-day marketing spend', cost: '$3,000' },
              { line: 'Working capital (3 months)', cost: '$5,000' },
              { line: 'Site + tech (already built)', cost: '$0' },
              { line: 'Buffer / contingency', cost: '$2,000' },
            ].map(item => (
              <div key={item.line} className="flex justify-between py-2" style={{ borderBottom: '1px solid rgba(61,74,59,0.15)' }}>
                <span className="font-body text-sm text-[#9CA3AF]">{item.line}</span>
                <span className="font-mono text-sm text-[#E8E4DC]">{item.cost}</span>
              </div>
            ))}
            <div className="flex justify-between p-3 mt-1" style={{ background: '#1C1B1B', borderTop: '2px solid #39D353' }}>
              <span className="font-mono text-sm text-[#39D353] uppercase">TOTAL ASK</span>
              <span className="font-mono text-2xl font-bold text-white">$15K–$25K</span>
            </div>
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-widest mb-4">THE TEAM</p>
          <div className="bg-[#1C1B1B] p-6 mb-6">
            <h3 className="font-headline text-lg uppercase text-white mb-2">Tam Danier</h3>
            <p className="font-mono text-[9px] text-[#39D353] uppercase tracking-widest mb-3">Founder, ClearScope</p>
            <div className="space-y-1">
              {[
                'Lead Solution Design Advisor, Launch by NTT DATA',
                'Founder, Good Ideas Only (GIO) validation studio',
                'DVFU framework practitioner — 100+ startup idea assessments',
                'Personal near-miss: $8,000 repair quote → $180 handyman fix',
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-[#39D353] shrink-0 mt-2" />
                  <p className="font-mono text-[10px] text-[#6B7280] uppercase">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="p-5 text-center"
            style={{ background: '#0E0E0E', borderTop: '3px solid #39D353' }}
          >
            <p className="font-headline text-lg text-white uppercase leading-tight">
              "We don't need to build a plumbing company. We need to prove that 40 homeowners in North Miami Beach will pay $149 for the truth."
            </p>
            <p className="font-headline text-lg text-[#39D353] uppercase mt-2">Then we scale the truth.</p>
          </div>
          <div className="mt-4 flex gap-3">
            <a
              href="/"
              className="flex-1 bg-[#39D353] text-[#0D2010] py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-center"
            >
              VIEW SITE
            </a>
            <a
              href="mailto:tam@clearscope.pro"
              className="flex-1 bg-[#1C1B1B] text-[#39D353] py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-center"
              style={{ border: '1px solid rgba(57,211,83,0.30)' }}
            >
              CONTACT FOUNDER
            </a>
          </div>
        </div>
      </div>
    </div>
  ),
]

// ── Main PitchDeckPage ─────────────────────────────────────────────────
export default function PitchDeckPage() {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SLIDES) return
    setCurrent(index)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  // Touch swipe
  useEffect(() => {
    let startX = 0
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onTouchEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    }
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [next, prev])

  const SlideContent = slides[current]

  return (
    <div
      className="fixed inset-0 bg-[#141414] flex flex-col overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(61,74,59,0.20)', background: '#0E0E0E' }}
      >
        <a href="/" className="flex items-center gap-2 font-headline font-extrabold tracking-tighter uppercase text-[#F0EDE6]">
          <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
            <circle cx={8} cy={8} r={6} stroke="#39D353" strokeWidth="1.2" />
            <circle cx={8} cy={8} r={3.5} stroke="#39D353" strokeWidth="0.8" />
            <line x1={8} y1={1} x2={8} y2={3} stroke="#39D353" strokeWidth="1" />
            <line x1={8} y1={13} x2={8} y2={15} stroke="#39D353" strokeWidth="1" />
            <line x1={1} y1={8} x2={3} y2={8} stroke="#39D353" strokeWidth="1" />
            <line x1={13} y1={8} x2={15} y2={8} stroke="#39D353" strokeWidth="1" />
          </svg>
          <span className="text-sm">CLEARSC<span className="text-[#39D353]">O</span>PE</span>
        </a>
        <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hidden md:block">
          INVESTOR DECK // SEED ROUND
        </span>
        {/* Slide dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-none"
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                background: i === current ? '#39D353' : i < current ? 'rgba(57,211,83,0.35)' : '#2A2A2A',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[#1C1B1B] shrink-0">
        <div
          className="h-full bg-[#39D353] transition-all duration-300"
          style={{ width: `${((current + 1) / TOTAL_SLIDES) * 100}%` }}
        />
      </div>

      {/* Slide content */}
      <div className="flex-1 overflow-y-auto">
        <SlideContent />
      </div>

      {/* Bottom navigation */}
      <div
        className="flex items-center justify-between px-6 py-4 shrink-0"
        style={{ borderTop: '1px solid rgba(61,74,59,0.20)', background: '#0E0E0E' }}
      >
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest disabled:opacity-20 text-[#E8E4DC] hover:text-[#39D353] transition-none"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_back</span>
          PREV
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[#39D353]">{String(current + 1).padStart(2, '0')}</span>
          <span className="font-mono text-[10px] text-[#3D4A3B]">/</span>
          <span className="font-mono text-[10px] text-[#6B7280]">{String(TOTAL_SLIDES).padStart(2, '0')}</span>
        </div>

        <button
          onClick={next}
          disabled={current === TOTAL_SLIDES - 1}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest disabled:opacity-20 text-[#E8E4DC] hover:text-[#39D353] transition-none"
        >
          NEXT
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
        </button>
      </div>
    </div>
  )
}
