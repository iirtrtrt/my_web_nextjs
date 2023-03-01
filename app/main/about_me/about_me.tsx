import { introduction } from "@/app/components";
import { getRandomInt } from "@/functions/getRandomInt";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./about_me.css";

export default function AboutMe() {
  const [textGenerater, setTextGenerater] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (textGenerater.length >= introduction.length) {
        setIsDone(true);
        console.log(isDone);
      }

      setTextGenerater(
        introduction.slice(0, textGenerater.length + getRandomInt(7))
      );
    }, getRandomInt(500));
    return () => clearTimeout(timeout);
  }, [textGenerater]);
  return (
    <div className={`text-white`}>
      <pre className={`end-cursor whitespace-pre-wrap break-normal`}>{textGenerater}</pre>
      <Link href={`https://www.linkedin.com/in/taekyung-kim-5757a4208/`}>
        Linkedin
      </Link>
      <Link href={`https://github.com/iirtrtrt`}>GitHub</Link>
    </div>
  );
}
