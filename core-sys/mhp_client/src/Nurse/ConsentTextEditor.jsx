
import React, { useState, useMemo } from "react";
import JoditEditor from "jodit-react";

export default function ConsentTextEditor() {
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    addNewLineOnDBLClick: false
  };

  const handleSetContext = value => {
    console.log("value: ", value);
    setContent(value);
  };

  return useMemo(
    () => (
      <JoditEditor
        value={content}
        config={config}
        tabIndex={1}
        onBlur={handleSetContext}
        onChange={handleSetContext}
      />
    ),
    []
  );
}