import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const handleListen = () => {
  console.log("listening...");
};

wss.on("connection", (socket) => {
  socket.send("hello");
});

server.listen(3000, handleListen);
