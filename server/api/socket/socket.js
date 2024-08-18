const http = require("http");
const express = require("express");

// app
const app = express();
// server
const server = http.createServer(app);

module.exports = {
  app,
  server,
};
