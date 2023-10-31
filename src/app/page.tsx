"use client";
import Start from "./components/Start";
import FutbolLogo from "./Icons/FutbolLogo";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./components/Game";

export default function Home() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <>
      <main className=" bg-gray-900 w-full ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className=" flex gap-4 items-center justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl ">
            <FutbolLogo />
            Fútbol Quiz
          </h1>

          {questions.length === 0 && <Start />}
          {questions.length > 0 && <Game />}
        </div>
      </main>
    </>
  );
}
