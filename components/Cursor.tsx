"use client";

import { useEffect, useRef, useState } from "react";

// Gold dot that tracks the pointer exactly, a ring that trails it, and magnetic pull on [data-magnetic].
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"" | "hover" | "view">("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const pos = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...pos };
    let raf = 0;
    let magnet: HTMLElement | null = null;

    const onMove = (e: PointerEvent) => {
      if (root.current) root.current.style.opacity = "1";
      pos.x = e.clientX;
      pos.y = e.clientY;
      const t = e.target as HTMLElement;
      const view = t.closest("[data-cursor='view']");
      const hit = t.closest("a, button");
      setMode(view ? "view" : hit ? "hover" : "");

      const m = t.closest<HTMLElement>("[data-magnetic]");
      if (magnet && magnet !== m) magnet.style.transform = "";
      magnet = m;
      if (m) {
        const r = m.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        // Gentle pull, capped so buttons nudge rather than jump.
        const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));
        m.style.transform = `translate(${clamp(dx * 0.08, 6)}px, ${clamp(dy * 0.12, 4)}px)`;
      }
    };
    const onLeave = () => {
      if (root.current) root.current.style.opacity = "0";
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={root} aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden opacity-0 transition-opacity duration-300 [.has-cursor_&]:block">
      <div ref={ring} className="absolute top-0 left-0">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
            mode === "view"
              ? "grid h-24 w-24 place-items-center border-orange bg-orange text-xs font-semibold tracking-[0.2em] text-white uppercase"
              : mode === "hover"
                ? "h-14 w-14 border-orange bg-orange/15"
                : "h-9 w-9 border-navy/30"
          }`}
        >
          {mode === "view" && "View"}
        </div>
      </div>
      <div ref={dot} className="absolute top-0 left-0">
        <div className={`h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange transition-opacity ${mode === "view" ? "opacity-0" : ""}`} />
      </div>
    </div>
  );
}
