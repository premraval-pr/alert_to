import React from "react";
import "./App.css";
import { useGravitySensor } from "./hooks";

function App() {
  const { data, error } = useGravitySensor();

  React.useEffect(() => {
    const source = new EventSource("http://localhost:4242/data");
    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      console.log(e.data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error: ", e);
    });

    return () => {
      source.close();
    };
  }, []);

  return <div className="App">{error ? <p>{error}</p> : <p>{data}</p>}</div>;
}

export default App;
