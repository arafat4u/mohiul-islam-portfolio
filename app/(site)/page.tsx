import { ArrowUpRight, Award, BadgeCheck, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import ContentProvider from "@/components/ContentProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PortfolioBelt from "@/components/PortfolioBelt";
import ProjectInput from "@/components/ProjectInput";
import ServicesCarousel from "@/components/ServicesCarousel";
import StartProject from "@/components/StartProject";
import { waLink, type Content } from "@/lib/content";
import { container, siteUrl } from "@/lib/site";
import { getContent } from "@/lib/store";

const wrap = container;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const badgeIcons = [Star, Award, BadgeCheck];
const platformTones = ["bg-orange text-white", "bg-[#1d2939] text-white", "bg-orange-soft text-ink"];

const abs = (src: string) => (src.startsWith("http") ? src : `${siteUrl}${src}`);

function jsonLd(c: Content) {
  const sameAs = Object.values(c.links).filter(Boolean);
  const address = { "@type": "PostalAddress", addressLocality: c.profile.location.split(",")[0], addressCountry: "BD" };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: c.profile.fullName,
        alternateName: c.profile.name,
        jobTitle: c.profile.role,
        description: c.seo.description,
        url: siteUrl,
        image: abs(c.hero.image),
        email: `mailto:${c.profile.email}`,
        address,
        knowsAbout: c.services.items.map((s) => s.title),
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: `${c.profile.fullName} — ${c.profile.role}`,
        url: siteUrl,
        image: abs(c.hero.image),
        founder: { "@id": `${siteUrl}/#person` },
        address,
        areaServed: "Worldwide",
        sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Social Media Design Packages",
          itemListElement: c.pricing.packages.map((p) => ({
            "@type": "Offer",
            name: `${p.name} package`,
            description: p.blurb,
            price: p.price,
            priceCurrency: "USD",
          })),
        },
      },
      { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl, name: c.seo.title, inLanguage: "en", publisher: { "@id": `${siteUrl}/#person` } },
    ],
  };
}

// Section title in the design's style: dark words with an orange accent phrase.
function Title({ children, accent, after, className = "", light = false }: { children?: React.ReactNode; accent: string; after?: string; className?: string; light?: boolean }) {
  return (
    <h2 className={`text-[2.5rem] leading-[1.08] font-semibold tracking-[-0.01em] sm:text-5xl lg:text-6xl ${light ? "text-white" : "text-navy"} ${className}`}>
      {children} <span className="text-orange">{accent}</span>
      {after}
    </h2>
  );
}

// Little hand-drawn accent strokes from the design.
function Doodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden className={`text-orange ${className}`}>
      <path d="M8 26c3-7 6-12 10-16M18 30c4-6 9-10 15-13M14 36c6-3 13-4 20-3" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function Stars({ size }: { size: string }) {
  return (
    <p className="flex gap-1 text-orange" aria-label="5 star rating">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`${size} fill-current`} />
      ))}
    </p>
  );
}

const notch = {
  WebkitMaskImage: "radial-gradient(circle at calc(100% - 2.6rem) calc(100% - 2.6rem), transparent 3.1rem, #000 3.15rem)",
  maskImage: "radial-gradient(circle at calc(100% - 2.6rem) calc(100% - 2.6rem), transparent 3.1rem, #000 3.15rem)",
};

