"use client";

import React, { RefObject, useState } from "react";
import AboutMe from "./about_me/about_me";
import JsonPritter from "./json_prettier/json_prettier";

enum eSubject {
  "About Me" = 0,
  "JSON Prettier" = 1,
  "Photo Editor" = 2,
  "Mini Game" = 3,
}

export default function LayerBottom({
  bannerBottomRef,
}: {
  bannerBottomRef: RefObject<HTMLDivElement>;
}) {
  const [subject, setSubject] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isQueGenerated, setIsQueGenerated] = useState(false);
  const [ansGenerator, setAnsGenerator] = useState("");
  const [queGenerator, setQueGenerator] = useState("");

  return (
    <div className={`flex items-center justify-center`} ref={bannerBottomRef}>
      <div className="min-h-screen py-16 lg:py-24 w-full lg:mx-80 flex flex-col">
        <div className="grid grid-cols-4 gap-4 text-sky-300 mb-4">
          <button
            className={`text-md lg:text-2xl font-medium lg:font-normal p-4 ${
              subject == eSubject["About Me"] && "text-sky-600"
            }`}
            onClick={() => setSubject(eSubject["About Me"])}
          >
            {eSubject[0]}
          </button>
          <button
            className={`text-md lg:text-2xl font-medium lg:font-normal p-4 ${
              subject == eSubject["JSON Prettier"] && "text-sky-600"
            }`}
            onClick={() => setSubject(eSubject["JSON Prettier"])}
          >
            {eSubject[1]}
          </button>
          <button
            className={`text-md lg:text-2xl font-medium lg:font-normal p-4 ${
              subject == eSubject["Photo Editor"] && "text-sky-600"
            }`}
            onClick={() => setSubject(eSubject["Photo Editor"])}
          >
            {eSubject[2]}
          </button>
          <button
            className={`text-md lg:text-2xl font-medium lg:font-normal p-4 ${
              subject == eSubject["Mini Game"] && "text-sky-600"
            }`}
            onClick={() => setSubject(eSubject["Mini Game"])}
          >
            {eSubject[3]}
          </button>
        </div>
        <div className="w-full px-4 flex flex-1 flex-col">
          {subject == 0 && (
            <AboutMe
              isGenerated={isGenerated}
              setIsGenerated={setIsGenerated}
              ansGenerator={ansGenerator}
              setAnsGenerator={setAnsGenerator}
              isQueGenerated={isQueGenerated}
              setIsQueGenerated={setIsQueGenerated}
              queGenerator={queGenerator}
              setQueGenerator={setQueGenerator}
            />
          )}
          {subject == 1 && <JsonPritter />}
        </div>
      </div>
    </div>
  );
}
