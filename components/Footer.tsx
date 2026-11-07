"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useSyncExternalStore } from "react";
import Brand from "@/components/Brand";
import ProjectInput from "@/components/ProjectInput";
import StartProject from "@/components/StartProject";
import { useContent } from "@/components/ContentProvider";
import { waLink } from "@/lib/content";
import { container } from "@/lib/site";

const nav = [
  ["Home", "#top"],
  ["Services", "#services"],
  ["About", "#about"],
  ["Portfolio", "#work"],
  ["Pricing", "#pricing"],
] as const;



const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

// Live clock in Dinajpur; renders nothing on the server so hydration stays stable.
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" });
const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 15_000);
  return () => clearInterval(id);
};
const useDhakaTime = () => useSyncExternalStore(subscribe, () => timeFmt.format(new Date()), () => "");

const socialIcons = [
  {
    label: "Facebook",
    key: "facebook",
    d: "M14 8.5V6.6c0-.9.6-1.1 1-1.1h2.6V1.6L14 1.5c-4 0-4.9 3-4.9 4.9v2.1H6.8v4h2.3V22.5H14V12.5h3.3l.4-4H14z",
  },
  {
    label: "Instagram",
    key: "instagram",
    d: "M12 7.3A4.7 4.7 0 1 0 16.7 12 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm6-7.9a1.1 1.1 0 1 1-1.1-1.1A1.1 1.1 0 0 1 18 7.1zM21.9 8.1a6.4 6.4 0 0 0-1.7-4.3 6.4 6.4 0 0 0-4.3-1.7C14.2 2 9.8 2 8.1 2.1a6.4 6.4 0 0 0-4.3 1.7A6.4 6.4 0 0 0 2.1 8.1C2 9.8 2 14.2 2.1 15.9a6.4 6.4 0 0 0 1.7 4.3 6.4 6.4 0 0 0 4.3 1.7c1.7.1 6.1.1 7.8 0a6.4 6.4 0 0 0 4.3-1.7 6.4 6.4 0 0 0 1.7-4.3c.1-1.7.1-6.1 0-7.8zm-2.2 9.6a3 3 0 0 1-1.7 1.7c-1.2.5-4 .4-5.3.4s-4.1.1-5.3-.4a3 3 0 0 1-1.7-1.7c-.5-1.2-.4-4-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5c1.2-.5 4-.4 5.3-.4s4.1-.1 5.3.4A3 3 0 0 1 19 6.7c.5 1.2.4 4 .4 5.3s.1 4.1-.4 5.3z",
  },
  {
    label: "WhatsApp",
    key: "whatsapp",
    d: "M17.5 14.4c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6a2 2 0 0 0 .3-.5.6.6 0 0 0 0-.5c0-.1-.7-1.6-.9-2.2s-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.5 13.5 0 0 0 5.2 4.6c2.6 1 2.6.7 3.1.6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.3a8.3 8.3 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.3 8.3 0 1 1 12 20.3z",
  },
];

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-lg font-semibold text-orange">{title}</p>
      {children}
    </div>
  );
}

const linkCls = "inline-flex min-h-10 items-center gap-1.5 text-[15px] text-white/85 transition-colors hover:text-orange";

export default function Footer() {
  const time = useDhakaTime();
  const c = useContent();
  const wa = waLink(c);
  const elsewhere = [
    ["Behance", c.links.behance],
    ["Upwork", c.links.upwork],
    ["Freelancer", c.links.freelancer],
    ["Pexels", c.links.pexels],
  ].filter(([, h]) => h);
  const social = socialIcons
    .map((s) => ({ ...s, href: s.key === "whatsapp" ? wa : c.links[s.key as "facebook" | "instagram"] }))
    .filter((s) => s.href);

  return (
    <footer id="contact" className="mt-20 rounded-t-[2.5rem] bg-dark text-white md:mt-28 md:rounded-t-[3.5rem]">
      <div className={`${container} pt-14 pb-8 md:pt-20`}>
        <div className="flex flex-col gap-8 border-b border-white/15 pb-12 md:flex-row md:items-center md:justify-between md:pb-16">
          <h2 className="text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
            {c.footer.title} <span className="text-orange">{c.footer.accent}</span>
          </h2>
          <StartProject
            magnetic
            className="inline-flex min-h-14 items-center gap-2 self-start rounded-full bg-orange px-8 text-lg font-semibold text-white md:self-auto md:px-10 md:text-xl"
          >
            Hire me <ArrowUpRight className="h-5 w-5" />
          </StartProject>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-12 md:py-16 lg:grid-cols-[1.6fr_0.8fr_0.8fr_1.4fr] lg:gap-x-10">
          <div className="col-span-2 lg:col-span-1">
            <Brand />
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
              {c.footer.bio}
            </p>
            <div className="mt-6 flex items-center gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  {...ext}
                  aria-label={s.label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-orange"
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <Col title="Navigation">
            <ul>
              {nav.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className={linkCls}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <Col title="Elsewhere">
            <ul>
              {elsewhere.map(([l, h]) => (
                <li key={l}>
                  <a href={h} {...ext} className={linkCls}>
                    {l} <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          <div className="col-span-2 lg:col-span-1">
            <Col title="Start a conversation">
              <ProjectInput dark placeholder="Your project idea…" />
              <ul className="mt-5 space-y-1">
                <li>
                  <a href={wa} {...ext} className={linkCls}>
                    WhatsApp {c.profile.whatsappLabel}
                  </a>
                </li>
                <li>
                  <StartProject label={`Email ${c.profile.email}`} className={`${linkCls} break-all text-left`}>
                    {c.profile.email}
                  </StartProject>
                </li>
                <li className="pt-1 text-sm text-white/55">
                  {c.profile.location}{time && <> · {time} local time</>}
                </li>
              </ul>
            </Col>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {c.profile.fullName}. All rights reserved.</p>
          <p>Design inspired by JCREA</p>
          <a href="#top" className="group inline-flex min-h-11 items-center gap-3 self-start transition-colors hover:text-white sm:self-auto">
            Back to top
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-orange">
              <ArrowUp className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
