import React from "react";
import "./css/submitButton.css";

const captionStrategy = {
  boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
  background: "white",
  borderRadius: "10px",
  padding: "10px",
  width: "290px",
  height: "100px",
  lineHeight: "15px",
  marginLeft: "760px",
  marginTop: "-100px",
};

const captionText = {
  textAlign: "left",
};

const selectBoxStyle = {
  border: "1px solid #ccc",
  borderRadius: "10px",
  padding: "1px",
  width: "200px",
  textAlign: "center",
};

const submitButtonStyle = {
  position: "relative",
  top: "-160px",
  right: "250px",
};

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
          <option value="Beam Search" defaultValue>
            Beam Search
          </option>
          <option value="Nucleus Sampling">Nucleus Sampling</option>
        </select>
      </div>
      <div style={submitButtonStyle}>
        <button disabled={!image} className="subBtn" onClick={handleSubmission}>
          Submit
        </button>
      </div>
    </div>
  );
}
