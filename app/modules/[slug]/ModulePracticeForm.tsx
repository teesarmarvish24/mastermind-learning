"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ModulePracticeForm({
  moduleSlug,
  practiceTitle,
  practiceInstructions,
  practicePlaceholder,
  concept,
  reflectionPrompt,
  initialPractice,
  initialReflection,
  initialCompleted,
}: {
  moduleSlug: string;
  practiceTitle: string;
  practiceInstructions: string;
  practicePlaceholder: string;
  concept: string;
  reflectionPrompt: string;
  initialPractice: string;
  initialReflection: string;
  initialCompleted: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [practice, setPractice] = useState(initialPractice);
  const [reflection, setReflection] = useState(initialReflection);
  const [showConcept, setShowConcept] = useState(false);
  const [saving, setSaving] = useState(false);
  const [completed, setCompleted] = useState(initialCompleted);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setError(null);

    if (practice.trim().length < 3) {
      setError("Complete the practice exercise above before marking this module done.");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Your session expired. Please log in again.");
      setSaving(false);
      return;
    }

    const { error: upsertError } = await supabase.from("user_progress").upsert(
      {
        user_id: user.id,
        module_slug: moduleSlug,
        practice_submission: practice.trim(),
        reflection_submission: reflection.trim(),
        completed: true,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,module_slug" }
    );

    setSaving(false);

    if (upsertError) {
      setError("Could not save your progress. Please try again.");
      return;
    }

    setCompleted(true);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      {/* PRACTICE FIRST — the primary, most prominent block */}
      <div
        className="glow-card rounded-2xl bg-white p-6 sm:p-7"
        style={{ border: "1.5px solid #E4ECF6", borderLeft: "5px solid #16304E" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold uppercase tracking-wide text-white px-3 py-1.5 rounded-full"
            style={{ background: "linear-gradient(135deg, #1E3F66, #040A14)" }}
          >
            Practice first
          </span>
        </div>
        <h2 className="font-display text-xl font-semibold text-navy-950 mb-2">
          {practiceTitle}
        </h2>
        <p className="text-navy-600 text-sm leading-relaxed mb-4">
          {practiceInstructions}
        </p>
        <textarea
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          rows={6}
          placeholder={practicePlaceholder}
          className="input-focus w-full rounded-md border-[1.5px] border-navy-100 bg-navy-50 px-4 py-3 text-navy-900 placeholder:text-navy-300 resize-none"
        />
      </div>

      {/* Concept — collapsed by default, supports the practice */}
      <div className="rounded-2xl border-[1.5px] border-navy-100 p-6 sm:p-7">
        <button
          onClick={() => setShowConcept((s) => !s)}
          className="focus-ring flex items-center justify-between w-full text-left"
        >
          <h2 className="font-display text-lg font-semibold text-navy-950">
            Why this works
          </h2>
          <span
            className="text-navy-400 text-sm transition-transform duration-300"
            style={{ transform: showConcept ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            &#9662;
          </span>
        </button>
        {showConcept && (
          <p className="animate-fadeIn text-navy-600 leading-relaxed mt-4">{concept}</p>
        )}
      </div>

      {/* Reflection */}
      <div className="rounded-2xl border-[1.5px] border-navy-100 p-6 sm:p-7">
        <h2 className="font-display text-lg font-semibold text-navy-950 mb-2">
          Reflect
        </h2>
        <p className="text-navy-500 text-sm mb-4">{reflectionPrompt}</p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          placeholder="Your thoughts..."
          className="input-focus w-full rounded-md border-[1.5px] border-navy-100 px-4 py-3 text-navy-900 placeholder:text-navy-300 resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3.5 py-2.5">
          {error}
        </p>
      )}

      <button
        onClick={handleComplete}
        disabled={saving}
        className="focus-ring btn-press w-full rounded-md font-bold py-3.5 disabled:opacity-60"
        style={
          completed
            ? { background: "#F4F8FC", color: "#16304E", border: "1.5px solid #C9DAEC" }
            : { background: "linear-gradient(135deg, #1E3F66, #040A14)", color: "#fff", boxShadow: "0 10px 26px -10px rgba(30,63,102,0.65)" }
        }
      >
        {saving ? "Saving..." : completed ? "✓ Module complete — update progress" : "Mark module complete"}
      </button>
    </div>
  );
}
