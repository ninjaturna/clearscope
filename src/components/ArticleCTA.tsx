interface ArticleCTAProps {
  headline?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function ArticleCTA({
  headline = 'Stop Guessing. Start Scanning.',
  body = 'Schedule a high-precision camera inspection of your main line today.',
  ctaLabel = 'BOOK MY $149 INSPECTION',
  ctaHref = '/waitlist',
}: ArticleCTAProps) {
  return (
    <div className="bg-[#141414] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 my-12">
      <div className="max-w-md">
        <h4 className="font-headline text-xl text-white font-bold uppercase tracking-tight mb-2">{headline}</h4>
        <p className="font-body text-sm text-[#9CA3AF]">{body}</p>
      </div>
      <a
        href={ctaHref}
        className="w-full md:w-auto bg-[#39D353] text-[#0D2010] font-mono font-bold text-xs px-8 py-4 uppercase tracking-widest"
      >
        {ctaLabel}
      </a>
    </div>
  )
}
