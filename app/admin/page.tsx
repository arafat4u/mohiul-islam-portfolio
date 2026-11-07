import { redirect } from "next/navigation";
import { Suspense } from "react";
import { isAdmin } from "@/app/admin/actions";
import Editor from "@/components/admin/Editor";
import { getContent, storeConfigured } from "@/lib/store";

async function Dashboard() {
  if (!(await isAdmin())) redirect("/admin/login");
  return <Editor initial={await getContent()} configured={storeConfigured()} />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="p-10 text-center text-muted">Loading dashboard…</p>}>
      <Dashboard />
    </Suspense>
  );
}
