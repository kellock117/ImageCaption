import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const styles = {
  "text-align": "center",
  padding: "20px",
  border: "3px blue dashed",
  width: "60%",
  margin: "auto",
};

export default function UploadImage() {
  const { image, setImage } = useState(null);
  const { getRootProps, getInputProps } = useDropzone({});

  return (
    <div {...getRootProps({ className: "dropzone" })} style={styles}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        <p className="dropzone-content">
          Drag and drop an image here, or click to select files
        </p>
      </div>
    </div>
  );
}
