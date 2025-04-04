const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
  user: String,
  content: String
});
const messageModel = mongoose.model("Message", messageSchema);



app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/messages', async function(req, res){
  const messages = await messageModel.find();
  res.json(messages);
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    const message = new messageModel({
      user: msg.user,
      content: msg.message
    });

    message.save().then(() => {
      io.emit('chat message', msg); 
    });
  });
});


server.listen(3000, async function(){
  await mongoose.connect("mongodb+srv://kaitowhites:lyx060818@cluster0.xzels.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  console.log('listening on *:3000');
});
