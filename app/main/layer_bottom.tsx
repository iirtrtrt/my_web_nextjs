import React, { RefObject, useEffect, useState } from "react";
import AboutMe from "./about_me/about_me";
import CommingSoon from "./coming_soon/coming_soon";
import JsonPritter from "./json_prettier/json_prettier";
import PhotoEditor from "./photo_editor/photo_editor";

enum eSubject {
  "About Me" = 0,
  "JSON Prettier" = 1,
  "Photo Editor" = 2,
  "Mini Game" = 3,
}

export default function LayerBottom({
  layerBottomRef,
}: {
  layerBottomRef: RefObject<HTMLDivElement>;
}) {
  const [subject, setSubject] = useState(0);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isQueGenerated, setIsQueGenerated] = useState(false);
  const [ansGenerator, setAnsGenerator] = useState("");
  const [queGenerator, setQueGenerator] = useState("");
  const [isOnAboutMe, setIsOnAboutMe] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.88,
    };

    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio >= 0.88 && !isOnAboutMe) {
          setIsOnAboutMe(true);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (layerBottomRef.current) {
      observer.observe(layerBottomRef.current);
    }

    return () => {
      if (layerBottomRef.current) {
        observer.unobserve(layerBottomRef.current);
      }
    };
  }, [isOnAboutMe]);

  return (
    <div className={`flex items-center justify-center`} ref={layerBottomRef}>
      <div className="min-h-screen py-16 lg:py-24 w-full xl:mx-80 lg:mx-60 md:mx-40 flex flex-col">
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
          {subject == eSubject["About Me"] && (
            <AboutMe
              isGenerated={isGenerated}
              setIsGenerated={setIsGenerated}
              ansGenerator={ansGenerator}
              setAnsGenerator={setAnsGenerator}
              isQueGenerated={isQueGenerated}
              setIsQueGenerated={setIsQueGenerated}
              queGenerator={queGenerator}
              setQueGenerator={setQueGenerator}
              isOnAboutMe={isOnAboutMe}
            />
          )}
          {subject == eSubject["JSON Prettier"] && <JsonPritter />}
          {subject == eSubject["Photo Editor"] && <PhotoEditor />}
          {subject == eSubject["Mini Game"] && (
            <CommingSoon subject={eSubject[3]} />
          )}
        </div>
      </div>
    </div>
  );
}
