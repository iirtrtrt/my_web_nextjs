export default function FeatureBtn({
  name,
  active,
  handleClick,
  isExportBtn = false,
  isUndoBtn = false,
}: {
  name: string;
  active: boolean;
  handleClick: () => void;
  isExportBtn?: boolean;
  isUndoBtn?: boolean;
}) {
  return (
    <button
      className={`rounded-xl bg-emerald-600 p-2 m-1 lg:m-0 lg:mb-4 ${
        active && "bg-emerald-900"
      } ${isExportBtn && "font-bold bg-stone-600 mb-0 lg:mb-0"} ${
        isUndoBtn && "font-bold bg-stone-600 ml-2 lg:ml-0 mb-0"
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
