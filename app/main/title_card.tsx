import { forwardRef } from "react";

const TitleCard = forwardRef<HTMLDivElement, { title: string }>(
  ({ title }, ref) => {
    return (
      <div className={`md:my-6 my-2`} ref={ref}>
        <div className={`text-2xl font-bold italic text-emerald-900 pl-2`}>
          {title}
        </div>
        <div className={`w-full h-0.5 bg-green-900 mt-1`}></div>
      </div>
    );
  }
);

export default TitleCard;
