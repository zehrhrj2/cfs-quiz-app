"use client";

import { useReducer, useEffect, useRef } from "react";
import { FALSE_FRIENDS } from "@/data/false-friends";
import { buildSession, type SessionQuestion } from "@/lib/quiz-engine";
import { QUESTIONS_PER_SESSION } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

const SESSION_KEY = "cfs_quiz_session";

type Phase = "intro" | "question" | "feedback" | "result";

type QuizState = {
  phase: Phase;
  questions: SessionQuestion[];
  currentIndex: number;
  answers: (number | null)[];
};

type Action =
  | { type: "START"; questions: SessionQuestion[] }
  | { type: "ANSWER"; optionIndex: number }
  | { type: "NEXT" }
  | { type: "RESTORE"; state: QuizState };

const INITIAL: QuizState = {
  phase: "intro",
  questions: [],
  currentIndex: 0,
  answers: [],
};

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "START":
      return {
        phase: "question",
        questions: action.questions,
        currentIndex: 0,
        answers: new Array(QUESTIONS_PER_SESSION).fill(null),
      };
    case "ANSWER": {
      const answers = [...state.answers];
      answers[state.currentIndex] = action.optionIndex;
      return { ...state, phase: "feedback", answers };
    }
    case "NEXT": {
      const next = state.currentIndex + 1;
      if (next >= QUESTIONS_PER_SESSION) {
        return { ...state, phase: "result", currentIndex: next };
      }
      return { ...state, phase: "question", currentIndex: next };
    }
    case "RESTORE":
      return action.state;
  }
}

export default function QuizClient({ initialSrc }: { initialSrc: string | null }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const questionStartRef = useRef(Date.now());

  // Restore from sessionStorage on mount (survives accidental refresh)
  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (!saved) return;
    try {
      const parsed: QuizState = JSON.parse(saved);
      if (parsed.phase !== "intro" && parsed.questions.length > 0) {
        dispatch({ type: "RESTORE", state: parsed });
      }
    } catch {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }, []);

  // Persist in-progress state to sessionStorage
  useEffect(() => {
    if (state.phase !== "intro" && state.phase !== "result") {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Reset per-question timer on each new question
  useEffect(() => {
    if (state.phase === "question") {
      questionStartRef.current = Date.now();
    }
  }, [state.phase, state.currentIndex]);

  // Store src attribution in localStorage (first visit wins; explicit ?src= always wins)
  // then fire quiz_opened — both in one effect so src is guaranteed to be set first
  useEffect(() => {
    const existing = localStorage.getItem("cfs_quiz_src");
    if (initialSrc) {
      localStorage.setItem("cfs_quiz_src", initialSrc);
    } else if (!existing) {
      localStorage.setItem("cfs_quiz_src", "direct");
    }
    trackEvent("quiz_opened");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fire quiz_completed when the result phase is reached
  useEffect(() => {
    if (state.phase !== "result") return;
    const score = state.answers.filter(
      (ans, i) => ans !== null && ans === state.questions[i]?.correctIndex
    ).length;
    trackEvent("quiz_completed", { score });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.phase]);

  function handleStart() {
    const questions = buildSession(FALSE_FRIENDS);
    dispatch({ type: "START", questions });
  }

  function handleAnswer(optionIndex: number) {
    dispatch({ type: "ANSWER", optionIndex });
  }

  function handleNext() {
    if (state.currentIndex === QUESTIONS_PER_SESSION - 1) {
      sessionStorage.removeItem(SESSION_KEY);
    }
    dispatch({ type: "NEXT" });
  }

  function handleRestart() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  }

  if (state.phase === "intro") {
    return <QuizIntro onStart={handleStart} />;
  }

  if (state.phase === "question" || state.phase === "feedback") {
    const sq = state.questions[state.currentIndex];
    return (
      <QuizQuestion
        sessionQuestion={sq}
        questionNumber={state.currentIndex + 1}
        total={QUESTIONS_PER_SESSION}
        phase={state.phase}
        selectedIndex={state.answers[state.currentIndex]}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    );
  }

  // result phase
  const score = state.answers.filter(
    (ans, i) => ans !== null && ans === state.questions[i]?.correctIndex
  ).length;

  const wrongQuestions = state.questions
    .map((sq, i) => ({ sq, answeredIndex: state.answers[i] }))
    .filter(({ answeredIndex, sq }) => answeredIndex !== sq.correctIndex);

  return (
    <QuizResult
      score={score}
      total={QUESTIONS_PER_SESSION}
      wrongQuestions={wrongQuestions}
      onRestart={handleRestart}
    />
  );
}
