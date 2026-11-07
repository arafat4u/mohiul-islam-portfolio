"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/components/SmoothScroll";
import { Dots, useCarousel } from "@/components/useCarousel";
import { works, type Category } from "@/lib/data";

const tabs: ("All" | Category)[] = ["All", "Social Media", "Logo & Branding", "Packaging & Print"];

export default function PortfolioShowcase() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = tab === "All" ? works : works.filter((w) => w.category === tab);
  const { ref, active, pages, go } = useCarousel(shown.length);
  const current = shown[Math.min(active, shown.length - 1)];

  const pick = (t: (typeof tabs)[number]) => {
    setTab(t);
    ref.current?.scrollTo({ left: 0 });
  };

  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

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
      <div ref={ref} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 md:-mx-10 md:scroll-px-10 md:px-10 xl:mx-0 xl:scroll-px-0 xl:px-0">
        {shown.map((w, i) => (
          <button
            key={w.title + w.client}
            type="button"
            onClick={() => setOpen(i)}
            data-cursor="view"
            className="group relative aspect-[16/11] w-[88%] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-soft text-left md:w-[calc(50%-0.625rem)]"
          >
            <Image
              src={w.image}
              alt={`${w.client} — ${w.title}`}
              placeholder="blur"
              fill
              sizes="(min-width: 768px) 45vw, 88vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur transition-colors group-hover:border-orange group-hover:bg-orange md:h-14 md:w-14">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
            </span>
            <span className="absolute right-5 bottom-5 left-5 md:right-7 md:bottom-6 md:left-7">
              <span className="block text-xs font-semibold tracking-[0.15em] text-orange-soft uppercase">{w.client}</span>
              <span className="mt-1 block text-2xl leading-tight font-bold text-white md:text-4xl">{w.title}</span>
            </span>
          </button>
        ))}
      </div>

      <Dots pages={pages} active={active} go={go} />

      <div className="no-scrollbar -mx-5 mt-6 flex gap-3 overflow-x-auto px-5 [mask-image:linear-gradient(90deg,#000_85%,transparent)] md:mx-0 md:flex-wrap md:justify-center md:px-0 md:[mask-image:none]">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => pick(t)}
            aria-pressed={tab === t}
            className={`min-h-12 shrink-0 rounded-full px-6 text-base transition-colors md:text-lg ${
              tab === t ? "bg-orange font-semibold text-white" : "bg-soft text-ink hover:bg-line"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {current && (
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <h3 className="text-2xl font-bold text-navy md:text-4xl">
              {current.client} — {current.title}
            </h3>
            <button
              type="button"
              onClick={() => setOpen(shown.indexOf(current))}
              aria-label={`Open ${current.title}`}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange text-white transition-transform hover:rotate-45 md:h-14 md:w-14"
            >
              <ArrowUpRight className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-3 text-lg text-muted">{[...new Set([current.tag, String(current.year), current.category])].join(" · ")}</p>
        </div>
      )}

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
              <Image src={lightbox.image} alt={lightbox.title} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="mt-4 flex w-full max-w-md items-center justify-between gap-4 text-white" onClick={(e) => e.stopPropagation()}>
              <button type="button" aria-label="Previous" onClick={() => step(-1)} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-orange">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="text-center">
                <p className="text-lg font-semibold">{lightbox.title}</p>
                <p className="text-sm text-white/60">
                  {lightbox.client} · {String(open! + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
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
