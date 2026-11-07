"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import Brand from "@/components/Brand";
import { getLenis } from "@/components/SmoothScroll";
import StartProject from "@/components/StartProject";
import ThemeToggle from "@/components/ThemeToggle";

const left = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
];
const right = [
  { label: "Portfolio", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];
const all = [...left, ...right];

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <a
      href={href}
      className={`rounded-full px-5 py-3 text-[15px] transition-colors xl:px-7 xl:text-base ${
        active ? "bg-orange font-semibold text-white" : "text-white/85 hover:text-white"
      }`}
    >
      {label}
    </a>
  );
}

export default function Header() {
  const [active, setActive] = useState("#top");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    all.forEach((n) => {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 px-3 transition-[padding] duration-500 sm:px-5 ${scrolled ? "pt-3" : "pt-4 md:pt-6"}`}>
      <div
        className={`mx-auto flex max-w-[81rem] items-center justify-between rounded-full bg-ink py-1.5 pr-1.5 pl-4 transition-shadow duration-500 lg:justify-center lg:px-2 lg:py-2 ${
          scrolled ? "shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)]" : ""
        }`}
      >
        <nav aria-label="Primary left" className="hidden flex-1 items-center gap-1 lg:flex">
          {left.map((n) => (
            <NavLink key={n.href} {...n} active={active === n.href} />
          ))}
        </nav>

        <a href="#top" aria-label="Mohiul Islam — home" className="flex min-h-11 items-center lg:px-6">
          <Brand />
        </a>

        <nav aria-label="Primary right" className="hidden flex-1 items-center justify-end gap-1 lg:flex">
          {right.map((n) => (
            <NavLink key={n.href} {...n} active={active === n.href} />
          ))}
          <ThemeToggle className="ml-2" />
        </nav>

        <div className="flex items-center gap-1.5 lg:hidden">
          <ThemeToggle />
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        inert={!open}
        className={`mx-auto mt-2 max-h-[calc(100svh-6rem)] max-w-[81rem] origin-top overflow-y-auto rounded-3xl bg-ink p-3 shadow-2xl transition-all duration-300 lg:hidden ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="grid gap-1">
          {all.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`flex min-h-12 items-center justify-between rounded-2xl px-4 text-lg ${
                active === n.href ? "bg-orange font-semibold text-white" : "text-white/85 hover:bg-white/5"
              }`}
            >
              {n.label}
              <ArrowUpRight className="h-4 w-4 opacity-60" />
            </a>
          ))}
        </nav>
        <StartProject className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-base font-semibold text-ink">
          Hire me <ArrowUpRight className="h-4 w-4" />
        </StartProject>
      </div>
    </header>
  );
}
