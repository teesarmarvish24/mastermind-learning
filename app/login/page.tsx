"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    const redirectTo = searchParams.get("redirectedFrom") || "/dashboard";
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="animate-fadeUp max-w-md mx-auto px-5 py-16 sm:py-24">
      <h1 className="font-display text-3xl font-semibold text-navy-950 mb-2">
        Welcome back
      </h1>
      <p className="text-navy-500 mb-8">Log in to continue your PERRIO journey.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy-700 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-focus w-full rounded-md border-[1.5px] border-navy-100 px-3.5 py-2.5 text-navy-900 placeholder:text-navy-300"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-navy-700 mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-focus w-full rounded-md border-[1.5px] border-navy-100 px-3.5 py-2.5 text-navy-900 placeholder:text-navy-300"
            placeholder="Your password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3.5 py-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring btn-press w-full rounded-md disabled:opacity-60 text-white font-bold py-3"
          style={{ background: "linear-gradient(135deg, #1E3F66, #040A14)", boxShadow: "0 8px 22px -8px rgba(30,63,102,0.6)" }}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="mt-6 text-sm text-navy-500 text-center">
        Don&rsquo;t have an account?{" "}
        <Link href="/signup" className="link-fade text-navy-800 font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  );
}
