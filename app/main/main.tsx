"use client";

import { useState } from "react";
import AboutMe from "./about_me/about_me";
import "./main.css";
import FloatingButton from "./floating_button";
import Labs from "./labs/labs";
import Projects from "./projects/projects";

export interface iItemProps {
  id: number;
  title: string;
}

const items: iItemProps[] = [
  { id: 0, title: "JsonPrettier" },
  { id: 1, title: "PhotoEditor" },
  { id: 2, title: "Login" },
];

export default function Main() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [isQueGenerated, setIsQueGenerated] = useState(false);
  const [ansGenerator, setAnsGenerator] = useState("");
  const [queGenerator, setQueGenerator] = useState("");

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
        />
        <Projects />
        <Labs />
      </div>
      <FloatingButton />
    </main>
  );
}
