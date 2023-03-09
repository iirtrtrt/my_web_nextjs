import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "./canvas";

export default function ImageEditor() {
  return (
    <div
      className={`flex flex-1 flex-col bg-stone-900 rounded-md text-white p-4`}
    >
      <Canvas width={700} height={700} />
    </div>
  );
}
