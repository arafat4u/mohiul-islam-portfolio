"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Dots, useCarousel } from "@/components/useCarousel";
import type { Service } from "@/lib/content";

// Bottom-right circular cut-out the arrow button sits in.
const notch = {
  WebkitMaskImage: "radial-gradient(circle at calc(100% - 2.6rem) calc(100% - 2.6rem), transparent 3.1rem, #000 3.15rem)",
  maskImage: "radial-gradient(circle at calc(100% - 2.6rem) calc(100% - 2.6rem), transparent 3.1rem, #000 3.15rem)",
};

export default function ServicesCarousel({ items }: { items: Service[] }) {
  const { ref, active, pages, go } = useCarousel(items.length);

  return (
    <>
      <div ref={ref} className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 md:-mx-10 md:scroll-px-10 md:px-10 xl:mx-0 xl:scroll-px-0 xl:px-0">
        {items.map((s, i) => (
          <article
            key={i}
            className="group w-[85%] shrink-0 snap-start rounded-[2rem] border border-white/15 bg-white/[0.04] backdrop-blur-md transition-colors duration-500 hover:border-orange/60 sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.84rem)]"
          >
            <h3 className="border-b border-white/15 px-6 py-5 text-2xl font-medium text-white md:px-8 md:py-6 md:text-[1.75rem]">{s.title}</h3>
            <div className="p-4 md:p-6">
              <div className="relative">
                <div style={notch} className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-white/10">
                  {s.image && (
                    <Image
                      src={s.image}
                      alt={`${s.title} work`}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 85vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <a
                  href="#work"
                  aria-label={`See ${s.title} work`}
                  className="absolute right-0 bottom-0 grid h-[4.4rem] w-[4.4rem] place-items-center rounded-full bg-[#1d2939] text-white transition-colors duration-300 group-hover:bg-orange"
                >
                  <ArrowUpRight className="h-7 w-7 transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.75} />
                </a>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-white/65">{s.text}</p>
            </div>
          </article>
        ))}
      </div>
      <Dots pages={pages} active={active} go={go} dark />
    </>
  );
}
