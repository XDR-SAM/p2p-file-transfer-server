const express = require("express");
const WebSocket = require("ws");
const cors = require("cors");
const path= require("path");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Signaling server running on port ${PORT}`)
);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
        }
      });
    } catch (err) {
      console.error("Error parsing message:", err);
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});
