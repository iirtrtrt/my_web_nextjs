"use client";

import { useState } from "react";
import PhotoEditor from "./photo_editor/photo_editor";
import JsonPritter from "./json_prettier/json_prettier";
import ItemCard from "./item_card";
import TitleCard from "../title_card";
import { menus } from "../main_data";

export interface iItemProps {
  id: number;
  title: string;
}

const items: iItemProps[] = [
  { id: 0, title: "JsonPrettier" },
  { id: 1, title: "PhotoEditor" },
  { id: 2, title: "Login" },
];

export default function Labs() {
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
    <div className={`min-h-screen flex flex-1 flex-col pb-2 lg:pb-4`}>
      <TitleCard title={menus[2].title} />
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
            {onShowing == 0 && <JsonPritter />}
            {onShowing == 1 && <PhotoEditor />}
            {onShowing == 2 && `ComingSoon`}
          </div>
        </div>
        <div className={`md:w-3/12 px-4 flex md:flex-col w-full flex-wrap`}>
          <div className={`m-4 text-lg font-semibold`}>
            <p>DragAndDrop</p>
          </div>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              isDraggable={onShowing != item.id}
              handleDragging={handleDragging}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
