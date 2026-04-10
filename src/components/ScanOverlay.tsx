export default function ScanOverlay() {
  return (
    <div className="absolute inset-0 z-10 p-4 flex flex-col justify-between font-mono text-[10px] text-[#39D353] pointer-events-none">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#39D353] animate-pulse" />
            SCANNING_ACTIVE
          </span>
          <span>4K_60FPS</span>
        </div>
        <span>[25.4419° N, 80.1540° W]</span>
      </div>
      {/* Scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(57,211,83,0.08) 1px, transparent 1px)',
          backgroundSize: '100% 4px',
        }}
      />
      <div className="flex justify-between items-end">
        {/* Corner bracket */}
        <div className="w-8 h-8 border-l-2 border-b-2 border-[#39D353]" />
        <div className="text-right">
          <p className="text-2xl font-bold">DEPTH: 12.4FT</p>
          <p>CALIBRATED</p>
        </div>
      </div>
    </div>
  )
}
