/////////////////////////////
/////////Initialize//////////
/////////////////////////////

//initialize the server using Express.js via Node.js
const express = require('express');         //import "express" module  
const http = require('http');               //import "http" module 
const { SocketAddress } = require('net');
const { Server } = require("socket.io");    //import the "Server" object from the "socket.io" module
const app = express();                      //create a new Express application
const server = http.createServer(app);      //create a HTTP server object using the newly created Express application
const io = new Server(server);              //create an instance of the server object and naming it "io"

app.get('/', (req, res) => {                //serve the client.html file as a cilent interface,
  res.sendFile(__dirname + '/client.html'); //once the cilent is connected to the server
});

server.listen(8888, () => {                //ask the server to listen to PORT:8888
  console.log('listening PORT:8888');      //and print out the listening message on the server side console
});


///////////////////////////////
/////Main Server Function//////
///////////////////////////////

//This function runs whenever a cilent is connected to the server.
//When a cilent first connected to the server, it will print out the cilent ID on the console.
//It then awaits for any incoming message from the cilent.
//If there is an incoming message from the cilent, the server will first print out the message on the console,
//Lastly, it reverses the character order in each word and sends the resulting string back to the client on the client.html file  
io.on('connection', (socket) => {
  console.log("[CONNECTED]     ID: " + socket.id);

  socket.on('disconnect', () => {
    console.log("[DISCONNECTED]  ID: " + SocketAddress.id);
  })

  socket.on('chat message', msg => {
    console.log("[MSG FM CLIENT] ID: " + socket.id + ", MSG: " + `${msg}`);
    io.emit('chat message', msg.split(" ").map(word => word.split("").reverse().join("")).join(" "));
  });
});
