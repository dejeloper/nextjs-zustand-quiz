import { create } from "zustand";
import { type Question } from "../types/type";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

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
  persist(
    (set, get) => {
      return {
        questions: [],
        currentQuestion: 0,

        fecthQuestions: async (limit: number) => {
          const res = await fetch("http://localhost:3000/data/questions.json");
          const json = await res.json();
          const questions = json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);

          set({ questions });
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

          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { questions, currentQuestion } = get();
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length)
            set({ currentQuestion: nextQuestion });
        },

        goPrevQuestion: () => {
          const { currentQuestion } = get();
          const prevQuestion = currentQuestion - 1;
          if (prevQuestion >= 0) set({ currentQuestion: prevQuestion });
        },

        reset: () => {
          set({
            questions: [],
            currentQuestion: 0,
          });
        },
      };
    },
    {
      name: "questions",
      getStorage: () => localStorage,
    }
  )
);
