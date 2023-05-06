import { MENUS } from "@/app/components";
import React, { useState } from "react";
import TitleCard from "../title_card";

export interface iProjectProps {
  id: number;
  preview_img: string;
  title: string;
  description: string;
  git_link: string;
}

export default function Projects() {
  return (
    <div className={`min-h-screen flex flex-1 flex-col`}>
      <TitleCard title={MENUS[1].title} />
      <div className={`w-[200px] h-[100px] bg-black`}></div>
    </div>
  );
}
