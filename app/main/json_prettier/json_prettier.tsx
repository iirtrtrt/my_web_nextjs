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
    <>
      <div className={`flex flex-col`}>
        <textarea
          onChange={(e) => handleInputChange(e)}
          name="inputJson"
          placeholder={`{
            "glossary": {
                "title": "example glossary",
            "GlossDiv": {
                    "title": "S",
              "GlossList": {
                        "GlossEntry": {
                            "ID": "SGML",
                  "SortAs": "SGML",
                  "GlossTerm": "Standard Generalized Markup Language",
                  "Acronym": "SGML",
                  "Abbrev": "ISO 8879:1986",
                  "GlossDef": {
                                "para": "A meta-markup language, used to create markup languages such as DocBook.",
                    "GlossSeeAlso": ["GML", "XML"]
                            },
                  "GlossSee": "markup"
                        }
                    }
                }
            }
        }`}
          className={`p-4 text-lg rounded-md bg-gray-200 h-[420px] lg:h-[300px]`}
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
          {validText}
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
      <div className={`flex flex-col`}>
        <div
          className={`p-4 text-lg rounded-md bg-stone-800 min-h-[420px] lg:min-h-[300px] overflow-auto whitespace-nowrap text-white`}
        >
          {viewer == eViewer["TreeViewer"] && <TreeViewer data={json} />}
          {viewer == eViewer["PrettierViewer"] && (
            <PrettierViewer data={json} />
          )}
        </div>
      </div>
    </>
  );
}
