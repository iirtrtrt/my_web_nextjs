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

    if (queGenerator.length >= quesetion.length) {
      setIsQueGenerated(true);
    }

    if (ansGenerator.length >= introduction.length) {
      setIsGenerated(true);
    }

    if (!isQueGenerated) {
      const timeout = setTimeout(() => {
        setQueGenerator(quesetion.slice(0, queGenerator.length + 1));
      }, getRandomInt(240));
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(
        () => {
          setAnsGenerator(
            introduction.slice(0, ansGenerator.length + getRandomInt(10))
          );
          setDelay(false);
        },
        delay ? 2048 : getRandomInt(240)
      );
      return () => clearTimeout(timeout);
    }
  }, [ansGenerator, isGenerated, queGenerator, isQueGenerated, delay]);

  return (
    <div className={`text-white flex flex-1 flex-col`}>
      <pre
        className={`whitespace-pre-wrap break-normal bg-stone-700 px-[12px] rounded-md gpt-shadow ${
          isQueGenerated && "end-cursor py-[12px]"
        }`}
      >
        {ansGenerator}
      </pre>
      {isGenerated && (
        <>
          <Link href={`https://www.linkedin.com/in/taekyung-kim-5757a4208/`}>
            Linkedin
          </Link>
          <Link href={`https://github.com/iirtrtrt`}>GitHub</Link>
        </>
      )}

      <div
        className={`w-full h-[48px] bg-stone-800 rounded-md gpt-shadow mt-auto px-[12px] flex items-center ${
          !isQueGenerated && "end-cursor"
        }`}
      >
        {queGenerator}
      </div>
    </div>
  );
}
