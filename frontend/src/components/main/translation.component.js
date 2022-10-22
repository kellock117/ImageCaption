import React from "react";

const translateButton = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginLeft: '5px',
}

const selectStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1px',
  width: '100px',
}

export default function translation({ text, onSubmit }) {
  const handleSubmission = async () => {
    const selected = document.getElementById("language");
    const translateTo = selected.options[selected.selectedIndex].value;
    const data = {
      text: text,
      translateTo: translateTo,
    };

    await fetch("/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        onSubmit(result, translateTo);
      });
  };
  return (
    <div>
      <p>Choose a language to translate to : </p>
      <select style={selectStyle} id="language">
        <option value="en" defaultValue>
          English
        </option>
        <option value="zh-TW">Chinese</option>
        <option value="ko">Korean</option>
        <option value="ja">Japanese</option>
      </select>
      <button style={translateButton} disabled={!text} onClick={handleSubmission}>
        Translate
      </button>
    </div>
  );
}
