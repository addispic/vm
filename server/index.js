require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require('path')

// socket
const { server, app } = require("./api/socket/socket");

// db connection
const dbConnectionHandler = require("./api/db/db.connection");

// port
const PORT = process.env.PORT || 5050;

// settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
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

// -------------------------------- deployment
const __dirname1 = path.resolve()
console.log(__dirname1, "______")
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname1,'..','/client/dist')))
  app.get("*",(req,res)=>{
    return res.sendFile(path.resolve(__dirname1,"..","client","dist","index.html"))
  })
}else{
  app.get("/",(req,res)=>{
    return res.send("API is running successfully")
  })
}
// -------------------------------- deployment


// listen
server.listen(PORT, async () => {
  await dbConnectionHandler();
  console.log("server listening...");
});
