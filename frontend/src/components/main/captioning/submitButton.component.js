import React from "react";

export default function SubmitButton({ image, onSubmit }) {
  const handleSubmission = async () => {
    let formData = new FormData();
    formData.append("image", image);

    const selected = document.getElementById("strategy");
    const strategy = selected.options[selected.selectedIndex].value;
    formData.append("strategy", strategy);

    await fetch("/caption", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        onSubmit(result, "en");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <select id="strategy">
        <option value="BeamSearch" defaultValue>
          Beam Search
        </option>
        <option value="NucleusSampling">Nucleus Sampling</option>
      </select>
      <button disabled={!image} onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
}
