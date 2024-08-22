const http = require("http");
const express = require("express");
const socketIo = require('socket.io');

// app
const app = express();
// server
const server = http.createServer(app);

// io
const io = socketIo(server,{
  cors: {
    origin: true,
  }
})

// connection
io.on('connection',socket=>{
  // console.log(socket.id)
  // new user register
  socket.on("newUserRegister",data=>{
    // send new user
    io.emit("emitNewUser",data)
  })
})

module.exports = {
  app,
  server,
};
