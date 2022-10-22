import React from "react";

const audioButton = {
  color: 'black',
  border: '1px solid grey',
  borderRadius: '8px',
  width: '180px',
  marginTop: '5px',
}

export default function Audio({ text, language }) {
  var voices = [];
  function setVoiceList() {
    voices = window.speechSynthesis.getVoices();
  }
  setVoiceList();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = setVoiceList;
  }

  const tts = () => {
    if (!window.speechSynthesis) {
      alert("Unsupported Browser");
      return;
    }

    var lang = language;
    var utterThis = new SpeechSynthesisUtterance(text);

    var voiceFound = false;

    for (var i = 0; i < voices.length; i++) {
      if (
        voices[i].lang.indexOf(lang) >= 0 ||
        voices[i].lang.indexOf(lang.replace("-", "_")) >= 0
      ) {
        utterThis.voice = voices[i];
        voiceFound = true;
      }
    }
    if (!voiceFound) {
      alert("voice not found");
      return;
    }

    utterThis.lang = lang;
    utterThis.pitch = 1;
    utterThis.rate = 1;

    window.speechSynthesis.speak(utterThis);
  };

  return (
    <div>
      <button style={audioButton} disabled={!text} onClick={tts}>
        Listen
      </button>
    </div>
  );
}
