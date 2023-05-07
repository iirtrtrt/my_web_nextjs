import useOnScreen from "@/hooks/useOnScreen";
import { RefObject, useEffect, useState } from "react";
import { iItemProps } from "./main";
import { menus } from "./main_data";

export default function FloatingButton({
  refs,
}: {
  refs: RefObject<HTMLDivElement>[];
}) {
  const [activeRef, setActiveRef] = useState(0);
  const [isScrolling, setisScrolling] = useState(false);

  const onScreenAboutMe = useOnScreen(refs[0]);
  const onScreenProjects = useOnScreen(refs[1]);
  const onScreenLabs = useOnScreen(refs[2]);

  useEffect(() => {
    if (!isScrolling) {
      if (onScreenAboutMe) {
        setActiveRef(menus[0].id);
      } else if (onScreenProjects) {
        setActiveRef(menus[1].id);
      } else if (onScreenLabs) {
        setActiveRef(menus[2].id);
      }
    }
  }, [isScrolling, onScreenAboutMe, onScreenProjects, onScreenLabs]);

  const scrollToElement = (index: number) => {
    setisScrolling(true);
    refs[index].current?.scrollIntoView();
    setActiveRef(index);
    setisScrolling(false);
  };

  return (
    <div
      className={`fixed z-50 md:left-[12%] md:bottom-[12%] left-[8%] bottom-[4%] bg-stone-900 bg-opacity-90 rounded-lg`}
    >
      {menus.map((menu: iItemProps) => (
        <div
          key={menu.id}
          className={`cursor-pointer p-2 rounded-lg ${
            menu.id === activeRef ? "bg-emerald-600" : ""
          }`}
          onClick={() => scrollToElement(menu.id)}
        >
          {menu.title}
        </div>
      ))}
    </div>
  );
}
