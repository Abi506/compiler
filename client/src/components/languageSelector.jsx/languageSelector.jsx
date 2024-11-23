import React from "react";
import './languageSelector.css'
const LanguageSelector = ({ language, setLanguage }) => (
  <div className="language-selector-container">
    <label className="language-label">Language</label>
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      style={{ display: "block",height:"30px",width:"80px",marginLeft:"10px",marginRight:"20px",borderRadius:"3px"}}
    >
      <option value="python">Python</option>
      <option value="c">C</option>
      <option value="cpp">C++</option>
      <option value="java">Java</option>
      <option value="javascript">Javascript</option>
    </select>
  </div>
);

export default LanguageSelector;
