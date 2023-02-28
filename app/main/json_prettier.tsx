import React, { useState } from "react";
import PrettierViewer from "./prettier_viewer";
import TreeViewer from "./tree_viewer";

enum eViewer {
  TreeViewer = 0,
  PrettierViewer = 1,
}

export default function JsonPritter() {
  const [validText, setIValidText] = useState<string>();
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
    <div className="">
      <div className="flex flex-col my-4">
        <textarea
          onChange={(e) => handleInputChange(e)}
          name="inputJson"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        />
      </div>
      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            isDisabled ? "text-red-700" : "text-gray-700"
          } `}
        >
          {validText}
        </p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          onClick={() => setViewer(eViewer.TreeViewer)}
        >
          {eViewer[0]}
        </button>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          onClick={() => setViewer(eViewer.PrettierViewer)}
        >
          {eViewer[1]}
        </button>
      </div>
      {viewer == eViewer.TreeViewer && <TreeViewer data={json} />}
      {viewer == eViewer.PrettierViewer && <PrettierViewer data={json} />}
    </div>
  );
}
