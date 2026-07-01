"use client";

import { useReducer, useEffect, useRef } from "react";
import { FALSE_FRIENDS } from "@/data/false-friends";
import { buildSession, type SessionQuestion } from "@/lib/quiz-engine";
import { QUESTIONS_PER_SESSION } from "@/lib/constants";
import { analytics } from "@/lib/analytics";
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

export default function QuizClient({ initialRef }: { initialRef: string }) {
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

  function handleStart() {
    const questions = buildSession(FALSE_FRIENDS);
    analytics.quizStarted(initialRef);
    dispatch({ type: "START", questions });
  }

  function handleAnswer(optionIndex: number) {
    const timeMs = Date.now() - questionStartRef.current;
    const sq = state.questions[state.currentIndex];
    const correct = optionIndex === sq.correctIndex;
    analytics.questionAnswered(sq.question.id, correct, timeMs);
    dispatch({ type: "ANSWER", optionIndex });
  }

  function handleNext() {
    const isLast = state.currentIndex === QUESTIONS_PER_SESSION - 1;
    if (isLast) {
      const score = state.answers.filter(
        (ans, i) => ans === state.questions[i]?.correctIndex
      ).length;
      analytics.quizCompleted(score, QUESTIONS_PER_SESSION);
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
