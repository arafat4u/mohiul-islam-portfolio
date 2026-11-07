"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { SESSION_COOKIE, SESSION_DAYS, checkPassword, createSession, verifySession } from "@/lib/auth";
import { defaultContent, type Content } from "@/lib/content";
import { CONTENT_TAG, storeConfigured, writeContent } from "@/lib/store";

export async function isAdmin() {
  await connection(); // session expiry check reads the clock, so always run per request
  return verifySession((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function login(_: string | null, form: FormData): Promise<string | null> {
  // Small fixed delay blunts password guessing.
  await new Promise((r) => setTimeout(r, 600));
  if (!process.env.ADMIN_PASSWORD) return "Admin password is not set up yet (ADMIN_PASSWORD).";
  if (!checkPassword(String(form.get("password") ?? ""))) return "Wrong password.";
  const token = await createSession();
  if (!token) return "Could not create a session.";
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// Shape check: same top-level sections and array/object kinds as the defaults.
function looksValid(c: unknown): c is Content {
  if (!c || typeof c !== "object") return false;
  return Object.entries(defaultContent).every(([k, v]) => {
    const got = (c as Record<string, unknown>)[k];
    return Array.isArray(v) ? Array.isArray(got) : typeof got === typeof v && got !== null;
  });
}

export async function saveContent(content: Content): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdmin())) return { ok: false, error: "Your session expired — please log in again." };
  if (!storeConfigured()) return { ok: false, error: "Storage is not connected (BLOB_READ_WRITE_TOKEN missing)." };
  if (!looksValid(content)) return { ok: false, error: "The data looks incomplete, nothing was saved." };
  try {
    await writeContent(content);
  } catch (err) {
    console.error(err);
    return { ok: false, error: "Saving failed. Please try again." };
  }
  updateTag(CONTENT_TAG);
  return { ok: true };
}
