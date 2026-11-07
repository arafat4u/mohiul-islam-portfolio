"use client";

import { upload } from "@vercel/blob/client";
import { ArrowDown, ArrowUp, ChevronDown, ImageUp, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const input =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-orange";

export function Field({
  label,
  value,
  onChange,
  multiline = false,
  hint,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  hint?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={`${input} mt-1.5 resize-y leading-relaxed`} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={`${input} mt-1.5 min-h-11`} />
      )}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-navy">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="h-5 w-5 accent-orange" />
      {label}
    </label>
  );
}

export function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-navy">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${input} mt-1.5 min-h-11`}>
        {!options.includes(value) && <option value={value}>{value || "—"}</option>}
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

export function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const blob = await upload(`uploads/${file.name.replace(/[^\w.-]+/g, "-")}`, file, { access: "public", handleUploadUrl: "/api/upload" });
      onChange(blob.url);
    } catch (e) {
      setError((e as Error).message || "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <span className="text-sm font-medium text-navy">{label}</span>
      <div className="mt-1.5 flex gap-3">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-line bg-[repeating-conic-gradient(#f2f4f7_0_25%,#fff_0_50%)] bg-[length:16px_16px]">
          {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of arbitrary URLs */}
          {value && <img src={value} alt="" className="h-full w-full object-contain" />}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <label
            className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl bg-orange px-4 text-sm font-semibold text-white ${busy ? "opacity-60" : ""}`}
          >
            <ImageUp className="h-4 w-4" />
            {busy ? "Uploading…" : "Upload image"}
            <input type="file" accept="image/*" className="sr-only" disabled={busy} onChange={(e) => pick(e.target.files?.[0])} />
          </label>
          <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="…or paste an image URL" className={`${input} min-h-10 text-xs`} />
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}

const move = <T,>(arr: T[], i: number, d: number) => {
  const next = [...arr];
  const j = i + d;
  if (j < 0 || j >= next.length) return next;
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

function RowTools({ i, n, onMove, onRemove }: { i: number; n: number; onMove: (d: number) => void; onRemove: () => void }) {
  const btn = "grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-soft hover:text-ink disabled:opacity-30";
  return (
    <div className="flex shrink-0 items-center">
      <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => onMove(-1)} className={btn}>
        <ArrowUp className="h-4 w-4" />
      </button>
      <button type="button" aria-label="Move down" disabled={i === n - 1} onClick={() => onMove(1)} className={btn}>
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        type="button"
        aria-label="Delete"
        onClick={() => confirm("Delete this item?") && onRemove()}
        className={`${btn} hover:bg-red-50 hover:text-red-600`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function StringList({ label, items, onChange, multiline = false }: { label: string; items: string[]; onChange: (v: string[]) => void; multiline?: boolean }) {
  return (
    <div>
      <span className="text-sm font-medium text-navy">{label}</span>
      <div className="mt-1.5 space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea value={it} rows={3} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} className={`${input} resize-y`} />
            ) : (
              <input value={it} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} className={`${input} min-h-11`} />
            )}
            <RowTools i={i} n={items.length} onMove={(d) => onChange(move(items, i, d))} onRemove={() => onChange(items.filter((_, j) => j !== i))} />
          </div>
        ))}
        <AddButton onClick={() => onChange([...items, ""])} />
      </div>
    </div>
  );
}

function AddButton({ onClick, label = "Add" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-dashed border-line px-4 text-sm font-medium text-navy hover:border-orange hover:text-orange">
      <Plus className="h-4 w-4" /> {label}
    </button>
  );
}

export function ObjectList<T>({
  label,
  items,
  onChange,
  blank,
  title,
  render,
}: {
  label: string;
  items: T[];
  onChange: (v: T[]) => void;
  blank: () => T;
  title: (item: T, i: number) => string;
  render: (item: T, set: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      <span className="text-sm font-medium text-navy">
        {label} <span className="text-muted">({items.length})</span>
      </span>
      <div className="mt-2 space-y-2">
        {items.map((it, i) => (
          <div key={i} className="rounded-2xl border border-line bg-white">
            <div className="flex items-center gap-2 pr-2">
              <button type="button" onClick={() => setOpen(open === i ? null : i)} className="flex min-h-12 min-w-0 flex-1 items-center gap-2 px-4 text-left">
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted transition-transform ${open === i ? "rotate-180" : ""}`} />
                <span className="truncate text-[15px] font-medium">{title(it, i) || "Untitled"}</span>
              </button>
              <RowTools
                i={i}
                n={items.length}
                onMove={(d) => {
                  onChange(move(items, i, d));
                  if (open === i) setOpen(i + d);
                }}
                onRemove={() => {
                  onChange(items.filter((_, j) => j !== i));
                  setOpen(null);
                }}
              />
            </div>
            {open === i && (
              <div className="grid gap-4 border-t border-line p-4">{render(it, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))))}</div>
            )}
          </div>
        ))}
        <AddButton
          label={`Add ${label.toLowerCase().replace(/s$/, "")}`}
          onClick={() => {
            onChange([...items, blank()]);
            setOpen(items.length);
          }}
        />
      </div>
    </div>
  );
}

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,0.06)] md:p-7">
      <h2 className="mb-5 text-lg font-semibold text-navy">{title}</h2>
      <div className="grid gap-5">{children}</div>
    </section>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
