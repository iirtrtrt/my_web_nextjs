"use client";

import React from "react";
import JsonPritter from "./json_prettier";

export default function BannerBottom({ bannerBottomRef }: any) {
  return (
    <div className={`flex items-center justify-center`} ref={bannerBottomRef}>
      <div className="mx-4 xl:mx-96 w-full min-h-screen py-24">
        <div className="w-full h-full bg-lime-300">
          <div className="grid grid-cols-4 gap-4">
            <div id="1">About me</div>
            <div>JSON pritter</div>
            <div>Photo editor</div>
            <div>Game</div>
          </div>
          <JsonPritter />
        </div>
      </div>
    </div>
  );
}
