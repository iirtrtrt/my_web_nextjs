import React, { useState } from "react";
import { iProjectProps } from "./projects";

export default function ProjectCard({ project }: { project: iProjectProps }) {
  return (
    <div className={`w-full flex flex-col`}>
      <div className={`w-[200px] h-[100px] bg-black`}></div>
    </div>
  );
}
