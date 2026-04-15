import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ArticlePullquote from '../components/ArticlePullquote'
import ArticleCallout from '../components/ArticleCallout'
import ArticleStatBlock from '../components/ArticleStatBlock'
import ArticleCTA from '../components/ArticleCTA'

export default function BlogArticlePage() {
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

      {/* ── ARTICLE HEADER ── */}
      <header className="mt-16 bg-[#141414] pt-12 pb-16 px-6 md:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#6B7280] mb-10">
          <a href="/" className="hover:text-[#39D353]">CLEARSCOPE.PRO</a>
          <span className="text-[#39D353]">//</span>
          <a href="/blog" className="hover:text-[#39D353]">BLOG</a>
          <span className="text-[#39D353]">//</span>
          <span className="text-white">CAST IRON PIPES</span>
        </nav>

        {/* Category badge */}
        <div
          className="inline-block px-3 py-1 mb-8 font-mono text-[10px] tracking-widest text-[#39D353] font-bold uppercase"
          style={{ border: '1px solid #39D353' }}
        >
          CAST IRON EDUCATION
        </div>

        {/* Article headline */}
        <h1 className="font-headline font-extrabold text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-white mb-10 uppercase">
          Cast Iron Pipes in South Florida: The 50-Year Time Bomb Under Your Foundation
        </h1>

        {/* Byline */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 font-mono text-[10px] tracking-[0.2em] text-[#6B7280]">
          <div className="flex items-center gap-2">
            <span className="text-[#39D353]">BY</span>
            <span className="text-white">CLEARSCOPE DIAGNOSTICS</span>
          </div>
          <span className="hidden md:block text-[#3D4A3B]">//</span>
          <span>APRIL 2026</span>
          <span className="hidden md:block text-[#3D4A3B]">//</span>
          <span>2 MIN READ</span>
        </div>
      </header>

      {/* ── HERO IMAGE WITH GRID OVERLAY ── */}
      <section className="w-full h-[320px] md:h-[530px] relative overflow-hidden bg-black">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuByzCFiHpCpy9SQpLujv1ar1UJQi_oHVCOqvDQwKJ80SFa8CT7oO6GJsVWMFac6Jpmk5I7km3umgIQ0kY76r7ico_Nzzwxdluwv3TuGARWfXbSUio-H2dxSV46FA-4aqlyfVsyKL6F2F45PuTn_Iz8cGpX3bAj9MBw_tnckX8fXCYNBLQ_xyMMvraIe5YZE3X2jr077YStNIDE5zoAuxx0rbWQYdGLkb5swe6S5a-xYubGzChzaDoLT2Nwc1VlpA-r2XVo5Ky2xvDB1"
          alt="Close-up cross-section of a severely corroded cast iron sewer pipe, showing heavy rust, channeling damage, and orange-brown oxidation buildup on the interior walls. Industrial macro photography, dark cinematic lighting, high contrast black and white with green tint."
          className="w-full h-full object-cover grayscale opacity-60"
          data-prompt="Macro photography of a corroded cast iron sewer pipe cross-section interior. Heavy rust, channeling erosion along the pipe floor, orange-brown mineral buildup. Cinematic industrial lighting, deep shadows. Black and white with slight green color grade. Shot with a borescope camera lens."
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{ borderRight: i < 3 ? '1px solid rgba(57,211,83,0.10)' : 'none' }}
            />
          ))}
        </div>
        {/* Scan labels */}
        <div
          className="absolute top-6 left-6 font-mono text-[10px] px-3 py-1 font-bold"
          style={{ background: '#39D353', color: '#0D2010' }}
        >
          EDITORIAL_SCAN // NMB_INFRASTRUCTURE
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#39D353] flex flex-col items-end">
          <span>COORD: 25.7617° N, 80.1918° W</span>
          <span className="font-bold">CAST_IRON_SERIES_04</span>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="bg-[#F0EDE6] text-[#1A1A1A] py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <p className="font-body text-xl md:text-2xl font-medium leading-relaxed mb-12">
            Every home built in Miami before 1975 was plumbed in cast iron. While intended to last for generations,
            the unique chemistry of South Florida's porous limestone shelf and humid atmosphere has accelerated a
            silent decay process that is currently threatening billions in property value.
          </p>

          <div className="font-body text-lg leading-relaxed space-y-8 mb-12">
            <p>When these pipes were installed, they were the gold standard. Today, they are the primary source of catastrophic plumbing failure and structural foundation damage. Unlike copper or PVC, cast iron fails from the inside out — meaning by the time you see a leak, the pipe has likely been non-functional for years.</p>
            <p>ClearScope has mapped residential drainage systems across North Miami Beach and Coral Gables. The findings are consistent: the average lifespan of these systems in the Florida environment is 40 to 60 years. We are now in the critical failure window for most of the region's mid-century housing stock.</p>
          </div>

          <ArticlePullquote
            quote='"The question is no longer IF your cast iron pipes will fail, but rather how much foundation you will lose when they do."'
            attribution="CHIEF DIAGNOSTIC OFFICER // CLEARSCOPE"
          />

          <ArticleCallout
            label="Cross-Section Analysis"
            headline="Stage 4 Channeling"
            body="Visualizing the breakdown of the pipe's floor (Channeling). This allows raw sewage to exit the pipe and erode the soil directly beneath your foundation, leading to sinkhole pockets and cracked terrazzo or tile floors."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuD8mSJBHdMzbS8hGSL2AQ4WULbcDV3iEsKS_3R6B1ywIgBG23JYhFyh5zXYnuLdLyU0WD_B5Cr1HluVlDHQi1KaGsXjyFRbP0rrpWgxq76BKf_4NLtOo2VCou586joNA-pKmKWC9XEyXheium9-9r-oSCztKc1WdLKnVLcQ4maeKHa1rB2jiHOTie0VkGQGPMIuJ2v3krLocDKBkO6ZWOzT6T45px-fwhn9s3dnbUTyN_BRWlPtiL0WE-X9SO1IQejKb9HpuWmWSs4i"
            imageCaption="FIG_02: OXIDATION_CAVITY"
            imageAlt="Technical diagram showing cross-section of a cast iron pipe with Stage 4 channeling erosion. The pipe floor is eaten away in a channel pattern, exposing bare metal. Labeled diagram style, dark background, green diagnostic overlay lines."
            imageDataPrompt="Cross-section technical diagram of a cast iron pipe interior showing Stage 4 channeling erosion. The bottom of the pipe is completely eaten through in a channel pattern. Scientific illustration style, dark background #141414, Scope Green #39D353 overlay markings and callout lines. High contrast industrial."
          />

          <div className="font-body text-lg leading-relaxed space-y-8 mb-4">
            <p>Traditional plumbers suggest a 'repair as you go' approach. This is akin to patching a sinking ship one hole at a time. ClearScope utilizes high-definition borescope imaging to map the entire network before the concrete needs to be cut.</p>
          </div>

          <ArticleStatBlock
            stats={[
              { label: 'Saturation Rate',  value: '57%',       body: 'Of North Miami Beach homes analyzed show active Stage 3 pipe decay.' },
              { label: 'Critical Window',  value: '25–30 yrs', body: "Years earlier than national averages due to South Florida's water table." },
              { label: 'Replacement Cost', value: '$8K–$50K',  body: 'The financial impact of a full home tunnel and replacement project.' },
              { label: 'Diagnostic Entry', value: '$149',       body: 'The cost of a ClearScope Level 1 Diagnostic Session.' },
            ]}
          />

          <ArticleCTA />

        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      <section className="bg-[#141414] py-20 px-6">
        <div
          className="flex items-center justify-between mb-12"
          style={{ borderBottom: '1px solid rgba(57,211,83,0.10)', paddingBottom: '16px' }}
        >
          <h2 className="font-mono text-xs tracking-[0.4em] text-[#39D353] font-bold uppercase">Further Intelligence</h2>
          <a href="/blog" className="font-mono text-[10px] text-white uppercase tracking-widest hover:text-[#39D353]">View Archive</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              category: 'INDUSTRY WATCH',
              title: "5 Things Your Plumber Won't Tell You About That $8,000 Quote",
              readTime: '2 MIN READ',
              imgAlt: "A plumber's invoice on a clipboard showing an inflated repair quote, partially visible dollar amounts. Dark moody lighting, shallow depth of field, high contrast black and white.",
              dataPrompt: "Close-up of a paper plumbing repair invoice on a clipboard with a large dollar amount visible. Moody dark background, shallow depth of field, high contrast grayscale. The numbers suggest a large unexpected bill. Editorial photography style.",
            },
            {
              category: 'HOW-TO',
              title: 'What a Sewer Camera Inspection Actually Shows You',
              readTime: '4 MIN READ',
              imgAlt: "First-person POV of a sewer camera being inserted into a dark pipe cleanout. The camera head with LED lights is visible entering the opening. Dark, industrial, high contrast.",
              dataPrompt: "First-person point-of-view shot of a small camera inspection head with bright LED lights being guided into a residential sewer cleanout port. Concrete surround, dark pipe interior visible ahead. Cinematic, high contrast, industrial lighting.",
            },
            {
              category: 'GUIDES',
              title: 'How to Tell if Your South Florida Home Has Cast Iron Pipes',
              readTime: '2 MIN READ',
              imgAlt: "Underside of a mid-century South Florida home showing exposed cast iron drain pipes in the crawl space or under a concrete slab. Pipes show surface rust. Natural light, documentary style.",
              dataPrompt: "Under-slab view of exposed cast iron plumbing pipes in a 1960s South Florida home. Pipes show surface oxidation and rust. Concrete slab visible above. Documentary photography, natural ambient light, high contrast grayscale, editorial style.",
            },
          ].map(card => (
            <article key={card.title} className="flex flex-col cursor-pointer group">
              <div className="aspect-square bg-[#1C1B1B] mb-5 overflow-hidden">
                <img
                  src=""
                  alt={card.imgAlt}
                  className="w-full h-full object-cover grayscale opacity-60 blog-thumb"
                  data-prompt={card.dataPrompt}
                />
              </div>
              <span className="font-mono text-[9px] text-[#39D353] uppercase tracking-widest font-bold mb-2">{card.category}</span>
              <h3 className="font-headline text-lg text-white font-bold uppercase leading-tight mb-4 group-hover:text-[#39D353] transition-colors">
                {card.title}
              </h3>
              <div
                className="mt-auto pt-4 flex justify-between items-center"
                style={{ borderTop: '1px solid rgba(61,74,59,0.15)' }}
              >
                <span className="font-mono text-[9px] text-[#6B7280] uppercase">{card.readTime}</span>
                <span className="material-symbols-outlined text-[#6B7280]" style={{ fontSize: '18px' }}>add</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-[#0E0E0E] py-24 px-6 text-center">
        <h2 className="font-headline font-extrabold text-4xl md:text-5xl text-white uppercase tracking-tighter leading-none mb-8">
          Your pipes have a story.<br />We have the tools to read it.
        </h2>
        <a
          href="/waitlist"
          className="inline-block bg-[#39D353] text-[#0D2010] font-mono font-bold text-sm px-12 py-5 uppercase tracking-widest"
        >
          BOOK MY $149 INSPECTION
        </a>
        <p className="font-mono text-[10px] text-[#6B7280] mt-6 uppercase tracking-[0.3em]">
          SERVING NORTH MIAMI BEACH // 33160 // 33162
        </p>
      </section>

      <Footer />
    </div>
  )
}
