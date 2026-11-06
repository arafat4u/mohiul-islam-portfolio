"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useSyncExternalStore, type PointerEvent } from "react";
import Logo from "@/components/Logo";
import StartProject from "@/components/StartProject";
import { links } from "@/lib/data";
import { container } from "@/lib/site";

const nav = [
  ["About", "#about"],
  ["Expertise", "#expertise"],
  ["Work", "#work"],
  ["Pricing", "#pricing"],
  ["Contact", "#contact"],
] as const;

const socials = [
  ["Behance", links.behance],
  ["Upwork", links.upwork],
  ["Freelancer", links.freelancer],
  ["Pexels", links.pexels],
  ["Instagram", links.instagram],
  ["Facebook", links.facebook],
] as const;

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Live clock in Dinajpur; renders nothing on the server so hydration stays stable.
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" });
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};
const useDhakaTime = () => useSyncExternalStore(subscribe, () => timeFmt.format(new Date()), () => "");

function FooterLink({ href, external, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? ext : {})}
      className="group inline-flex items-center gap-1.5 py-1.5 text-[15px] text-paper/85 transition-colors hover:text-gold"
    >
      <span className="transition-transform duration-300 group-hover:translate-x-1">{children}</span>
      {external && (
        <ArrowUpRight
          aria-hidden
          className="h-3.5 w-3.5 -translate-x-1 opacity-40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      )}
    </a>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-[11px] tracking-[0.3em] text-gold uppercase">{children}</p>;
}

function trackGlow(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export default function Footer() {
  const time = useDhakaTime();

  return (
    <footer className="relative isolate overflow-hidden border-t border-line">
      <span aria-hidden className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-96 w-[64rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-3xl" />

      <div className={`${container} pt-20 pb-8 md:pt-28`}>
        {/* Call to action */}
        <div className="flex flex-col gap-10 border-b border-line pb-16 md:pb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs tracking-[0.3em] text-gold uppercase">
              <span className="h-px w-8 bg-gold" />
              Have a project in mind?
            </p>
            <StartProject
              label="Let's create something remarkable — start a project"
              className="group block text-left font-serif text-[3.25rem] leading-[0.9] font-light tracking-[-0.01em] sm:text-7xl lg:text-8xl"
            >
              Let&apos;s create
              <br />
              something{" "}
              <em className="relative text-gold">
                remarkable
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />
              </em>
              .
            </StartProject>
          </div>
          <StartProject
            magnetic
            className="group relative grid h-32 w-32 shrink-0 place-items-center self-start rounded-full bg-gold text-ink sm:h-40 sm:w-40 lg:self-auto"
          >
            <span className="absolute inset-0 scale-90 rounded-full border border-gold opacity-0 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100" />
            <span className="flex flex-col items-center gap-1 text-sm font-medium">
              <ArrowUpRight className="h-7 w-7 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
              Start a project
            </span>
          </StartProject>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 pt-14 md:pt-16 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-8 w-[171px] text-paper" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Graphic designer & photographer crafting brand identities, social content and packaging for clients worldwide.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Available for projects
              </span>
              {time && (
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
                  Dinajpur · <span className="text-paper tabular-nums">{time}</span> GMT+6
                </span>
              )}
            </div>
          </div>

          <nav aria-label="Footer">
            <ColumnTitle>Navigate</ColumnTitle>
            <ul>
              {nav.map(([l, h]) => (
                <li key={h}>
                  <FooterLink href={h}>{l}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnTitle>Elsewhere</ColumnTitle>
            <ul>
              {socials.map(([l, h]) => (
                <li key={l}>
                  <FooterLink href={h} external>
                    {l}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <ColumnTitle>Contact</ColumnTitle>
            <ul>
              <li>
                <StartProject
                  label={`Email ${links.email}`}
                  className="group inline-flex items-center gap-1.5 py-1.5 text-left text-[15px] text-paper/85 transition-colors hover:text-gold"
                >
                  <span className="transition-transform duration-300 group-hover:translate-x-1">{links.email}</span>
                </StartProject>
              </li>
              <li>
                <FooterLink href={links.whatsapp} external>
                  WhatsApp {links.whatsappLabel}
                </FooterLink>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted">
              Dinajpur, Bangladesh
              <br />
              Remote-first · Worldwide
            </p>
          </div>
        </div>

        {/* Wordmark with a gold spotlight that follows the pointer */}
        <a
          href="#top"
          aria-label="Back to top"
          onPointerMove={trackGlow}
          className="group relative mt-16 block text-paper/85 md:mt-24"
        >
          <Logo className="w-full" />
          <Logo
            className="absolute inset-0 hidden w-full text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(pointer:fine)]:block"
            style={{
              backgroundImage:
                "radial-gradient(360px circle at var(--x, 50%) var(--y, 50%), #e6c88a, #c9a45c 35%, rgb(201 164 92 / 0.25) 60%, transparent 75%)",
            }}
          />
        </a>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MD Mohiul Islam. All rights reserved.</p>
          <a href="#top" className="group inline-flex items-center gap-3 self-start py-1 transition-colors hover:text-paper sm:self-auto">
            Back to top
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
