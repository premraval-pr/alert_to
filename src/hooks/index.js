import React, { useState, useEffect } from "react";
import {
  LinearAccelerationSensor,
  GravitySensor,
} from "motion-sensors-polyfill";

const useGravitySensor = (options = {}) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const sensor = new GravitySensor(options);

  useEffect(() => {
    try {
      sensor.start();
      sensor.onreading = () => {
        setData(sensor);
      };

      sensor.onerror = (event) => {
        if (event.error.name === "NotAllowedError") {
          setError("Permission to access Gravity sensor was denied.");
        } else if (event.error.name === "NotReadableError") {
          setError("Cannot connect to the Gravity sensor.");
        }
      };
    } catch (error) {
      if (error.name === "SecurityError") {
        setError(
          "Gravity sensor construction was blocked by the Permissions Policy."
        );
      } else if (error.name === "ReferenceError") {
        setError("Gravity sensor is not supported by the User Agent.");
      } else {
        setError(error.message);
      }
    }

    return () => {};
  }, []);

  return { data, error };
};

const useLinearAccelerationSensor = (options = {}) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const sensor = new LinearAccelerationSensor(options);

  useEffect(() => {
    try {
      sensor.start();
      sensor.onreading = () => {
        setData(sensor);
      };

      sensor.onerror = (event) => {
        if (event.error.name === "NotAllowedError") {
          setError(
            "Permission to access Linear Acceleration sensor was denied."
          );
        } else if (event.error.name === "NotReadableError") {
          setError("Cannot connect to the Linear Acceleration sensor.");
        }
      };
    } catch (error) {
      if (error.name === "SecurityError") {
        setError(
          "Linear Acceleration sensor construction was blocked by the Permissions Policy."
        );
      } else if (error.name === "ReferenceError") {
        setError(
          "Linear Acceleration sensor is not supported by the User Agent."
        );
      } else {
        setError(error.message);
      }
    }

    return () => {};
  }, []);

  return { data, error };
};

export { useGravitySensor, useLinearAccelerationSensor };
