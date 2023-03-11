export default function FeatureBtn({
  name,
  active,
  handleClick,
}: {
  name: string;
  active: boolean;
  handleClick: () => void;
}) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
