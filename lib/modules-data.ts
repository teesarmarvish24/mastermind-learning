export type Module = {
  slug: string;
  number: number;
  stage: string;
  title: string;
  intro: string;
  practiceTitle: string;
  practiceInstructions: string;
  practicePlaceholder: string;
  concept: string;
  reflectionPrompt: string;
};

export const modules: Module[] = [
  {
    slug: "foundation",
    number: 0,
    stage: "Foundation",
    title: "Mindset Shift: From Passive to Active Learning",
    intro:
      "Every technique in this course assumes one thing first: that you've stopped waiting for information to sink in on its own. This module makes that shift concrete before anything else.",
    practiceTitle: "Your Practice: The Active Learner Audit",
    practiceInstructions:
      "Rate yourself honestly on a scale of 1–5 (1 = rarely, 5 = always) for each: (1) I test myself before checking the answer. (2) I treat getting something wrong as useful information, not failure. (3) I ask \"why\" and \"how\" instead of just memorizing \"what\". (4) I choose harder, effortful study methods over easy, comfortable ones. Write your scores and one sentence on what your lowest score tells you.",
    practicePlaceholder:
      "1. Testing before checking: __/5\n2. Wrong = useful: __/5\n3. Asking why/how: __/5\n4. Choosing effortful methods: __/5\n\nWhat my lowest score tells me:",
    concept:
      "Passive learning feels productive — rereading, highlighting, listening — because it's comfortable and the material feels familiar. Active learning feels harder because it forces your brain to do the retrieval and construction work itself. Research on growth mindset shows that people who treat struggle and mistakes as a normal part of getting better, rather than as evidence they're \"not smart enough\", persist longer and learn more. The techniques in this course only work if you adopt that active stance first: a study session becomes something you do to your material, not something that happens to you while it's in front of you.",
    reflectionPrompt:
      "Which single habit, from your audit, would make the biggest difference if you changed it this month?",
  },
  {
    slug: "encoding",
    number: 1,
    stage: "Pillar I — Encoding",
    title: "Encoding: Getting Information In So It Sticks",
    intro:
      "Encoding is everything that happens before you try to recall anything — it's how deeply and how well-connected the information becomes in the first place. Four techniques sit inside this pillar: Priming, Deep Processing, Referencing, and Overlearning.",
    practiceTitle: "Your Practice: Prime, Then Process",
    practiceInstructions:
      "Pick a topic you're about to study. First, prime: write what you already know and 2 questions you want answered (2 minutes). Then deep-process: read the material once, close it, and explain the core idea in your own words as if to a younger sibling, connecting it to something you already understand.",
    practicePlaceholder:
      "What I already know:\n\nQuestions I want answered:\n\nMy own-words explanation, connected to something familiar:",
    concept:
      "Priming activates relevant prior knowledge before new material arrives, giving your brain hooks to attach it to. Deep processing means engaging with meaning — explaining, connecting, questioning — rather than the shallow processing of just reading words on a page; the depth of processing at encoding time is one of the strongest predictors of what survives later. Referencing is the habit of explicitly linking new information to material you've already encoded, building a web of connections rather than isolated facts. Overlearning means continuing to practice a technique past the point where it feels \"good enough\", until it runs with less conscious effort, freeing up capacity for harder material.",
    reflectionPrompt:
      "Of priming, deep processing, referencing, and overlearning — which do you currently skip most often?",
  },
  {
    slug: "retrieval",
    number: 2,
    stage: "Pillar II — Retrieval",
    title: "Retrieval: Where Real Learning Happens",
    intro:
      "If encoding gets information in, retrieval is what makes it stay — and it's the single most effective thing you can do in a study session. This pillar covers Free Recall, Active Recall, Spaced Retrieval, and Linking Retrieval.",
    practiceTitle: "Your Practice: Free Recall, Then Active Recall",
    practiceInstructions:
      "Pick a topic you studied recently. Close every note. Spend 5 minutes free-recalling everything you remember, in any order. Then switch to active recall: write 3 specific questions about that topic and answer them without looking.",
    practicePlaceholder:
      "Free recall (5 minutes, no notes):\n\nQuestion 1 + answer:\nQuestion 2 + answer:\nQuestion 3 + answer:",
    concept:
      "Free recall is writing down everything you remember about a topic with no prompts — it reveals exactly what's actually encoded versus what only feels familiar. Active recall narrows this further by testing yourself with specific questions, flashcards, or practice problems instead of rereading notes. Spaced retrieval means testing yourself again at increasing intervals — a day later, then a week later, then a month later — rather than cramming all your retrieval practice into one sitting. Linking retrieval is a form of active recall where you deliberately pull two or more related concepts out together and explain how they connect, forcing your brain to retrieve relationships, not just isolated facts.",
    reflectionPrompt:
      "Which retrieval technique will you actually use this week, and on what topic?",
  },
  {
    slug: "enablers",
    number: 3,
    stage: "Pillar III — Enablers",
    title: "Enablers: The Habits That Hold It All Up",
    intro:
      "Encoding and retrieval are the engine; enablers are the conditions that let the engine run. The first enabler in this course is note-taking, with more being added as the system grows.",
    practiceTitle: "Your Practice: Notes Built for Retrieval",
    practiceInstructions:
      "Take notes on something you're currently studying — but instead of copying sentences, write each idea as a question you could later test yourself with, plus a short answer in your own words.",
    practicePlaceholder:
      "Question 1:\nAnswer:\n\nQuestion 2:\nAnswer:\n\nQuestion 3:\nAnswer:",
    concept:
      "Most note-taking is passive transcription — copying what's said or written — which barely touches encoding and creates nothing useful for retrieval later. Notes written as question-and-answer pairs do two jobs at once: writing the question forces deeper processing at encoding time, and the question itself becomes a ready-made active recall prompt later, no extra preparation needed before a test. This is why note-taking sits under Enablers rather than Encoding or Retrieval alone — done well, it strengthens both. More enablers, covering things like environment, time management, and focus, will be added to this pillar over time.",
    reflectionPrompt:
      "How would rewriting your last set of notes as questions change how you'd use them before an exam?",
  },
  {
    slug: "perrio-system",
    number: 4,
    stage: "Capstone",
    title: "The PERRIO Learning System: Putting It Together",
    intro:
      "PERRIO is the name for the complete system you've just learned in pieces: Priming and Overlearning live inside Encoding, Retrieval and Linking Retrieval live inside the Retrieval pillar, and Reference lives inside Enablers. This module is where the mindset shift and three pillars become one routine.",
    practiceTitle: "Your Practice: Design Your PERRIO Study Plan",
    practiceInstructions:
      "Pick one topic you need to study this week. For that topic, write: (1) one active-learning mindset check, (2) one Encoding technique you'll use, (3) one Retrieval technique you'll use and when, (4) how you'll take Enabler notes for it.",
    practicePlaceholder:
      "Topic:\n\n1. Mindset check:\n2. Encoding technique I'll use:\n3. Retrieval technique + when:\n4. How I'll take notes:",
    concept:
      "A single technique used once doesn't change much; a system used consistently does. PERRIO works because the pillars reinforce each other: an active mindset makes you willing to do the harder work of deep processing and self-testing instead of rereading; strong Encoding gives Retrieval something real to pull from; deliberate Retrieval is what actually builds durable memory; and Enabler habits like question-based notes make every other pillar easier to execute under time pressure. The goal isn't to do all of this perfectly from day one — it's to build one PERRIO-aligned study session this week, then make it a habit.",
    reflectionPrompt:
      "What would change about your results this term if you ran every study session through this system?",
  },
];

export function getModuleBySlug(slug: string) {
  return modules.find((m) => m.slug === slug);
}
