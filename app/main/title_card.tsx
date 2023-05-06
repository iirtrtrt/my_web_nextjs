export default function TitleCard({ title }: { title: string }) {
  return (
    <div className={`my-4`}>
      <div className={`text-2xl font-bold italic text-emerald-900 pl-2`}>
        {title}
      </div>
      <div className={`w-full h-0.5 bg-green-900 mt-1`}></div>
    </div>
  );
}
