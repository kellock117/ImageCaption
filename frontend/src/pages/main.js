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
      <Navbar />
      <div className="parent">
        <div className="child1">
          {/* retreive the image from the DropZone component */}
          <DropZone onDrop={onDrop} image={image} />

          {/* give the image file to fetch it to the server */}

          <button onClick={clear}>Clear</button>
        </div>
        <div className="child2">
          <SampleImage onClick={onClick} />
        </div>
      </div>
      <div className="radioBtnBox"
        onChange={event => {
          setFeature(event.target.value);
          setQuestion(null);
        }}
      >
        <p className="radioText1">Task : </p>
        <input type="radio" className="btn1" name="feature" value="captioning" defaultChecked />
        Captioning
        <input type="radio" className="btn2" name="feature" value="vqa" />
        Visual Question answering
      </div>
      <div>   
        <SubmitButton image={image} question={question} onSubmit={onSubmit} />
        <div className="questionTextBoxCont">
          <p className="questionLabel">Question : </p>
          <input type="text" className = "questionTextBox" id="question" onChange={onChange} 
              disabled={feature != "vqa" ? true : null}/>
        </div>
      </div>
      {/* display the result */}
      <Output output={result} language={language} onSubmit={onSubmit} />
    </div>
  );
}
