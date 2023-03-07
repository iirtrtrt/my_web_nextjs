import { introduction, quesetion } from "@/app/components";
import { getRandomInt } from "@/functions/getRandomInt";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  isOnAboutMe,
}: {
  isGenerated: boolean;
  setIsGenerated: (val: boolean) => void;
  ansGenerator: string;
  setAnsGenerator: (val: string) => void;
  isQueGenerated: boolean;
  setIsQueGenerated: (val: boolean) => void;
  queGenerator: string;
  setQueGenerator: (val: string) => void;
  isOnAboutMe: boolean;
}) {
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    if (isOnAboutMe) {
      if (isGenerated) {
        return;
      }

      if (queGenerator.length >= quesetion.length && !isQueGenerated) {
        setIsQueGenerated(true);
      }

      if (ansGenerator.length >= introduction.length && !isGenerated) {
        setIsGenerated(true);
      }

      if (!isQueGenerated) {
        const timeout = setTimeout(() => {
          setQueGenerator(quesetion.slice(0, queGenerator.length + 1));
        }, getRandomInt(160));

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(
          () => {
            setAnsGenerator(
              introduction.slice(0, ansGenerator.length + getRandomInt(10))
            );
            setDelay(false);
          },
          delay ? 1280 : getRandomInt(160)
        );

        return () => clearTimeout(timeout);
      }
    }
  }, [
    ansGenerator,
    isGenerated,
    queGenerator,
    isQueGenerated,
    delay,
    isOnAboutMe,
  ]);

  return (
    <div className={`text-white flex flex-1 flex-col`}>
      <div className={`bg-stone-700 px-4 gpt-shadow rounded-md mb-4`}>
        <pre
          className={`whitespace-pre-wrap break-normal ${
            isQueGenerated && "end-cursor py-4"
          }`}
        >
          {ansGenerator}
        </pre>
        {isGenerated && (
          <div className={`grid grid-cols-2 gap-2 h-300px mb-3 font-medium`}>
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
      </div>
      <div
        className={`w-full h-[48px] bg-stone-800 rounded-md gpt-shadow mt-auto px-4 flex items-center ${
          !isQueGenerated && "end-cursor"
        }`}
      >
        {queGenerator}
      </div>
    </div>
  );
}
