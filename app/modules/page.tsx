import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { modules } from "@/lib/modules-data";

export const dynamic = "force-dynamic";

export default async function ModulesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: progress } = await supabase
    .from("user_progress")
    .select("module_slug, completed")
    .eq("user_id", user.id);

  const completedSlugs = new Set(
    (progress || []).filter((p) => p.completed).map((p) => p.module_slug)
  );

  return (
    <div className="animate-fadeUp max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <p className="text-navy-600 font-semibold text-sm uppercase tracking-wide mb-1">
        The PERRIO System
      </p>
      <h1 className="font-display text-3xl font-semibold text-navy-950 mb-3">
        All modules
      </h1>
      <p className="text-navy-500 mb-10 max-w-2xl">
        Every module leads with a practice exercise, not a lecture. Do the technique
        first, then read the concept that explains why it works.
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {modules.map((m) => {
          const isDone = completedSlugs.has(m.slug);
          return (
            <Link
              key={m.slug}
              href={`/modules/${m.slug}`}
              className="hover-lift focus-ring group rounded-2xl border-[1.5px] border-navy-100 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center font-display font-bold"
                  style={
                    isDone
                      ? { background: "linear-gradient(135deg, #1E3F66, #040A14)", color: "#fff" }
                      : { background: "#F4F8FC", color: "#2B5483" }
                  }
                >
                  {isDone ? "✓" : m.number}
                </div>
                {isDone && (
                  <span className="text-xs font-bold text-navy-700 bg-navy-50 px-2.5 py-1 rounded-full">
                    Completed
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-navy-400 uppercase tracking-wide mb-1.5">
                {m.stage}
              </p>
              <h2 className="font-display text-lg font-semibold text-navy-950 mb-2">
                {m.title}
              </h2>
              <p className="text-sm text-navy-500 leading-relaxed">{m.intro}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
