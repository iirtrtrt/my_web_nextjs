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

  const clearInputJson = () => {
    setInputJson("");
  };

  return (
    <div className={`w-full flex flex-1 md:flex-row flex-col`}>
      <div className={`md:w-6/12 md:h-auto h-3/6 flex flex-col`}>
        <div className={`flex flex-col p-2`}>
          <div className={`flex flex-row pb-2`}>
            <button
              className={`px-2 mr-2 hover:text-emerald-600`}
              onClick={() => {
                setInputJson(SAMPLE_JSON);
                onChangeJson(SAMPLE_JSON);
              }}
            >
              Sample
            </button>
            <button
              className={`px-2 mx-2 hover:text-emerald-600`}
              onClick={() => copyInputJson()}
            >
              Copy
            </button>
            <button
              className={`px-2 ml-2 hover:text-emerald-600`}
              onClick={() => {
                clearInputJson();
                setisDisabled(true);
              }}
            >
              Clear
            </button>
          </div>
          <div className={`flex flex-row-reverse`}>
            <button
              disabled={isDisabled}
              className={`text-sm py-2 px-4 rounded-2xl disabled:opacity-25 ${
                viewer == eViewer["PrettierViewer"]
                  ? "bg-emerald-900"
                  : "bg-emerald-600"
              }`}
              onClick={() => setViewer(eViewer["PrettierViewer"])}
            >
              {eViewer[1]}
            </button>
            <button
              disabled={isDisabled}
              className={`text-sm py-2 px-4 rounded-2xl disabled:opacity-25 mr-4 ${
                viewer == eViewer["TreeViewer"]
                  ? "bg-emerald-900"
                  : "bg-emerald-600"
              }`}
              onClick={() => setViewer(eViewer["TreeViewer"])}
            >
              {eViewer[0]}
            </button>
          </div>
        </div>
        <textarea
          onChange={(e) => {
            setInputJson(e.target.value);
            onChangeJson(e.target.value);
          }}
          className={`p-2 flex-1 md:rounded-bl-2xl text-black`}
          placeholder={SAMPLE_JSON}
          value={inputJson}
        />
      </div>
      <div
        className={`md:w-6/12 md:h-auto h-3/6 p-2 md:rounded-none md:rounded-r-2xl rounded-b-2xl bg-stone-800 overflow-auto whitespace-nowrap`}
      >
        {viewer == eViewer["TreeViewer"] && <TreeViewer data={json} />}
        {viewer == eViewer["PrettierViewer"] && <PrettierViewer data={json} />}
      </div>
    </div>
  );
}
