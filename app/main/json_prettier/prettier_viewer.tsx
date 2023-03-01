import React from "react";

export default function PrettierViewer({ data }: any) {
  const jsonString = JSON.stringify(data, null, 2);
  return (
    <div>
      <pre className="">{jsonString}</pre>
    </div>
  );
}
