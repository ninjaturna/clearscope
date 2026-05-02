import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function BookingConfirmedPage() {
  const { t } = useTranslation()
  const params = new URLSearchParams(window.location.search)
  const name = params.get('name') || ''

  useEffect(() => {
    window.gtag?.('event', 'booking_confirmed', { value: 149, currency: 'USD' })
  }, [])

  return (
    <div className="bg-[#141414] min-h-screen text-[#E8E4DC] font-body">

      <Nav
        ctaLabel={t('nav.bookNow')}
        ctaHref="/waitlist"
        links={[
          { label: t('nav.howItWorks'), href: '/#how-it-works' },
          { label: t('nav.pricing'),    href: '/#pricing' },
          { label: t('nav.blog'),       href: '/blog' },
          { label: t('nav.commercial'), href: '/commercial' },
        ]}
      />

      <main className="mt-16 flex flex-col items-center justify-center min-h-[80vh] px-6 py-24 text-center">

        {/* Confirmation mark */}
        <div
          className="w-20 h-20 flex items-center justify-center mb-8"
          style={{ border: '2px solid #39D353' }}
        >
          <span className="material-symbols-outlined text-[#39D353]" style={{ fontSize: '40px' }}>check</span>
        </div>

        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tighter leading-none mb-4">
          {name ? t('booking.confirmedName', { name }) : t('booking.confirmed')}
        </h1>

        <p className="font-mono text-[11px] text-[#39D353] uppercase tracking-[0.25em] mb-16">
          {t('booking.confirmationSent')}
        </p>

        <div
          className="w-full max-w-md text-left"
          style={{ borderTop: '3px solid #39D353' }}
        >
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.25em] py-5">
            {t('booking.whatNext')}
          </p>

          <div className="space-y-0">
            {[
              { n: '01', text: t('booking.step1') },
              { n: '02', text: t('booking.step2') },
              { n: '03', text: t('booking.step3') },
            ].map(step => (
              <div
                key={step.n}
                className="flex items-start gap-5 py-6"
                style={{ borderBottom: '1px solid rgba(61,74,59,0.20)' }}
              >
                <span className="font-mono text-[10px] text-[#6B7280] shrink-0 mt-0.5">{step.n}</span>
                <p className="font-body text-sm text-[#9CA3AF] leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#"
          className="mt-12 font-mono text-[11px] text-[#39D353] uppercase tracking-widest flex items-center gap-2"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_add_on</span>
          {t('booking.addCalendar')}
        </a>

        <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest mt-16">
          {t('booking.questions')}
        </p>

      </main>

      <Footer />
    </div>
  )
}
