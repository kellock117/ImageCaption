import React, { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const cropBtn = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  position: "absolute",
  top: '474px',
  left: "930px",
  zIndex: "1",
};

const cropzone = {
  display: 'flex',
  justifyContent: 'center',
  margin: 'auto',
  height: "300px",
  width: "440px",
  maxHeight: '280px',
};

export default function CropImage({ image, setImage }) {
  const [crop, setCrop] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setImageFile(URL.createObjectURL(image));
  }, [image]);

  const cropImageNow = () => {
    let img = document.getElementById("preview");
    // Dynamically create a canvas element
    const canvas = document.createElement("canvas");
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    let ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    // Actual resizing
    ctx.drawImage(
      img,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob(
      blob => {
        setImage(new File([blob], image.name));
      },
      "image/jpeg",
      0.95
    );

    setCrop(null);
  };

  return (
    <>
      <div style={cropzone}>
        <ReactCrop crop={crop} onChange={crop => setCrop(crop)}>
          <img
            id="preview"
            alt="preview"
            src={imageFile}
            style={{ width: "100%", height: "auto", 
            maxWidth: "100%", maxHeight: "300px",}}
          />
        </ReactCrop>
        </div>
        <button onClick={cropImageNow} style={cropBtn}>Crop</button>
    </>
  );
}
