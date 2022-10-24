import React from "react";
import { useDropzone } from "react-dropzone";
import "./css/dropzone.css"

// css for body
const bodyStyle = {
  textAlign: "center",
  padding: "21px",
  border: "2px black dashed",
  width: "90%",
  margin: "auto",
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

export default function DropZone({ onDrop, open, image }) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] },
    onDrop,
  });

  const preview = image ? (
    <img
      alt={image.path}
      src={image.preview}
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(image.preview);
      }}
    />
  ) : null;

  return (
    <div {...getRootProps({ className: "dropzone" })} style={bodyStyle}>
      <input className="input-zone" {...getInputProps()} />
      {preview ? (
        preview
      ) : (
        <div>
          <div className="text-center">
            <p className="dropzone-content">Drag and drop an image here</p>
            <p>- OR -</p>
          </div>
          <button type="button" onClick={open} className="btn" style={btnStyle}>
            Click here to select images
          </button>
        </div>
      )}
    </div>
  );
}
