import React from "react";

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
      <button disabled={!text} onClick={tts}>
        Voice Out
      </button>
    </div>
  );
}
