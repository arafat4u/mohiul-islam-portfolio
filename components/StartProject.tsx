"use client";

import { Check, Copy, Mail, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/components/SmoothScroll";
import { links } from "@/lib/data";

const subject = "New project enquiry";
const message = "Hi Mohiul, I'd like to start a project with you.";

const options = [
  {
    label: "WhatsApp",
    note: "Fastest reply",
    href: `${links.whatsapp}?text=${encodeURIComponent(message)}`,
    Icon: MessageCircle,
  },
  {
    label: "Gmail",
    note: "Opens in a new tab",
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${links.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
    Icon: Send,
  },
  {
    label: "Email app",
    note: "Mail, Outlook…",
    href: `mailto:${links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
    Icon: Mail,
  },
];

// mailto: does nothing when no mail app is set up, so every "start a project" CTA offers working alternatives.
export default function StartProject({
  className = "",
  magnetic = false,
  label = "Start a project",
  children,
}: {
  className?: string;
  magnetic?: boolean;
  label?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    getLenis()?.stop();
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is shown in the dialog anyway */
    }
  };

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={label} data-magnetic={magnetic || undefined} className={className}>
        {children}
      </button>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="start-project-title"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rise w-full max-w-md rounded-3xl border border-line bg-panel p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] tracking-[0.3em] text-gold uppercase">Start a project</p>
                  <h2 id="start-project-title" className="mt-2 font-serif text-3xl">
                    How would you like to <em className="text-gold">reach out?</em>
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:text-paper"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="mt-6 space-y-2">
                {options.map(({ label, note, href, Icon }, i) => (
                  <li key={label}>
                    <a
                      ref={i === 0 ? first : undefined}
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 rounded-2xl border border-line p-4 transition-colors hover:border-gold hover:bg-ink"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-medium">{label}</span>
                        <span className="block text-xs text-muted">{note}</span>
                      </span>
                      <span className="text-gold transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-line px-4 py-3">
                <span className="truncate text-sm text-muted">{links.email}</span>
                <button
                  type="button"
                  onClick={copy}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                    copied ? "border-gold bg-gold text-ink" : "border-line text-muted hover:border-paper hover:text-paper"
                  }`}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy email"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
