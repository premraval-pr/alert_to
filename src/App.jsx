import React from "react";
import "./App.css";
import {
  Gyroscope,
  Accelerometer,
  GravitySensor,
  LinearAccelerationSensor,
} from "motion-sensors-polyfill";

function App() {
  const [text, setText] = React.useState("Init");
  const [alert, setAlert] = React.useState();
  const sensor = new GravitySensor();
  const accelerometer = new Accelerometer();
  const linAccelerometer = new LinearAccelerationSensor();


  function AccelerationSensor() {
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
        setText(
          `X-Axis : ${sensor.x} | Y-Axis : ${sensor.y} | Z-Axis : ${sensor.z}`
        );
        if (parseInt(sensor.x) > 0.4 || parseInt(sensor.y) > 0.4 || parseInt(sensor.z) > 0.4) {
          setAlert("Walking");
        }
        else if (parseInt(sensor.x) < -0.4 || parseInt(sensor.y) < -0.4 || parseInt(sensor.z) < -0.4) {
          setAlert("Walking");
        } else {
          setAlert("Stationary");
        }
        
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

  function accelerometerSensor() {
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
        setText(
          `X-Axis : ${sensor.x} | Y-Axis : ${sensor.y} | Z-Axis : ${sensor.z}`
        );
        
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
        setText(
          `X-Axis : ${sensor.x} | Y-Axis : ${sensor.y} | Z-Axis : ${sensor.z}`
        );
        if (parseInt(sensor.y) > 2.2) {
          setAlert("Phone Up");
        } else {
          setAlert("Phone Down");
        }
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
    //initSensor();
    // accelerometerSensor();
    linAccelerometer()
  }, []);

  return (
    <div className="App">
      <p>{text}</p>
      <p>{alert}</p>
    </div>
  );
}

export default App;
