import React,{ useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
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

  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [isWithinRadius, setIsWithinRadius] = useState(true);
  const [latDistance, setLatDistance] = useState(0);
  const [lngDistance, setLngDistance] = useState(0);

  const [isPhoneUp, setIsPhoneUp] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

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

  return (
    <div className="App">
      <Container fluid>
        <Row style={{ height: "400px" }}>
          <Col
            style={
              isPhoneUp
                ? {
                    backgroundColor: "red",
                  }
                : {
                    backgroundColor: "lightgreen",
                  }
            }
          >
            <h2 className="m-5">Phone is {isPhoneUp ? "up" : "down"}</h2>
          </Col>
          <Col
            style={
              isWalking
                ? {
                    backgroundColor: "green",
                  }
                : {
                    backgroundColor: "red",
                  }
            }
          >
            <h2 className="m-5">
              User is {isWalking ? "walking" : "not walking"}
            </h2>
          </Col>
        </Row>
        <Row style={{ height: "400px" }}>
          <Col
            style={
              isMusicPlaying
                ? {
                    backgroundColor: "green",
                  }
                : {
                    backgroundColor: "red",
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
                    backgroundColor: "green",
                  }
                : {
                    backgroundColor: "red",
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
