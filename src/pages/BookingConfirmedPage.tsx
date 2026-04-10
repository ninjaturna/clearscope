import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function BookingConfirmedPage() {
  // Extract booking details from URL params if present
  const params = new URLSearchParams(window.location.search)
  const name = params.get('name') || ''

  return (
    <div className="bg-[#141414] min-h-screen text-[#E8E4DC] font-body">

      <Nav ctaLabel="BOOK NOW" ctaHref="/waitlist" />

      <main className="mt-16 flex flex-col items-center justify-center min-h-[80vh] px-6 py-24 text-center">

        {/* Confirmation mark */}
        <div
          className="w-20 h-20 flex items-center justify-center mb-8"
          style={{ border: '2px solid #39D353' }}
        >
          <span className="material-symbols-outlined text-[#39D353]" style={{ fontSize: '40px' }}>check</span>
        </div>

        {/* Headline */}
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tighter leading-none mb-4">
          {name ? `You're booked, ${name}.` : "You're booked."}
        </h1>

        <p className="font-mono text-[11px] text-[#39D353] uppercase tracking-[0.25em] mb-16">
          CONFIRMATION SENT TO YOUR EMAIL
        </p>

        {/* What happens next */}
        <div
          className="w-full max-w-md text-left"
          style={{ borderTop: '3px solid #39D353' }}
        >
          <p className="font-mono text-[10px] text-[#39D353] uppercase tracking-[0.25em] py-5">
            WHAT HAPPENS NEXT
          </p>

          <div className="space-y-0">
            {[
              { n: '01', text: "You'll receive a reminder 24 hours before your inspection." },
              { n: '02', text: 'Your tech arrives in a marked vehicle with ClearScope ID.' },
              { n: '03', text: 'Your full inspection video arrives within 4 hours of the inspection.' },
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

        {/* Add to calendar (placeholder) */}
        <a
          href="#"
          className="mt-12 font-mono text-[11px] text-[#39D353] uppercase tracking-widest flex items-center gap-2"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_add_on</span>
          ADD TO CALENDAR
        </a>

        {/* Sub-message */}
        <p className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest mt-16">
          QUESTIONS? REACH US AT INFO@CLEARSCOPE.PRO
        </p>

      </main>

      <Footer />
    </div>
  )
}
