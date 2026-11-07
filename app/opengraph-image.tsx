import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mohiul Islam — Graphic Designer & Brand Identity Designer from Bangladesh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const toDataUrl = (buf: Buffer, mime: string) => `data:${mime};base64,${buf.toString("base64")}`;

export default async function Image() {
  const [logoBuf, photoBuf] = await Promise.all([
    readFile(join(process.cwd(), "public/logo.png")),
    readFile(join(process.cwd(), "assets/me/white.jpg")),
  ]);
  const logo = toDataUrl(logoBuf, "image/png");
  const photo = toDataUrl(photoBuf, "image/jpeg");

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#0d0d0c", color: "#f1ede4" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 700 }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#fd853a" }}>GRAPHIC DESIGNER · PHOTOGRAPHER</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img src={logo} width={560} height={105} alt="" />
            <div style={{ display: "flex", marginTop: 36, fontSize: 34, lineHeight: 1.3, color: "#9b968a" }}>
              Brand identity, social media & packaging design. 600+ projects for clients worldwide.
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9b968a" }}>Dinajpur, Bangladesh · Available worldwide</div>
        </div>
        <div style={{ display: "flex", position: "relative", width: 500, height: 630 }}>
          <img src={photo} width={630} height={630} alt="" style={{ objectFit: "cover", width: 500, height: 630 }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(90deg, #0d0d0c 0%, rgba(13,13,12,0) 35%)" }} />
        </div>
      </div>
    ),
    size,
  );
}
