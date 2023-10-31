"use client";

import { useQuestionsStore } from "../store/questions";

const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fecthQuestions);

  const LIMIT_QUESTIONS = 5;
  const handlerClick = () => {
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
      <button
        onClick={handlerClick}
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-900"
      >
        Iniciar Juego
      </button>
    </div>
  );
};

export default Start;
