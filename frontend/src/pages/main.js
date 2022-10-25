import React, { useState } from "react";
import DropZone from "../components/main/dropzone.component";
import SubmitButton from "../components/main/submitButton.component";
import Output from "../components/main/output.component";
import SampleImage from "../components/main/sampleIamge.component";
import Navbar from "../components/main/mainnavbar.component";

export default function Captioning() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [language, setLanguage] = useState("en");
  const [feature, setFeature] = useState("captioning");
  const [question, setQuestion] = useState(null);

  // save the image file when user drop the image to the drop zone
  const onDrop = acceptedFiles => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  // save the result of captioning or visual question answering after submission
  const onSubmit = (output, languague) => {
    setResult(output);
    setLanguage(languague);
  };

  // display sample image
  const onClick = event => {
    fetch(event.target.alt)
      .then(res => res.blob())
      .then(file => setImage(file));
  };

  // clear the image and result
  const clear = () => {
    setImage(null);
    setResult(null);
  };

  // detect the change in question for VQA
  const onChange = event => {
    setQuestion(event.target.value);
  };

  return (
    <div className="App">
      <Navbar />
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
        <DropZone onDrop={onDrop} image={image} setImage={setImage} />
        {feature === "vqa" ? (
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
