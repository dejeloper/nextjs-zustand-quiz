import { create } from "zustand";
import { type Question } from "../types/type";
import confetti from "canvas-confetti";

interface State {
  questions: Question[];
  currentQuestion: number;
  fecthQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fecthQuestions: async (limit: number) => {
      const res = await fetch("http://localhost:3000/data/questions.json");
      const json = await res.json();
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);

      // set((state) => {
      //   return {
      //     questions: [
      //       {
      //         id: 1,
      //         question: "¿Quién ganó la Copa del Mundo de 2014?",
      //         answers: ["Alemania", "Argentina", "Francia", "Brasil"],
      //         correctAnswer: 0,
      //       },
      //     ],
      //   };
      // });

      set({ questions });
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
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
  };
});
