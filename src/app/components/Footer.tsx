import { useQuestionsResults } from "../hooks/useQuestionResults";
import { useQuestionsStore } from "../store/questions";

export const Footer = () => {
  const { correctAnswers, incorrectAnswers, unansweredQuestions } =
    useQuestionsResults();
  const reset = useQuestionsStore((state) => state.reset);
  return (
    <footer className="rounded-lg shadow m-4 bg-gray-800">
      <div className="flex flex-col w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
        <span className="text-sm sm:text-center text-gray-400">
          {`✅ ${correctAnswers} Correctas - ❌ ${incorrectAnswers} Incorrectas - ❔${unansweredQuestions} Sin responder`}
        </span>
        <button
          className="border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm mt-4 px-5 py-2.5 mr-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
          onClick={() => reset()}
        >
          Reiniciar el Juego
        </button>
      </div>
    </footer>
  );
};
