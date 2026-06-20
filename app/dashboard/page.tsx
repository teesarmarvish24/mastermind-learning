import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { modules } from "@/lib/modules-data";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: progress } = await supabase
    .from("user_progress")
    .select("module_slug, completed, completed_at")
    .eq("user_id", user.id);

  const completedSlugs = new Set(
    (progress || []).filter((p) => p.completed).map((p) => p.module_slug)
  );
  const completedCount = completedSlugs.size;
  const totalCount = modules.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  const distinctDays = new Set(
    (progress || [])
      .filter((p) => p.completed_at)
      .map((p) => new Date(p.completed_at as string).toDateString())
  );

  const nextModule = modules.find((m) => !completedSlugs.has(m.slug));
  const firstName = (user.user_metadata?.full_name as string)?.split(" ")[0] || "there";

  return (
    <div className="animate-fadeUp max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <p className="text-navy-600 font-semibold text-sm uppercase tracking-wide mb-1">
        Dashboard
      </p>
      <h1 className="font-display text-3xl font-semibold text-navy-950 mb-8">
        Welcome back, {firstName}
      </h1>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <div className="hover-lift rounded-xl border-[1.5px] border-navy-100 p-6">
          <p className="text-sm text-navy-400 mb-1">Modules completed</p>
          <p className="font-display text-3xl font-semibold text-navy-950">
            {completedCount} / {totalCount}
          </p>
        </div>
        <div className="hover-lift rounded-xl border-[1.5px] border-navy-100 p-6">
          <p className="text-sm text-navy-400 mb-1">Overall progress</p>
          <p className="font-display text-3xl font-semibold text-navy-950">{percent}%</p>
        </div>
        <div className="hover-lift rounded-xl border-[1.5px] border-navy-100 p-6">
          <p className="text-sm text-navy-400 mb-1">Active days</p>
          <p className="font-display text-3xl font-semibold text-navy-950">
            {distinctDays.size}
          </p>
        </div>
      </div>

      <div className="w-full h-2.5 bg-navy-100 rounded-full overflow-hidden mb-10">
        <div
          className="bar-fill h-full"
          style={{ width: `${percent}%`, background: "linear-gradient(90deg, #2B5483, #0A1626)" }}
        />
      </div>

      {nextModule ? (
        <div
          className="rounded-2xl p-7 mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
          style={{ background: "linear-gradient(135deg, #16304E, #040A14)" }}
        >
          <div>
            <p className="text-navy-200 text-sm font-semibold uppercase tracking-wide mb-1">
              Continue your journey
            </p>
            <h2 className="font-display text-xl font-semibold text-white">
              Module {nextModule.number}: {nextModule.title}
            </h2>
          </div>
          <Link
            href={`/modules/${nextModule.slug}`}
            className="focus-ring btn-press shrink-0 rounded-md bg-white text-navy-950 font-bold px-6 py-3 text-center"
          >
            Start practice
          </Link>
        </div>
      ) : (
        <div
          className="rounded-2xl p-7 mb-10 text-center"
          style={{ background: "linear-gradient(135deg, #16304E, #040A14)" }}
        >
          <p className="text-white font-bold mb-1">All 7 modules complete</p>
          <p className="text-navy-200 text-sm">
            You&rsquo;ve finished the full PERRIO system. Revisit any module anytime.
          </p>
        </div>
      )}

      <h2 className="font-display text-xl font-semibold text-navy-950 mb-4">
        Your modules
      </h2>
      <div className="space-y-3">
        {modules.map((m) => {
          const isDone = completedSlugs.has(m.slug);
          return (
            <Link
              key={m.slug}
              href={`/modules/${m.slug}`}
              className="row-hover focus-ring flex items-center justify-between rounded-xl border-[1.5px] border-navy-100 px-5 py-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center font-display font-semibold text-sm shrink-0"
                  style={
                    isDone
                      ? { background: "linear-gradient(135deg, #1E3F66, #040A14)", color: "#fff", boxShadow: "0 4px 12px -3px rgba(30,63,102,0.5)" }
                      : { background: "#F4F8FC", color: "#6A93BE" }
                  }
                >
                  {isDone ? "✓" : m.number}
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{m.title}</p>
                  <p className="text-sm text-navy-400">{m.stage}</p>
                </div>
              </div>
              <span className="text-navy-400 text-sm">{isDone ? "Review" : "Start"} &rarr;</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
