import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useGravitySensor, useLinearAccelerationSensor } from "./hooks";
import { getStreamData, getSoundClassifier } from "./clients";
import Alert from "react-bootstrap/Alert";
import {
  LinearAccelerationSensor,
  GravitySensor,
} from "motion-sensors-polyfill";

const BASE_URL = "http://localhost:4242/data";
const soundModel = new URL("/public/ml/model.json", import.meta.url).href;

function App() {
  const gravitySensor = new GravitySensor();
  const linearAccelerationSensor = new LinearAccelerationSensor();

  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [isWithinRadius, setIsWithinRadius] = useState(true);
  const [latDistance, setLatDistance] = useState(0);
  const [lngDistance, setLngDistance] = useState(0);

  const [isPhoneUp, setIsPhoneUp] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [detectedTireScreech, setDetectedTireScreech] = useState(false);
  const [foundFastCar, setFoundFastCar] = useState(false);

  const [currentCarIndex, setCurrentCarIndex] = React.useState(0);
  const carSpeedData = [
    { car: 1, speed: 39 },
    { car: 2, speed: 50 },
    { car: 3, speed: 24 },
    { car: 4, speed: 31 },
    { car: 5, speed: 38 },
    { car: 6, speed: 40 },
    { car: 7, speed: 29 },
    { car: 8, speed: 41 },
    { car: 9, speed: 74 },
    { car: 10, speed: 85 },
    { car: 11, speed: 30 },
    { car: 12, speed: 47 },
    { car: 13, speed: 65 },
    { car: 14, speed: 54 },
    { car: 15, speed: 67 },
    { car: 16, speed: 89 },
    { car: 17, speed: 31 },
    { car: 18, speed: 67 },
    { car: 19, speed: 56 },
    { car: 20, speed: 44 },
  ];

  // const { data: gravitySensorData, error: gravitySensorError } =
  //   useGravitySensor();

  // const { data: linearSensorData, error: linearSensorError } =
  //   useLinearAccelerationSensor();

  //const { data: streamData, error: streamError } = getStreamData(BASE_URL);

  const { data: soundClassifierData, error: soundClassifierError } =
    getSoundClassifier(soundModel, {
      probabilityThreshold: 0.7,
    });

  const InitSetup = () => {
    try {
      gravitySensor.start();
      gravitySensor.onreading = () => {
        if (parseInt(gravitySensor.y) > 2) {
          setIsPhoneUp(true);
        } else {
          setIsPhoneUp(false);
        }
      };
    } catch (error) {
      console.log(error);
    }

    try {
      linearAccelerationSensor.start();
      linearAccelerationSensor.onreading = () => {
        if (
          parseFloat(linearAccelerationSensor.x) > 0.6 ||
          parseFloat(linearAccelerationSensor.x) < -0.6
        ) {
          setIsWalking(true);
        } else {
          setIsWalking(false);
        }
      };
    } catch (error) {
      console.log(error);
    }

    // if (streamData) {
    //   if (parseInt(streamData.speed) > 60) {
    //     console.log("ZOOOOOOOOOOMMMMMMMMM!!!!!!");
    //     setFoundFastCar(true);
    //   }
    // }

    if (soundClassifierData) {
      const soundConfidence = soundClassifierData.find(
        (item) => item.label === "Tire Screech"
      ).confidence;

      if (parseFloat(soundConfidence) > 0.95) {
        console.log("SCREEEEEEEECHHHHHHH!!!!!!");
        if (!detectedTireScreech) {
          setDetectedTireScreech(true);
        }
      }
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       console.log(position);
  //       setLatLng({
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       });

  //       calcCrow(position.coords, { lat: 43.6432152, lng: -79.3817493 });

  //     }, (error) => {
  //       console.log(error.message);
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  function calcCrow(coords1, coords2) {
    // var R = 6.371; // km
    // var R = 6371000;
    // var dLat = toRad(coords2.lat - coords1.latitude);
    // var dLon = toRad(coords2.lng - coords1.longitude);
    // var lat1 = toRad(coords1.latitude);
    // var lat2 = toRad(coords2.lat);

    // var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //   Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    // var d = R * c;
    // d = Math.round(d);
    // console.log(d);

    let latDist =
      Math.round(
        (Math.abs(coords2.lat - coords1.latitude) + Number.EPSILON) * 100
      ) / 100;
    let lngDist =
      Math.round(
        (Math.abs(coords2.lng - coords1.longitude) + Number.EPSILON) * 100
      ) / 100;

    setLatDistance(latDist);
    setLngDistance(lngDist);

    setIsWithinRadius(latDist < 1 || lngDist < 1);
  }

  // Converts numeric degrees to radians
  // function toRad(Value) {
  //   return Value * Math.PI / 180;
  // }

  // useEffect(() => {
  //   if (gravitySensorData) {
  //     if (parseInt(gravitySensorData.y) > 2) {
  //       setIsPhoneUp(true);
  //     } else {
  //       setIsPhoneUp(false);
  //     }
  //   }
  // }, [gravitySensorData]);

  // useEffect(() => {
  //   if (linearSensorData) {
  //     if (
  //       parseFloat(linearSensorData.x) > 0.4 ||
  //       parseFloat(linearSensorData.y) > 0.4 ||
  //       parseFloat(linearSensorData.z) > 0.4 ||
  //       parseFloat(linearSensorData.x) < -0.4 ||
  //       parseFloat(linearSensorData.y) < -0.4 ||
  //       parseFloat(linearSensorData.z) < -0.4
  //     ) {
  //       setIsWalking(true);
  //     } else {
  //       setIsWalking(false);
  //     }
  //   }
  // }, [linearSensorData]);

  InitSetup();

  // useEffect(() => {
  //   const id = setTimeout(() => {

  //     if (parseInt((currentCarIndex + 1) % carSpeedData.length.speed) > 60) {
  //       console.log("ZOOOOOOOOOOMMMMMMMMM!!!!!!");
  //       if (!foundFastCar) {
  //         setFoundFastCar(true);
  //       }
  //     }
  //   }, 500);

  //   return () => {
  //     clearInterval(id);
  //   };
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (detectedTireScreech) setDetectedTireScreech(false);
      if (foundFastCar) setFoundFastCar(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      <Container fluid style={{ padding: 0 }}>
        {detectedTireScreech && (
          <div style={{ textAlign: "center" }}>
            <Alert variant="danger">
              We have found a car skidding near your. Please be alert of your
              surroundings.
            </Alert>
          </div>
        )}
        {/* {foundFastCar && (
          <div style={{ marginBottom: "-20px", textAlign: "center" }}>
            <Alert variant="danger">
              We have found a high speeding car near your vicinity. Please be
              alert of your surroundings.
            </Alert>
          </div>
        )} */}
        <Row>
          <Col>
            {detectedTireScreech && (
              <div style={{ marginBottom: "-20px", textAlign: "center" }}>
                <Alert variant="danger">
                  We have found a car skidding near your. Please be alert of
                  your surroundings.
                </Alert>
              </div>
            )}
          </Col>
        </Row>
        <Row style={{ height: "400px" }}>
          <Col
            style={
              isPhoneUp
                ? {
                    backgroundColor: "red",
                    color: "white",
                  }
                : {
                    backgroundColor: "lightgreen",
                  }
            }
          >
            <h2 className="m-5">Phone is {isPhoneUp ? "up" : "down"}</h2>
            {/* {gravitySensorData && (
              <small className="m-5">
                X: {gravitySensorData.x} | Y: {gravitySensorData.y} | Z:
                {gravitySensorData.z}
              </small>
            )}
            {gravitySensorError && (
              <small className="m-5">Error - {gravitySensorError}</small>
            )} */}
          </Col>
          <Col
            style={
              isWalking
                ? {
                    backgroundColor: "red",
                    color: "white",
                  }
                : {
                    backgroundColor: "lightgreen",
                  }
            }
          >
            <h2 className="m-5">
              User is {isWalking ? "walking" : "not walking"}
            </h2>
            {/* {linearSensorData && (
              <small className="m-5">
                X: {linearSensorData.x} | Y:{linearSensorData.y} | Z:
                {linearSensorData.z}
              </small>
            )}
            {linearSensorError && (
              <small className="m-5">Error - {linearSensorError}</small>
            )} */}
          </Col>
        </Row>
        <Row style={{ height: "400px" }}>
          <Col
            style={
              isMusicPlaying
                ? {
                    backgroundColor: "lightgreen",
                  }
                : {
                    backgroundColor: "red",
                    color: "white",
                  }
            }
          >
            <h2 className="m-5">
              Music is {isMusicPlaying ? "playing" : "not playing"}
            </h2>
          </Col>
          <Col
            style={
              isWithinRadius
                ? {
                    backgroundColor: "lightgreen",
                  }
                : {
                    backgroundColor: "red",
                    color: "white",
                  }
            }
          >
            <h2 className="m-5">
              User is {isWithinRadius ? "within radius" : "not within radius"}
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
