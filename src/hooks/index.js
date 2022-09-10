import { useEffect, useState } from "react";

const useAbsoluteOrientation = (
  { frequency, referenceFrame } = {},
  callback
) => {
  const [quaternion, setQuaternion] = useState([]);

  useEffect(() => {
    const options = { frequency, referenceFrame };
    let sensor = new window.AbsoluteOrientationSensor(options);

    if (sensor) {
      // https://developer.mozilla.org/en-US/docs/Web/API/AbsoluteOrientationSensor#basic_example
      sensor.addEventListener("reading", () => {
        setQuaternion([...sensor.quaternion]);

        if (callback instanceof Function) {
          callback({
            ...sensor.quaternion,
          });
        }
      });
      sensor.addEventListener("error", (error) => {
        if (error.name === "NotReadableError") {
          console.log("Sensor is not available.");
        }
      });
      sensor.start();
    }

    return () => {};
  }, [callback, frequency, referenceFrame]);

  return quaternion;
};

export { useAbsoluteOrientation };
