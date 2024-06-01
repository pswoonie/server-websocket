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
let clients = [];

// ==============================================

function addSockets(socket) {
  const result = clients.filter(
    (c) => c.rid === socket.roomId && c.uid === socket.userId
  );

  if (result !== null || result !== undefined || result.length == 0) {
    const newRoom = { socket: socket, rid: socket.roomId, uid: socket.userId };
    clients.push(newRoom);
  }

  return;
}

function sendMessage(message) {
  const result = clients.filter(
    (c) => c.rid === message.rid && c.uid !== message.uid
  );

  result.forEach((client) => client.socket.send(JSON.stringify(message)));
  console.log("Message Sent!!!");
}

wss.on("connection", (socket) => {
  // Show on connection with client
  console.log("Connected to Client!!!");

  // Get messages from clients
  socket.on("message", (data, isBinary) => {
    const jsonString = isBinary ? data : data.toString();
    const message = JSON.parse(jsonString);
    socket["roomId"] = message.rid;
    socket["userId"] = message.uid;

    // Add sockets
    addSockets(socket);

    // Distribute messages
    sendMessage(message);
  });

  // Check if connection is gone
  socket.on("close", () => console.log("Disconnected from client!!!"));
});
