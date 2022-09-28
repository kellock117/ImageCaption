import React, { useState } from "react";
import DropZone from "../components/main/dropzone.component";
import SubmitButton from "../components/main/captioning/submitButton.component";
import Output from "../components/main/output.component";

export default function Captioning() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en");

  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    setImage(
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
  };
  const onSubmit = (output, languague) => {
    setResult(output);
    setLanguage(languague);
  };
  const clear = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="App">
      <div className="auth-inner">
        {/* retreive the image from the DropZone component */}
        <DropZone onDrop={onDrop} image={image} />
        {/* give the image file to fetch it to the server */}
        <SubmitButton image={image} onSubmit={onSubmit} />
        <button onClick={clear}>Clear</button>
      </div>
      {/* display the result */}
      <Output output={result} language={language} onSubmit={onSubmit} />
    </div>
  );
}
