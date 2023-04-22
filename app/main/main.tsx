"use client";

import { useState } from "react";
import AboutMe from "./about_me/about_me";
import { Item } from "./interface";
import JsonPritter from "./json_prettier/json_prettier";
import PhotoEditor from "./photo_editor/photo_editor";
import "./main.css";
import ItemCard from "./item_card";

const items: Item[] = [
  { id: 0, title: "AboutMe" },
  { id: 1, title: "Project" },
  { id: 2, title: "JsonPrettier" },
  { id: 3, title: "PhotoEditor" },
  { id: 4, title: "Login" },
];

export default function Main() {
  const [onShowing, setOnShowing] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(items[0].title);
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isQueGenerated, setIsQueGenerated] = useState(false);
  const [ansGenerator, setAnsGenerator] = useState("");
  const [queGenerator, setQueGenerator] = useState("");

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("item_id");
    setOnShowing(id);
    setCurrentTitle(items[id].title);
    handleDragging(false);
  };

  return (
    <main
      className={`w-full min-h-screen flex flex-col justify-center item-center bg-stone-950`}
    >
      <div
        className={`flex flex-1 flex-col py-2 lg:py-4 xl:mx-80 lg:mx-24 md:mx-12`}
      >
        <div className={`flex flex-1 md:flex-row flex-col`}>
          <div
            className={`w-full flex flex-1 flex-col`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className={`m-3 text-3xl font-semibold`}>{currentTitle}</div>
            <div
              className={`flex flex-1 border-4 rounded-2xl bg-stone-900 ${
                isDragging
                  ? "border-dashed border-emerald-600"
                  : "border-solid border-stone-400"
              }`}
            >
              {onShowing == 0 && (
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
              {onShowing == 2 && <JsonPritter />}
              {onShowing == 3 && <PhotoEditor />}
            </div>
          </div>
          <div className={`md:w-3/12 px-4 flex md:flex-col w-full flex-wrap`}>
            <div className={`m-4 text-lg font-semibold`}>
              <p>DragAndDrop</p>
            </div>
            {items.map((item) => (
              <ItemCard
                item={item}
                isDraggable={onShowing != item.id}
                handleDragging={handleDragging}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
