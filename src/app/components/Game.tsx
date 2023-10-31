import { ArrowNext } from "../Icons/ArrowNext";
import { ArrowPrevious } from "../Icons/ArrowPrevious";
import { useQuestionsStore } from "../store/questions";
import { Question, type Question as QuestionType } from "../types/type";
import { Footer } from "./Footer";

const getBackgroundColor = (info: Question, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  console.log(userSelectedAnswer, correctAnswer, index);

  if (userSelectedAnswer === null || userSelectedAnswer === undefined)
    return "border-gray-600 hover:bg-gray-900 hover:border-gray-700";

  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "border-gray-600 hover:bg-gray-900 hover:border-gray-700";

  if (index === correctAnswer && index !== undefined)
    return "bg-green-700 border-green-700 hover:border-green-700";

  if (index === userSelectedAnswer)
    return "bg-red-700 border-red-700 hover:border-red-700";

  return "border-gray-600 hover:bg-gray-900 hover:border-gray-700";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);
  const createHandlerClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <section className="w-full min-w-sm p-4 border rounded-lg shadow sm:p-8 bg-gray-800 border-gray-700 select-none">
      <h5 className="mb-4 text-xl font-medium text-gray-400 text-left">
        {info.question}
      </h5>
      <ul className="w-full text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white">
        {info.answers.map((answer, index) => (
          <li
            key={index}
            className={`w-full ${getBackgroundColor(info, index)} 
						px-4 py-2 border-b hover:rounded-lg`}
          >
            <button
              className="w-full"
              onClick={createHandlerClick(index)}
              disabled={
                info.userSelectedAnswer !== null &&
                info.userSelectedAnswer !== undefined
              }
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const questionInfo = questions[currentQuestion];

  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPrevQuestion = useQuestionsStore((state) => state.goPrevQuestion);

  return (
    <>
      <div className="inline-flex rounded-md shadow-sm mb-4" role="group">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium border rounded-l-lg focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white disabled:text-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed"
          onClick={() => goPrevQuestion()}
          disabled={currentQuestion === 0}
        >
          <ArrowPrevious />
        </button>
        <p className="p-4 text-sm font-medium border-t border-b focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white">
          {currentQuestion + 1} / {questions.length}
        </p>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium border rounded-r-md focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white disabled:text-gray-700 disabled:bg-gray-900 disabled:cursor-not-allowed"
          onClick={() => goNextQuestion()}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowNext />
        </button>
      </div>

      <Question info={questionInfo} />

      <Footer />
    </>
  );
};
