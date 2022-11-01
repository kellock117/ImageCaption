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
    const fileName = `/${event.target.alt}.jpg`;

    fetch(fileName)
      .then(response => response.blob())
      .then(blob => setImage(new File([blob], fileName)));
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
      <h1>Show And Tell</h1>
      <h4>Drag and drop an image or use an example provided below for captioning</h4>
      <div className="parent">
        <div className="child1">
          {/* retreive the image from the DropZone component */}
          <DropZone onDrop={onDrop} image={image} setImage={setImage} />

          {/* give the image file to fetch it to the server */}

          <button className="clrBtn" onClick={clear}>
            Clear
          </button>
        </div>
        <div className="child2">
          <SampleImage onClick={onClick} />
        </div>
      </div>
      <div
        className="radioBtnBox"
        onChange={event => {
          setFeature(event.target.value);
          setQuestion(null);
        }}
      >
        <p className="radioText1">Task : </p>
        <input type="radio" className="btn1" name="feature" value="captioning" defaultChecked />
        <label className="task">Captioning</label><br/>
        <input type="radio" className="btn2" name="feature" value="vqa" />
        <label className="task">Visual Question answering</label>
      </div>
      <div>
        <SubmitButton image={image} question={question} onSubmit={onSubmit} />
        <div className="questionTextBoxCont">
          <p className="questionLabel">Question : </p>
          <input
            type="text"
            className="questionTextBox"
            id="question"
            onChange={onChange}
            disabled={feature !== "vqa" ? true : null}
          />
        </div>
      </div>
      {/* display the result */}
      <Output output={result} language={language} onSubmit={onSubmit} />
    </div>
  );
}
