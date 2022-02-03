const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
// app.use(index);

const server = http.createServer();

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (msg) => {
    const obj = { sender: "Bob", date: new Date(), text: msg };
    console.log(obj);
    io.emit("message", { sender: "Bob", date: new Date(), text: msg });
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getApiAndEmit = (socket) => {
  socket.emit("FromAPI", new Date());
};

server.listen(port, () => console.log(`listening on port ${port}`));
