"use client";

import { useState, useEffect, RefObject } from "react";
import HelloEn from "../../public/assets/hello_en.svg";
import HelloEs from "../../public/assets/hello_es.svg";
import HelloKr from "../../public/assets/hello_kr.svg";
import HelloLv from "../../public/assets/hello_lv.svg";
import Lottie from "lottie-react";
import scrollDownBtn from "../../public/assets/scroll-down-arrow.json";
import esterEggAnimation from "../../public/assets/ester_egg.json";

export default function LayerTop({
  bannerBottomRef,
}: {
  bannerBottomRef: RefObject<HTMLDivElement>;
}) {
  const [helloSvg, setHelloSvg] = useState(0);
  const [esterEgg, setEsterEgg] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [topPersent, setTopPersent] = useState("-50%");

  const changeSvg = () => {
    if (helloSvg >= 0 && helloSvg < 3) {
      setHelloSvg(helloSvg + 1);
    } else {
      setHelloSvg(0);
    }

    if (countdown > 0 && esterEgg < 5) {
      setEsterEgg(esterEgg + 1);
    }

    if (esterEgg >= 5) {
      setTopPersent("56%");
    }
  };

  const scrollDown = () => {
    bannerBottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [countdown]);

  const showEsterEgg = () => {
    if (countdown <= 0) {
      setCountdown(5);
      setEsterEgg(0);
    }
  };

  const hideEsterEgg = () => {
    setTopPersent("-50%");
    setTimeout(() => setEsterEgg(0), 3000);
  };

  return (
    <div className="min-w-[1000px]">
      <div
        onClick={() => {
          changeSvg();
          showEsterEgg();
        }}
      >
        {helloSvg == 0 && <HelloEn id="hello" />}
        {helloSvg == 1 && <HelloLv id="hello" />}
        {helloSvg == 2 && <HelloKr id="hello" />}
        {helloSvg == 3 && <HelloEs id="hello" />}
      </div>
      <Lottie
        animationData={scrollDownBtn}
        onClick={() => scrollDown()}
        className="scroll-down-btn"
      />
      <div className="instruction hide-mobile">
        <p>&#8656; click and change the language</p>
        <p>&#8656; click many times and see the ester egg</p>
        <p className="p-align-right">click to scroll down &#8658;</p>
      </div>
      {esterEgg >= 5 && (
        <div
          className="ester-egg"
          style={{ top: topPersent }}
          onClick={() => hideEsterEgg()}
        >
          <Lottie animationData={esterEggAnimation} />
        </div>
      )}
    </div>
  );
}
