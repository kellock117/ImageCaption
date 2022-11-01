import React from "react";
import "./css/sampleImg.css";

const sampleImgCont = {
  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
  borderRadius: "10px",
  backgroundColor: "white",
  width: "480px",
  padding: "10px",
  position: "relative",
  top: "-160px",
};

const sampleImgText = {
  textAlign: "left",
  verticalAlign: "text-top",
};

export default function SampleImage({ onClick }) {
  return (
    <div style={sampleImgCont}>
      <p style={sampleImgText}>Sample Images : </p>
      <img
        className="sampleimg1"
        alt="ingredients"
        src="./ingredients.jpg"
        onClick={onClick}
      />
      <img
        className="sampleimg2"
        alt="fruits"
        src="./fruits.jpg"
        onClick={onClick}
      />
    </div>
  );
}
