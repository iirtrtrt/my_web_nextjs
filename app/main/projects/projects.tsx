import { forwardRef, RefObject } from "react";
import { menus } from "../main_data";
import TitleCard from "../title_card";
import ProjectCard from "./porject_card";
import { projects } from "./project_data";

export interface iProjectProps {
  id: number;
  preview_img: string;
  title: string;
  description: string;
  git_link: string;
}

const Projects = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={`min-h-screen flex flex-1 flex-col`}>
      <TitleCard title={menus[1].title} ref={ref} />
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
});

export default Projects;
