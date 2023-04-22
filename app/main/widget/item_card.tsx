import { Item } from "../interface";

export default function ItemCard({
  item,
  isDraggable,
  handleDragging,
}: {
  item: Item;
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
      className={`w-full h-[56px] my-4 border-solid border-4 rounded-3xl p-2 flex justify-center item-center ${
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
