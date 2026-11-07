"use client";

import { Check, Download, ExternalLink, LogOut, RotateCcw, Save } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { logout, saveContent } from "@/app/admin/actions";
import { Card, Field, ImageField, ObjectList, Row, Select, StringList, Toggle } from "@/components/admin/fields";
import { defaultContent, type Content } from "@/lib/content";

const tabs = [
  ["profile", "Profile & SEO"],
  ["hero", "Hero"],
  ["services", "Services"],
  ["experience", "Experience"],
  ["about", "About"],
  ["portfolio", "Portfolio"],
  ["pricing", "Pricing"],
  ["discuss", "Contact box"],
  ["ticker", "Ticker"],
  ["platforms", "Platforms"],
  ["footer", "Footer"],
] as const;
type Tab = (typeof tabs)[number][0];

function Heading({ c, k, set }: { c: { title: string; accent: string }; k: string; set: (p: { title?: string; accent?: string }) => void }) {
  return (
    <Row>
      <Field label={`${k} title`} value={c.title} onChange={(title) => set({ title })} />
      <Field label="Orange highlight words" value={c.accent} onChange={(accent) => set({ accent })} />
    </Row>
  );
}

export default function Editor({ initial, configured }: { initial: Content; configured: boolean }) {
  const [c, setC] = useState(initial);
  const [saved, setSaved] = useState(JSON.stringify(initial));
  const [tab, setTab] = useState<Tab>("profile");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pending, start] = useTransition();
  const dirty = JSON.stringify(c) !== saved;

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // Shallow-merge helper for one top-level section.
  const patch = <K extends keyof Content>(key: K, value: Partial<Content[K]> | Content[K]) =>
    setC((prev) => ({ ...prev, [key]: Array.isArray(value) ? value : { ...(prev[key] as object), ...value } }));

  const save = () =>
    start(async () => {
      const res = await saveContent(c);
      if (res.ok) setSaved(JSON.stringify(c));
      setMsg({ ok: res.ok, text: res.ok ? "Saved — the live site is updated." : (res.error ?? "Save failed") });
      setTimeout(() => setMsg(null), 5000);
    });

  const backup = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(c, null, 2)], { type: "application/json" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `site-content-${new Date().toISOString().slice(0, 10)}.json` });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 md:px-6">
          <div className="mr-auto">
            <p className="text-lg font-semibold text-navy">Site dashboard</p>
            <p className="text-xs text-muted">{dirty ? "You have unsaved changes" : "All changes saved"}</p>
          </div>
          <a href="/" target="_blank" className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-navy hover:bg-soft">
            <ExternalLink className="h-4 w-4" /> View site
          </a>
          <button onClick={() => logout()} className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-medium text-navy hover:bg-soft">
            <LogOut className="h-4 w-4" /> Log out
          </button>
          <button
            onClick={save}
            disabled={!dirty || pending}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-orange px-5 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          >
            {pending ? "Saving…" : dirty ? <><Save className="h-4 w-4" /> Save changes</> : <><Check className="h-4 w-4" /> Saved</>}
          </button>
        </div>
        {msg && (
          <p role="status" className={`px-4 py-2 text-center text-sm font-medium ${msg.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
            {msg.text}
          </p>
        )}
        {!configured && (
          <p className="bg-amber-50 px-4 py-2 text-center text-sm text-amber-800">Storage is not connected yet, so saving is disabled. Editing works for preview.</p>
        )}
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[13rem_1fr] md:px-6">
        <nav aria-label="Sections" className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 md:sticky md:top-24 md:mx-0 md:flex-col md:self-start md:px-0">
          {tabs.map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`min-h-11 shrink-0 rounded-xl px-4 text-left text-sm font-medium transition-colors ${
                tab === k ? "bg-ink text-white" : "text-navy hover:bg-white"
              }`}
            >
              {l}
            </button>
          ))}
          <div className="hidden border-t border-line pt-3 md:mt-3 md:block">
            <button onClick={backup} className="flex min-h-10 w-full items-center gap-2 rounded-xl px-4 text-sm text-muted hover:bg-white hover:text-navy">
              <Download className="h-4 w-4" /> Download backup
            </button>
            <button
              onClick={() => confirm("Replace everything with the original content? (You still need to Save.)") && setC(defaultContent)}
              className="flex min-h-10 w-full items-center gap-2 rounded-xl px-4 text-sm text-muted hover:bg-white hover:text-navy"
            >
              <RotateCcw className="h-4 w-4" /> Reset to original
            </button>
          </div>
        </nav>

        <div className="grid min-w-0 gap-6">
          {tab === "profile" && (
            <>
              <Card title="Profile">
                <Row>
                  <Field label="First name (hero)" value={c.profile.name} onChange={(name) => patch("profile", { name })} />
                  <Field label="Full name" value={c.profile.fullName} onChange={(fullName) => patch("profile", { fullName })} />
                </Row>
                <Row>
                  <Field label="Role (hero)" value={c.profile.role} onChange={(role) => patch("profile", { role })} />
                  <Field label="Location" value={c.profile.location} onChange={(location) => patch("profile", { location })} />
                </Row>
                <Row>
                  <Field label="Email" type="email" value={c.profile.email} onChange={(email) => patch("profile", { email })} />
                  <Field
                    label="WhatsApp number"
                    hint="Digits with country code, e.g. 8801516777361"
                    value={c.profile.whatsapp}
                    onChange={(whatsapp) => patch("profile", { whatsapp })}
                  />
                </Row>
                <Field label="WhatsApp number as shown" value={c.profile.whatsappLabel} onChange={(whatsappLabel) => patch("profile", { whatsappLabel })} />
              </Card>
              <Card title="Profile links">
                {(Object.keys(c.links) as (keyof Content["links"])[]).map((k) => (
                  <Field key={k} label={k[0].toUpperCase() + k.slice(1)} value={c.links[k]} onChange={(v) => patch("links", { [k]: v })} />
                ))}
              </Card>
              <Card title="Google / SEO">
                <Field label="Page title" value={c.seo.title} onChange={(title) => patch("seo", { title })} />
                <Field label="Description" multiline value={c.seo.description} onChange={(description) => patch("seo", { description })} />
              </Card>
            </>
          )}

          {tab === "hero" && (
            <Card title="Hero">
              <Field label="Greeting badge" value={c.hero.greeting} onChange={(greeting) => patch("hero", { greeting })} />
              <Field label="Left note" multiline value={c.hero.note} onChange={(note) => patch("hero", { note })} />
              <Row>
                <Field label="Experience (big text)" value={c.hero.years} onChange={(years) => patch("hero", { years })} />
                <Field label="Experience label" value={c.hero.yearsLabel} onChange={(yearsLabel) => patch("hero", { yearsLabel })} />
              </Row>
              <ImageField label="Photo (transparent PNG works best)" value={c.hero.image} onChange={(image) => patch("hero", { image })} />
              <p className="text-xs text-muted">The name and role come from Profile.</p>
            </Card>
          )}

          {tab === "services" && (
            <Card title="Services">
              <Heading k="Section" c={c.services} set={(p) => patch("services", p)} />
              <Field label="Intro text" multiline value={c.services.lede} onChange={(lede) => patch("services", { lede })} />
              <ObjectList
                label="Services"
                items={c.services.items}
                onChange={(items) => patch("services", { items })}
                blank={() => ({ title: "New service", text: "", image: "" })}
                title={(s) => s.title}
                render={(s, set) => (
                  <>
                    <Field label="Title" value={s.title} onChange={(title) => set({ title })} />
                    <Field label="Description" multiline value={s.text} onChange={(text) => set({ text })} />
                    <ImageField label="Image" value={s.image} onChange={(image) => set({ image })} />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "experience" && (
            <Card title="Work experience">
              <Heading k="Section" c={c.experience} set={(p) => patch("experience", p)} />
              <ObjectList
                label="Jobs"
                items={c.experience.items}
                onChange={(items) => patch("experience", { items })}
                blank={() => ({ org: "Company", span: "", role: "", text: "" })}
                title={(j) => `${j.org} — ${j.role}`}
                render={(j, set) => (
                  <>
                    <Row>
                      <Field label="Company / platform" value={j.org} onChange={(org) => set({ org })} />
                      <Field label="Duration or count" value={j.span} onChange={(span) => set({ span })} />
                    </Row>
                    <Field label="Role" value={j.role} onChange={(role) => set({ role })} />
                    <Field label="Description" multiline value={j.text} onChange={(text) => set({ text })} />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "about" && (
            <Card title="About (Why hire me)">
              <Heading k="Section" c={c.about} set={(p) => patch("about", p)} />
              <StringList label="Paragraphs" multiline items={c.about.paragraphs} onChange={(paragraphs) => patch("about", { paragraphs })} />
              <ObjectList
                label="Stats"
                items={c.about.stats}
                onChange={(stats) => patch("about", { stats })}
                blank={() => ({ value: "0+", label: "Label" })}
                title={(s) => `${s.value} ${s.label}`}
                render={(s, set) => (
                  <Row>
                    <Field label="Number" value={s.value} onChange={(value) => set({ value })} />
                    <Field label="Label" value={s.label} onChange={(label) => set({ label })} />
                  </Row>
                )}
              />
              <Field label="Button text" value={c.about.cta} onChange={(cta) => patch("about", { cta })} />
              <ImageField label="Photo (transparent PNG works best)" value={c.about.image} onChange={(image) => patch("about", { image })} />
            </Card>
          )}

          {tab === "portfolio" && (
            <Card title="Portfolio">
              <Heading k="Section" c={c.portfolio} set={(p) => patch("portfolio", p)} />
              <Field label='"See All" link' value={c.portfolio.seeAllUrl} onChange={(seeAllUrl) => patch("portfolio", { seeAllUrl })} />
              <StringList label="Filter categories" items={c.portfolio.categories} onChange={(categories) => patch("portfolio", { categories })} />
              <ObjectList
                label="Projects"
                items={c.portfolio.items}
                onChange={(items) => patch("portfolio", { items })}
                blank={() => ({ title: "New project", client: "", tag: "", year: String(new Date().getFullYear()), category: c.portfolio.categories[0] ?? "", image: "" })}
                title={(w) => `${w.client ? `${w.client} — ` : ""}${w.title}`}
                render={(w, set) => (
                  <>
                    <Row>
                      <Field label="Project title" value={w.title} onChange={(title) => set({ title })} />
                      <Field label="Client" value={w.client} onChange={(client) => set({ client })} />
                    </Row>
                    <Row>
                      <Field label="Tag" value={w.tag} onChange={(tag) => set({ tag })} />
                      <Field label="Year" value={w.year} onChange={(year) => set({ year })} />
                    </Row>
                    <Select label="Category" value={w.category} options={c.portfolio.categories} onChange={(category) => set({ category })} />
                    <ImageField label="Image" value={w.image} onChange={(image) => set({ image })} />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "pricing" && (
            <Card title="Pricing">
              <Heading k="Section" c={c.pricing} set={(p) => patch("pricing", p)} />
              <Field label="Intro text" multiline value={c.pricing.lede} onChange={(lede) => patch("pricing", { lede })} />
              <Field label="Note before the custom-quote link" value={c.pricing.note} onChange={(note) => patch("pricing", { note })} />
              <ObjectList
                label="Packages"
                items={c.pricing.packages}
                onChange={(packages) => patch("pricing", { packages })}
                blank={() => ({ name: "New package", price: "0", blurb: "", popular: false, items: [] })}
                title={(p) => `${p.name} — $${p.price}${p.popular ? " · Most popular" : ""}`}
                render={(p, set) => (
                  <>
                    <Row>
                      <Field label="Name" value={p.name} onChange={(name) => set({ name })} />
                      <Field label="Price (USD / month)" value={p.price} onChange={(price) => set({ price })} />
                    </Row>
                    <Field label="Short description" multiline value={p.blurb} onChange={(blurb) => set({ blurb })} />
                    <Toggle label='Highlight as "Most Popular"' checked={p.popular} onChange={(popular) => set({ popular })} />
                    <ObjectList
                      label="Features"
                      items={p.items}
                      onChange={(items) => set({ items })}
                      blank={() => ({ label: "Feature", value: "" })}
                      title={(f) => `${f.label}: ${f.value}`}
                      render={(f, setF) => (
                        <Row>
                          <Field label="Feature" value={f.label} onChange={(label) => setF({ label })} />
                          <Field label="Value" value={f.value} onChange={(value) => setF({ value })} />
                        </Row>
                      )}
                    />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "discuss" && (
            <Card title='"Let&apos;s Discuss" box'>
              <Heading k="Section" c={c.discuss} set={(p) => patch("discuss", p)} />
              <Field label="Input placeholder" value={c.discuss.placeholder} onChange={(placeholder) => patch("discuss", { placeholder })} />
              <StringList label="Badges under the box" items={c.discuss.badges} onChange={(badges) => patch("discuss", { badges })} />
            </Card>
          )}

          {tab === "ticker" && (
            <Card title="Orange ticker">
              <StringList label="Words" items={c.ticker} onChange={(ticker) => setC((prev) => ({ ...prev, ticker }))} />
            </Card>
          )}

          {tab === "platforms" && (
            <Card title="Platforms">
              <Heading k="Section" c={c.platforms} set={(p) => patch("platforms", p)} />
              <ObjectList
                label="Platforms"
                items={c.platforms.items}
                onChange={(items) => patch("platforms", { items })}
                blank={() => ({ name: "Platform", stat: "0+", label: "Projects", kind: "", cta: "Visit", notes: [], url: "" })}
                title={(p) => `${p.name} — ${p.stat} ${p.label}`}
                render={(p, set) => (
                  <>
                    <Row>
                      <Field label="Name" value={p.name} onChange={(name) => set({ name })} />
                      <Field label="Link" value={p.url} onChange={(url) => set({ url })} />
                    </Row>
                    <Row>
                      <Field label="Big number" value={p.stat} onChange={(stat) => set({ stat })} />
                      <Field label="Number label" value={p.label} onChange={(label) => set({ label })} />
                    </Row>
                    <Row>
                      <Field label="Chip text" value={p.kind} onChange={(kind) => set({ kind })} />
                      <Field label="Link text" value={p.cta} onChange={(cta) => set({ cta })} />
                    </Row>
                    <StringList label="Bullet notes" items={p.notes} onChange={(notes) => set({ notes })} />
                  </>
                )}
              />
            </Card>
          )}

          {tab === "footer" && (
            <Card title="Footer">
              <Heading k="Footer" c={c.footer} set={(p) => patch("footer", p)} />
              <Field label="Short bio" multiline value={c.footer.bio} onChange={(bio) => patch("footer", { bio })} />
            </Card>
          )}

          <div className="flex gap-2 md:hidden">
            <button onClick={backup} className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm text-navy">
              <Download className="h-4 w-4" /> Backup
            </button>
            <button
              onClick={() => confirm("Replace everything with the original content? (You still need to Save.)") && setC(defaultContent)}
              className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm text-navy"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
