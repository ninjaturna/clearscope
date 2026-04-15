import ClearScopeLogo from './ClearScopeLogo'

interface FooterProps {
  includeOperatorLink?: boolean
}

export default function Footer({ includeOperatorLink = false }: FooterProps) {
  return (
    <footer
      className="bg-[#141414] py-12 px-6 flex flex-col gap-6"
      style={{ borderTop: '1px solid rgba(61,74,59,0.20)' }}
    >
      <ClearScopeLogo size="sm" />

      <p className="font-mono text-[8px] text-[#6B7280] uppercase leading-loose">
        ©2025 CLEARSCOPE DIAGNOSTICS. NORTH MIAMI BEACH, FL.<br />
        PRECISION MANDATORY.
      </p>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-[#39D353]" />
        <span className="font-mono text-[9px] text-[#39D353] uppercase tracking-widest">SYSTEM_STATUS: ONLINE</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          <a href="/" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">HOME</a>
          <a href="/blog" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">BLOG</a>
          <a href="/pitch" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">PITCH</a>
          <a href="/commercial" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">COMMERCIAL</a>
        </div>
        <div className="flex flex-col gap-3">
          <a href="#" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">PRIVACY</a>
          <a href="#" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">TERMS</a>
          {includeOperatorLink && (
            <a href="/operators" className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest hover:text-[#39D353]">OPERATORS</a>
          )}
        </div>
      </div>
    </footer>
  )
}
