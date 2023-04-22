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
      className={`w-[92%] h-[80px] bg-red-500 m-4`}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {item.title}
    </div>
  );
}
