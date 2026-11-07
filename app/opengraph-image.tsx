import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getContent } from "@/lib/store";

export const alt = "Mohiul Islam — Graphic Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const orange = "#fd853a";
const toDataUrl = (buf: ArrayBuffer | Buffer, mime: string) => `data:${mime};base64,${Buffer.from(buf as ArrayBuffer).toString("base64")}`;

// Urbanist to match the site; falls back to the built-in font if Google Fonts can't be reached.
async function urbanist(weight: number) {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Urbanist:wght@${weight}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

// Uploaded photos live on Blob storage; the original one ships with the site.
async function heroPhoto(src: string) {
  if (src.startsWith("http")) {
    try {
      const res = await fetch(src);
      if (res.ok) return toDataUrl(await res.arrayBuffer(), res.headers.get("content-type") ?? "image/png");
    } catch {}
  }
  return toDataUrl(await readFile(join(process.cwd(), "public/me/cut_white.png")), "image/png");
}

export default async function Image() {
  const c = await getContent();
  const [photo, mark, semi, bold] = await Promise.all([
    heroPhoto(c.hero.image),
    readFile(join(process.cwd(), "public/mark.png")).then((b) => toDataUrl(b, "image/png")),
    urbanist(600),
    urbanist(700),
  ]);
  const fonts = [
    ...(semi ? [{ name: "Urbanist", data: semi, weight: 600 as const, style: "normal" as const }] : []),
    ...(bold ? [{ name: "Urbanist", data: bold, weight: 700 as const, style: "normal" as const }] : []),
  ];

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#ffffff", fontFamily: "Urbanist", color: "#171717" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 0 56px 72px", width: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: 999, background: orange }}>
              <img src={mark} width={26} height={30} alt="" />
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>{c.profile.fullName}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignSelf: "flex-start", border: "2px solid #171717", borderRadius: 999, padding: "8px 24px", fontSize: 26, fontWeight: 600 }}>
              {c.hero.greeting}
            </div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5 }}>
              {"I’m\u00a0"}
              <span style={{ color: orange }}>{c.profile.name}</span>
            </div>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -1.5, whiteSpace: "nowrap" }}>{c.profile.role}</div>
            <div style={{ display: "flex", marginTop: 22, fontSize: 24, lineHeight: 1.4, color: "#667085", maxWidth: 540 }}>{c.hero.note}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#344054", whiteSpace: "nowrap" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="24" height="24" viewBox="0 0 24 24">
                  <path fill={orange} d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" />
                </svg>
              ))}
            </div>
            <div style={{ display: "flex", fontWeight: 600 }}>{`${c.hero.years} ${c.hero.yearsLabel}`}</div>
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 560, height: 630 }}>
          <div style={{ position: "absolute", left: -20, bottom: -310, width: 620, height: 620, borderRadius: 999, background: "#feb273" }} />
          <img src={photo} alt="" width={500} height={568} style={{ position: "absolute", left: 30, bottom: 0, width: 500, height: 568, objectFit: "contain", objectPosition: "bottom" }} />
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
