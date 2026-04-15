import ClearScopeLogo from './ClearScopeLogo'

interface NavLink {
  label: string
  href: string
  active?: boolean
}

interface NavProps {
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  links?: NavLink[]
}

export default function Nav({
  ctaLabel = 'BOOK NOW',
  ctaHref,
  onCtaClick,
  links = [],
}: NavProps) {
  return (
    <nav
      className="fixed top-0 w-full z-50 bg-[#141414] flex justify-between items-center px-4 py-4"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
      <ClearScopeLogo size="md" />

      {/* Desktop center links */}
      {links.length > 0 && (
        <div className="hidden md:flex items-center gap-6">
          {links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                const isAnchor = link.href.startsWith('#') || link.href.startsWith('/#')
                if (isAnchor) {
                  e.preventDefault()
                  const id = link.href.replace('/#', '').replace('#', '')
                  const el = document.getElementById(id)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="font-mono text-[11px] uppercase tracking-widest transition-none"
              style={{ color: link.active ? '#39D353' : 'rgba(240,237,230,0.55)' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Right CTA */}
      {ctaHref ? (
        <a
          href={ctaHref}
          className="bg-[#39D353] text-[#0D2010] font-mono text-[10px] font-bold px-3 py-2 uppercase tracking-widest"
        >
          {ctaLabel}
        </a>
      ) : (
        <button
          onClick={onCtaClick}
          className="bg-[#39D353] text-[#0D2010] font-mono text-[10px] font-bold px-3 py-2 uppercase tracking-widest"
        >
          {ctaLabel}
        </button>
      )}
    </nav>
  )
}
