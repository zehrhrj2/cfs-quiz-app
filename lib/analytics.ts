// Plausible analytics — fires window.plausible() calls.
// TODO (Step 6): add Plausible <Script> to app/layout.tsx.

declare global {
  interface Window {
    plausible?: (
      event: string,
      opts?: { props?: Record<string, string | number | boolean> }
    ) => void;
  }
}

function track(
  event: string,
  props?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, { props });
}

export const analytics = {
  quizStarted: (ref: string) =>
    track("quiz_started", { ref }),

  questionAnswered: (questionId: string, correct: boolean, timeMs: number) =>
    track("quiz_question_answered", { questionId, correct, timeMs }),

  quizCompleted: (score: number, total: number) =>
    track("quiz_completed", { score, total }),

  resultShared: (method: "native" | "download" | "copy") =>
    track("result_shared", { method }),

  installClicked: (score: number) =>
    track("install_clicked", { score }),
};
