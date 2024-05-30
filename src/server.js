import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const handleListen = () => {
  console.log("Server Start: listening...");
};

server.listen(3000, handleListen);

//TODO: this part should be connected to database
//TODO: change later
let rooms = [];

// ==============================================

wss.on("connection", (socket) => {
  // Show on connection with client
  console.log("Connected to Client!!!");

  // Get messages from clients
  socket.on("message", (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    socket.send(message);
  });

  // Check if connection is gone
  socket.on("close", () => console.log("Disconnected from client!!!"));
});
