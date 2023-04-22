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
    <main className={`w-full h-full flex justify-center item-center`}>
      <div className={`w-9/12 bg-black py-8`}>
        <div className={`h-full flex flex-row bg-white`}>
          <div
            className={`w-full bg-zinc-400`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {onShowing}
          </div>
          <div className={`w-4/12`}>
            <div>{currentTitle}</div>
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