export default async function Home() {
  const c = await getContent();
  const wa = waLink(c);

  return (
    <ContentProvider value={c}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(c)).replace(/</g, "\\u003c") }} />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-orange px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* HERO */}
        <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
          <div className={`${wrap} relative`}>
            <div className="rise relative z-0 text-center">
              <p className="relative inline-flex min-h-11 items-center rounded-full border border-ink px-5 text-lg font-medium text-ink md:text-xl">
                {c.hero.greeting}
                <Doodle className="absolute -top-6 -right-7 h-8 w-8 rotate-12" />
              </p>
              <h1 className="mt-4 text-[clamp(2.6rem,8.5vw,6.25rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-ink">
                I&apos;m <span className="text-orange">{c.profile.name}</span>,
                <br />
                {c.profile.role}
                <span className="sr-only">
                  {" "}
                  — {c.profile.fullName}, {c.profile.location}
                </span>
              </h1>
            </div>

            <div className="relative mx-auto mt-0 flex max-w-5xl justify-center sm:-mt-8 md:-mt-14">
              <span aria-hidden className="absolute bottom-0 left-1/2 aspect-[2/1] w-[min(96vw,48rem)] -translate-x-1/2 rounded-t-full bg-orange-soft" />
              <div className="relative z-10 aspect-[793/900] w-[min(86vw,36rem)]">
                {c.hero.image && (
                  <Image src={c.hero.image} alt={`${c.profile.fullName}, ${c.profile.role}`} preload fill sizes="(min-width: 768px) 36rem, 86vw" className="object-contain object-bottom" />
                )}
              </div>

              <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/70 bg-white/75 p-1.5 shadow-[0_12px_40px_-12px_rgba(16,24,40,0.35)] backdrop-blur-xl md:bottom-8 md:p-2">
                <a
                  href="#work"
                  data-magnetic
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-orange px-6 text-lg font-semibold whitespace-nowrap text-white md:min-h-14 md:px-8 md:text-xl"
                >
                  Portfolio <ArrowUpRight className="h-5 w-5" />
                </a>
                <StartProject className="min-h-12 rounded-full px-6 text-lg font-semibold whitespace-nowrap text-ink transition-colors hover:text-orange md:min-h-14 md:px-8 md:text-xl">
                  Hire me
                </StartProject>
              </div>

              <div className="absolute top-[38%] left-0 z-20 hidden max-w-[17rem] xl:block">
                <Sparkles className="h-8 w-8 text-navy" />
                <p className="mt-4 text-lg leading-snug font-medium text-navy">{c.hero.note}</p>
              </div>
              <div className="absolute top-[38%] right-0 z-20 hidden text-right xl:block">
                <div className="flex justify-end">
                  <Stars size="h-7 w-7" />
                </div>
                <p className="mt-3 text-5xl font-semibold text-ink">{c.hero.years}</p>
                <p className="mt-1 text-xl text-navy">{c.hero.yearsLabel}</p>
              </div>
            </div>

            {/* the two side notes move under the photo on smaller screens */}
            <div className="grid grid-cols-2 gap-4 py-8 md:mx-auto md:max-w-2xl xl:hidden">
              <div className="rounded-3xl bg-soft p-5">
                <Sparkles className="h-6 w-6 text-navy" />
                <p className="mt-3 text-[15px] leading-snug font-medium text-navy">{c.hero.note}</p>
              </div>
              <div className="rounded-3xl bg-soft p-5">
                <Stars size="h-4 w-4" />
                <p className="mt-3 text-3xl font-semibold text-ink">{c.hero.years}</p>
                <p className="text-[15px] text-navy">{c.hero.yearsLabel}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-[90rem] sm:px-3">
          <div className="dark-block overflow-hidden rounded-[2.5rem] py-16 md:rounded-[3.5rem] md:py-24">
            <div className={wrap}>
              <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-2 lg:items-center">
                <Title accent={c.services.accent} light>
                  {c.services.title}
                </Title>
                <p className="max-w-xl text-lg leading-relaxed text-white/80 lg:justify-self-end">{c.services.lede}</p>
              </div>
              <ServicesCarousel items={c.services.items} />
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className={`${wrap} py-20 md:py-28`}>
          <Title accent={c.experience.accent} className="text-center">
            {c.experience.title}
          </Title>
          <ol className="relative mx-auto mt-14 max-w-6xl md:mt-20">
            <span aria-hidden className="absolute top-3 bottom-3 left-[1.15rem] border-l-2 border-dashed border-navy/40 md:left-1/2 md:-translate-x-1/2" />
            {c.experience.items.map((e, i) => (
              <li key={i} className="relative grid grid-cols-[2.3rem_1fr] gap-x-5 pb-12 last:pb-0 md:grid-cols-[1fr_5rem_1fr] md:gap-x-10 md:pb-16">
                <div className="col-start-2 md:col-start-1 md:row-start-1">
                  <h3 className="text-2xl font-semibold text-navy md:text-4xl">{e.org}</h3>
                  <p className="mt-1 text-lg text-muted md:text-2xl">{e.span}</p>
                </div>
                <span className="col-start-1 row-start-1 flex justify-center pt-1 md:col-start-2">
                  <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-dashed border-navy/50 bg-white">
                    <span className={`h-7 w-7 rounded-full ${i % 2 ? "bg-[#1d2939]" : "bg-orange"}`} />
                  </span>
                </span>
                <div className="col-start-2 mt-3 md:col-start-3 md:row-start-1 md:mt-0">
                  <p className="text-xl font-semibold text-navy md:text-4xl">{e.role}</p>
                  <p className="mt-2 text-base leading-relaxed text-muted md:text-lg">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* WHY HIRE ME / ABOUT */}
        <section id="about" className="mx-auto max-w-[90rem] sm:px-3">
          <div className="rounded-[2.5rem] bg-soft py-16 md:rounded-[3.5rem] md:py-24">
            <div className={`${wrap} grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16`}>
              <div className="relative mx-auto aspect-[795/900] w-full max-w-md [clip-path:inset(-40%_-10%_0_-10%_round_0_0_3rem_3rem)]">
                <span aria-hidden className="absolute inset-x-[8%] top-[16%] bottom-0 rounded-t-full rounded-b-[3rem] bg-orange-soft" />
                {c.about.image && (
                  <Image src={c.about.image} alt={`Portrait of ${c.profile.fullName}`} fill sizes="(min-width: 768px) 28rem, 90vw" className="object-contain object-bottom" />
                )}
              </div>
              <div>
                <Title accent={c.about.accent} after="?">
                  {c.about.title}
                </Title>
                <div className="mt-6 max-w-xl space-y-4 text-lg leading-relaxed text-muted">
                  {c.about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4">
                  {c.about.stats.map((s, i) => (
                    <div key={i}>
                      <dt className="sr-only">{s.label}</dt>
                      <dd className="text-3xl font-semibold text-ink md:text-4xl">{s.value}</dd>
                      <dd className="mt-1 text-[15px] text-navy md:text-lg">{s.label}</dd>
                    </div>
                  ))}
                </dl>
                <StartProject className="mt-10 inline-flex min-h-14 items-center rounded-2xl border border-ink px-10 text-xl font-semibold text-ink transition-colors hover:bg-ink hover:text-white md:min-h-16 md:text-2xl">
                  {c.about.cta}
                </StartProject>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="work" className={`${wrap} overflow-hidden py-20 md:py-28`}>
          <div className="mb-10 flex items-end justify-between gap-6 md:mb-12">
            <Title accent={c.portfolio.accent}>{c.portfolio.title}</Title>
            {c.portfolio.seeAllUrl && (
              <a
                href={c.portfolio.seeAllUrl}
                {...ext}
                className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-orange px-6 text-base font-semibold text-white md:min-h-14 md:px-8 md:text-lg"
              >
                See All
              </a>
            )}
          </div>
          <PortfolioBelt items={c.portfolio.items} categories={c.portfolio.categories} />
        </section>

        {/* PRICING */}
        <section id="pricing" className="mx-auto max-w-[90rem] sm:px-3">
          <div className="dark-block overflow-hidden rounded-[2.5rem] py-16 md:rounded-[3.5rem] md:py-24">
            <div className={wrap}>
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="relative inline-block text-[2.5rem] leading-[1.08] font-semibold text-white sm:text-5xl lg:text-6xl">
                  {c.pricing.title} <br className="hidden sm:block" />
                  <span className="text-orange">{c.pricing.accent}</span>
                  <Doodle className="absolute -top-7 -right-8 hidden h-9 w-9 rotate-12 sm:block" />
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/80">{c.pricing.lede}</p>
              </div>

              <div className="mx-auto mt-12 grid max-w-2xl gap-5 md:mt-16 lg:max-w-none lg:grid-cols-3">
                {c.pricing.packages.map((p, i) => (
                  <article
                    key={i}
                    className={`relative flex flex-col rounded-[2rem] border p-7 backdrop-blur-md md:p-8 ${
                      p.popular ? "border-orange bg-white/[0.08]" : "border-white/15 bg-white/[0.04]"
                    }`}
                  >
                    {p.popular && <span className="absolute -top-3.5 left-7 rounded-full bg-orange px-4 py-1 text-sm font-semibold text-white">Most Popular</span>}
                    <h3 className="text-2xl font-semibold text-white">{p.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/65 lg:min-h-[3lh]">{p.blurb}</p>
                    <p className="mt-6 flex items-baseline gap-1 text-white">
                      <span className="text-2xl text-orange">$</span>
                      <span className="text-6xl leading-none font-semibold">{p.price}</span>
                      <span className="ml-2 text-base text-white/60">/ month</span>
                    </p>
                    <dl className="mt-7 flex-1 divide-y divide-white/10 border-y border-white/10 text-[15px]">
                      {p.items.map((it, j) => (
                        <div key={j} className="flex items-baseline justify-between gap-4 py-3">
                          <dt className="text-white/65">{it.label}</dt>
                          <dd className={it.value === "No" ? "text-white/40" : "text-right font-medium text-white"}>{it.value}</dd>
                        </div>
                      ))}
                    </dl>
                    <a
                      href={waLink(c, `Hi ${c.profile.name}, I'm interested in the ${p.name} package ($${p.price}/mo)`)}
                      {...ext}
                      className={`mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-full text-lg font-semibold transition-colors ${
                        p.popular ? "bg-orange text-white hover:opacity-90" : "border border-white/25 text-white hover:border-orange hover:text-orange"
                      }`}
                    >
                      Choose {p.name} <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </article>
                ))}
              </div>
              <p className="mt-10 text-center text-white/70">
                {c.pricing.note}{" "}
                <a href={wa} {...ext} className="inline-flex min-h-11 items-center font-semibold text-orange underline-offset-4 hover:underline">
                  Ask for a custom quote
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* LET'S DISCUSS */}
        <section className={`${wrap} py-20 text-center md:py-28`}>
          <h2 className="mx-auto max-w-4xl text-[2.5rem] leading-[1.12] font-semibold text-navy sm:text-5xl lg:text-6xl">
            {c.discuss.title} <span className="text-orange">{c.discuss.accent}</span>
          </h2>
          <div className="mx-auto mt-10 max-w-3xl">
            <ProjectInput placeholder={c.discuss.placeholder} />
          </div>
          <ul className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-3 text-[15px] text-ink md:text-base">
            {c.discuss.badges.map((b, i) => {
              const Icon = badgeIcons[i % badgeIcons.length];
              return (
                <li key={i} className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${i === 0 ? "fill-current" : ""}`} /> {b}
                </li>
              );
            })}
          </ul>
        </section>

        {/* TICKER */}
        <div aria-hidden className="relative overflow-hidden py-10 md:py-14">
          <div className="-mx-4 -rotate-2 bg-orange py-5 md:py-7">
            <div className="rotate-[3deg] bg-white py-4 md:py-5">
              <div className="marquee flex w-max items-center gap-8 text-3xl font-medium whitespace-nowrap text-ink md:gap-10 md:text-5xl">
                {[...c.ticker, ...c.ticker].map((t, i) => (
                  <span key={i} className="flex items-center gap-8 md:gap-10">
                    {t}
                    <Sparkles className="h-7 w-7 fill-orange text-orange md:h-9 md:w-9" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PLATFORMS */}
        <section className={`${wrap} py-16 md:py-24`}>
          <Title accent={c.platforms.accent}>{c.platforms.title}</Title>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {c.platforms.items.map((p, i) => (
              <a key={i} href={p.url} {...ext} className="group block">
                <div className="relative">
                  <div style={notch} className={`flex aspect-[16/11] flex-col justify-between rounded-[1.75rem] p-7 ${platformTones[i % platformTones.length]}`}>
                    <p className="text-2xl font-semibold">{p.name}</p>
                    <p>
                      <span className="block text-6xl font-bold md:text-7xl">{p.stat}</span>
                      <span className="text-lg opacity-80">{p.label}</span>
                    </p>
                  </div>
                  <span className="absolute right-0 bottom-0 grid h-[4.4rem] w-[4.4rem] place-items-center rounded-full bg-[#1d2939] text-white transition-colors duration-300 group-hover:bg-orange">
                    <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.75} />
                  </span>
                </div>
                {p.kind && <span className="mt-6 inline-flex min-h-11 items-center rounded-full bg-soft px-5 text-base text-ink">{p.kind}</span>}
                <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-lg text-navy">
                  {p.notes.map((n, j) => (
                    <span key={j} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-orange" />
                      {n}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-2xl text-navy transition-colors group-hover:text-orange md:text-3xl">
                  {p.cta}
                  <span className="whitespace-nowrap">&nbsp;→</span>
                </p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </ContentProvider>
  );
}
