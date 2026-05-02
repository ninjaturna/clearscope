import { useTranslation } from 'react-i18next'
import ClearScopeLogo from './ClearScopeLogo'

interface FooterProps {
  includeOperatorLink?: boolean
}

export default function Footer({ includeOperatorLink = false }: FooterProps) {
  const { t } = useTranslation()

  return (
    <footer
      className="bg-[#141414] py-12 px-6 flex flex-col gap-6"
      style={{ borderTop: '1px solid rgba(61,74,59,0.20)' }}
    >
      <ClearScopeLogo size="sm" />

      <p className="font-mono text-[8px] text-[#6B7280] uppercase leading-loose">
        {t('footer.copyright')}<br />
        {t('footer.precision')}
      </p>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-[#39D353]" />
        <span className="font-mono text-[9px] text-[#39D353] uppercase tracking-widest">{t('footer.status')}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <a href="/" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">{t('footer.home')}</a>
          <a href="/blog" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">{t('footer.blog')}</a>
          <a href="/pitch" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">{t('footer.pitch')}</a>
          <a href="/commercial" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">{t('footer.commercial')}</a>
        </div>
        <div className="flex flex-col gap-3">
          <a href="#" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">{t('footer.privacy')}</a>
          <a href="#" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">{t('footer.terms')}</a>
          {includeOperatorLink && (
            <a href="/operators" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">{t('footer.operators')}</a>
          )}
        </div>
      </div>
    </footer>
  )
}
