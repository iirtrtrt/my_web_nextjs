import Link from "next/link";
import React, { useState } from "react";
import { iProjectProps } from "./projects";
import "./project.css";

export default function ProjectCard({ project }: { project: iProjectProps }) {
  return (
    <div className={`w-full p-6 relative min-h-[280px] revealing-image`}>
      <div
        className={`absolute z-10 -translate-y-1/2 top-1/2 w-8/12 bg-emerald-900 bg-opacity-80 rounded-lg p-4`}
      >
        <div className={`md:text-2xl text-xl font-extrabold text-stone-200`}>
          {project.title}
        </div>
        <div className={`my-2 text-balance`}>{project.description}</div>
        <Link
          href={project.git_link}
          className={`float-right text-2xl font-bold hover:text-stone-900 duration-300`}
        >
          {`</>`} Source
        </Link>
      </div>
      <Link href={project.git_link}>
        <img
          src={project.preview_img}
          alt=""
          className={`float-right md:w-5/12 w-8/12 aspect-video rounded-lg blur-[1px] hover:blur-[0px] duration-300`}
        />
      </Link>
    </div>
  );
}
