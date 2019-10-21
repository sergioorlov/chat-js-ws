const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const PORT = process.env.PORT || 5000;
const DIR = path.join(__dirname, "./client/index.html");

const server = express()
  .use(express.static("client"))
  .use(res => res.sendFile(DIR))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", message => {
    sendData(message);
  });
});

function sendData(message) {
  wss.clients.forEach(ws => ws.send(message));
}
