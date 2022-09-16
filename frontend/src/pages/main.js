import React, { useState } from "react";
import DropZone from "../components/main/dropzone.component";
import SubmitButton from "../components/main/captioning/submitButton.component";

export default function Captioning() {
  const [image, setImage] = useState(null);
  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  return (
    <div className="App">
      <div className="auth-inner">
        {/* retreive the image from the DropZone component */}
        <DropZone onDrop={onDrop} />
        {/* give the image file to fetch it to the server */}
        <SubmitButton image={image} />
      </div>
    </div>
  );
}
