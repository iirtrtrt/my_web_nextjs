"use client";

import React, { useRef } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "./advanced_banner";
import LayerBottom from "./layer_bottom";
import "./main.css";

export default function Main() {
  const layerBottomRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <ParallaxProvider>
        <AdvancedBannerTop layerBottomRef={layerBottomRef} />
        <LayerBottom layerBottomRef={layerBottomRef} />
      </ParallaxProvider>
    </main>
  );
}
