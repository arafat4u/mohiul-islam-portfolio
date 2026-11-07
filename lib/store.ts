import "server-only";
import { get, put } from "@vercel/blob";
import { cacheTag } from "next/cache";
import { defaultContent, withDefaults, type Content } from "@/lib/content";

const PATH = "site/content.json";
export const CONTENT_TAG = "site-content";

export const storeConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

// Cached until the admin saves (updateTag(CONTENT_TAG)), so the public site stays static-fast.
export async function getContent(): Promise<Content> {
  "use cache";
  cacheTag(CONTENT_TAG);
  if (!storeConfigured()) return defaultContent;
  try {
    const res = await get(PATH, { access: "public", useCache: false });
    if (!res || res.statusCode !== 200) return defaultContent;
    return withDefaults(JSON.parse(await new Response(res.stream).text()));
  } catch (err) {
    console.error("Reading site content failed, using defaults:", err);
    return defaultContent;
  }
}

export async function writeContent(content: Content) {
  await put(PATH, JSON.stringify(content), {
    access: "public",
    allowOverwrite: true,
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}
