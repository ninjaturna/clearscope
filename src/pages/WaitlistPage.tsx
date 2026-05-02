import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ScanOverlay from '../components/ScanOverlay'
import StickyBar from '../components/StickyBar'
import FloridaZipMap from '../components/FloridaZipMap'
import { lookupZip, ZipEntry } from '../data/zipLookup'

type PropertyType = 'residential' | 'commercial'
type Situation = 'slow-drain' | 'got-quote' | 'buying-selling' | 'planning-ahead'
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function WaitlistPage() {
  const { t } = useTranslation()
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
      window.gtag?.('event', 'waitlist_signup', {
        property_type: propertyType,
        zip_status: zipEntry?.status ?? 'unknown',
      })
    } catch {
      setSubmitState('error')
    }
  }

  const scrollToForm = () =>
    document.getElementById('waitlist-form')?.scrollIntoView({ behavior: 'smooth' })

  const situationOptions: { id: Situation; labelKey: string }[] = [
    { id: 'slow-drain',     labelKey: 'form.slowDrain' },
    { id: 'got-quote',      labelKey: 'form.gotQuote' },
    { id: 'buying-selling', labelKey: 'form.buyingSelling' },
    { id: 'planning-ahead', labelKey: 'form.planningAhead' },
  ]

  const zipStatusKey = zipEntry?.status ?? 'live'
  const formHeadline = t('form.headlineLive')
  const formSubhead = t('form.subheadLive')
  const successHeadline = t('form.successHeadlineLive')
  const successBody = t('form.successBodyLive', { city: zipEntry?.city ?? 'North Miami Beach' })
  const submitLabel = zipStatusKey === 'live'
    ? t('form.submitLive')
    : zipStatusKey === 'coming_soon'
      ? t('form.submitComingSoon')
      : t('form.submitNotServed')

  return (
    <div className="bg-[#141414] min-h-screen text-[#E8E4DC] font-body pb-20">

      <Nav
        ctaLabel={t('nav.joinWaitlist')}
        onCtaClick={scrollToForm}
        links={[
          { label: t('nav.howItWorks'), href: '/#how-it-works' },
          { label: t('nav.pricing'),    href: '/#pricing' },
          { label: t('nav.blog'),       href: '/blog' },
          { label: t('nav.commercial'), href: '/commercial' },
        ]}
      />

      {/* ── ANNOUNCEMENT BANNER ── */}
      <div className="mt-16 bg-[#1C1B1B] py-3 px-4 flex items-center gap-3 overflow-hidden" style={{ borderBottom: '1px solid rgba(57,211,83,0.15)' }}>
        <div className="w-2 h-2 bg-[#39D353] animate-pulse shrink-0" />
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#39D353] uppercase whitespace-nowrap">
          {t('banner.text')}
        </p>
      </div>

      {/* ── HERO ── */}
      <header className="px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 grayscale scale-110">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAU9L0wY6433eA69S0cM9oCR7wEYZog43my76s6QG9N0ExWUDD2uYYogu98yRdkF-LL_jlqQiMNXDeCc3KaPeWLo5eKRM2kX8C5S_0QyxuUIwAhUcykcd3zQ00zB1fjWBu9jbblqLBxTFGHA_MCIaoSJW6SkwG2WgaSxa3owxGxoAziocSJlnY4gzxrWLJvdgaWgIp8bCMvv_5Y0C7h-27oYllRMXBS_9lvo9O1L8FqAJEGNPnlS_bmqBSc0TxKaBH11NfO6SuwND0"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(61,74,59,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(61,74,59,0.12) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#39D353]" />
            <span className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.18em]">COMING TO NORTH MIAMI BEACH</span>
          </div>
          <h1 className="font-headline text-[42px] leading-[0.9] text-white mb-6 uppercase tracking-tighter">
            {t('hero.headline')}
          </h1>
          <p className="text-[#9CA3AF] font-body text-base mb-8 leading-relaxed max-w-[320px]">
            {t('hero.subhead')}
          </p>
          <button
            onClick={scrollToForm}
            className="w-full bg-[#39D353] text-[#0D2010] py-5 font-headline font-extrabold text-lg uppercase tracking-tight active:scale-[0.98]"
          >
            {t('hero.cta')}
          </button>
          <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-[0.2em] text-center mt-4">
            {t('hero.tagline')}
          </p>
          <p className="font-body text-[12px] text-[#6B7280] text-center mt-2">
            {t('hero.body')}
          </p>
        </div>
      </header>

      {/* ── SOCIAL PROOF GRID ── */}
      <section className="grid grid-cols-3 bg-[#141414]" style={{ borderTop: '1px solid rgba(61,74,59,0.20)', borderBottom: '1px solid rgba(61,74,59,0.20)' }}>
        {[
          { value: '[0]',  labelKey: 'stats.earlySignups' },
          { value: '$149', labelKey: 'stats.foundingRate' },
          { value: '30m',  labelKey: 'stats.inspectionTime' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 flex flex-col gap-1 ${i < 2 ? 'border-r border-[rgba(61,74,59,0.20)]' : ''}`}>
            <span className="font-mono text-[#39D353] text-xl font-bold">{stat.value}</span>
            <span className="font-mono text-[8px] text-[#6B7280] uppercase tracking-widest">{t(stat.labelKey)}</span>
          </div>
        ))}
      </section>

      {/* ── FOUNDER STORY ── */}
      <section className="bg-[#141414] py-16 px-6">
        <span className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.3em] mb-4 block">{t('story.eyebrow')}</span>
        <h2 className="font-headline text-3xl text-white mb-8 leading-none uppercase">{t('story.headline')}</h2>
        <div className="space-y-4">
          <div className="bg-[#1C1B1B] p-6 flex justify-between items-end" style={{ borderLeft: '4px solid #EF4444' }}>
            <div>
              <p className="font-mono text-[10px] text-[#6B7280] mb-2 uppercase">{t('story.plumberLabel')}</p>
              <p className="font-headline text-4xl text-[#EF4444]">$8,000</p>
              <p className="font-mono text-[10px] text-[#6B7280] mt-1">{t('story.plumberSub')}</p>
            </div>
            <span className="material-symbols-outlined text-[#EF4444] text-3xl">emergency_home</span>
          </div>
          <div className="flex justify-center py-1">
            <span className="material-symbols-outlined text-[rgba(255,255,255,0.15)] text-2xl">keyboard_double_arrow_down</span>
          </div>
          <div className="bg-[#1C1B1B] p-6 flex justify-between items-end" style={{ borderLeft: '4px solid #39D353' }}>
            <div>
              <p className="font-mono text-[10px] text-[#6B7280] mb-2 uppercase">{t('story.cameraLabel')}</p>
              <p className="font-headline text-4xl text-[#39D353]">$180</p>
              <p className="font-mono text-[10px] text-[#6B7280] mt-1">{t('story.cameraSub')}</p>
            </div>
            <span className="material-symbols-outlined text-[#39D353] text-3xl">verified</span>
          </div>
        </div>
        <p className="mt-8 text-[#9CA3AF] font-body text-sm leading-relaxed">{t('story.body')}</p>
        <p className="mt-4 text-[#6B7280] font-body text-sm italic">{t('story.footnote')}</p>
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
      <section className="bg-[#F0EDE6] py-16 px-6" id="how-it-works">
        <h2 className="font-headline text-3xl text-[#1A1A1A] mb-10 leading-none uppercase">{t('howItWorks.headline')}</h2>
        <div className="space-y-10">
          {[
            { n: '01', titleKey: 'howItWorks.step1Title', bodyKey: 'howItWorks.step1Body' },
            { n: '02', titleKey: 'howItWorks.step2Title', bodyKey: 'howItWorks.step2Body' },
            { n: '03', titleKey: 'howItWorks.step3Title', bodyKey: 'howItWorks.step3Body' },
          ].map(step => (
            <div key={step.n} className="flex gap-4">
              <span className="font-mono text-2xl font-bold text-[#1A1A1A] opacity-20">{step.n}</span>
              <div>
                <h3 className="font-headline font-bold text-[#1A1A1A] uppercase mb-2">{t(step.titleKey)}</h3>
                <p className="text-[#1A1A1A] opacity-70 text-sm">{t(step.bodyKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SIGNUP FORM ── */}
      <section className="bg-[#141414] py-16 px-6" id="waitlist-form">
        <div className="text-center mb-10">
          <h2 className="font-headline text-3xl text-white mb-2 uppercase">{formHeadline}</h2>
          <p className="font-mono text-[10px] text-[#39D353] tracking-widest uppercase">{formSubhead}</p>
        </div>

        {submitState === 'success' ? (
          <div className="bg-[#1C1B1B] p-8 text-center" style={{ borderTop: '3px solid #39D353' }}>
            <span className="material-symbols-outlined text-[#39D353] text-5xl mb-4 block">check_circle</span>
            <h3 className="font-headline text-2xl text-white uppercase mb-2">{successHeadline}</h3>
            <p className="font-body text-[#9CA3AF] text-sm">{successBody}</p>
            <p className="font-mono text-[10px] text-[#6B7280] mt-4 uppercase tracking-widest">{t('form.disclaimer')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" style={{ background: '#1C1B1B', padding: '24px', borderTop: '3px solid #39D353' }}>

            <div>
              <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-2">
                {t('form.emailLabel')} <span className="text-[#39D353]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={t('form.emailPlaceholder')}
                className="w-full bg-transparent text-white font-mono text-sm py-3 px-0 placeholder-[#6B7280]"
                style={{ borderBottom: '1px solid rgba(61,74,59,0.40)', outline: 'none' }}
                onFocus={e => { e.currentTarget.style.borderBottomColor = '#39D353' }}
                onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(61,74,59,0.40)' }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-2">
                  {t('form.zipLabel')} <span className="text-[#39D353]">*</span>
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
                      {zipEntry.status === 'live'
                        ? t('form.zipLive', { city: zipEntry.city })
                        : zipEntry.status === 'coming_soon'
                          ? t('form.zipComingSoon', { city: zipEntry.city })
                          : t('form.zipNotServed', { city: zipEntry.city })}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-2">
                  {t('form.propertyLabel')} <span className="text-[#39D353]">*</span>
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
                      {type === 'residential' ? t('form.residential') : t('form.commercial')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-[#6B7280] uppercase block mb-3">
                {t('form.situationLabel')} <span className="text-[#6B7280]">{t('form.situationOptional')}</span>
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
                    {t(opt.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitState === 'loading'}
              className="w-full bg-[#39D353] text-[#0D2010] py-5 font-headline font-extrabold text-lg uppercase tracking-tight disabled:opacity-60"
            >
              {submitState === 'loading' ? '...' : submitLabel}
            </button>

            <p className="font-mono text-[9px] text-[#6B7280] text-center uppercase tracking-widest">
              {t('form.disclaimer')}
            </p>
          </form>
        )}
      </section>

      {/* ── BENEFIT CARDS ── */}
      <section className="px-6 py-12 space-y-4 bg-[#141414]" id="pricing">
        {[
          { titleKey: 'benefits.priorityTitle', bodyKey: 'benefits.priorityBody' },
          { titleKey: 'benefits.rateTitle',     bodyKey: 'benefits.rateBody' },
          { titleKey: 'benefits.obligationTitle', bodyKey: 'benefits.obligationBody' },
        ].map(card => (
          <div key={card.titleKey} className="bg-[#1C1B1B] p-5" style={{ borderLeft: '2px solid #39D353' }}>
            <h4 className="font-mono text-xs text-[#39D353] mb-1 uppercase font-bold">{t(card.titleKey)}</h4>
            <p className="text-xs text-[#9CA3AF]">{t(card.bodyKey)}</p>
          </div>
        ))}
      </section>

      {/* ── COMMERCIAL CALLOUT ── */}
      <section className="px-6 py-8 bg-[#1C1B1B]" style={{ borderLeft: '3px solid #39D353' }}>
        <p className="font-mono text-[10px] text-[#39D353] uppercase mb-2">{t('commercial.eyebrow')}</p>
        <h3 className="font-headline text-xl text-white uppercase mb-2">{t('commercial.headline')}</h3>
        <p className="text-[#9CA3AF] font-body text-sm mb-4">{t('commercial.body')}</p>
        <a
          href="mailto:theteam@clearscope.pro"
          className="font-mono text-[11px] text-[#39D353] uppercase tracking-widest"
          onClick={() => window.gtag?.('event', 'commercial_inquiry_click')}
        >
          {t('commercial.cta')}
        </a>
      </section>

      {/* ── FAQ ── */}
      <FAQ />

      {/* ── DEPLOYMENT MAP ── */}
      <FloridaZipMap
        onCtaClick={scrollToForm}
        onZipChange={(newZip, newEntry) => {
          setZip(newZip)
          setZipEntry(newEntry)
        }}
      />

      {/* ── FINAL CTA ── */}
      <section className="bg-[#0E0E0E] py-24 px-6 text-center">
        <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.3em] mb-4">{t('finalCta.eyebrow')}</p>
        <h2 className="font-headline text-4xl text-white mb-8 uppercase leading-none tracking-tighter">
          {t('finalCta.headline')}
        </h2>
        <button
          onClick={scrollToForm}
          className="w-full bg-[#39D353] text-[#0D2010] py-5 font-headline font-extrabold text-lg uppercase tracking-tight"
        >
          {t('finalCta.cta')}
        </button>
        <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest mt-4">{t('finalCta.tagline')}</p>
      </section>

      <Footer includeOperatorLink />

      <StickyBar onBookClick={scrollToForm} />
    </div>
  )
}

function FAQ() {
  const { t } = useTranslation()
  const [open, setOpen] = useState<number | null>(null)

  const items = [
    { qKey: 'faq.q1', aKey: 'faq.a1' },
    { qKey: 'faq.q2', aKey: 'faq.a2' },
    { qKey: 'faq.q3', aKey: 'faq.a3' },
    { qKey: 'faq.q4', aKey: 'faq.a4' },
  ]

  return (
    <section className="bg-[#F0EDE6] py-16 px-6">
      <h2 className="font-headline text-3xl text-[#1A1A1A] mb-8 uppercase">{t('faq.headline')}</h2>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid rgba(26,26,26,0.15)' }}>
            <button
              className="w-full flex justify-between items-center py-5 text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-headline text-sm text-[#1A1A1A] uppercase tracking-tight pr-4">{t(item.qKey)}</span>
              <span
                className="material-symbols-outlined text-[#1A1A1A] shrink-0 transition-transform duration-150"
                style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                add
              </span>
            </button>
            {open === i && (
              <p className="text-xs text-[#1A1A1A] opacity-60 pb-5 leading-relaxed">{t(item.aKey)}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
