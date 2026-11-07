"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/components/SmoothScroll";
import type { Work } from "@/lib/content";

// One endless row: the list is rendered twice and the track slides by half its width, so the loop is seamless.
function Belt({ items, reverse, onOpen }: { items: Work[]; reverse?: boolean; onOpen: (w: Work) => void }) {
  if (!items.length) return null;
  const loop = [...items, ...items];
  return (
    <div className="belt-row overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] motion-reduce:overflow-x-auto">
      <div
        className="belt-track flex w-max gap-5 motion-reduce:!animate-none"
        style={{ animationDuration: `${Math.max(24, items.length * 7)}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {loop.map((w, i) => {
          const copy = i >= items.length;
          return (
            <button
              key={i}
              type="button"
              onClick={() => onOpen(w)}
              aria-hidden={copy || undefined}
              tabIndex={copy ? -1 : undefined}
              data-cursor="view"
              className="belt-card group relative aspect-[4/3] w-[17rem] shrink-0 overflow-hidden rounded-[1.6rem] bg-soft text-left shadow-[0_18px_40px_-24px_rgba(16,24,40,0.45)] sm:w-[21rem] lg:w-[25rem]"
            >
              {w.image && <Image src={w.image} alt={copy ? "" : `${w.client} — ${w.title}`} fill sizes="(min-width: 1024px) 25rem, 21rem" className="object-cover" />}
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute top-3 right-3 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur transition-colors group-hover:border-orange group-hover:bg-orange">
                <ArrowUpRight className="h-5 w-5" />
              </span>
              <span className="absolute right-5 bottom-4 left-5">
                {w.client && <span className="block text-[11px] font-semibold tracking-[0.15em] text-orange-soft uppercase">{w.client}</span>}
                <span className="mt-0.5 block text-xl leading-tight font-bold text-white lg:text-2xl">{w.title}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PortfolioBelt({ items, categories }: { items: Work[]; categories: string[] }) {
  const tabs = ["All", ...categories.filter((c) => items.some((w) => w.category === c))];
  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = tab === "All" ? items : items.filter((w) => w.category === tab);

  // Two belts moving in opposite directions once there are enough projects to fill them.
  const rows = shown.length >= 6 ? [shown.filter((_, i) => i % 2 === 0), shown.filter((_, i) => i % 2 === 1)] : [shown];

  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const lightbox = open === null ? null : shown[open];

  return (
    <>
      <div className="no-scrollbar -mx-5 mb-4 flex gap-3 overflow-x-auto px-5 [mask-image:linear-gradient(90deg,#000_85%,transparent)] md:mx-0 md:flex-wrap md:justify-center md:px-0 md:[mask-image:none]">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`min-h-12 shrink-0 rounded-full px-6 text-base transition-colors md:text-lg ${
              tab === t ? "bg-orange font-semibold text-white" : "bg-soft text-ink hover:bg-line"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div key={tab} className="rise -mx-5 md:-mx-10 xl:-mx-16">
        {rows.map((r, i) => (
          <Belt key={i} items={r} reverse={i === 1} onOpen={(w) => setOpen(shown.indexOf(w))} />
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-muted">Hover to pause · click any project to view it</p>

      {lightbox &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.title}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button type="button" aria-label="Close" className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white">
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[68vh] w-full max-w-5xl md:h-[76vh]" onClick={(e) => e.stopPropagation()}>
              {lightbox.image && <Image src={lightbox.image} alt={lightbox.title} fill sizes="100vw" className="object-contain" />}
            </div>
            <div className="mt-4 flex w-full max-w-md items-center justify-between gap-4 text-white" onClick={(e) => e.stopPropagation()}>
              <button type="button" aria-label="Previous" onClick={() => step(-1)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-orange">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <p className="text-lg font-semibold">{lightbox.title}</p>
                <p className="text-sm text-white/60">
                  {[lightbox.client, lightbox.year].filter(Boolean).join(" · ")} · {String(open! + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
                </p>
              </div>
              <button type="button" aria-label="Next" onClick={() => step(1)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-orange">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
