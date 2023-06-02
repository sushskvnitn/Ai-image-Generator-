import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./speechtoimg.css";
const SpeechtoImg = () => {
  const [resulturl, setresulturl] = useState("");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  useEffect(() => {
    if (transcript) {
      const timer = setTimeout(() => {
        generateImageRequest(transcript, "medium");
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setresulturl("");
    }
  }, [transcript]);
  async function generateImageRequest(prompt, size) {
    try {
      const response = await fetch("/generateimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          size,
        }),
      });
      if (!response.ok) {
        throw new Error("That image could not be generated");
      }
      const data = await response.json();
      const imageUrl = data.data;
      setresulturl(imageUrl);
    } catch (error) {
      document.querySelector(".msg").textContent = error;
    }
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="speech-to-img-container">
      <p className="microphone-status">
        Microphone: {listening ? "on 🔊" : "off 🔇"}
      </p>
      <button
        className="speech-button"
        onClick={SpeechRecognition.startListening}
      >
        Start 🎙️
      </button>
      <button
        className="speech-button"
        onClick={SpeechRecognition.stopListening}
      >
        Stop 🛑
      </button>
      <button className="speech-button" onClick={resetTranscript}>
        Reset 🔄
      </button>
      <p className="transcript">{transcript}</p>
      <div className="msg fs-3 text-center"></div>
      {transcript && !resulturl && (
        <div className="text-center">
          Generating Image...
          <div class="opposites">
            <div class="opposites bl"></div>
            <div class="opposites tr"></div>
            <div class="opposites br"></div>
            <div class="opposites tl"></div>
          </div>
        </div>
      )}
      {resulturl && (
        <img src={resulturl} alt="result" className="result-image" />
      )}
    </div>
  );
};

export default SpeechtoImg;
