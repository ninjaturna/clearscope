interface StickyBarProps {
  onBookClick?: () => void
}

export default function StickyBar({ onBookClick }: StickyBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 w-full z-50 flex items-center"
      style={{
        background: 'rgba(28, 27, 27, 0.85)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(61, 74, 59, 0.20)',
        boxShadow: '0 -4px 24px rgba(57, 211, 83, 0.06)',
        height: '56px',
      }}
    >
      {/* Primary CTA */}
      <button
        onClick={onBookClick}
        className="flex-1 h-full flex items-center justify-center gap-2 bg-[#39D353] text-[#0D2010] font-mono text-[11px] font-bold uppercase tracking-widest"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_today</span>
        JOIN WAITLIST — FREE
      </button>
      {/* Call button */}
      <a
        href="tel:"
        className="w-16 h-full flex flex-col items-center justify-center gap-1 bg-transparent"
      >
        <span className="material-symbols-outlined text-[#F0EDE6]" style={{ fontSize: '18px' }}>phone</span>
        <span className="font-mono text-[9px] text-[#6B7280] uppercase">CALL</span>
      </a>
    </div>
  )
}
