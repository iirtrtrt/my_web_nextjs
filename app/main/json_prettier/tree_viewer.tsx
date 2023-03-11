import React, { useState } from "react";

export default function TreeNode({ data, ml = false }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const renderObjectChild = (child: any, index: number) => {
    if (typeof child === "object" && child !== null) {
      return <TreeNode key={index} data={child} ml={true} />;
    }
    // console.log(typeof child);
    if (typeof child === "string") {
      return `"${String(child)}"`;
    }
    return child !== null ? String(child) : "null";
  };

  const renderObject = () => {
    const keys = Object.keys(data);
    const keyLength = keys.length;
    return (
      <>
        <span
          className={`cursor-pointer hover:text-sky-800`}
          onClick={handleClick}
        >
          {isExpanded ? "[-]" : "[+]"} Object{" "}
          {!isExpanded && "[" + keyLength + "]"}
        </span>
        {isExpanded && (
          <ul className="">
            {keys.map((key, index) => (
              <li key={index} className="">
                "{keys[index]}": {renderObjectChild(data[key], index)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  const renderArray = () => {
    return (
      <>
        <span
          className={`cursor-pointer hover:text-sky-800`}
          onClick={handleClick}
        >
          {isExpanded ? "[-]" : "[+]"} Array{" "}
          {!isExpanded && "[" + data.length + "]"}
        </span>
        {isExpanded && (
          <ul className="">
            {data.map((child: any, index: number) => (
              <li key={index} className="">
                {renderObjectChild(child, index)}
              </li>
            ))}
          </ul>
        )}
      </>
    );
  };

  const type = Array.isArray(data) ? "array" : typeof data;

  return (
    <div
      className={`${ml ? `ml-12` : `ml-0`} whitespace-pre-wrap break-normal`}
    >
      {type === "object" && renderObject()}
      {type === "array" && renderArray()}
    </div>
  );
}
