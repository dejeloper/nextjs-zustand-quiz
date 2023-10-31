import { useQuestionsStore } from "../store/questions";
import { Question, type Question as QuestionType } from "../types/type";

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
            <button className="w-full" onClick={createHandlerClick(index)}>
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

  return (
    <>
      <Question info={questionInfo} />
    </>
  );
};
