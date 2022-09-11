const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const port = 4242;

const data = [
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
let index = 0;

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
    writeEvent(res, sseId, JSON.stringify(data[index++ % data.length]));
  }, SEND_INTERVAL);

  writeEvent(res, sseId, JSON.stringify(data[index++ % data.length]));
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
