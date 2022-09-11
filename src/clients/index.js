import React from "react";
import * as ml5 from "ml5";

export const getStreamData = (url) => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();
  const source = new EventSource(url);

  source.onopen = (event) => {
    console.log("SSE open for", url);
  };

  source.onmessage = (event) => {
    setData(event.data);
  };

  source.onerror = (error) => {
    setError(error);
  };

  React.useEffect(() => {
    return () => {
      source.close();
    };
  }, []);

  return { data, error };
};

export const getSoundClassifier = (model, options) => {
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();

  const init = async () => {
    const classifier = await ml5.soundClassifier(model, options);
    classifier.classify((error, result) => {
      if (error) {
        setError(error);
        return;
      }
      setData(result);
    });
  };

  React.useEffect(() => {
    init();
  }, []);

  return { data, error };
};
