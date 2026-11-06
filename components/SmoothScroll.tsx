"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let instance: Lenis | null = null;
export const getLenis = () => instance;

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    instance = new Lenis({ lerp: 0.09, anchors: { offset: -20 }, autoRaf: true });
    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);
  return null;
}
