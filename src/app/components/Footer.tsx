import { useQuestionsResults } from "../hooks/useQuestionResults";

export const Footer = () => {
  const { correctAnswers, incorrectAnswers, unansweredQuestions } =
    useQuestionsResults();

  return (
    <footer className="rounded-lg shadow m-4 bg-gray-800">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
        <span className="text-sm sm:text-center text-gray-400">
          {`✅ ${correctAnswers} Correctas - ❌ ${incorrectAnswers} Incorrectas - ❔${unansweredQuestions} Sin responder`}
        </span>
      </div>
    </footer>
  );
};
