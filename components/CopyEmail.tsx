"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      onClick={copy}
      aria-live="polite"
      className={`rounded-full border px-4 py-2 text-xs transition-colors ${
        copied ? "border-gold bg-gold text-ink" : "border-line text-muted hover:border-paper hover:text-paper"
      }`}
    >
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}
