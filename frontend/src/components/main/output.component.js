import React from "react";
import Translation from "./translation.component";
import Audio from "./audio.component";

const outputContainerStyle = {
  background: "white",
  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
  borderRadius : '10px',
  width: '550px',
  marginLeft: '500px',
  marginTop: '3px',
  padding: '10px',
  textAlign: 'left',
  
}
const outputTextBoxStyle = {
  border : '1px solid #ccc',
  backgroundColor: 'white',
  height: '35px',
  width: '100%',
  borderRadius: '10px',
  wordWrap: 'break-all',
}

const outputFontStyle = {
  fontFamily: 'Sans-serif',
  textAlign: 'center',
  fontSize: '25px',
}

const TranslationContainerStyle = {
  background: "white",
  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
  borderRadius : '10px',
  width: '300px',
  marginLeft: '610px',
  marginTop: '3px',
  padding: '10px',
  textAlign: 'center',
}

export default function Output({ output, language, onSubmit }) {
  return (
    <div>
      <div style={outputContainerStyle}>
        <p>Description / Answer :</p>
        <div style={outputTextBoxStyle}>
          <h1 style={outputFontStyle}>{output}</h1>
        </div>
      </div>
      <div style={TranslationContainerStyle}>
        <Translation text={output} onSubmit={onSubmit} />
        <Audio text={output} language={language} />
      </div>
    </div>
  );
}
