"use client";

import { Check, Copy, Mail, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getLenis } from "@/components/SmoothScroll";
import { useContent } from "@/components/ContentProvider";
import { waLink, type Content } from "@/lib/content";

const subject = "New project enquiry";

function contactOptions(c: Content) {
  const message = `Hi ${c.profile.name}, I'd like to start a project with you.`;
  return [
    { label: "WhatsApp", note: "Fastest reply", href: waLink(c, message), Icon: MessageCircle },
    {
      label: "Gmail",
      note: "Opens in a new tab",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${c.profile.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`,
      Icon: Send,
    },
    { label: "Email app", note: "Mail, Outlook…", href: `mailto:${c.profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`, Icon: Mail },
  ];
}

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
  const content = useContent();
  const options = contactOptions(content);
  const email = content.profile.email;
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
      await navigator.clipboard.writeText(email);
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
              className="rise max-h-[calc(100svh-2rem)] w-full max-w-md overflow-y-auto rounded-3xl bg-surface p-5 text-navy shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-orange uppercase">Start a project</p>
                  <h2 id="start-project-title" className="mt-2 text-2xl font-semibold sm:text-3xl">
                    How would you like to <span className="text-orange">reach out?</span>
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-soft text-navy transition-colors hover:bg-line"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <ul className="mt-5 space-y-2 sm:mt-6">
                {options.map(({ label, note, href, Icon }, i) => (
                  <li key={label}>
                    <a
                      ref={i === 0 ? first : undefined}
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 rounded-2xl border border-line p-3 transition-colors hover:border-orange hover:bg-orange-tint/40 sm:p-4"
                    >
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-orange-tint text-orange transition-colors group-hover:bg-orange group-hover:text-white">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold">{label}</span>
                        <span className="block text-xs text-muted">{note}</span>
                      </span>
                      <span className="text-orange transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-soft px-4 py-2">
                <span className="truncate text-sm text-muted">{email}</span>
                <button
                  type="button"
                  onClick={copy}
                  className={`inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors ${
                    copied ? "bg-orange text-white" : "bg-surface text-navy hover:text-orange"
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
