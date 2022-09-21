import React from "react";

export default function SubmitButton({ image, onSubmit }) {
  const handleSubmission = async () => {
    let formData = new FormData();
    formData.append("image", image);

    await fetch("/caption", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        onSubmit(result);
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
