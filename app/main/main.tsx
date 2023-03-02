"use client";

import React, { useEffect, useRef, useState } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "./advanced_banner";
import LayerBottom from "./layer_bottom";
import "./main.css";

export default function Main() {
  const layerBottomRef = useRef<HTMLDivElement>(null);
  const currentOffsetRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = currentOffsetRef.current?.scrollTop || 0;
      setScrollOffset(currentOffset);
      console.log(scrollOffset);
    };

    if (currentOffsetRef.current) {
      currentOffsetRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentOffsetRef.current) {
        currentOffsetRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollOffset]);

  return (
    <main ref={currentOffsetRef}>
      <ParallaxProvider>
        <AdvancedBannerTop layerBottomRef={layerBottomRef} />
        <LayerBottom layerBottomRef={layerBottomRef} />
      </ParallaxProvider>
    </main>
  );
}
