"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="animate-fadeUp max-w-md mx-auto px-5 py-24 text-center">
        <div
          className="w-14 h-14 rounded-full text-white flex items-center justify-center mx-auto mb-5 font-display text-2xl"
          style={{ background: "linear-gradient(135deg, #1E3F66, #040A14)", boxShadow: "0 8px 20px -6px rgba(30,63,102,0.6)" }}
        >
          ✓
        </div>
        <h1 className="font-display text-2xl font-semibold text-navy-950 mb-3">
          Check your email
        </h1>
        <p className="text-navy-500">
          We&rsquo;ve sent a confirmation link to <strong>{email}</strong>. Confirm your
          email, then log in to start your first module.
        </p>
        <Link
          href="/login"
          className="focus-ring link-fade inline-block mt-6 text-navy-800 font-semibold"
        >
          Go to log in &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeUp max-w-md mx-auto px-5 py-16 sm:py-24">
      <h1 className="font-display text-3xl font-semibold text-navy-950 mb-2">
        Create your account
      </h1>
      <p className="text-navy-500 mb-8">
        Start the PERRIO journey today &mdash; it&rsquo;s free.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-navy-700 mb-1.5">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-focus w-full rounded-md border-[1.5px] border-navy-100 px-3.5 py-2.5 text-navy-900 placeholder:text-navy-300"
            placeholder="Your name"
          />
        </div>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-focus w-full rounded-md border-[1.5px] border-navy-100 px-3.5 py-2.5 text-navy-900 placeholder:text-navy-300"
            placeholder="At least 6 characters"
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
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-navy-500 text-center">
        Already have an account?{" "}
        <Link href="/login" className="link-fade text-navy-800 font-semibold">
          Log in
        </Link>
      </p>
    </div>
  );
}
