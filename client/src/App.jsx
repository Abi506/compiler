import React, { useState, useRef, useEffect } from "react";
import MonacoEditorWrapper from "./components/monacoEditorWrapper/monacoEditorWrapper";
import LanguageSelector from "./components/languageSelector.jsx/languageSelector";
import FileUploader from "./components/fileUpload/fileUpload";
import OutputArea from "./components/outputArea/outputArea";
import { languageTemplates } from "./components/languageTemplates/languageTemplates";
import { FaDownload } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { IoMdPlay } from "react-icons/io";
import "./App.css";

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [codeRunning, setCodeRunning] = useState(false);

  const hasInitializedCode = useRef(false);

  useEffect(() => {
    if (!isFileUpload && !hasInitializedCode.current) {
      setCode(languageTemplates[language]);
    }
    hasInitializedCode.current = true;

    if (isFileUpload) {
      setIsFileUpload(false);
    }
  }, [language, isFileUpload]);  

  const runCode = async () => {
    setCodeRunning(true);
    const response = await fetch("http://localhost:5000/compile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, language, input }),
    });
    const result = await response.json();
    setOutput(result.output);
    setCodeRunning(false);
  };

  const downloadCode = () => {
    let fileExtension;
    switch (language) {
      case "python":
        fileExtension = ".py";
        break;
      case "c":
        fileExtension = ".c";
        break;
      case "cpp":
        fileExtension = ".cpp";
        break;
      case "java":
        fileExtension = ".java";
        break;
      case "javascript":
        fileExtension = ".js";
        break;
      default:
        fileExtension = ".txt";
    }

    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `code${fileExtension}`;
    link.click();
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <LanguageSelector language={language} setLanguage={setLanguage} />
        <FileUploader
          setLanguage={(lang) => {
            setIsFileUpload(true);
            setLanguage(lang);
          }}
          setCode={setCode}
        />
        <button
          onClick={downloadCode}
          style={{
            marginBottom: "20px",
            backgroundColor: "transparent",
            color: "blue",
          }}
        >
          <FaDownload />
        </button>
        <button onClick={runCode} className="run-button">
          {codeRunning ? (
            <TailSpin
              visible={true}
              height="20"
              width="20"
              color="green"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <IoMdPlay />
          )}
        </button>
      </div>
      <div className="source-code-container">
        <div className="source-code-editor-container">
          <p className="source-code-editor-heading">Source code</p>
          <MonacoEditorWrapper
            language={language}
            code={code}
            setCode={setCode}
          />
        </div>
        <div className="input-output-container">
          <label className="input-label">INPUT</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for your code"
            className="code-input-area"
            cols={50}
            rows={10}
          ></textarea>
          <OutputArea output={output} />
        </div>
      </div>
    </div>
  );
};

export default App;
