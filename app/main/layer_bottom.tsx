"use client";

import React, { useState } from "react";
import AboutMe from "./about_me/about_me";
import JsonPritter from "./json_prettier/json_prettier";

enum eSubject {
  "About Me" = 0,
  "JSON Prettier" = 1,
  "Photo Editor" = 2,
  "Mini Game" = 3,
}

export default function LayerBottom({ bannerBottomRef }: any) {
  const [subject, setSubject] = useState(0);

  return (
    <div className={`flex items-center justify-center`} ref={bannerBottomRef}>
      <div className="min-h-screen py-16 lg:py-24 w-full lg:mx-80">
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
        <div className="w-full px-4">
          {subject == 0 && <AboutMe />}
          {subject == 1 && <JsonPritter />}
        </div>
      </div>
    </div>
  );
}
