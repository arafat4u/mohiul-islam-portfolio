"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { getLenis } from "@/components/SmoothScroll";
import { works, type Category } from "@/lib/data";

const tabs: ("All" | Category)[] = ["All", "Social Media", "Logo & Branding", "Packaging & Print"];

export default function Gallery() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);

  const shown = tab === "All" ? works : works.filter((w) => w.category === tab);

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open === null ? null : shown[open];

  return (
    <>
      <div className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:mb-10 md:flex-wrap md:px-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
              tab === t ? "border-gold bg-gold text-ink" : "border-line text-muted hover:border-paper hover:text-paper"
            }`}
          >
            {t}
            <span className={`ml-2 text-xs ${tab === t ? "text-ink/60" : "text-muted/60"}`}>
              {t === "All" ? works.length : works.filter((w) => w.category === t).length}
            </span>
          </button>
        ))}
      </div>

      <div className="columns-2 gap-3 sm:gap-4 lg:columns-3">
        {shown.map((w, i) => (
          <button
            key={w.title + w.client}
            onClick={() => setOpen(i)}
            data-cursor="view"
            className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl border border-line bg-panel text-left sm:mb-4"
          >
            <Image
              src={w.image}
              alt={`${w.client} — ${w.title}`}
              placeholder="blur"
              sizes="(min-width: 1024px) 33vw, 50vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="p-3 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-gradient-to-t sm:from-black/85 sm:via-black/40 sm:to-transparent sm:p-5 sm:pt-14 sm:opacity-0 sm:transition-opacity sm:duration-500 sm:group-hover:opacity-100">
              <p className="text-[10px] tracking-[0.2em] text-gold uppercase sm:text-[11px]">{w.tag} · {w.year}</p>
              <p className="mt-0.5 font-serif text-base leading-tight sm:text-xl">{w.title}</p>
              <p className="text-xs text-muted sm:text-sm">{w.client}</p>
            </div>
          </button>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4"
        >
          <button aria-label="Close" className="absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-line text-xl text-muted hover:text-paper">
            ✕
          </button>
          <div className="relative h-[70vh] w-full max-w-5xl md:h-[78vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={current.image} alt={current.title} fill sizes="100vw" className="object-contain" />
          </div>
          <div className="mt-4 flex w-full max-w-md items-center justify-between gap-4" onClick={(e) => e.stopPropagation()}>
            <button aria-label="Previous" onClick={() => step(-1)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-xl text-muted hover:text-gold">←</button>
            <div className="text-center">
              <p className="font-serif text-xl md:text-2xl">{current.title}</p>
              <p className="text-sm text-muted">{current.client} · {current.year}</p>
              <p className="mt-1 text-xs tracking-[0.2em] text-muted/70">{String(open! + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}</p>
            </div>
            <button aria-label="Next" onClick={() => step(1)} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-xl text-muted hover:text-gold">→</button>
          </div>
        </div>
      )}
    </>
  );
}
