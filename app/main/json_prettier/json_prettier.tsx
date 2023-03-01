import React, { useState } from "react";
import PrettierViewer from "./prettier_viewer";
import TreeViewer from "./tree_viewer";

enum eViewer {
  TreeViewer = 0,
  PrettierViewer = 1,
}

export default function JsonPritter() {
  const [validText, setIValidText] = useState("\u00A0");
  const [isDisabled, setisDisabled] = useState(true);
  const [json, setJson] = useState();
  const [viewer, setViewer] = useState<number>();

  const validateJson = (jsonString: string) => {
    try {
      setJson(JSON.parse(jsonString));
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    const value = event.target.value;
    const isValidJson = validateJson(value);

    setisDisabled(!isValidJson);
    setIValidText(`Input value is ${isValidJson ? "valid" : "invalid"} JSON`);
  };

  return (
    <div className="w-full px-4">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => handleInputChange(e)}
          name="inputJson"
          className="p-4 text-lg rounded-md bg-gray-200 my-2 h-[420px] lg:h-[300px]"
        />
      </div>
      <div className="flex lg:items-center justify-between gap-2 lg:flex-row flex-col">
        <p
          className={`font-bold text-sm ${
            isDisabled ? "text-red-600" : "text-sky-300"
          } `}
        >
          {validText}
        </p>
        <div className="">
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25 mr-4"
            onClick={() => setViewer(eViewer["TreeViewer"])}
          >
            {eViewer[0]}
          </button>
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            onClick={() => setViewer(eViewer["PrettierViewer"])}
          >
            {eViewer[1]}
          </button>
        </div>
      </div>
      <div className="flex flex-col my-4">
        <div className="p-4 text-lg rounded-md bg-stone-700 my-2 min-h-[420px] lg:min-h-[300px] overflow-auto whitespace-nowrap">
          {viewer == eViewer.TreeViewer && <TreeViewer data={json} />}
          {viewer == eViewer.PrettierViewer && <PrettierViewer data={json} />}
        </div>
      </div>
    </div>
  );
}
