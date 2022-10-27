import React from "react";
import { useDropzone } from "react-dropzone";
import "./css/dropzone.css"

// css for body
const bodyStyle = {
  border: "2px black dashed",
  height: "220px",
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
    <img className="dropzoneimg"
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
        <div className="text-center">
          <div>
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
