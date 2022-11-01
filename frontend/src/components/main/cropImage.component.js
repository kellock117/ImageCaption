import React, { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const imgStyle = {
  width: '70%',
  objectFit: 'contain',
};

const cropBtn = {
  border: '1px solid #ccc',
  borderRadius: '10px',
  position: "absolute",
  top: '540px',
  left: "930px",
  zIndex: "1",
};

const cropzone = {
  margin: 'auto',
  marginLeft: '-19px',
  height: "300px",
  width: "440px",
  maxHeight: '280px',
};

export default function CropImage({ image, setImage }) {
  const [crop, setCrop] = useState(null);
  const [imgInfo, setImgInfo] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setImageFile(URL.createObjectURL(image));
  }, [image]);

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = imgInfo.naturalWidth / imgInfo.width;
    const scaleY = imgInfo.naturalHeight / imgInfo.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      imgInfo,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
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
    <div>
      <div style={cropzone}>
        <ReactCrop
          src={imageFile}
          style={imgStyle}
          onImageLoaded={setImgInfo}
          crop={crop}
          onChange={crop => setCrop(crop)}/>
      </div>
    </div>
      <button
        style={cropBtn}
        disabled={crop?.width === 0 && crop.x === 0 && crop.y === 0}
        onClick={cropImageNow}
      >
        Crop
      </button>
    </>
  );
}
