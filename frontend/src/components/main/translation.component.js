import React from "react";

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
      <p>translate to: </p>
      <select id="language">
        <option value="en" defaultValue>
          English
        </option>
        <option value="zh-TW">Chinese</option>
        <option value="ko">Korean</option>
        <option value="ja">Japanese</option>
      </select>
      <button disabled={!text} onClick={handleSubmission}>
        Translate
      </button>
    </div>
  );
}
