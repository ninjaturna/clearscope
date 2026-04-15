import { useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

type Category = 'ALL' | 'CAST IRON' | 'INDUSTRY WATCH' | 'HOW-TO' | 'GUIDES'

const ARTICLES = [
  {
    category: 'CAST IRON' as Category,
    title: "5 Things Your Plumber Won't Tell You About That $8,000 Quote",
    excerpt: 'How the inspection-to-repair pipeline works — and how to break out of it.',
    readTime: '2 MIN',
    slug: 'plumber-wont-tell-you',
    imgAlt: "Plumber writing on a clipboard near a pipe with diagnostic tools. Grayscale, moody lighting.",
    dataPrompt: "A plumber's hands writing on a repair estimate clipboard. Pipes and wrenches visible in background. Moody dark lighting. High contrast grayscale editorial photography.",
  },
  {
    category: 'HOW-TO' as Category,
    title: 'What a Sewer Camera Inspection Actually Shows You',
    excerpt: 'Deconstructing the visual data of a standard borescope pass.',
    readTime: '4 MIN',
    slug: 'what-inspection-shows',
    imgAlt: "Sewer camera inspection head with LED lights inside a dark pipe. High contrast industrial macro photography.",
    dataPrompt: "A small robotic sewer inspection camera with ring of LED lights photographed inside a dark pipe. The camera is self-leveling. Cinematic industrial photography, high contrast, dark background, slight green tint from the LED.",
  },
  {
    category: 'CAST IRON' as Category,
    title: 'How to Tell If Your South Florida Home Has Cast Iron Pipes',
    excerpt: 'Identification methods and what to do once you know.',
    readTime: '2 MIN',
    slug: 'identify-cast-iron-pipes',
    imgAlt: "Mid-century ranch house exterior in South Florida, showing the style of homes built in the 1960s-70s that typically have cast iron pipes.",
    dataPrompt: "Exterior of a 1960s mid-century ranch style home in South Florida. Low flat roofline, jalousie windows, concrete block construction. Palm tree visible. Late afternoon golden hour light. Documentary grayscale photography.",
  },
  {
    category: 'INDUSTRY WATCH' as Category,
    title: 'The Hidden Cost of the "Free Inspection" Plumbers Offer',
    excerpt: "Why free inspections aren't free and how the economics work.",
    readTime: '3 MIN',
    slug: 'hidden-cost-free-inspection',
    imgAlt: "A plumber's van parked in front of a residential home, 'FREE INSPECTION' text visible on the side. Skeptical, exposé tone.",
    dataPrompt: "Plumbing company van parked in front of a Florida suburban home. 'FREE INSPECTION' visible on van door. The van door is slightly ominous, dark tone. Documentary photography, slightly low angle, overcast light, high contrast grayscale, editorial exposé style.",
  },
  {
    category: 'GUIDES' as Category,
    title: "Sewer Camera vs. Hydro-Jet: What's the Difference?",
    excerpt: "When each service is appropriate and why they're not interchangeable.",
    readTime: '2 MIN',
    slug: 'camera-vs-hydrojet',
    imgAlt: "A high-pressure hydro-jet nozzle next to a sewer camera inspection head. Industrial plumbing equipment comparison. Grayscale photography.",
    dataPrompt: "Side-by-side comparison of a sewer camera inspection head and a hydro-jet nozzle on a concrete floor. Industrial plumbing equipment, cinematic lighting, high contrast grayscale photography.",
  },
]

export default function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('ALL')
  const [email, setEmail] = useState('')

  const categories: Category[] = ['ALL', 'CAST IRON', 'INDUSTRY WATCH', 'HOW-TO', 'GUIDES']

  const filtered = activeCategory === 'ALL'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === activeCategory)

  const featured = ARTICLES[0]
  const grid = filtered.slice(activeCategory === 'ALL' ? 1 : 0)

  return (
    <div className="bg-[#141414] min-h-screen text-[#E8E4DC] font-body">

      <Nav
        ctaLabel="BOOK NOW"
        ctaHref="/waitlist"
        links={[
          { label: 'How It Works', href: '/#how-it-works' },
          { label: 'Pricing',      href: '/#pricing' },
          { label: 'Blog',         href: '/blog', active: true },
          { label: 'Commercial',   href: '/commercial' },
        ]}
      />

      {/* ── BLOG HERO ── */}
      <header className="mt-16 px-6 py-16 md:py-20">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[#39D353] mb-5 uppercase">
          DIAGNOSTIC INTELLIGENCE // SOUTH FLORIDA INFRASTRUCTURE
        </p>
        <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9] mb-7">
          THE FIELD NOTES.
        </h1>
        <p
          className="max-w-md text-[#9CA3AF] text-sm md:text-base pl-5 py-2"
          style={{ borderLeft: '2px solid #39D353' }}
        >
          Everything the plumbing industry doesn't want you to know.
        </p>
      </header>

      {/* ── CATEGORY FILTER BAR ── */}
      <div
        className="sticky z-40 overflow-x-auto"
        style={{ top: '64px', background: 'rgba(20,20,20,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(61,74,59,0.20)', borderBottom: '1px solid rgba(61,74,59,0.20)' }}
      >
        <div className="flex px-6 py-4 gap-8 whitespace-nowrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="font-mono text-[11px] tracking-widest uppercase flex items-center gap-2 transition-none"
              style={{ color: activeCategory === cat ? '#39D353' : '#9CA3AF' }}
            >
              {activeCategory === cat && <span className="w-1.5 h-1.5 bg-[#39D353]" />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── FEATURED ARTICLE ── */}
      {activeCategory === 'ALL' && (
        <section className="p-6 md:p-10">
          <div
            className="bg-[#1C1B1B] grid md:grid-cols-2 overflow-hidden"
            style={{ borderBottom: '4px solid #39D353' }}
          >
            <div className="relative aspect-video md:aspect-auto bg-[#2A2A2A] overflow-hidden">
              <img
                src=""
                alt="Severely corroded cast iron pipe cross-section showing interior decay and channeling. Dark cinematic macro photography."
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 blog-thumb"
                data-prompt="Macro photography of severely corroded cast iron pipe interior. Channeling erosion visible along pipe floor. Rust and mineral buildup. Cinematic dark background, high contrast, black and white with slight green color grade. Borescope POV."
              />
              <div
                className="absolute top-0 left-0 font-mono text-[10px] px-4 py-1 font-bold"
                style={{ background: '#39D353', color: '#0D2010' }}
              >
                FEATURED
              </div>
            </div>
            <div className="p-8 md:p-14 flex flex-col justify-center">
              <span className="font-mono text-[10px] text-[#39D353] mb-4 uppercase tracking-widest">
                {featured.category} // APRIL 2026
              </span>
              <h2 className="font-headline text-2xl md:text-4xl font-bold leading-tight mb-6 uppercase">
                CAST IRON PIPES IN SOUTH FLORIDA: THE 50-YEAR TIME BOMB UNDER YOUR FOUNDATION
              </h2>
              <p className="text-[#9CA3AF] text-sm mb-8 leading-relaxed">
                An autopsy of post-war plumbing systems across the Miami-Dade corridor. Why standard repairs fail and how precision diagnostics identify the terminal point.
              </p>
              <a
                href="/blog/cast-iron-pipes-south-florida"
                className="font-mono text-[11px] tracking-widest font-bold flex items-center gap-4 uppercase text-[#E8E4DC] hover:text-[#39D353] transition-colors"
              >
                READ ARTICLE
                <span className="material-symbols-outlined text-[#39D353]" style={{ fontSize: '18px' }}>arrow_right_alt</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLE GRID ── */}
      <section className="px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {grid.map(article => (
            <article key={article.slug} className="flex flex-col group cursor-pointer">
              <a href={`/blog/${article.slug}`}>
                <div className="aspect-square bg-[#1C1B1B] mb-5 overflow-hidden relative">
                  <img
                    src=""
                    alt={article.imgAlt}
                    className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-60 transition-opacity blog-thumb"
                    data-prompt={article.dataPrompt}
                  />
                </div>
                <span className="font-mono text-[9px] text-[#39D353] uppercase tracking-widest font-bold mb-2 block">
                  {article.category}
                </span>
                <h3 className="font-headline text-lg text-white font-bold uppercase leading-tight mb-3 group-hover:text-[#39D353] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[#9CA3AF] text-xs mb-5 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div
                  className="mt-auto pt-4 flex justify-between items-center"
                  style={{ borderTop: '1px solid rgba(61,74,59,0.15)' }}
                >
                  <span className="font-mono text-[9px] text-[#6B7280] uppercase">{article.readTime} READ</span>
                  <span className="material-symbols-outlined text-[#6B7280]" style={{ fontSize: '18px' }}>add</span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── TOPIC CLUSTERS ── */}
      <section className="bg-[#F0EDE6] py-20 px-6">
        <div className="flex justify-between items-end mb-14">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold tracking-tighter uppercase text-[#1A1A1A]">Explore by Topic</h2>
          <a
            href="/blog"
            className="font-mono text-[10px] text-[#1A1A1A] uppercase tracking-widest"
            style={{ borderBottom: '2px solid #1A1A1A', paddingBottom: '2px' }}
          >
            Browse All
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {[
            {
              n: '01 /',
              title: 'Cast Iron Research',
              body: "Everything you need to know about cast iron pipe lifespan, failure signs, and South Florida's aging housing stock.",
              href: '/blog?category=CAST+IRON',
            },
            {
              n: '02 /',
              title: 'Industry Watch',
              body: 'How the plumbing repair industry works — and why an independent inspection changes the game.',
              href: '/blog?category=INDUSTRY+WATCH',
            },
            {
              n: '03 /',
              title: 'Diagnostic Guides',
              body: 'What to expect from a camera inspection, how to read the footage, and what to do with the results.',
              href: '/blog?category=GUIDES',
            },
          ].map(cluster => (
            <a
              key={cluster.n}
              href={cluster.href}
              className="p-10 md:p-12 block hover:bg-white transition-colors"
              style={{ border: '1px solid rgba(26,26,26,0.10)' }}
            >
              <span className="font-mono text-[11px] text-[#39D353] font-bold mb-6 block">{cluster.n}</span>
              <h4 className="font-headline text-2xl font-bold mb-4 text-[#1A1A1A] uppercase">{cluster.title}</h4>
              <p className="text-sm text-[#1A1A1A] opacity-70 leading-relaxed">{cluster.body}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="px-6 py-20">
        <div
          className="flex flex-col md:flex-row gap-10 items-center p-8 md:p-14"
          style={{ border: '1px solid rgba(57,211,83,0.20)' }}
        >
          <div className="flex-1">
            <h2 className="font-headline text-2xl font-bold mb-3 uppercase">Intelligence Brief</h2>
            <p className="font-mono text-[12px] text-[#9CA3AF] tracking-wide leading-relaxed uppercase">
              New articles, inspection findings, and industry exposés straight to your inbox.
            </p>
          </div>
          <div className="w-full md:w-auto flex flex-col gap-3">
            <input
              type="email"
              placeholder="EMAIL_ADDRESS"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="bg-[#2A2A2A] text-white font-mono text-xs p-4 w-full md:w-72 placeholder-[#6B7280]"
              style={{ outline: 'none', border: 'none' }}
            />
            <button className="bg-[#39D353] text-[#0D2010] font-mono text-[10px] font-bold p-4 uppercase tracking-widest w-full">
              SUBSCRIBE
            </button>
            <p className="font-mono text-[9px] text-[#6B7280] uppercase">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
