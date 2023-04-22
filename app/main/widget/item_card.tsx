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
      className={`w-full h-[56px] bg-red-500 my-4 border-solid border-4 rounded-3xl p-2 flex justify-center item-center`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <p className={``}>{item.title}</p>
    </div>
  );
}
