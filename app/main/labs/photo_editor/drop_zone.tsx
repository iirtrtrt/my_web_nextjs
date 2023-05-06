import { FILE_TYPES } from "@/app/components";
import { useDropzone } from "react-dropzone";

export default function DropZone({
  setBackgroundImage,
  setImageSize,
}: {
  setBackgroundImage: (val: string | null) => void;
  setImageSize: (size: { width: number; height: number }) => void;
}) {
  const handleDropAccepted = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setBackgroundImage(reader.result as string);
        setImageSize({ width: img.width, height: img.height });
      };
      if (e.target) {
        img.src = e.target.result as string;
      }
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: handleDropAccepted,
    accept: {
      "image/*": FILE_TYPES,
    },
  });

  return (
    <div
      className={`border-emerald-300 hover:border-emerald-600 border-dotted border-2 h-8 flex justify-center items-center cursor-pointer text-emerald-300 hover:text-emerald-600 rounded-md`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      Drop or Select an image
    </div>
  );
}
