import React, { useState } from "react";
import ReactCrop from "react-image-crop";

export default function CropImage({ image, setImage }) {
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [imgInfo, setImgInfo] = useState(null);

  const cropImageNow = () => {
    console.log(imgInfo);
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
    const base64Image = canvas.toDataURL("image/jpeg");
    setImage(base64Image);
  };

  return (
    <>
      <ReactCrop
        src={image}
        onImageLoaded={setImgInfo}
        crop={crop}
        onChange={setCrop}
      />
      <button onClick={cropImageNow}>Crop</button>
    </>
  );
}
