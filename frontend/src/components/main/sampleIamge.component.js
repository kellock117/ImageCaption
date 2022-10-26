import React from "react";
import "./css/sampleImg.css"

const sampleImgCont = {
  margin: "50px",
  border : '1px solid #ccc',
  backgroundColor: 'white',
  borderRadius : '10px',
  width: '380px',
  padding: '20px',
  textAlign: 'left',
  verticalAlign: 'text-top',

}

export default function SampleImage({ onClick }) {
  return (
    <div style={sampleImgCont}>
      <p>Sample Images : </p>
      <img alt="apple.jpg" src="./apple.jpg" onClick={onClick} />
      <img alt="tree.jpg" src="./tree.jpg" onClick={onClick} />
    </div>
  );
}
