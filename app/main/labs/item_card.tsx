import { iItemProps } from "../main";

export default function ItemCard({
  item,
  isDraggable,
  handleDragging,
}: {
  item: iItemProps;
  isDraggable: boolean;
  handleDragging: (dragging: boolean) => void;
}) {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("item_id", `${item.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  return (
    <div
      className={`md:w-full w-[120px] md:h-[56px] h-[48px] md:my-4 m-2 border-solid border-4 rounded-2xl p-2 flex justify-center item-center ${
        isDraggable
          ? "bg-stone-800 border-stone-400 cursor-grab"
          : "bg-stone-900 border-stone-800 text-stone-700"
      }`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {item.title}
    </div>
  );
}
