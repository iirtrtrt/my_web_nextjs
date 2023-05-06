import { INTRODUCTION, MENUS, QUESTION } from "@/app/components";
import { getRandomInt } from "@/hooks/getRandomInt";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TitleCard from "../title_card";
import "./about_me.css";

export default function AboutMe({
  isGenerated,
  setIsGenerated,
  ansGenerator,
  setAnsGenerator,
  isQueGenerated,
  setIsQueGenerated,
  queGenerator,
  setQueGenerator,
}: {
  isGenerated: boolean;
  setIsGenerated: (val: boolean) => void;
  ansGenerator: string;
  setAnsGenerator: (val: string) => void;
  isQueGenerated: boolean;
  setIsQueGenerated: (val: boolean) => void;
  queGenerator: string;
  setQueGenerator: (val: string) => void;
}) {
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    if (isGenerated) {
      return;
    }

    if (queGenerator.length >= QUESTION.length && !isQueGenerated) {
      setIsQueGenerated(true);
    }

    if (ansGenerator.length >= INTRODUCTION.length && !isGenerated) {
      setIsGenerated(true);
    }

    if (!isQueGenerated) {
      const timeout = setTimeout(() => {
        setQueGenerator(QUESTION.slice(0, queGenerator.length + 1));
      }, getRandomInt(160));

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(
        () => {
          setAnsGenerator(
            INTRODUCTION.slice(0, ansGenerator.length + getRandomInt(8))
          );
          setDelay(false);
        },
        delay ? 2048 : getRandomInt(160)
      );

      return () => clearTimeout(timeout);
    }
  }, [ansGenerator, isGenerated, queGenerator, isQueGenerated, delay]);

  return (
    <div className={`min-h-screen flex flex-1 flex-col pb-4`}>
      <TitleCard title={MENUS[0].title} />
      {isQueGenerated && (
        <div className={`p-4 bg-stone-800 flex`}>
          <img
            src="android-icon-36x36.png"
            className={`w-[32px] h-[32px] mr-8`}
          />
          <div className={`flex-1`}>
            <pre
              className={`whitespace-pre-wrap break-normal ${
                isQueGenerated && "end-cursor"
              }`}
            >
              {ansGenerator}
            </pre>
          </div>
        </div>
      )}

      {isGenerated && (
        <div className={`grid grid-cols-2 gap-2 mb-3 font-medium p-4`}>
          <Link
            href={`https://www.linkedin.com/in/taekyung-kim-5757a4208/`}
            className={`flex flex-col p-1 hover:p-0 ease-in-out duration-300`}
          >
            Linkedin
            <div
              className={`bg-[url('/assets/about_me_linkedin.png')] rounded-md p-16 bg-cover blur-[1px] hover:blur-[0px]`}
            ></div>
          </Link>
          <Link
            href={`https://github.com/iirtrtrt`}
            className={`flex flex-col p-1 hover:p-0 ease-in-out duration-300`}
          >
            GitHub
            <div
              className={`bg-[url('/assets/about_me_github.png')] rounded-md p-16 bg-cover blur-[1px] hover:blur-[0px]`}
            ></div>
          </Link>
        </div>
      )}
      <div
        className={`lg:w-[600px] md:w-[480px] sm:w-[360px] w-[300px] h-[48px] mx-auto mt-auto bg-stone-800 rounded-md gpt-shadow px-4 flex items-center`}
      >
        <div className={` ${!isQueGenerated && "end-cursor"}`}>
          {queGenerator}
        </div>
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          className={`mr-1 ml-auto`}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </div>
    </div>
  );
}
