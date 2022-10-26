import React from "react";
import { useDropzone } from "react-dropzone";
import "./css/dropzone.css";

import CropImage from "./cropImage.component";

// css for body
const bodyStyle = {
  textAlign: "center",
  padding: "21px",
  border: "2px black dashed",
  width: "90%",
  margin: "auto",
  minWidth: "300px",
};

//css for button
const btnStyle = {
  border: "1px solid #ccc",
  textAlign: "center",
  backgroundColor: "white",
  height: "40px",
  borderRadius: "11px",
  color: "black",
  transitionDuration: "0.5s",
};

export default function DropZone({ onDrop, open, image, setImage }) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] },
    onDrop,
  });

  const preview = image ? (
    <CropImage image={image} setImage={setImage}></CropImage>
  ) : null;

  return preview ? (
    preview
  ) : (
    <div {...getRootProps({ className: "dropzone" })} style={bodyStyle}>
      <div>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          <p className="dropzone-content">Drag and drop an image here</p>
        </div>
        <button type="button" onClick={open} className="btn" style={btnStyle}>
          Click here to select images
        </button>
      </div>
    </div>
  );
}
