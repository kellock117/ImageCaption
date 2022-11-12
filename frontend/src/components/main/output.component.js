import React, { useState } from "react";
import Modal from 'react-modal';
import Translation from "./translation.component";
import Audio from "./audio.component";
import "./css/output.css";

export default function Output({ output, language, onSubmit }) {
  const [definition, setDefinition] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(null);
  const getDefinition = event => {
    const data = { word: event.target.id };
    fetch("/definition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        setDefinition(result);
      });
    openModal();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div className="outputContainerStyle">
        <p>Description / Answer :</p>
        <div className="outputTextBoxStyle">
          <h1 className="outputFontStyle">
            {output &&
              output.split(" ").map(word => {
                return (
                  <label key={word} onClick={getDefinition}>
                    {word}&nbsp;
                  </label>
                );
              })}
          </h1>
        </div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal" overlayClassName="Overlay">
          <h3>Definition</h3>
          {definition?.length === 0 ? <label>No Result Found</label> : definition.map(d => <ul><li>{d}</li></ul>)}
          <button id="modalCloseBtn" onClick={closeModal}>Close</button>
        </Modal>
      </div>
      <div className="TranslationContainerStyle">
        <Translation text={output} onSubmit={onSubmit} />
        <Audio text={output} language={language} />
      </div>
    </div>
  );
}
