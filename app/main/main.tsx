"use client";

import { useRef, useState } from "react";
import AboutMe from "./about_me/about_me";
import FloatingButton from "./floating_button";
import Labs from "./labs/labs";
import Projects from "./projects/projects";
import "./main.css";

export interface iItemProps {
  id: number;
  title: string;
}

export interface iMenuProps {
  id: number;
  title: string;
}

export default function Main() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isQueGenerated, setIsQueGenerated] = useState(false);
  const [ansGenerator, setAnsGenerator] = useState("");
  const [queGenerator, setQueGenerator] = useState("");
  
  const refAboutMe = useRef<HTMLDivElement>(null);
  const refProjects = useRef<HTMLDivElement>(null);
  const refLabs = useRef<HTMLDivElement>(null);
  const refs = [refAboutMe, refProjects, refLabs];

  return (
    <main className={`w-full bg-stone-950`}>
      <div className={`xl:mx-80 lg:mx-24 md:mx-12`}>
        <AboutMe
          isGenerated={isGenerated}
          setIsGenerated={setIsGenerated}
          ansGenerator={ansGenerator}
          setAnsGenerator={setAnsGenerator}
          isQueGenerated={isQueGenerated}
          setIsQueGenerated={setIsQueGenerated}
          queGenerator={queGenerator}
          setQueGenerator={setQueGenerator}
          ref={refAboutMe}
        />
        <Projects ref={refProjects} />
        <Labs ref={refLabs} />
      </div>
      <FloatingButton refs={refs} />
    </main>
  );
}
