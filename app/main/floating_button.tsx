// import { useState, useRef } from "react";
// import { menus } from "./main_data";

// type ButtonRefs = {
//   [id: string]: React.RefObject<HTMLDivElement>;
// };

// export default function FloatingButton() {
//   const buttonRefs: ButtonRefs = menus.reduce((acc, menu) => {
//     acc[menu.id] = useRef<HTMLDivElement>(null);
//     return acc;
//   }, {});

//   const handleClick = (id: number) => {
//     const buttonRect = buttonRefs[id].current?.getBoundingClientRect();
//     if (buttonRect) {
//       console.log(`Button ${id} position:`, buttonRect.top, buttonRect.left);
//     }
//   };

//   return (
//     <div className={`fixed right-60 bottom-20`}>
//       {menus.map((menu) => (
//         <div key={menu.id} ref={buttonRefs[menu.id]} onClick={() => handleClick(menu.id)}>
//           {menu.title}
//         </div>
//       ))}
//     </div>
//   );
// }
