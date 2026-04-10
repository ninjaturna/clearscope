interface PullquoteProps {
  quote: string
  attribution?: string
}

export default function ArticlePullquote({ quote, attribution }: PullquoteProps) {
  return (
    <div
      className="bg-[#141414] p-8 md:p-10 my-12"
      style={{ borderLeft: '3px solid #39D353' }}
    >
      <p className="font-headline font-bold text-2xl md:text-3xl text-white leading-tight uppercase italic">
        {quote}
      </p>
      {attribution && (
        <p className="font-mono text-[10px] text-[#39D353] mt-5 tracking-[0.2em] font-bold uppercase">
          {attribution}
        </p>
      )}
    </div>
  )
}
