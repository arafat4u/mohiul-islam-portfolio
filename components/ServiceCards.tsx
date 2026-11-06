"use client";

import { ArrowUpRight, Camera, Fingerprint, MonitorSmartphone, Package, Printer, Share2, type LucideIcon } from "lucide-react";
import type { PointerEvent } from "react";
import { services } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  "Brand Identity": Fingerprint,
  "Print & Collateral": Printer,
  "Social Media Design": Share2,
  "UI / Web Design": MonitorSmartphone,
  "Packaging Design": Package,
  Photography: Camera,
};

// Feeds the pointer position into CSS vars so each card's spotlight follows the mouse.
function track(e: PointerEvent<HTMLElement>) {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty("--x", `${e.clientX - r.left}px`);
  card.style.setProperty("--y", `${e.clientY - r.top}px`);
}

export default function ServiceCards() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => {
        const Icon = icons[s.title] ?? Fingerprint;
        return (
          <article
            key={s.title}
            onPointerMove={track}
            className="group relative isolate flex h-full flex-col overflow-hidden bg-panel p-7 transition-colors duration-500 hover:bg-ink md:p-9"
          >
            {/* mouse-follow spotlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgb(201 164 92 / 0.14), transparent 60%)",
              }}
            />
            <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />

            <div className="flex items-start justify-between">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line bg-ink/60 text-gold transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:rotate-[-6deg] group-hover:border-gold group-hover:bg-gold group-hover:text-ink group-hover:shadow-[0_12px_30px_-10px_rgba(201,164,92,0.6)]">
                <Icon aria-hidden className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
              </span>
              <p className="font-serif text-lg text-muted italic transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold">0{i + 1}</p>
            </div>

            <h3 className="mt-8 font-serif text-3xl transition-transform duration-500 group-hover:translate-x-1 md:mt-12">{s.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/80">{s.text}</p>

            <span
              aria-hidden
              className="mt-8 inline-flex h-10 w-10 translate-y-2 items-center justify-center rounded-full border border-gold/40 text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </span>
          </article>
        );
      })}
    </div>
  );
}
