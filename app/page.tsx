import Image from "next/image";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import { experience, links, packages, services, ticker } from "@/lib/data";
import { site, siteUrl } from "@/lib/site";
import photoWhite from "@/assets/me/white.jpg";
import photoBlack from "@/assets/me/black.jpg";
import photoPlaid from "@/assets/me/plaid.jpg";

const wrap = "mx-auto w-full max-w-7xl px-5 md:px-10";
const section = "py-20 md:py-28";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const sameAs = [links.behance, links.upwork, links.freelancer, links.pexels, links.instagram, links.facebook];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.fullName,
      alternateName: site.name,
      jobTitle: "Senior Graphic Designer",
      description: site.description,
      url: siteUrl,
      image: `${siteUrl}${photoWhite.src}`,
      email: `mailto:${links.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Dinajpur", addressCountry: "BD" },
      knowsAbout: services.map((s) => s.title),
      sameAs,
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: `${site.fullName} — Graphic Design`,
      url: siteUrl,
      image: `${siteUrl}${photoWhite.src}`,
      founder: { "@id": `${siteUrl}/#person` },
      address: { "@type": "PostalAddress", addressLocality: "Dinajpur", addressCountry: "BD" },
      areaServed: "Worldwide",
      priceRange: "$350–$750 / month",
      sameAs,
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Social Media Design Packages",
        itemListElement: packages.map((p) => ({
          "@type": "Offer",
          name: `${p.name} social media package`,
          description: p.blurb,
          price: p.price,
          priceCurrency: "USD",
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.title,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 flex items-center gap-3 text-xs tracking-[0.3em] text-gold uppercase">
      <span className="h-px w-8 bg-gold" />
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-[2.75rem] leading-[0.95] font-light sm:text-6xl md:text-7xl">{children}</h2>;
}

function Stat({ n, suffix, label }: { n: string; suffix: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-4xl font-light md:text-5xl">
        {n}
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-1 text-[11px] tracking-[0.2em] text-muted uppercase">{label}</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Header />

      <main>
        {/* HERO — full bleed, ticker is part of it */}
        <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden md:h-svh md:min-h-[680px]">
          <div className="absolute inset-x-0 top-0 -z-10 h-[62svh] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[50%]">
            <Image
              src={photoWhite}
              alt="MD Mohiul Islam, graphic designer from Dinajpur, Bangladesh"
              preload
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10 md:bg-gradient-to-r md:from-ink md:via-ink/30 md:to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/85 to-transparent" />
          </div>

          <div className={`${wrap} rise flex flex-1 flex-col justify-end pt-[46svh] pb-8 md:min-h-0 md:max-w-none md:justify-center md:pt-28 md:pb-[4svh]`}>
            <div className="md:max-w-[58%] lg:max-w-[46%]">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 md:[@media(max-height:700px)]:hidden px-3 py-1.5 text-xs text-muted backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Available for new projects
              </p>
              <p className="font-serif text-5xl leading-[0.92] font-light sm:text-6xl lg:text-[min(4.5rem,8svh)] xl:text-[min(5.5rem,9svh)]">
                Design that leaves a <em className="text-gold">lasting</em> impression.
              </p>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:mt-[3svh] lg:text-lg">
                Senior graphic designer from Dinajpur, Bangladesh. Trusted by 10+ long-term clients across healthcare,
                media and tech for brand identity, digital design and visual storytelling that converts.
              </p>
              <div className="mt-8 flex flex-col gap-3 whitespace-nowrap sm:flex-row md:mt-[4svh]">
                <a href="#work" data-magnetic className="rounded-full bg-gold px-7 py-3.5 text-center font-medium text-ink">
                  View Portfolio →
                </a>
                <a href="#contact" data-magnetic className="rounded-full border border-line bg-ink/40 px-7 py-3.5 text-center backdrop-blur transition-colors hover:border-paper">
                  Get in Touch
                </a>
              </div>
              <div className="mt-10 grid max-w-sm grid-cols-3 gap-4 md:mt-[5svh] md:[@media(max-height:820px)]:hidden">
                <Stat n="600" suffix="+" label="Projects" />
                <Stat n="10" suffix="+" label="Clients" />
                <Stat n="8" suffix="+" label="Years" />
              </div>
            </div>
          </div>

          <h1 className="px-5 pb-6 text-paper mix-blend-difference md:px-10 md:pb-6">
            <span className="sr-only">MD Mohiul Islam — Graphic Designer & Brand Identity Designer in Bangladesh</span>
            <Logo className="w-full md:w-[min(100%,calc(18svh*5.34))]" />
          </h1>

          <div className="overflow-hidden border-y border-line bg-panel/80 py-4 backdrop-blur md:py-5" aria-hidden>
            <div className="marquee flex w-max gap-8 font-serif text-xl whitespace-nowrap text-muted italic md:gap-10 md:text-2xl">
              {[...ticker, ...ticker].map((t, i) => (
                <span key={i} className="flex items-center gap-8 md:gap-10">
                  {t} <span className="text-sm text-gold not-italic">◆</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className={`${wrap} ${section} grid gap-12 md:grid-cols-[1fr_1.2fr] md:gap-16`}>
          <div className="relative">
            <Image
              src={photoBlack}
              alt="Portrait of Mohiul Islam"
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-xl object-cover object-top grayscale transition duration-700 hover:grayscale-0 md:sticky md:top-28"
            />
          </div>
          <div>
            <Eyebrow>About Me</Eyebrow>
            <H2>
              The designer <em className="text-gold">behind</em> the work
            </H2>
            <div className="mt-8 space-y-5 leading-relaxed text-muted">
              <p>
                I&apos;m Mohiul Islam — a graphic designer based in Dinajpur, Bangladesh, with a deep passion for visual
                storytelling and brand identity. Every pixel I place is intentional; every concept I develop is rooted in
                your audience&apos;s psychology and your brand&apos;s soul.
              </p>
              <p>
                With 600+ projects across Freelancer.com and Upwork, and long-term retainer partnerships spanning
                healthcare, media, and technology, I bring strategic thinking and creative execution to every brief.
              </p>
              <p>
                Beyond design, I&apos;m an active photographer published on{" "}
                <a href={links.pexels} {...ext} className="text-paper underline decoration-gold underline-offset-4">
                  Pexels
                </a>
                , with a keen eye for composition, light, and narrative.
              </p>
            </div>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {experience.map((e) => (
                <li key={e.org} className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">{e.org}</p>
                    <p className="text-sm text-muted">{e.role}</p>
                  </div>
                  <p className="shrink-0 text-right text-sm text-gold">{e.span}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SERVICES */}
        <section id="expertise" className="border-y border-line bg-panel">
          <div className={`${wrap} ${section}`}>
            <Eyebrow>Expertise</Eyebrow>
            <H2>
              What I <em className="text-gold">create</em>
            </H2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
              {services.map((s, i) => (
                <article key={s.title} className="bg-panel p-6 transition-colors hover:bg-ink md:p-8">
                  <p className="text-sm text-gold">0{i + 1}</p>
                  <h3 className="mt-5 font-serif text-3xl md:mt-6">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className={`${wrap} ${section}`}>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Portfolio</Eyebrow>
              <H2>
                Selected <em className="text-gold">works</em>
              </H2>
            </div>
            <a href={links.behance} {...ext} className="py-2 text-sm text-muted transition-colors hover:text-gold">
              Full case studies on Behance →
            </a>
          </div>
          <Gallery />
        </section>

        {/* PRICING */}
        <section id="pricing" className="border-y border-line bg-panel">
          <div className={`${wrap} ${section}`}>
            <Eyebrow>Packages</Eyebrow>
            <H2>
              Social media <em className="text-gold">pricing</em>
            </H2>
            <p className="mt-6 max-w-xl text-muted">Transparent, no-surprise pricing for consistent, high-quality social media content.</p>
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {packages.map((p) => (
                <article
                  key={p.name}
                  className={`relative flex flex-col rounded-xl border p-6 md:p-8 ${p.popular ? "border-gold bg-ink" : "border-line"}`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-1 text-xs font-medium text-ink md:left-8">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-serif text-3xl">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted">{p.blurb}</p>
                  <p className="mt-8 font-serif text-6xl font-light">
                    <span className="text-3xl text-gold">$</span>
                    {p.price}
                    <span className="ml-2 font-sans text-sm text-muted">/ month</span>
                  </p>
                  <ul className="mt-8 flex-1 space-y-3 text-sm">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="text-gold">✦</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`${links.whatsapp}?text=${encodeURIComponent(`Hi Mohiul, I'm interested in the ${p.name} package ($${p.price}/mo)`)}`}
                    {...ext}
                    className={`mt-10 rounded-full px-6 py-3.5 text-center font-medium transition-opacity hover:opacity-85 ${
                      p.popular ? "bg-gold text-ink" : "border border-line"
                    }`}
                  >
                    Start Your Project →
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              Billed monthly. Custom packages available —{" "}
              <a href={links.whatsapp} {...ext} className="text-gold">
                ask for a quote
              </a>
              .
            </p>
          </div>
        </section>

        {/* PLATFORMS */}
        <section className={`${wrap} ${section} grid gap-4 md:grid-cols-2 md:gap-6`}>
          {[
            { name: "Freelancer.com", short: "Freelancer", note: "5-Star Rated · Top Designer", n: "550+", href: links.freelancer },
            { name: "Upwork", short: "Upwork", note: "Top Rated · JSS 100%", n: "50+", href: links.upwork },
          ].map((p) => (
            <a
              key={p.name}
              href={p.href}
              {...ext}
              className="group flex items-end justify-between gap-4 rounded-xl border border-line p-6 transition-colors hover:border-gold md:p-8"
            >
              <div>
                <p className="font-serif text-3xl md:text-4xl">{p.name}</p>
                <p className="mt-2 text-sm text-muted">{p.note}</p>
                <p className="mt-6 text-sm text-gold">Hire me on {p.short} →</p>
              </div>
              <p className="font-serif text-5xl font-light text-muted transition-colors group-hover:text-paper md:text-6xl">{p.n}</p>
            </a>
          ))}
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-line bg-panel">
          <div className={`${wrap} ${section} grid items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16`}>
            <div>
              <Eyebrow>Let&apos;s Work Together</Eyebrow>
              <H2>
                Ready to build something <em className="text-gold">great?</em>
              </H2>
              <p className="mt-8 max-w-lg leading-relaxed text-muted">
                Whether you need a full brand identity, a single logo, or a reliable long-term design partner — I&apos;d love
                to hear about your project.
              </p>
              <div className="mt-10 space-y-3">
                <a href={`mailto:${links.email}`} className="block font-serif text-2xl break-all transition-colors hover:text-gold sm:text-3xl">
                  {links.email}
                </a>
                <a href={links.whatsapp} {...ext} className="block py-2 text-muted hover:text-paper">
                  WhatsApp: {links.whatsappLabel}
                </a>
              </div>
              <a href={`mailto:${links.email}`} data-magnetic className="mt-10 inline-block rounded-full bg-gold px-7 py-3.5 font-medium text-ink">
                Start a Project →
              </a>
              <div className="mt-8 flex flex-wrap gap-x-6 text-sm text-muted">
                {(
                  [
                    ["Freelancer", links.freelancer],
                    ["Upwork", links.upwork],
                    ["Behance", links.behance],
                    ["Pexels", links.pexels],
                    ["Instagram", links.instagram],
                    ["Facebook", links.facebook],
                  ] as const
                ).map(([l, h]) => (
                  <a key={l} href={h} {...ext} className="py-2 hover:text-gold">
                    → {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <Image
                src={photoPlaid}
                alt="Mohiul Islam in Dinajpur, Bangladesh"
                placeholder="blur"
                sizes="(min-width: 768px) 35vw, 100vw"
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
              />
              <p className="mt-4 text-sm text-muted">
                Based in <span className="text-paper">Dinajpur, Bangladesh</span> · Available worldwide, remote-first
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className={`${wrap} py-12`}>
          <a href="#top" aria-label="Back to top" className="block text-paper/90 transition-colors hover:text-gold">
            <Logo className="w-full" />
          </a>
          <div className="mt-8 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 MD Mohiul Islam. All rights reserved.</p>
            <a href="#top" className="py-2 hover:text-gold">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
