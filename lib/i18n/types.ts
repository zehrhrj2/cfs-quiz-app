export type Strings = {
  meta: {
    title: string;
    description: string;
    og: {
      title: string;
      description: string;
    };
  };
  intro: {
    demoTrapMeaning: string;
    demoTrapLabel: string;
    demoCorrectMeaning: string;
    headlineLine1: string;
    headlineLine2: string;
    description: string;
    cta: string;
    noReg: string;
  };
  question: {
    prompt: string;
    correct: string;
    wrong: string;
    meaningOf: string;
    next: string;
    results: string;
  };
  result: {
    averageLabel: string;
    installBtn: string;
    shareBtn: string;
    shareTextTemplate: string;
    wrongSectionLabel: string;
    wrongNotPrefix: string;
    wrongNotSuffix: string;
    restartBtn: string;
  };
  tiers: ReadonlyArray<{
    min: number;
    max: number;
    text: string;
    subtext: string;
  }>;
};
