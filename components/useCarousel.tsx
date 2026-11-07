"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Native scroll-snap carousel: tracks which "page" is in view and can jump to one.
export function useCarousel(itemCount: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = useCallback(() => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    const visible = Math.max(1, Math.round(el.clientWidth / step));
    setPages(Math.max(1, itemCount - visible + 1));
    setActive(Math.min(itemCount - 1, Math.round(el.scrollLeft / step)));
  }, [itemCount]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const go = (i: number) => {
    const el = ref.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: target.offsetLeft - (el.firstElementChild as HTMLElement).offsetLeft, behavior: "smooth" });
  };

  return { ref, active, pages, go };
}

export function Dots({ pages, active, go, dark = false }: { pages: number; active: number; go: (i: number) => void; dark?: boolean }) {
  if (pages < 2) return null;
  const cur = Math.min(active, pages - 1);
  if (pages > 6) {
    // Too many slides for dots: arrows + counter instead.
    const btn = `grid h-12 w-12 place-items-center rounded-full border transition-colors disabled:opacity-30 ${
      dark ? "border-white/25 text-white hover:border-orange" : "border-line text-navy hover:border-orange hover:text-orange"
    }`;
    return (
      <div className="mt-8 flex items-center justify-center gap-5">
        <button type="button" onClick={() => go(cur - 1)} disabled={cur === 0} aria-label="Previous slide" className={btn}>
          ←
        </button>
        <span className={`min-w-20 text-center text-base tabular-nums ${dark ? "text-white/80" : "text-navy"}`}>
          <span className="font-semibold text-orange">{String(cur + 1).padStart(2, "0")}</span> / {String(pages).padStart(2, "0")}
        </span>
        <button type="button" onClick={() => go(cur + 1)} disabled={cur === pages - 1} aria-label="Next slide" className={btn}>
          →
        </button>
      </div>
    );
  }
  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => go(i)}
          aria-label={`Go to slide ${i + 1}`}
          aria-current={Math.min(active, pages - 1) === i}
          className="grid h-11 min-w-6 place-items-center"
        >
          <span
            className={`block h-2.5 rounded-full transition-all duration-300 ${
              Math.min(active, pages - 1) === i ? "w-12 bg-orange" : `w-2.5 ${dark ? "bg-white/70" : "bg-line"}`
            }`}
          />
        </button>
      ))}
    </div>
  );
}
