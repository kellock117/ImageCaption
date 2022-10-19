import React, { useState } from "react";
import DropZone from "../components/main/dropzone.component";
import SubmitButton from "../components/main/submitButton.component";
import Output from "../components/main/output.component";
import SampleImage from "../components/main/sampleIamge.component";

export default function Captioning() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en");
  const [feature, setFeature] = useState("captioning");
  const [question, setQuestion] = useState(null);

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
  const onClick = event => {
    fetch(event.target.alt)
      .then(res => res.blob())
      .then(file =>
        setImage(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
  };
  const clear = () => {
    setImage(null);
    setResult(null);
  };
  const onChange = event => {
    setQuestion(event.target.value);
  };

  return (
    <div className="App">
      <div
        onChange={event => {
          setFeature(event.target.value);
          setQuestion(null);
        }}
      >
        <input type="radio" name="feature" value="captioning" defaultChecked />
        Captioning
        <input type="radio" name="feature" value="vqa" />
        Visual Question answering
      </div>
      <div className="auth-inner">
        {/* retreive the image from the DropZone component */}
        <DropZone onDrop={onDrop} image={image} />
        {feature == "vqa" ? (
          <input type="text" id="question" onChange={onChange} />
        ) : null}
        <SubmitButton image={image} question={question} onSubmit={onSubmit} />

        {/* give the image file to fetch it to the server */}

        <button onClick={clear}>Clear</button>
      </div>
      {/* display the result */}
      <Output output={result} language={language} onSubmit={onSubmit} />
      <SampleImage onClick={onClick} />
    </div>
  );
}
