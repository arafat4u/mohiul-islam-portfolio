import Image from "next/image";
import CopyEmail from "@/components/CopyEmail";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import StartProject from "@/components/StartProject";
import ServiceCards from "@/components/ServiceCards";
import { experience, links, packages, services, ticker } from "@/lib/data";
import { container, site, siteUrl } from "@/lib/site";
import photoWhite from "@/assets/me/white.jpg";
import photoBlack from "@/assets/me/black.jpg";
import photoPlaid from "@/assets/me/plaid.jpg";

const wrap = container;
const section = "py-20 md:py-28 lg:py-32";
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
  return <h2 className="font-serif text-[2.75rem] leading-[0.95] font-light tracking-[-0.01em] sm:text-6xl lg:text-7xl">{children}</h2>;
}

// One header pattern for every section: label + title on the left, supporting copy on the right.
function SectionHeader({
  eyebrow,
  title,
  lede,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <H2>{title}</H2>
      </div>
      {(lede || aside) && (
        <div className="max-w-md space-y-4 lg:justify-self-end lg:pb-2">
          {lede && <p className="leading-relaxed text-muted md:text-[17px]">{lede}</p>}
          {aside}
        </div>
      )}
    </div>
  );
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

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} {...ext} className="group inline-flex items-center gap-2 py-2 text-sm text-paper">
      <span className="border-b border-gold/50 pb-0.5 transition-colors group-hover:border-gold">{children}</span>
      <span className="text-gold transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* HERO — full bleed, ticker is part of it */}
        <section id="top" className="relative isolate flex min-h-svh flex-col overflow-hidden md:h-svh md:min-h-[640px]">
          <div className="absolute inset-x-0 top-0 -z-10 h-[62svh] md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[54%] lg:w-[52%]">
            <Image
              src={photoWhite}
              alt="MD Mohiul Islam, graphic designer from Dinajpur, Bangladesh"
              preload
              fill
              placeholder="blur"
              sizes="(min-width: 768px) 54vw, 100vw"
              className="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10 md:bg-[linear-gradient(90deg,var(--color-ink)_0%,rgb(13_13_12/0.55)_22%,transparent_50%)]" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink/85 to-transparent" />
          </div>

          <div className={`${wrap} rise flex flex-1 flex-col justify-end pt-[46svh] pb-8 md:min-h-0 md:justify-center md:pt-24 md:pb-[3svh]`}>
            <div className="md:w-[56%] lg:w-[52%]">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-3.5 py-1.5 text-xs text-muted backdrop-blur md:mb-[3svh] md:text-[13px] md:[@media(max-height:760px)]:hidden">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Available for new projects
              </p>
              <p className="font-serif text-5xl leading-[0.95] font-light tracking-[-0.01em] sm:text-6xl md:text-[min(clamp(3rem,4.9vw,4.9rem),9.5svh)]">
                Design that leaves a <em className="text-gold">lasting</em> impression.
              </p>
              <p className="mt-6 max-w-[34rem] text-base leading-relaxed text-muted md:mt-[3svh] md:text-[clamp(1rem,1.1vw,1.25rem)]">
                Senior graphic designer from Dinajpur, Bangladesh. Trusted by 10+ long-term clients across healthcare,
                media and tech for brand identity, digital design and visual storytelling that converts.
              </p>
              <div className="mt-8 flex flex-col gap-3 whitespace-nowrap sm:flex-row md:mt-[4svh] md:text-[clamp(0.95rem,0.95vw,1.1rem)]">
                <a href="#work" data-magnetic className="rounded-full bg-gold px-8 py-4 text-center font-medium text-ink">
                  View Portfolio →
                </a>
                <a href="#contact" data-magnetic className="rounded-full border border-line bg-ink/40 px-8 py-4 text-center backdrop-blur transition-colors hover:border-paper">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          <h1 className={`${wrap} pb-6 text-paper mix-blend-difference md:pb-[3svh]`}>
            <span className="sr-only">MD Mohiul Islam — Graphic Designer & Brand Identity Designer in Bangladesh</span>
            <Logo className="w-full md:w-[min(100%,calc(22svh*5.34))]" />
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
        <section id="about" className={`${wrap} ${section} grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-24`}>
          <div>
            <figure className="relative overflow-hidden rounded-2xl md:sticky md:top-28">
              <Image
                src={photoBlack}
                alt="Portrait of Mohiul Islam"
                placeholder="blur"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="aspect-[4/5] w-full object-cover object-top transition duration-700 lg:grayscale lg:hover:grayscale-0"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full border border-line bg-ink/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
                Based in <span className="text-paper">Dinajpur, Bangladesh</span>
              </figcaption>
            </figure>
          </div>
          <div>
            <Eyebrow>About Me</Eyebrow>
            <H2>
              The designer <em className="text-gold">behind</em> the work
            </H2>
            <div className="mt-8 max-w-[62ch] space-y-5 leading-relaxed text-muted md:text-[17px]">
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
            <div className="mt-12 grid grid-cols-3 gap-4 border-y border-line py-8">
              <Stat n="600" suffix="+" label="Projects" />
              <Stat n="10" suffix="+" label="Long-term clients" />
              <Stat n="8" suffix="+" label="Years active" />
            </div>
            <h3 className="mt-12 mb-2 text-xs tracking-[0.3em] text-muted uppercase">Experience</h3>
            <ul className="divide-y divide-line border-b border-line">
              {experience.map((e) => (
                <li key={e.org} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <p className="text-[17px] font-medium">{e.org}</p>
                    <p className="text-sm text-muted">{e.role}</p>
                  </div>
                  <p className="shrink-0 rounded-full border border-line px-3 py-1 text-right text-xs text-gold">{e.span}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* EXPERTISE */}
        <section id="expertise" className="border-y border-line bg-panel">
          <div className={`${wrap} ${section}`}>
            <SectionHeader
              eyebrow="Expertise"
              title={
                <>
                  What I <em className="text-gold">create</em>
                </>
              }
              lede="Six disciplines, one standard: strategy-led design that looks considered and performs in the real world."
            />
            <ServiceCards />
          </div>
        </section>

        {/* WORK */}
        <section id="work" className={`${wrap} ${section}`}>
          <SectionHeader
            eyebrow="Portfolio"
            title={
              <>
                Selected <em className="text-gold">works</em>
              </>
            }
            lede="A cross-section of recent identity, social and packaging work for clients in finance, hospitality, law and retail."
            aside={<ArrowLink href={links.behance}>Full case studies on Behance</ArrowLink>}
          />
          <Gallery />
        </section>

        {/* PRICING */}
        <section id="pricing" className="border-y border-line bg-panel">
          <div className={`${wrap} ${section}`}>
            <SectionHeader
              eyebrow="Packages"
              title={
                <>
                  Social media <em className="text-gold">pricing</em>
                </>
              }
              lede="Transparent monthly packages for consistent, high-quality social content. No setup fees, no surprises."
            />
            <div className="mx-auto grid max-w-2xl gap-6 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
              {packages.map((p) => (
                <article
                  key={p.name}
                  className={`relative flex flex-col rounded-2xl border p-7 md:p-9 ${
                    p.popular
                      ? "border-gold bg-ink shadow-[0_30px_80px_-30px_rgba(201,164,92,0.35)]"
                      : "border-line"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 text-xs font-medium text-ink md:left-9">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-serif text-3xl">{p.name}</h3>
                  <p className="mt-2 min-h-[3lh] text-sm leading-relaxed text-muted">{p.blurb}</p>
                  <p className="mt-6 flex items-baseline gap-1 font-serif font-light">
                    <span className="text-3xl text-gold">$</span>
                    <span className="text-7xl leading-none">{p.price}</span>
                    <span className="ml-2 font-sans text-sm text-muted">/ month</span>
                  </p>
                  <dl className="mt-8 flex-1 divide-y divide-line border-y border-line text-sm">
                    {p.items.map((it) => {
                      const [label, value] = it.split(" — ");
                      return (
                        <div key={it} className="flex items-baseline justify-between gap-4 py-3">
                          <dt className="text-muted">{label}</dt>
                          <dd className={`text-right ${value === "No" ? "text-muted/60" : "text-paper"}`}>{value}</dd>
                        </div>
                      );
                    })}
                  </dl>
                  <a
                    href={`${links.whatsapp}?text=${encodeURIComponent(`Hi Mohiul, I'm interested in the ${p.name} package ($${p.price}/mo)`)}`}
                    {...ext}
                    className={`mt-8 rounded-full px-6 py-4 text-center font-medium transition-all hover:opacity-90 ${
                      p.popular ? "bg-gold text-ink" : "border border-line hover:border-paper"
                    }`}
                  >
                    Choose {p.name} →
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-muted">
              Billed monthly. Need something different?{" "}
              <a href={links.whatsapp} {...ext} className="text-gold underline-offset-4 hover:underline">
                Ask for a custom quote
              </a>
            </p>
          </div>
        </section>

        {/* TRUST */}
        <section className={`${wrap} ${section}`}>
          <SectionHeader
            eyebrow="Proven on global platforms"
            title={
              <>
                Trusted <em className="text-gold">worldwide</em>
              </>
            }
            lede="Beyond one-off projects, more than ten clients keep me on as their dedicated designer — for months and years at a time."
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {[
              { name: "Freelancer.com", short: "Freelancer", note: "5-Star Rated · Top Designer", n: "550+", href: links.freelancer },
              { name: "Upwork", short: "Upwork", note: "Top Rated · JSS 100%", n: "50+", href: links.upwork },
            ].map((p) => (
              <a
                key={p.name}
                href={p.href}
                {...ext}
                className="group flex items-end justify-between gap-4 rounded-2xl border border-line p-7 transition-colors duration-500 hover:border-gold hover:bg-panel md:p-9"
              >
                <div>
                  <p className="font-serif text-3xl md:text-4xl">{p.name}</p>
                  <p className="mt-2 text-sm text-muted">{p.note}</p>
                  <p className="mt-8 text-sm text-gold">
                    Hire me on {p.short} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-serif text-5xl font-light transition-colors md:text-6xl">{p.n}</p>
                  <p className="text-[11px] tracking-[0.2em] text-muted uppercase">Projects</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[
              ["10", "+", "Retained clients"],
              ["8", "+", "Years in industry"],
              ["100", "%", "Satisfaction rate"],
              ["5", "★", "Average rating"],
            ].map(([n, s, l]) => (
              <div key={l} className="bg-ink p-6 md:p-8">
                <Stat n={n} suffix={s} label={l} />
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-line bg-panel">
          <div className={`${wrap} ${section} grid items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-16 lg:gap-24`}>
            <div>
              <Eyebrow>Let&apos;s Work Together</Eyebrow>
              <H2>
                Ready to build something <em className="text-gold">great?</em>
              </H2>
              <p className="mt-8 max-w-lg leading-relaxed text-muted md:text-[17px]">
                Whether you need a full brand identity, a single logo, or a reliable long-term design partner — I&apos;d love
                to hear about your project. I usually reply within a day.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <StartProject magnetic className="rounded-full bg-gold px-8 py-4 text-center font-medium text-ink">
                  Start a Project →
                </StartProject>
                <a
                  href={links.whatsapp}
                  {...ext}
                  data-magnetic
                  className="rounded-full border border-line px-8 py-4 text-center transition-colors hover:border-paper"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className="mt-10 border-t border-line pt-8">
                <p className="text-xs tracking-[0.3em] text-muted uppercase">Email</p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <a href={`mailto:${links.email}`} className="font-serif text-2xl break-all transition-colors hover:text-gold sm:text-3xl">
                    {links.email}
                  </a>
                  <CopyEmail email={links.email} />
                </div>
                <p className="mt-6 text-xs tracking-[0.3em] text-muted uppercase">WhatsApp</p>
                <a href={links.whatsapp} {...ext} className="mt-1 inline-block py-1 text-lg transition-colors hover:text-gold">
                  {links.whatsappLabel}
                </a>
              </div>
            </div>
            <div>
              <Image
                src={photoPlaid}
                alt="Mohiul Islam in Dinajpur, Bangladesh"
                placeholder="blur"
                sizes="(min-width: 768px) 35vw, 100vw"
                className="aspect-[4/5] w-full rounded-2xl object-cover object-top"
              />
              <p className="mt-4 text-sm text-muted">
                Based in <span className="text-paper">Dinajpur, Bangladesh</span> · Available worldwide, remote-first
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
