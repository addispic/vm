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

  // post
  // add new post
  socket.on('addNewPost',data=>{
    io.emit('addNewPostEvent',data)
  })
  // delete post
  socket.on('deletePost',_id => {
    io.emit('deletePostEvent', _id)
  })
})

module.exports = {
  app,
  server,
};
