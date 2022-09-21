import React from "react";
import Translation from "./translation.component";
import Audio from "./audio.component";

export default function Output({ output, language, onSubmit }) {
  return (
    <div>
      <h1>{output}</h1>
      <Translation text={output} onSubmit={onSubmit} />
      <Audio text={output} language={language} />
    </div>
  );
}
