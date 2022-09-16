import React from "react";
import Translation from "./translation.component";

export default function Output({ output, onSubmit }) {
  return (
    <div>
      <h1>{output}</h1>
      <Translation text={output} onSubmit={onSubmit} />
    </div>
  );
}
