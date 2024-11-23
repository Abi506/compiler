const { executeCommand, cleanUpFiles } = require("../utils/fileUtils");
const fs = require("fs");

const compileCode = async (req, res) => {
  const { code, language, input } = req.body;

  if (!code || !language) {
    return res.status(400).json({ output: "Code and language required" });
  }

  let filename;
  const inputFile = `input.txt`;

  try {
    if (language === "java") {
      const classNameMatch = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
      if (classNameMatch && classNameMatch[1]) {
        filename = `${classNameMatch[1]}.java`;
      } else {
        return res.status(400).json({ output: "Public class name not found in Java code" });
      }
    } else if (language === "javascript") {
      filename = "temp.js";
    } else {
      const extension = language === "python" ? "py" : language === "c" ? "c" : language === "cpp" ? "cpp" : "";
      if (!extension) {
        return res.status(400).json({ output: "Unsupported language" });
      }
      filename = `temp.${extension}`;
    }

    fs.writeFileSync(filename, code);
    if (input) {
      fs.writeFileSync(inputFile, input);
    }

    const command = runCommand(filename, language);
    const output = await executeCommand(command, input);

    res.json({ output });
  } catch (error) {
    res.json({ output: error.message });
  } finally {
    cleanUpFiles(filename, inputFile, language);
  }
};

const runCommand = (filename, language) => {
  switch (language) {
    case "python":
      return `python ${filename}`;
      case "c":
        return `"C:\\Program Files\\LLVM\\bin\\clang" -D_CRT_SECURE_NO_WARNINGS ${filename} -o temp.out && temp.out`;
      case "cpp":
        return `"C:\\Program Files\\LLVM\\bin\\clang++" -D_CRT_SECURE_NO_WARNINGS ${filename} -o temp.out && temp.out`;
    case "java":
      return `javac ${filename} && java ${filename.replace(".java", "")}`;
    case "javascript":
      return `node ${filename}`;
    default:
      throw new Error("Unsupported language");
  }
};

module.exports = { compileCode };
