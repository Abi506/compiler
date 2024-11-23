import React from "react";
import './outputArea.css'
const OutputArea = ({ output }) => (
  <div>
    <h3 className="output-heading">OUTPUT</h3>
    <textarea
      value={output}
      readOnly
      className="code-output-area"
      style={{ width: "100%", height: "200px" }}
    ></textarea>
  </div>
);

export default OutputArea;
