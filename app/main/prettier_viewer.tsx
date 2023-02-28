import React, { useState } from "react";

export default function PrettierViewer({ data }: any) {
  const jsonString = JSON.stringify(data, null, 2);
  return <pre className={``}>{jsonString}</pre>;
}
