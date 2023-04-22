export default function Slider({ min, max, value, handleChange }: any) {
  return (
    <div>
      <input
        type="range"
        className={`w-full cursor-pointer`}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
