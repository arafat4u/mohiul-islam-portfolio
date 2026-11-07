"use client";

import { Lock } from "lucide-react";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function LoginPage() {
  const [error, action, pending] = useActionState(login, null);

  return (
    <main className="grid min-h-svh place-items-center p-5">
      <form action={action} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-[0_30px_80px_-30px_rgba(16,24,40,0.3)]">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-tint text-orange">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-5 text-2xl font-semibold text-navy">Admin login</h1>
        <p className="mt-1 text-sm text-muted">Manage everything on the portfolio site.</p>
        <label htmlFor="password" className="mt-6 block text-sm font-medium text-navy">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="mt-2 min-h-12 w-full rounded-xl border border-line px-4 text-base outline-none focus:border-orange"
        />
        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-6 min-h-12 w-full rounded-xl bg-orange text-base font-semibold text-white transition-opacity disabled:opacity-60"
        >
          {pending ? "Checking…" : "Log in"}
        </button>
      </form>
    </main>
  );
}
