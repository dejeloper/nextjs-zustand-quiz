import { useQuestionsStore } from "../store/questions";

export const useQuestionsResults = () => {
  const question = useQuestionsStore((state) => state.questions);

  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;

  question.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question;
    if (userSelectedAnswer === null || userSelectedAnswer === undefined)
      unansweredQuestions++;
    else if (correctAnswer === userSelectedAnswer) correctAnswers++;
    else incorrectAnswers++;
  });

  return { correctAnswers, incorrectAnswers, unansweredQuestions };
};
