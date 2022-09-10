import React from "react";
import "./App.css";
import {
  Gyroscope,
  Accelerometer,
  AbsoluteOrientationSensor,
} from "motion-sensors-polyfill";

function App() {
  const [text, setText] = React.useState("Init");
  const sensor = new Gyroscope();

  function initSensor() {
    try {
      sensor.start();
      if (sensor.activated) {
        setText("Sensor activated");
      } else {
        setText("Sensor not activated");
      }

      if (sensor.hasReading) {
        setText("Sensor has reading");
      } else {
        setText("Sensor has no reading");
      }

      sensor.onreading = () => {
        setText("Sensor is reading");
        setText(
          `X-Axis - ${sensor.x} | Y-Axis - ${sensor.y} | Z-Axis - ${sensor.z}`
        );
        console.log(sensor);
      };

      sensor.onerror = (event) => {
        if (event.error.name === "NotAllowedError") {
          setText("Permission to access sensor was denied.");
          console.log("Permission to access sensor was denied.");
        } else if (event.error.name === "NotReadableError") {
          setText("Cannot connect to the sensor.");
          console.log("Cannot connect to the sensor.");
        }
      };
    } catch (error) {
      if (error.name === "SecurityError") {
        setText("Sensor construction was blocked by the Permissions Policy.");
        console.log(
          "Sensor construction was blocked by the Permissions Policy."
        );
      } else if (error.name === "ReferenceError") {
        setText("Sensor is not supported by the User Agent.");
        console.log("Sensor is not supported by the User Agent.");
      } else {
        throw error;
      }
    }
  }

  React.useEffect(() => {
    initSensor();
  }, []);

  return (
    <div className="App">
      <p>{text}</p>
    </div>
  );
}

export default App;
