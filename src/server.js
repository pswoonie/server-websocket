import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

server.listen(3000, () => console.log("Server Start: listening..."));

io.on("connection", (socket) => {
  // Show on connection with client
  console.log("Connected to Client!!!");

  socket.on("JOIN_ROOM", (client) => {
    socket.join(client.rid);
    socket.to(client.rid).emit("CONNECTED", client);
  });

  socket.on("FROM_CLIENT", (message) => {
    socket.to(message.rid).emit("FROM_SERVER", message);
  });

  // Check if connection is gone
  socket.on("disconnect", () => console.log("Disconnected from client!!!"));
});
