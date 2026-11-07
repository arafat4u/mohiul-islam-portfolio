// Single-admin session: an expiring token signed with HMAC-SHA256 using ADMIN_PASSWORD (+ optional ADMIN_SECRET).
// Web Crypto only, so it runs both in proxy.ts and in server functions.

export const SESSION_COOKIE = "admin_session";
export const SESSION_DAYS = 14;

const enc = new TextEncoder();

function secret() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return `${pw}::${process.env.ADMIN_SECRET ?? "mohiul-portfolio"}`;
}

async function hmac(data: string) {
  const s = secret();
  if (!s) return null;
  const key = await crypto.subtle.importKey("raw", enc.encode(s), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function createSession() {
  const exp = Date.now() + SESSION_DAYS * 864e5;
  const sig = await hmac(`admin.${exp}`);
  return sig ? `${exp}.${sig}` : null;
}

export async function verifySession(token: string | undefined) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const expected = await hmac(`admin.${exp}`);
  return !!expected && safeEqual(sig, expected);
}

export function checkPassword(input: string) {
  const pw = process.env.ADMIN_PASSWORD;
  return !!pw && safeEqual(input, pw);
}

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);
