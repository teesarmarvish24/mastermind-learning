"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="animate-fadeUp max-w-xl mx-auto px-5 py-16 sm:py-24">
      <h1 className="font-display text-3xl font-semibold text-navy-950 mb-2">Get in touch</h1>
      <p className="text-navy-500 mb-8">
        Questions, feedback, or partnership ideas &mdash; send a message and it goes straight to the Mastermind team.
      </p>

      {status === "success" ? (
        <div className="rounded-2xl border-[1.5px] border-navy-100 bg-navy-50 p-7 text-center">
          <div
            className="w-12 h-12 rounded-full text-white flex items-center justify-center mx-auto mb-4 font-display text-xl"
            style={{ background: "linear-gradient(135deg, #1E3F66, #040A14)", boxShadow: "0 8px 20px -6px rgba(30,63,102,0.6)" }}
          >
            ✓
          </div>
          <h2 className="font-display text-xl font-semibold text-navy-950 mb-2">
            Message sent
          </h2>
          <p className="text-navy-500 mb-5">
            Thanks for reaching out &mdash; we&rsquo;ve received your message and will get back to you.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="focus-ring link-fade text-navy-800 font-semibold"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-navy-700 mb-1.5">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label htmlFor="message" className="block text-sm font-semibold text-navy-700 mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="input-focus w-full rounded-md border-[1.5px] border-navy-100 px-3.5 py-2.5 text-navy-900 placeholder:text-navy-300 resize-none"
              placeholder="How can we help?"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3.5 py-2.5">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="focus-ring btn-press w-full rounded-md disabled:opacity-60 text-white font-bold py-3"
            style={{ background: "linear-gradient(135deg, #1E3F66, #040A14)", boxShadow: "0 8px 22px -8px rgba(30,63,102,0.6)" }}
          >
            {status === "loading" ? "Sending..." : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
