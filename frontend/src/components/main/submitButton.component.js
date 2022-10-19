import React from "react";

export default function SubmitButton({ image, question, onSubmit }) {
  const handleSubmission = async () => {
    let formData = new FormData();
    formData.append("image", image);

    if (question) {
      formData.append("question", question);
      await fetch("/vqa", {
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
    } else {
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
    }
  };
  return (
    <div>
      {!question && (
        <select id="strategy">
          <option value="BeamSearch" defaultValue>
            Beam Search
          </option>
          <option value="NucleusSampling">Nucleus Sampling</option>
        </select>
      )}
      <button disabled={!image} onClick={handleSubmission}>
        Submit
      </button>
    </div>
  );
}
