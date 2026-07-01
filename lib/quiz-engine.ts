import type { FalseFriend } from "@/data/false-friends";
import { QUESTIONS_PER_SESSION } from "@/lib/constants";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type SessionQuestion = {
  question: FalseFriend;
  options: string[];      // shuffled answer options for display
  correctIndex: number;   // index of czechMeaning within options
};

export function buildSession(pool: FalseFriend[]): SessionQuestion[] {
  const d1 = shuffle(pool.filter((q) => q.difficulty === 1));
  const d2 = shuffle(pool.filter((q) => q.difficulty === 2));
  const d3 = shuffle(pool.filter((q) => q.difficulty === 3));

  // First 3 questions are always difficulty 1
  const first3 = d1.slice(0, Math.min(3, d1.length));
  const remaining1 = d1.slice(first3.length);

  // Remaining slots: mix d2, d3, and leftover d1
  const mixPool = shuffle([...d2, ...d3, ...remaining1]);
  const rest = mixPool.slice(0, QUESTIONS_PER_SESSION - first3.length);

  return [...first3, ...rest].map((q) => {
    const raw = [q.czechMeaning, q.russianTrapMeaning, ...q.distractors];
    const shuffled = shuffle(raw);
    return {
      question: q,
      options: shuffled,
      correctIndex: shuffled.indexOf(q.czechMeaning),
    };
  });
}
