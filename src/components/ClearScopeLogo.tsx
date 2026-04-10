interface ClearScopeLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ClearScopeLogo({ size = 'md', className = '' }: ClearScopeLogoProps) {
  const config = {
    sm: { text: 'text-sm',  ring: 14, outerR: 5.5, innerR: 3.2, tick: 1.5, gap: '0px 1px' },
    md: { text: 'text-xl',  ring: 20, outerR: 8,   innerR: 4.8, tick: 2,   gap: '0px 2px' },
    lg: { text: 'text-4xl', ring: 40, outerR: 16,  innerR: 9.6, tick: 3,   gap: '0px 3px' },
  }[size]

  const cx = config.ring / 2
  const cy = config.ring / 2

  return (
    <div className={`flex items-center font-headline font-extrabold tracking-tighter uppercase select-none ${className}`}>
      <span className={`${config.text} text-[#F0EDE6]`}>CLEARSC</span>
      {/* Aperture O — SVG inline, zero CSS border-radius */}
      <svg
        width={config.ring}
        height={config.ring}
        viewBox={`0 0 ${config.ring} ${config.ring}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ margin: config.gap, flexShrink: 0 }}
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle cx={cx} cy={cy} r={config.outerR} stroke="#39D353" strokeWidth="1.2" />
        {/* Inner ring */}
        <circle cx={cx} cy={cy} r={config.innerR} stroke="#39D353" strokeWidth="0.8" />
        {/* Registration marks — 12, 3, 6, 9 o'clock */}
        {/* 12 */}
        <line x1={cx} y1={cy - config.outerR - 0.5} x2={cx} y2={cy - config.outerR + config.tick} stroke="#39D353" strokeWidth="1" />
        {/* 3 */}
        <line x1={cx + config.outerR + 0.5} y1={cy} x2={cx + config.outerR - config.tick} y2={cy} stroke="#39D353" strokeWidth="1" />
        {/* 6 */}
        <line x1={cx} y1={cy + config.outerR + 0.5} x2={cx} y2={cy + config.outerR - config.tick} stroke="#39D353" strokeWidth="1" />
        {/* 9 */}
        <line x1={cx - config.outerR - 0.5} y1={cy} x2={cx - config.outerR + config.tick} y2={cy} stroke="#39D353" strokeWidth="1" />
      </svg>
      <span className={`${config.text} text-[#F0EDE6]`}>PE</span>
    </div>
  )
}
