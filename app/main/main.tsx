"use client";

import { useState } from "react";
import { Item } from "./interface";
import "./main.css";
import ItemCard from "./widget/item_card";

const items: Item[] = [
  { id: 0, title: "AboutMe" },
  { id: 1, title: "Projects" },
  { id: 2, title: "JsonPrettier" },
  { id: 3, title: "PhotoEditor" },
  { id: 4, title: "Login" },
];

export default function Main() {
  const [onShowing, setOnShowing] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(items[0].title);
  const [isDragging, setIsDragging] = useState(false);

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
    <main className={`w-full h-full flex flex-col justify-center item-center`}>
      <div
        className={`flex flex-1 flex-col xl:mx-48 lg:mx-24 md:mx-12 bg-zinc-200 md:py-8 py-2`}
      >
        <div className={`flex flex-1 md:flex-row flex-col bg-white`}>
          <div
            className={`w-full flex flex-col bg-zinc-400 h-full`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div>{currentTitle}</div>
            <div
              className={`flex-1 border-solid border-4 rounded-3xl p-2 bg-zinc-800`}
            >
              {onShowing}
            </div>
          </div>
          <div className={`w-3/12 px-4 flex md:flex-col`}>
            <div>Drag and Drop to the left</div>
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
