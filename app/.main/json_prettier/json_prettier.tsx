import { SAMPLE_JSON } from "@/app/components";
import React, { useState } from "react";
import PrettierViewer from "./prettier_viewer";
import TreeViewer from "./tree_viewer";

enum eViewer {
  "TreeViewer" = 0,
  "PrettierViewer" = 1,
}

export default function JsonPritter() {
  const [notifyText, setNotifyText] = useState("\u00A0");
  const [isDisabled, setisDisabled] = useState(true);
  const [inputJson, setInputJson] = useState("");
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

  const onChangeJson = (value: string) => {
    const isValidJson = validateJson(value);

    setisDisabled(!isValidJson);
    setNotifyText(`Input value is ${isValidJson ? "valid" : "invalid"} JSON`);
  };

  const copyInputJson = () => {
    navigator.clipboard.writeText(inputJson);

    let previousText = notifyText;
    setNotifyText("Copied");
    setTimeout(() => {
      setNotifyText(previousText);
    }, 2000);
  };

  return (
    <div className={`flex flex-1 flex-col`}>
      <div className={`bg-gray-200 rounded-md`}>
        <div className={`border-b-4 border-sky-900 font-semibold`}>
          <button
            className={`py-2 px-6`}
            onClick={() => {
              setInputJson(SAMPLE_JSON);
              onChangeJson(SAMPLE_JSON);
            }}
          >
            Sample
          </button>
          <button className={`py-2 px-6`} onClick={() => copyInputJson()}>
            Copy
          </button>
        </div>
        <textarea
          onChange={(e) => {
            setInputJson(e.target.value);
            onChangeJson(e.target.value);
          }}
          className={`p-4 text-lg bg-gray-200 h-[420px] lg:h-[300px] w-full`}
          placeholder={SAMPLE_JSON}
          value={inputJson}
        />
      </div>
      <div
        className={`flex lg:items-center justify-between gap-2 lg:flex-row flex-col`}
      >
        <p
          className={`font-bold text-sm ${
            isDisabled ? "text-red-600" : "text-sky-300"
          } `}
        >
          {notifyText}
        </p>
        <div className={`my-4`}>
          <button
            disabled={isDisabled}
            className={`text-sm text-white py-2 px-6 rounded-xl disabled:opacity-25 mr-4 ${
              viewer == eViewer["TreeViewer"] ? "bg-sky-900" : "bg-sky-600"
            }`}
            onClick={() => setViewer(eViewer["TreeViewer"])}
          >
            {eViewer[0]}
          </button>
          <button
            disabled={isDisabled}
            className={`text-sm text-white py-2 px-6 rounded-xl disabled:opacity-25 ${
              viewer == eViewer["PrettierViewer"] ? "bg-sky-900" : "bg-sky-600"
            }`}
            onClick={() => setViewer(eViewer["PrettierViewer"])}
          >
            {eViewer[1]}
          </button>
        </div>
      </div>
      <div
        className={`p-4 text-lg rounded-md bg-stone-800 min-h-[420px] lg:min-h-[300px] overflow-auto whitespace-nowrap text-white`}
      >
        {viewer == eViewer["TreeViewer"] && <TreeViewer data={json} />}
        {viewer == eViewer["PrettierViewer"] && <PrettierViewer data={json} />}
      </div>
    </div>
  );
}
