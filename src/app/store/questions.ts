import { create } from "zustand";
import { type Question } from "../types/type";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";
import { getAllQuestions } from "../services/questions";

interface State {
  questions: Question[];
  currentQuestion: number;
  fecthQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,

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
              },
              false,
              "Reset"
            );
          },
        };
      },
      {
        name: "questions",
        getStorage: () => localStorage,
      }
    )
  )
);
