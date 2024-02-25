// public/script.js
const socket = io();

const messageInput = document.getElementById('message-input');

document.getElementById('send-button').addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

socket.on('connect', () => {
  const username = prompt('Enter your name:');
  socket.emit('new-user', username);
});

socket.on('chat-message', (data) => {
  appendMessage(`${data.username}: ${data.message}`);
});

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() !== '') {
    socket.emit('send-chat-message', message);
    appendMessage(`You: ${message}`);
    messageInput.value = '';
  }
}

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  document.getElementById('messages').appendChild(messageElement);
}
