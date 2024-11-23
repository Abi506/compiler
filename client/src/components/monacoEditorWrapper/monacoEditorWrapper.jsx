import React from "react";
import MonacoEditor from "@monaco-editor/react";

const MonacoEditorWrapper = ({ language, code, setCode }) => {
  const getMonacoLanguage = () => {
    switch (language) {
      case "python":
        return "python";
      case "c":
        return "c";
      case "cpp":
        return "cpp";
      case "java":
        return "java";
      case "javascript":
        return "javascript";
      default:
        return "text/plain";
    }
  };

  return (
    <MonacoEditor
      height="400px"
      width="550px"
      language={getMonacoLanguage()}
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value)}
    />
  );
};

export default MonacoEditorWrapper;
