import { useState, useCallback } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

type PlumbingExp = 'none' | '1-3' | '3-5' | '5+'
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function OperatorPage() {
  // Calculator state
  const [jobsPerWeek, setJobsPerWeek] = useState(10)

  // Form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [zipServe, setZipServe] = useState('')
  const [hasVehicle, setHasVehicle] = useState(false)
  const [hasInsurance, setHasInsurance] = useState(false)
  const [plumbingExp, setPlumbingExp] = useState<PlumbingExp>('none')
  const [why, setWhy] = useState('')
  const [submitState, setSubmitState] = useState<SubmitState>('idle')

  // Correct earnings formula
  const monthlyJobs = Math.round(jobsPerWeek * 4.3)
  const gross = monthlyJobs * 97
  const lease = 400
  const net = gross - lease

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('loading')
    try {
      await fetch('https://script.google.com/macros/s/AKfycbyEojhBboxKI2-3oHCwK_QQlZOWOVvaLsV-JRmJZ2DGEzn0q2wgDZUHYWSfNvj0AwUI/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'clearscope_operator',
          name, email, phone, zipServe,
          hasVehicle, hasInsurance, plumbingExp, why,
          timestamp: new Date().toISOString(),
        }),
      })
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  const scrollToForm = useCallback(() =>
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' }), [])

  const expOptions: { id: PlumbingExp; label: string }[] = [
    { id: 'none', label: '0–1 YEARS' },
    { id: '1-3',  label: '1–3 YEARS' },
    { id: '3-5',  label: '3–5 YEARS' },
    { id: '5+',   label: '5+ YEARS' },
  ]

  const inputStyle = {
    borderBottom: '1px solid rgba(61,74,59,0.40)',
    outline: 'none',
  }
  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderBottomColor = '#39D353')
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderBottomColor = 'rgba(61,74,59,0.40)')

  return (
    <div className="bg-[#141414] min-h-screen text-[#E8E4DC] font-body">

      <Nav
        ctaLabel="APPLY NOW"
        onCtaClick={scrollToForm}
        links={[
          { label: 'How It Works', href: '/#how-it-works' },
          { label: 'Pricing',      href: '/#pricing' },
          { label: 'Blog',         href: '/blog' },
          { label: 'Commercial',   href: '/commercial', active: true },
        ]}
      />

      {/* ── HERO ── */}
      <header
        className="mt-16 min-h-[600px] flex flex-col justify-center px-6 py-20 relative"
        style={{
          backgroundImage: 'linear-gradient(#1c1b1b 1px, transparent 1px), linear-gradient(90deg, #1c1b1b 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      >
        <span className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.2em] mb-4 block">
          OPERATOR NETWORK // MIAMI-DADE // OPEN ENROLLMENT
        </span>
        <h1 className="font-headline text-[42px] md:text-6xl font-extrabold tracking-tighter leading-none mb-6 uppercase">
          RUN YOUR OWN CLEARSCOPE TERRITORY.{' '}
          <span className="text-[#39D353]">WE BRING EVERY JOB.</span>
        </h1>
        <p className="text-[#9CA3AF] font-body text-lg max-w-2xl mb-10 leading-relaxed">
          No cold calling. No marketing. No competing on price. You show up and inspect. We handle everything else.
        </p>
        <button
          onClick={scrollToForm}
          className="self-start bg-[#39D353] text-[#0D2010] font-mono font-bold py-5 px-10 text-sm uppercase tracking-widest"
        >
          APPLY FOR A TERRITORY
        </button>
      </header>

      {/* ── EARNINGS CALCULATOR ── */}
      <section className="bg-[#0E0E0E] py-24 px-6">
        <h2 className="font-headline text-3xl mb-12 uppercase">Earnings Estimator</h2>
        <div
          className="grid md:grid-cols-2 gap-12 p-8"
          style={{ background: '#1C1B1B' }}
        >
          {/* Slider */}
          <div>
            <label className="font-mono text-[10px] text-[#39D353] mb-6 block uppercase tracking-widest">
              Jobs per week
            </label>
            <input
              type="range"
              min={5} max={25} step={1}
              value={jobsPerWeek}
              onChange={e => setJobsPerWeek(Number(e.target.value))}
              className="w-full cursor-pointer accent-[#39D353]"
              style={{ height: '4px', background: '#353534' }}
            />
            <div className="flex justify-between font-mono text-[10px] mt-3 text-[#6B7280]">
              <span>5 MIN</span>
              <span className="text-white font-bold">{jobsPerWeek} JOBS/WK</span>
              <span>25 MAX</span>
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-5">
            {[
              { label: 'MONTHLY_JOBS',    value: String(monthlyJobs), color: '#E8E4DC' },
              { label: 'GROSS_EARNINGS',  value: fmt(gross),          color: '#39D353' },
              { label: 'EQUIPMENT_LEASE', value: `−${fmt(lease)}`,   color: '#EF4444' },
            ].map(row => (
              <div
                key={row.label}
                className="flex justify-between pb-4"
                style={{ borderBottom: '1px solid rgba(61,74,59,0.20)' }}
              >
                <span className="font-mono text-[10px] text-[#6B7280] uppercase">{row.label}</span>
                <span className="font-mono font-bold" style={{ color: row.color }}>{row.value}</span>
              </div>
            ))}
            <div
              className="flex justify-between p-4"
              style={{ background: '#353534' }}
            >
              <span className="font-mono text-sm text-[#39D353] uppercase">NET_ESTIMATE</span>
              <span className="font-mono text-xl font-bold text-white">{fmt(net)}</span>
            </div>
            <p className="font-mono text-[9px] text-[#6B7280] leading-relaxed">
              Based on $149 residential jobs at 65% operator share ($97/job).
              Commercial jobs ($275+) increase earnings significantly.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-[#F0EDE6] py-24 px-6 text-[#1A1A1A]">
        <h2 className="font-headline text-3xl mb-16 uppercase font-extrabold tracking-tighter">How It Works</h2>
        <div className="space-y-12">
          {[
            { n: '01', title: 'Sign your territory agreement', body: 'Choose your ZIP codes. We geo-fence your territory. No other operator can take your jobs.' },
            { n: '02', title: 'We equip and train you',         body: "ClearScope leases you a professional camera system. One training day. Then you're operational." },
            { n: '03', title: 'Jobs come to you',               body: 'ClearScope markets, books, and collects payment. You receive job assignments on your phone. You inspect. You get paid weekly.' },
          ].map(step => (
            <div key={step.n} className="relative">
              <span
                className="absolute -top-8 -left-2 font-headline text-9xl text-[#1A1A1A] leading-none select-none"
                style={{ opacity: 0.06 }}
              >
                {step.n}
              </span>
              <div className="relative z-10 pt-4">
                <h3 className="font-headline text-xl uppercase mb-2">{step.title}</h3>
                <p className="font-body text-sm opacity-80 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESPONSIBILITY SPLIT ── */}
      <section className="bg-[#141414] py-24 px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="font-headline text-xl mb-8 uppercase text-[#39D353]">ClearScope Handles</h3>
            <ul className="space-y-5">
              {['All marketing + advertising', 'Online booking system', 'Customer payment collection', 'Brand + reputation management', 'Equipment supply (camera lease)', 'Customer support'].map(item => (
                <li key={item} className="flex items-center gap-4 font-mono text-sm uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[#39D353]">check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-xl mb-8 uppercase text-[#E8E4DC]">You Handle</h3>
            <ul className="space-y-5">
              {['Show up to the job', 'Run the camera inspection', 'Upload the video within 90 minutes', 'Maintain your equipment', 'Hire your own techs as you scale'].map(item => (
                <li key={item} className="flex items-center gap-4 font-mono text-sm uppercase tracking-widest text-[#6B7280]">
                  <span className="w-2 h-2 bg-[#6B7280] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS ── */}
      <section className="bg-[#F0EDE6] py-24 px-6 text-[#1A1A1A]">
        <h2 className="font-headline text-3xl mb-12 uppercase font-extrabold tracking-tighter text-center">Who We're Looking For</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'airport_shuttle', label: 'VEHICLE',      desc: 'Reliable vehicle.' },
            { icon: 'schedule',        label: 'AVAILABILITY', desc: 'Min. 30 hrs/week.' },
            { icon: 'terminal',        label: 'TECH SAVVY',   desc: 'Comfortable with smartphones.' },
            { icon: 'business_center', label: 'MINDSET',      desc: 'Entrepreneurial discipline.' },
          ].map(r => (
            <div
              key={r.label}
              className="p-6 flex flex-col items-center text-center"
              style={{ border: '1px solid rgba(26,26,26,0.15)' }}
            >
              <span className="material-symbols-outlined mb-4" style={{ fontSize: '28px' }}>{r.icon}</span>
              <h5 className="font-mono text-[10px] font-bold mb-2 uppercase">{r.label}</h5>
              <p className="font-mono text-[9px] uppercase leading-tight">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMERCIAL SECTORS ── */}
      <section className="bg-[#1C1B1B] py-16 px-6" style={{ borderLeft: '12px solid #39D353' }}>
        <h2 className="font-headline text-3xl uppercase mb-6">Commercial &amp; HOA Partnerships.</h2>
        <p className="text-[#9CA3AF] font-body text-base mb-10 max-w-xl leading-relaxed">
          High-volume diagnostics for Restaurants, Property Managers, and HOAs. Custom reporting and fleet pricing.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[
            { icon: 'restaurant',     label: 'RESTAURANTS',       sector: '01' },
            { icon: 'corporate_fare', label: 'HOA BOARDS',        sector: '02' },
            { icon: 'domain',         label: 'PROPERTY MANAGERS', sector: '03' },
            { icon: 'apartment',      label: 'MULTIFAMILY',       sector: '04' },
          ].map(s => (
            <div key={s.label} className="bg-[#141414] p-6">
              <span className="material-symbols-outlined text-[#39D353] mb-3 block" style={{ fontSize: '24px' }}>{s.icon}</span>
              <div className="font-mono text-[9px] text-[#6B7280] uppercase mb-1">SECTOR_{s.sector}</div>
              <div className="font-headline text-sm uppercase">{s.label}</div>
            </div>
          ))}
        </div>
        <button className="bg-[#39D353] text-[#0D2010] px-8 py-4 font-mono font-bold tracking-widest text-xs uppercase">
          COMMERCIAL INQUIRIES
        </button>
      </section>

      {/* ── APPLICATION FORM ── */}
      <section className="bg-[#141414] py-24 px-6" id="apply">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl mb-4 uppercase text-center">Apply for a Territory</h2>
          <p className="font-mono text-[10px] text-[#6B7280] text-center mb-12 uppercase tracking-[0.3em]">APPLICATIONS REVIEWED WITHIN 48 HOURS</p>

          {submitState === 'success' ? (
            <div className="bg-[#1C1B1B] p-10 text-center" style={{ borderTop: '3px solid #39D353' }}>
              <span className="material-symbols-outlined text-[#39D353] text-5xl mb-4 block">check_circle</span>
              <h3 className="font-headline text-2xl text-white uppercase mb-2">Application received.</h3>
              <p className="font-body text-[#9CA3AF] text-sm">We review applications within 48 hours and will reach out to discuss available territories.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Name + Email */}
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { id: 'name',  label: 'FULL NAME',      val: name,  set: setName,  type: 'text'  },
                  { id: 'email', label: 'EMAIL ADDRESS',  val: email, set: setEmail, type: 'email' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="font-mono text-[10px] text-[#39D353] uppercase block mb-2">
                      {f.label} <span className="text-[#39D353]">*</span>
                    </label>
                    <input
                      type={f.type}
                      required
                      value={f.val}
                      onChange={e => f.set(e.target.value)}
                      className="w-full bg-transparent text-white font-body py-3 px-0"
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                ))}
              </div>

              {/* Phone + ZIP */}
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { id: 'phone', label: 'PHONE NUMBER',          val: phone,    set: setPhone,    type: 'tel'  },
                  { id: 'zip',   label: 'ZIP CODE / AREA TO SERVE', val: zipServe, set: setZipServe, type: 'text' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="font-mono text-[10px] text-[#39D353] uppercase block mb-2">
                      {f.label} <span className="text-[#39D353]">*</span>
                    </label>
                    <input
                      type={f.type}
                      required
                      value={f.val}
                      onChange={e => f.set(e.target.value)}
                      className="w-full bg-transparent text-white font-body py-3 px-0"
                      style={inputStyle}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                ))}
              </div>

              {/* Plumbing experience */}
              <div>
                <label className="font-mono text-[10px] text-[#39D353] uppercase block mb-4">
                  YEARS OF PLUMBING EXPERIENCE <span className="text-[#39D353]">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {expOptions.map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPlumbingExp(opt.id)}
                      className="px-5 py-2 font-mono text-[10px] uppercase font-bold transition-none"
                      style={{
                        background: plumbingExp === opt.id ? '#39D353' : 'transparent',
                        color: plumbingExp === opt.id ? '#0D2010' : '#6B7280',
                        border: `1px solid ${plumbingExp === opt.id ? '#39D353' : 'rgba(61,74,59,0.40)'}`,
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <p className="font-mono text-[9px] text-[#6B7280] mt-2">
                  No plumbing license required. We're looking for hands-on comfort with residential infrastructure.
                </p>
              </div>

              {/* Toggles */}
              <div className="flex flex-col md:flex-row gap-8">
                {[
                  { id: 'vehicle',   label: 'I HAVE A RELIABLE VEHICLE', val: hasVehicle,   set: setHasVehicle   },
                  { id: 'insurance', label: 'I HAVE LIABILITY INSURANCE', val: hasInsurance, set: setHasInsurance },
                ].map(toggle => (
                  <div key={toggle.id} className="flex items-center gap-4">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={toggle.val}
                      onClick={() => toggle.set(!toggle.val)}
                      className="w-12 h-6 flex items-center px-1 transition-none"
                      style={{ background: toggle.val ? '#39D353' : '#353534', border: '1px solid rgba(61,74,59,0.40)' }}
                    >
                      <span
                        className="w-4 h-4 bg-white transition-none"
                        style={{ transform: toggle.val ? 'translateX(22px)' : 'translateX(0)' }}
                      />
                    </button>
                    <span className="font-mono text-[10px] uppercase text-[#6B7280]">{toggle.label}</span>
                  </div>
                ))}
              </div>

              {/* Why textarea */}
              <div>
                <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-2">
                  WHY YOU'D BE A GREAT CLEARSCOPE OPERATOR <span className="text-[#6B7280]">(optional)</span>
                </label>
                <textarea
                  value={why}
                  onChange={e => setWhy(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent text-white font-mono text-sm py-3 px-0 resize-none"
                  style={{ borderBottom: '1px solid rgba(61,74,59,0.40)', outline: 'none' }}
                  onFocus={e => (e.currentTarget.style.borderBottomColor = '#39D353')}
                  onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(61,74,59,0.40)')}
                />
              </div>

              <button
                type="submit"
                disabled={submitState === 'loading'}
                className="w-full bg-[#39D353] text-[#0D2010] font-mono font-extrabold py-6 text-sm uppercase tracking-widest disabled:opacity-60"
              >
                {submitState === 'loading' ? 'SUBMITTING...' : 'SUBMIT OPERATOR APPLICATION'}
              </button>

              <p className="font-mono text-[9px] text-[#6B7280] text-center uppercase tracking-widest">
                Applications are reviewed within 48 hours. We don't share your information.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
