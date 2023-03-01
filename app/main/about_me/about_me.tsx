import { introduction } from "@/app/components";
import { getRandomInt } from "@/functions/getRandomInt";
import Link from "next/link";
import React, { useEffect } from "react";
import "./about_me.css";

export default function AboutMe({
  isGenerated,
  setIsGenerated,
  textGenerator,
  setTextGenerator,
}: {
  isGenerated: boolean;
  setIsGenerated: (gnd: boolean) => void;
  textGenerator: string;
  setTextGenerator: (val: string) => void;
}) {
  useEffect(() => {
    if (isGenerated) {
      return;
    }

    if (textGenerator.length >= introduction.length) {
      setIsGenerated(true);
    }

    const timeout = setTimeout(() => {
      setTextGenerator(
        introduction.slice(0, textGenerator.length + getRandomInt(7))
      );
    }, getRandomInt(300));
    return () => clearTimeout(timeout);
  }, [textGenerator, isGenerated]);

  return (
    <div className={`text-white`}>
      <pre className={`end-cursor whitespace-pre-wrap break-normal`}>
        {textGenerator}
      </pre>
      <Link href={`https://www.linkedin.com/in/taekyung-kim-5757a4208/`}>
        Linkedin
      </Link>
      <Link href={`https://github.com/iirtrtrt`}>GitHub</Link>
    </div>
  );
}
