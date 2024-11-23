import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const FileUploader = ({ setLanguage, setCode }) => {
  const [hover, setHover] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split(".").pop();
    let detectedLanguage;

    switch (fileExtension) {
      case "py":
        detectedLanguage = "python";
        break;
      case "c":
        detectedLanguage = "c";
        break;
      case "cpp":
        detectedLanguage = "cpp";
        break;
      case "java":
        detectedLanguage = "java";
        break;
      case "js":
        detectedLanguage = "javascript";
        break;
      default:
        alert("Unsupported file type");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setLanguage(detectedLanguage);
      setCode(fileContent);  
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          backgroundColor: "transparent",
          color: "black",
          padding: "10px",
          border: hover ? "1px solid black" : "none",
          borderRadius: "5px",
          fontSize: "30px",
        }}
      >
        <FaCloudUploadAlt />
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".py,.c,.cpp,.java,.js"
        onChange={handleFileUpload}
        style={{
          display: "none",
        }}
      />
    </div>
  );
};

export default FileUploader;
