import React, { useState, useEffect } from "react";
import {
  Gyroscope,
  Accelerometer,
  GravitySensor,
} from "motion-sensors-polyfill";

const useGravitySensor = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const sensor = new GravitySensor();

  useEffect(() => {
    try {
      sensor.start();
      sensor.onreading = () => {
        setData(sensor);
      };

      sensor.onerror = (event) => {
        if (event.error.name === "NotAllowedError") {
          setError("Permission to access sensor was denied.");
        } else if (event.error.name === "NotReadableError") {
          setError("Cannot connect to the sensor.");
        }
      };
    } catch (error) {
      if (error.name === "SecurityError") {
        setError("Sensor construction was blocked by the Permissions Policy.");
      } else if (error.name === "ReferenceError") {
        setError("Sensor is not supported by the User Agent.");
      } else {
        setError(error.message);
      }
    }

    return () => {};
  }, []);

  return { data, error };
};

export { useGravitySensor };
