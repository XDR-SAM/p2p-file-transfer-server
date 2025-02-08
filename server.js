const express = require("express");
const { ExpressPeerServer } = require("peer");

const app = express();
const server = require("http").createServer(app);
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use("/peerjs", peerServer);
app.get("/", (req, res) => res.send("WebSocket Signaling Server is Running!"));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Signaling server running on port ${PORT}`);
});
