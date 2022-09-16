import React from "react";

export default function SubmitButton({ image }) {
  const handleSubmission = async () => {
    let formData = new FormData();
    console.log(image);
    formData.append("image", image);

    await fetch("http://localhost:8000/caption", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        console.log("Caption:", result);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <button disabled={!image} onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
}
