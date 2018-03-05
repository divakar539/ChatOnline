const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverPort = 4000;
const chat = require('./chatManager');
const app = express();

app.use(express.static(path.join(__dirname,'dist')));

 
app.listen(serverPort,()=>{
    console.log('Server is connected'+serverPort);
})

var io = require('socket.io').listen(4020);

// socket io
io.on('connection', function (socket) {
  console.log(socket.client.id +' is connected.');
  socket.emit('connected',{clientId : socket.client.id});
  console.log('hello');
  socket.on('send-message', function (message) {
    console.log(socket.client.id+ ":) "+message);
    io.emit('new-message', { from : socket.client.id ,message: message });
    chat.saveChat({  
        from: socket.client.id,  
        clientId: socket.client.id,  
        message : message  
    });  
  });
  io.on("get_history", () => {  
    console.log("Chat history request from " + socket.client.id);  
    chat.getHistory((chats) => {  
        console.log("completed...");  
        socket.emit("take_history", chats);  
    });  
  });
});
