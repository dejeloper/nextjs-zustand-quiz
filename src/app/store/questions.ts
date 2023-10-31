import { create } from "zustand";
import { type Question } from "../types/type";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";
import { getAllQuestions } from "../services/questions";

interface State {
  questions: Question[];
  currentQuestion: number;
  winner: boolean;
  finished: boolean;
  fecthQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
  win: () => void;
}

const confettiConfig = {
  spread: 360,
  ticks: 50,
  gravity: 0,
  decay: 0.94,
  startVelocity: 30,
  shapes: ["star"],
  colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFBB"],
};

const shootConfetti = () => {
  confetti({
    ...confettiConfig,
    particleCount: 40,
    scalar: 1.2,
    shapes: ["star"],
  });
  confetti({
    ...confettiConfig,
    particleCount: 10,
    scalar: 0.75,
    shapes: ["circle"],
  });
};

const mutipleShootConfetti = async () => {
  setTimeout(shootConfetti, 0);
  setTimeout(shootConfetti, 100);
  setTimeout(shootConfetti, 200);
  setTimeout(shootConfetti, 300);
  setTimeout(shootConfetti, 400);
  setTimeout(shootConfetti, 500);
};

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          winner: false,
          finished: false,

          fecthQuestions: async (limit: number) => {
            const json = await getAllQuestions();
            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);

            set({ questions }, false, "Fetch Questions");
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            const newQuestions = structuredClone(questions);
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            );
            const questionInfo = newQuestions[questionIndex];
            const isCorrect = questionInfo.correctAnswer === answerIndex;

            if (isCorrect) confetti();

            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrect,
              userSelectedAnswer: answerIndex,
            };

            set({ questions: newQuestions }, false, "Select Answer");
          },

          goNextQuestion: () => {
            const { questions, currentQuestion } = get();
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length)
              set({ currentQuestion: nextQuestion }, false, "Next Question");
          },

          goPrevQuestion: () => {
            const { currentQuestion } = get();
            const prevQuestion = currentQuestion - 1;
            if (prevQuestion >= 0)
              set({ currentQuestion: prevQuestion }, false, "Prev Question");
          },

          reset: () => {
            set(
              {
                questions: [],
                currentQuestion: 0,
                winner: false,
                finished: false,
              },
              false,
              "Reset"
            );
          },

          win: () => {
            const { questions } = get();
            const correctAnswers = questions.filter((q) => q.isCorrect);
            const minCorrectAnswers = questions.length / 2 + 1;
            const winner = correctAnswers.length >= minCorrectAnswers;
            const finished = true;
            mutipleShootConfetti();

            set({ winner, finished }, false, "Winner");
          },
        };
      },
      {
        name: "questions",
      }
    )
  )
);
