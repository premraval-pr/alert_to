import React from "react";
import "./App.css";
import { useGravitySensor, useLinearAccelerationSensor } from "./hooks";
import { getStreamData, getSoundClassifier } from "./clients";

const BASE_URL = "http://localhost:4242/data";
const soundModel = "SpeechCommands18w";

function App() {
  const { data: gravitySensorData, error: gravitySensorError } =
    useGravitySensor();

  const { data: linearSensorData, error: linearSensorError } =
    useLinearAccelerationSensor();

  const { data: streamData, error: streamError } = getStreamData(BASE_URL);

  const { data: soundClassifierData, error: soundClassifierError } =
    getSoundClassifier(soundModel, {
      probabilityThreshold: 0.7,
    });

  console.log(soundClassifierData);
  return <div className="App">Hello</div>;
}

export default App;
