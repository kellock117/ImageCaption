import React, { useState } from "react";
import DropZone from "../components/main/dropzone.component";
import SubmitButton from "../components/main/captioning/submitButton.component";
import Output from "../components/main/output.component";

export default function Captioning() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    setImage(file);
  };
  const onSubmit = output => {
    setResult(output);
  };
  const reset = () => {
    console.log("reset");
    setImage(null);
    setResult(null);
  };

  return (
    <div className="App">
      <div className="auth-inner">
        {/* retreive the image from the DropZone component */}
        <DropZone onDrop={onDrop} />
        {/* give the image file to fetch it to the server */}
        <SubmitButton image={image} onSubmit={onSubmit} />
      </div>
      {/* display the result */}
      <Output output={result} onSubmit={onSubmit} />
    </div>
  );
}
