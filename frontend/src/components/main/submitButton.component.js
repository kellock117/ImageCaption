import React from "react";

const captionStrategy = {
  border : '1px solid #ccc',
  backgroundColor: 'white',
  borderRadius : '10px',
  margin: "auto",
  padding: "10px",
  width: '350px',
  height: '80px',
  lineHeight: '15px',
  marginTop: '-70px',
}

const captionText = {
  textAlign: 'left',
}

const selectBoxStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1px',
  width: '200px',
  textAlign: 'center',
}

const submitButtonStyle = {
  position: 'relative',
  top: '400px',
}

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
      <div style={captionStrategy}>
        <p style={captionText}>Decoding Strategy : </p>
        <select id="strategy" style={selectBoxStyle}>
          <option value="BeamSearch" defaultValue>
            Beam Search
          </option>
          <option value="NucleusSampling">Nucleus Sampling</option>
        </select>
      </div>
      <div style={submitButtonStyle}>
        <button disabled={!image} onClick={handleSubmission}>
          Submit
        </button>
      </div>
    </div>
  );
}
