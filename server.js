// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (username) => {
    users[socket.id] = username;
    io.emit('user-connected', username);
  });

  socket.on('send-chat-message', (data) => {
    io.emit('chat-message', { message: data.message, username: data.username });
  });

  socket.on('disconnect', () => {
    io.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
