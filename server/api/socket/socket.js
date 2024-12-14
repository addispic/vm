const http = require("http");
const express = require("express");
const socketIo = require("socket.io");

// app
const app = express();
// server
const server = http.createServer(app);

// io
const io = socketIo(server, {
  cors: {
    origin: true,
  },
});

// connection
io.on("connection", (socket) => {
  // new user register
  socket.on("newUserRegister", (data) => {
    // send new user
    io.emit("emitNewUser", data);
  });

  // vehicles
  // new vehicle
  socket.on("addNewVehicle", (data) => {
    io.emit("addNewVehicleEvent", data);
  });
  // update vehicle
  socket.on("updateVehicle", (data) => {
    io.emit("updateVehicleEvent", data);
  });

  // delete vehicle
  socket.on("deleteVehicle", (_id) => {
    io.emit("deleteVehicleEvent", _id);
  });
});

module.exports = {
  app,
  server,
};
