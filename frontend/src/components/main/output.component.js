import React from "react";
import Translation from "./translation.component";
import Audio from "./audio.component";

const outputContainerStyle = {
  border : '1px solid #ccc',
  backgroundColor: 'white',
  borderRadius : '10px',
  width: '50%',
  margin: 'auto',
  marginTop: '10px',
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
  border : '1px solid #ccc',
  backgroundColor: 'white',
  borderRadius : '10px',
  width: '300px',
  margin: 'auto',
  marginTop: '10px',
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
