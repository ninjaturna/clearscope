interface CalloutProps {
  label: string
  headline: string
  body: string
  imageUrl?: string
  imageCaption?: string
  imageAlt?: string
  imageDataPrompt?: string
}

export default function ArticleCallout({ label, headline, body, imageUrl, imageCaption, imageAlt, imageDataPrompt }: CalloutProps) {
  return (
    <div className="bg-[#1C1B1B] p-8 my-12 text-white">
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest block mb-1">{label}</span>
          <h3 className="font-headline text-xl font-bold uppercase tracking-tight">{headline}</h3>
        </div>
        <span
          className="material-symbols-outlined text-[#39D353]"
          style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}
        >
          grid_view
        </span>
      </div>
      {imageUrl && (
        <div className="aspect-video w-full bg-[#131313] overflow-hidden mb-5 relative">
          <img src={imageUrl} alt={imageAlt ?? headline} className="w-full h-full object-cover opacity-40 grayscale" data-prompt={imageDataPrompt} />
          <div className="absolute inset-0" style={{ border: '1px solid rgba(57,211,83,0.10)' }} />
          {imageCaption && (
            <div className="absolute bottom-3 left-3 font-mono text-[10px] text-[#39D353]">{imageCaption}</div>
          )}
        </div>
      )}
      <p className="font-mono text-xs leading-relaxed text-[#6B7280]">{body}</p>
    </div>
  )
}
