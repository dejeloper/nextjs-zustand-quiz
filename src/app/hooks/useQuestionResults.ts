import { useQuestionsStore } from "../store/questions";

export const useQuestionsResults = () => {
  const question = useQuestionsStore((state) => state.questions);
  const win = useQuestionsStore((state) => state.win);

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;
  const questionsLength = question.length;

  question.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer === null || userSelectedAnswer === undefined)
      unansweredQuestions++;
    else if (correctAnswer === userSelectedAnswer) correctAnswers++;
    else incorrectAnswers++;

    if (
      correctAnswers + incorrectAnswers === questionsLength &&
      unansweredQuestions === 0
    ) {
      win();
    }
  });

  return { correctAnswers, incorrectAnswers, unansweredQuestions };
};
