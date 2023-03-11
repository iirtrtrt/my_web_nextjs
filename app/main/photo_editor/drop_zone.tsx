import { FILE_TYPES } from "@/app/components";
import { useDropzone } from "react-dropzone";

export default function DropZone({
  setBackgroundImage,
}: {
  setBackgroundImage: (val: string | null) => void;
}) {
  const handleDropAccepted = (acceptedFiles: File[]) => {
    const reader = new FileReader();
    reader.onload = () => {
      setBackgroundImage(reader.result as string);
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
      className={`border-sky-300 hover:border-sky-600 border-dotted border-2 h-10 flex justify-center items-center cursor-pointer text-sky-300 hover:text-sky-600 rounded-md`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      Drop or Select an image
    </div>
  );
}
