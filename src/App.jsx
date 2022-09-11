import React from "react";
import "./App.css";
import { useGravitySensor } from "./hooks";
import { getStreamData, getSoundClassifier } from "./clients";

function App() {
  const { data: gravitySensorData, error: gravitySensorError } =
    useGravitySensor();

  const { data: streamData, error: stremError } = getStreamData(
    "http://localhost:4242/data"
  );

  const { data: soundClassifierData, error: soundClassifierError } =
    getSoundClassifier("SpeechCommands18w", {
      probabilityThreshold: 0.7,
    });

  console.log("gravitySensorData", gravitySensorData);
  console.log("streamData", streamData);
  console.log("soundClassifierData", soundClassifierData);

  console.error("gravitySensorError", gravitySensorError);
  console.error("stremError", stremError);
  console.error("soundClassifierError", soundClassifierError);

  return <div className="App">Hello</div>;
}

export default App;
