"use client";

import { useState } from "react";
import HelloEn from "../../public/assets/hello_en.svg";
import HelloEs from "../../public/assets/hello_es.svg";
import HelloKr from "../../public/assets/hello_kr.svg";
import HelloLv from "../../public/assets/hello_lv.svg";
import Lottie from "lottie-react";
import scrollDownBtn from "../../public/assets/scroll-down-arrow.json";

export default function Headline({ bannerBottomRef }: any) {
  const [helloSvg, setHelloSvg] = useState(0);

  const changeSvg: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (helloSvg >= 0 && helloSvg < 3) {
      setHelloSvg(helloSvg + 1);
    } else {
      setHelloSvg(0);
    }
  };
  const scrollDown: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    bannerBottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div onClick={(e: any) => changeSvg(e)}>
        {helloSvg == 0 && <HelloEn id="hello" />}
        {helloSvg == 1 && <HelloLv id="hello" />}
        {helloSvg == 2 && <HelloKr id="hello" />}
        {helloSvg == 3 && <HelloEs id="hello" />}
      </div>
      <Lottie
        animationData={scrollDownBtn}
        onClick={(e: any) => scrollDown(e)}
        className="scroll-down-btn"
      />
    </div>
  );
}
