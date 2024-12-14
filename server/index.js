require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// socket
const { server, app } = require("./api/socket/socket");

// db connection
const dbConnectionHandler = require("./api/db/db.connection");

// port
const PORT = process.env.PORT || 5050;

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://vm-frontend-3l1x.onrender.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://vm-frontend-3l1x.onrender.com",
    credentials: true,
  })
);

// routes
// user
app.use("/api/user", require("./api/routes/user.routes"));
// vehicles
app.use("/api/vehicle", require("./api/routes/vehicle.routes"));

// public
app.use("/public", express.static("public"));

// listen
server.listen(PORT, async () => {
  await dbConnectionHandler();
  console.log("server listening...");
});
