/* Imports */
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");
require('dotenv').config();
const fs = require("fs");

/* Base */
const app = express();
const server = http.createServer(app);
const port = process.env.PORT;
const io = new Server(server);

/* Middlewares */
app.use( express.json() );
app.use( express.urlencoded({extended: false}) );
app.use( express.static( __dirname + '/public') );

/* ViewEngine */
app.engine( 'handlebars', engine() );
app.set( 'view engine', 'handlebars' );
app.set( 'views', './views' );

/* Routes */
app.use( '/' , require('./routes/main') );
app.use( '/products' , require('./routes/products') );

/* Variables */
let mensajes = [];
const messages_db = './db/messages.txt';
const utf = 'utf-8';

/* Socket IO */
io.on("connection", socket => {
    console.log("SocketIO Connected!");
    const messages = JSON.parse(fs.readFileSync(messages_db, utf));
    mensajes = messages;
    socket.emit("initial", messages);
    socket.on("sendMessage", (data) => {
        data.timestamp = (new Date).toLocaleString();
        mensajes.push(data);
        io.sockets.emit("shareMessages", mensajes);
        fs.writeFileSync(messages_db, JSON.stringify(mensajes), utf);
    });
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});