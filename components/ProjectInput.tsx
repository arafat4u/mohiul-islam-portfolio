"use client";

import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import { links } from "@/lib/data";

// No backend: the message is handed to WhatsApp, which works on every device.
export default function ProjectInput({ dark = false, placeholder = "Tell me about your project…" }: { dark?: boolean; placeholder?: string }) {
  const [text, setText] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Mohiul, ${text.trim() || "I'd like to start a project with you."}`;
    window.open(`${links.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  return (
    <form
      onSubmit={send}
      className={`flex items-center gap-2 rounded-full p-1.5 sm:gap-3 sm:p-2 ${dark ? "bg-white" : "border border-line bg-white shadow-[0_10px_40px_-20px_rgba(16,24,40,0.25)]"}`}
    >
      <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-tint text-orange sm:grid md:h-12 md:w-12">
        <MessageSquareText className="h-5 w-5" />
      </span>
      <label className="sr-only" htmlFor={dark ? "project-footer" : "project-main"}>
        Your project
      </label>
      <input
        id={dark ? "project-footer" : "project-main"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="min-h-11 min-w-0 flex-1 bg-transparent pl-3 text-base text-ink placeholder:text-muted focus:outline-none sm:pl-0 md:text-lg"
      />
      <button type="submit" className="min-h-11 shrink-0 rounded-full bg-orange px-6 text-base font-semibold text-white transition-opacity hover:opacity-90 md:min-h-12 md:px-8 md:text-lg">
        Send
      </button>
    </form>
  );
}
