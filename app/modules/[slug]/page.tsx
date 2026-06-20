import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getModuleBySlug, modules } from "@/lib/modules-data";
import ModulePracticeForm from "./ModulePracticeForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ModuleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const mod = getModuleBySlug(params.slug);
  if (!mod) notFound();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: existing } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("module_slug", mod.slug)
    .maybeSingle();

  const prevModule = modules[mod.number - 1] ?? null;
  const nextModule = modules[mod.number + 1] ?? null;

  return (
    <div className="animate-fadeUp max-w-3xl mx-auto px-5 sm:px-8 py-12">
      <Link
        href="/modules"
        className="focus-ring link-fade text-sm text-navy-400 mb-6 inline-block"
      >
        &larr; All modules
      </Link>

      <p className="text-navy-600 font-semibold text-sm uppercase tracking-wide mb-2">
        Module {mod.number} &middot; {mod.stage}
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-navy-950 mb-4">
        {mod.title}
      </h1>
      <p className="text-navy-500 leading-relaxed mb-10">{mod.intro}</p>

      <ModulePracticeForm
        moduleSlug={mod.slug}
        practiceTitle={mod.practiceTitle}
        practiceInstructions={mod.practiceInstructions}
        practicePlaceholder={mod.practicePlaceholder}
        concept={mod.concept}
        reflectionPrompt={mod.reflectionPrompt}
        initialPractice={existing?.practice_submission ?? ""}
        initialReflection={existing?.reflection_submission ?? ""}
        initialCompleted={existing?.completed ?? false}
      />

      <div className="mt-12 flex justify-between border-t border-navy-100 pt-6">
        {prevModule ? (
          <Link
            href={`/modules/${prevModule.slug}`}
            className="focus-ring link-fade text-sm text-navy-500"
          >
            &larr; {prevModule.title}
          </Link>
        ) : (
          <span />
        )}
        {nextModule ? (
          <Link
            href={`/modules/${nextModule.slug}`}
            className="focus-ring link-fade text-sm text-navy-500"
          >
            {nextModule.title} &rarr;
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="focus-ring link-fade text-sm text-navy-500"
          >
            Back to dashboard &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}
