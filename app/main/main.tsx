"use client";

import React, { useRef } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "./advanced_banner";
import BannerBottom from "./banner_bottom";
import "./main.css";

export default function Main() {
  const bannerBottomRef = useRef<HTMLDivElement>(null);

  return (
    <main>
      <ParallaxProvider>
        <AdvancedBannerTop bannerBottomRef={bannerBottomRef} />
        <BannerBottom bannerBottomRef={bannerBottomRef} />
      </ParallaxProvider>
    </main>
  );
}
