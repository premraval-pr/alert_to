const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = 4242;

const data = {
  cars: 0,
  speed: 0,
};

app.use(express.json());

app.post("/data", (req, res) => {
  const speed = req.body.speed || 0;

  if (speed > 0) {
    data.speed += speed;
    data.cars += 1;
  }

  return res.json({ message: "Added" });
});

const SEND_INTERVAL = 2000;

const writeEvent = (res, sseId, data) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req, res) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });

  const sseId = new Date().toDateString();

  setInterval(() => {
    writeEvent(res, sseId, JSON.stringify(data));
  }, SEND_INTERVAL);

  writeEvent(res, sseId, JSON.stringify(data));
};

app.get("/data", (req, res) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "No stream" });
  }
});

app.listen(port, () => {
  console.log(`Express server: http://localhost:${port}`);
});
