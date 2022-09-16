import React from "react";
import { useDropzone } from "react-dropzone";

// css for body
const bodyStyle = {
  textAlign: "center",
  padding: "21px",
  border: "4px black dashed",
  width: "70%",
  margin: "auto",
};

//css for button
const btnStyle = {
  border: "none",
  textAlign: "center",
  backgroundColor: "rgb(218, 216, 216)",
  height: "51px",
  borderRadius: "11px",
  color: "black",
  fontWeight: "bold",
  transitionDuration: "0.5s",
};

export default function DropZone({ onDrop, open }) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] },
    onDrop,
  });
  const file = acceptedFiles[0] || null;

  return (
    <div {...getRootProps({ className: "dropzone" })} style={bodyStyle}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        <p className="dropzone-content">Drag and drop an image here</p>
      </div>
      <button type="button" onClick={open} className="btn" style={btnStyle}>
        Click here to select images
      </button>
      <div>
        <ul>{file ? <li>{file.name}</li> : null}</ul>
      </div>
    </div>
  );
}
