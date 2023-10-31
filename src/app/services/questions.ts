export const getAllQuestions = async () => {
  const res = await fetch("http://localhost:3000/data/questions.json");
  const json = await res.json();

  return json;
};
