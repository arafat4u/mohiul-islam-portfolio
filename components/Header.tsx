"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import { getLenis } from "@/components/SmoothScroll";
import { links } from "@/lib/data";

const nav = [
  { label: "About", href: "#about", n: "01" },
  { label: "Expertise", href: "#expertise", n: "02" },
  { label: "Work", href: "#work", n: "03" },
  { label: "Pricing", href: "#pricing", n: "04" },
  { label: "Contact", href: "#contact", n: "05" },
];

export default function Header() {
  const [active, setActive] = useState("");
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 400);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-transform duration-500 ${hidden && !open ? "-translate-y-full" : ""}`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-6 transition-all duration-500 ${
            scrolled
              ? "mt-3 max-w-6xl rounded-full border border-line/80 bg-ink/70 px-5 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl md:mx-auto mx-3"
              : "max-w-none px-4 py-6 md:px-10"
          }`}
        >
          <a href="#top" aria-label="Mohiul Islam — home" className="py-2 text-paper transition-colors hover:text-gold">
            <Logo className={`transition-all duration-500 ${scrolled ? "h-5 md:h-6" : "h-6 md:h-8"}`} />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className={`group relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === n.href ? "text-paper" : "text-muted hover:text-paper"
                }`}
              >
                <span
                  className={`absolute inset-0 -z-10 rounded-full bg-paper/[0.07] transition-all duration-300 ${
                    active === n.href ? "scale-100 opacity-100" : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                  }`}
                />
                <span className="mr-1.5 align-super text-[9px] text-gold">{n.n}</span>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="group hidden items-center gap-2 overflow-hidden rounded-full bg-gold py-2 pr-2 pl-5 text-sm font-medium text-ink sm:flex"
            >
              Let&apos;s talk
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-gold transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/40 lg:hidden"
            >
              <span className={`absolute h-px w-5 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-30 flex flex-col justify-between bg-ink px-6 pt-28 pb-10 transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
              className={`flex items-baseline gap-4 border-b border-line py-4 font-serif text-5xl font-light transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <span className="font-sans text-xs text-gold">{n.n}</span>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="space-y-2 text-sm text-muted">
          <a href={`mailto:${links.email}`} className="block text-paper">{links.email}</a>
          <a href={links.whatsapp} className="block">WhatsApp {links.whatsappLabel}</a>
        </div>
      </div>
    </>
  );
}
