const { exec } = require("child_process");
const fs = require("fs");

const executeCommand = (command, input) =>
  new Promise((resolve, reject) => {
    const process = exec(command, (error, stdout, stderr) => {
      if (error || stderr) {
        reject(new Error(error ? error.message : stderr));
      } else {
        resolve(stdout);
      }
    });

    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    }
  });

const cleanUpFiles = (filename, inputFile, language) => {
  try {
    if (fs.existsSync(filename)) fs.unlinkSync(filename);
    if (fs.existsSync(inputFile)) fs.unlinkSync(inputFile);
    if (fs.existsSync("temp.out")) fs.unlinkSync("temp.out");

    if (language === "java") {
      const classFile = filename.replace(".java", ".class");
      if (fs.existsSync(classFile)) fs.unlinkSync(classFile);
    }
  } catch (err) {
    console.error("Error cleaning up files:", err.message);
  }
};

module.exports = { executeCommand, cleanUpFiles };
