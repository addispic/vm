require("dotenv").config();
const express = require('express');

// socket
const { server,app } = require("./api/socket/socket");

// db connection
const dbConnectionHandler = require('./api/db/db.connection')

// port
const PORT = process.env.PORT || 5050

// settings
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
// users
app.use('/api/users',require('./api/routes/user.routes'))

// listen
server.listen(PORT,async ()=>{
    await dbConnectionHandler();
    console.log('server listening...')
})
