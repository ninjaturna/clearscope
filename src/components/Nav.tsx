import { useTranslation } from 'react-i18next'
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

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'ht', label: 'HT' },
  { code: 'pt', label: 'PT' },
]

export default function Nav({
  ctaLabel,
  ctaHref,
  onCtaClick,
  links = [],
}: NavProps) {
  const { t, i18n } = useTranslation()

  const resolvedCta = ctaLabel ?? t('nav.bookNow')

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

      {/* Right side: language picker + CTA */}
      <div className="flex items-center gap-3">
        {/* Language picker */}
        <div className="flex items-center gap-1">
          {LANGS.map((lang, i) => (
            <span key={lang.code} className="flex items-center">
              <button
                onClick={() => i18n.changeLanguage(lang.code)}
                className="font-mono text-[9px] uppercase tracking-widest transition-none"
                style={{ color: i18n.resolvedLanguage === lang.code ? '#39D353' : 'rgba(240,237,230,0.3)' }}
              >
                {lang.label}
              </button>
              {i < LANGS.length - 1 && (
                <span className="font-mono text-[9px] ml-1 mr-0" style={{ color: 'rgba(240,237,230,0.15)' }}>|</span>
              )}
            </span>
          ))}
        </div>

        {/* CTA */}
        {ctaHref ? (
          <a
            href={ctaHref}
            className="bg-[#39D353] text-[#0D2010] font-mono text-[10px] font-bold px-3 py-2 uppercase tracking-widest"
          >
            {resolvedCta}
          </a>
        ) : (
          <button
            onClick={onCtaClick}
            className="bg-[#39D353] text-[#0D2010] font-mono text-[10px] font-bold px-3 py-2 uppercase tracking-widest"
          >
            {resolvedCta}
          </button>
        )}
      </div>
    </nav>
  )
}
