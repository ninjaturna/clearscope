interface Stat {
  label: string
  value: string
  body: string
}

export default function ArticleStatBlock({ stats }: { stats: Stat[] }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 my-12"
      style={{ gap: '1px', background: 'rgba(57,211,83,0.15)' }}
    >
      {stats.map(stat => (
        <div key={stat.label} className="bg-white p-8 md:p-10 flex flex-col justify-between">
          <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-widest mb-4">{stat.label}</span>
          <div>
            <span className="font-mono text-4xl md:text-5xl font-bold text-[#39D353]">{stat.value}</span>
            <p className="font-body text-sm font-medium mt-2 text-[#131313]">{stat.body}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
