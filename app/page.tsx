"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function useCountUp(target: number, duration = 1200, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

const pillars = [
  { l: "0", w: "Foundation", d: "Shift from passive to active before anything else" },
  { l: "I", w: "Encoding", d: "Priming, deep processing, referencing, overlearning" },
  { l: "II", w: "Retrieval", d: "Free recall, active recall, spaced & linking retrieval" },
  { l: "III", w: "Enablers", d: "Note-taking, and the habits that hold it all up" },
  { l: "IV", w: "The PERRIO System", d: "Where all three pillars combine into one routine" },
];

export default function HomePage() {
  const [started, setStarted] = useState(false);
  useEffect(() => setStarted(true), []);

  const [statsRef, statsVisible] = useReveal();
  const s250 = useCountUp(250, 1400, statsVisible);
  const s70 = useCountUp(70, 1400, statsVisible);
  const s5 = useCountUp(5, 1000, statsVisible);

  return (
    <div>
      {/* HERO */}
      <section
        className="relative overflow-hidden px-5 sm:px-8"
        style={{
          background:
            "radial-gradient(120% 100% at 50% -10%, #16304E 0%, #040A14 55%, #040A14 100%)",
          padding: "92px 0 110px",
        }}
      >
        <div
          className="blob animate-driftA"
          style={{ width: 420, height: 420, background: "#2B5483", top: -120, left: "8%", opacity: 0.35 }}
        />
        <div
          className="blob animate-driftB"
          style={{ width: 360, height: 360, background: "#3F6FA3", bottom: -140, right: "6%", opacity: 0.3 }}
        />
        <div className="max-w-6xl mx-auto relative">
          {started && (
            <>
              <p
                className="animate-fadeUp text-navy-200 font-semibold text-sm uppercase tracking-wider mb-5"
                style={{ animationDelay: "0ms" }}
              >
                For Nigerian students who study hard but feel stuck
              </p>
              <h1
                className="animate-fadeUp gradient-text font-display font-semibold leading-[1.08] max-w-3xl"
                style={{ animationDelay: "80ms", fontSize: "clamp(38px, 6.4vw, 64px)" }}
              >
                Study smarter.
                <br />
                Feel the change.
              </h1>
              <p
                className="animate-fadeUp mt-6 text-lg text-navy-200 max-w-xl leading-relaxed"
                style={{ animationDelay: "160ms" }}
              >
                You don&rsquo;t need more hours at your desk. You need a system. Mastermind
                Learning guides you through the PERRIO method — short daily lessons,
                real practice, and a felt difference in how you learn within your first week.
              </p>
              <div
                className="animate-fadeUp mt-9 flex flex-wrap gap-4"
                style={{ animationDelay: "240ms" }}
              >
                <Link
                  href="/signup"
                  className="focus-ring btn-press rounded-[9px] bg-white text-navy-950 font-bold px-8 py-4 text-[15px]"
                  style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,0.4)" }}
                >
                  Start learning free
                </Link>
                <Link
                  href="/contact"
                  className="focus-ring btn-press rounded-[9px] text-white font-medium px-8 py-4 text-[15px]"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.22)" }}
                >
                  Get in touch
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="grid sm:grid-cols-3 gap-8">
          {[
            [`${s250}+`, "Students already in the Mastermind community, built since year one of teaching this in person."],
            [`${s70}%`, "Of new information is typically forgotten within 24 hours without the right retrieval system."],
            [`${s5}`, "Structured modules — a foundation, three pillars, and the system that ties them together."],
          ].map(([n, d], i) => (
            <div
              key={i}
              className={`reveal ${statsVisible ? "visible" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-display text-[42px] font-semibold text-navy-900">{n}</p>
              <p className="mt-2 text-navy-500 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PERRIO */}
      <section className="bg-navy-50 py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <p className="text-navy-600 font-semibold text-sm uppercase tracking-wide mb-3">
              The framework
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy-950 mb-4">
              The PERRIO Learning System
            </h2>
            <p className="text-navy-500 max-w-2xl mb-12 leading-relaxed">
              Six stages that cover every dimension of effective learning, taught through
              a practice-first method — you do the technique before you read the theory.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillars.map((p, i) => (
              <Reveal key={p.w} delay={i * 70}>
                <div className="hover-lift bg-white rounded-2xl border border-navy-100 p-7 h-full">
                  <div
                    className="w-[42px] h-[42px] rounded-[10px] font-display font-bold flex items-center justify-center mb-4 text-white"
                    style={{ background: "linear-gradient(135deg, #1E3F66, #040A14)" }}
                  >
                    {p.l}
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1.5">{p.w}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-24 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-navy-950 mb-4">
            Your next study session can be different.
          </h2>
          <p className="text-navy-500 max-w-xl mx-auto mb-8">
            Create your free account and start Module 0 in under two minutes.
          </p>
          <Link
            href="/signup"
            className="focus-ring btn-press inline-block rounded-[9px] text-white font-bold px-9 py-4 text-[15px]"
            style={{
              background: "linear-gradient(135deg, #1E3F66, #040A14)",
              boxShadow: "0 10px 30px -10px rgba(30,63,102,0.7)",
            }}
          >
            Join Mastermind Learning
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
