export const getAllQuestions = async () => {
  const QUESTIONS = process.env.NEXT_PUBLIC_HOST_QUESTIONS;
  const res = await fetch(`${QUESTIONS}/data/questions.json`);
  const json = await res.json();

  return json;
};
