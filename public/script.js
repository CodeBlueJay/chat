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
  if (username) {
    localStorage.setItem('username', username);
    socket.emit('new-user', username);
  }
});

socket.on('chat-message', (data) => {
  appendMessage(data);
});

function sendMessage() {
  const message = messageInput.value.trim();
  const username = localStorage.getItem('username');
  
  if (message !== '' && username) {
    socket.emit('send-chat-message', { message, username });
    messageInput.value = '';
  }
}

function appendMessage(data) {
  const messageContainer = document.createElement('div');
  const messageWrapper = document.createElement('div');
  const profilePicture = document.createElement('div');
  const messageElement = document.createElement('div');
  const timestamp = document.createElement('div');

  // Set the profile picture
  profilePicture.innerText = data.username.charAt(0).toUpperCase(); // Get the first letter of the username
  profilePicture.classList.add('profile-picture');
  messageContainer.appendChild(profilePicture);

  // Set the message
  messageElement.innerText = data.message;
  messageElement.classList.add('message-content');
  messageWrapper.appendChild(messageElement);

  // Set the timestamp
  timestamp.innerText = new Date().toLocaleTimeString();
  timestamp.classList.add('message-timestamp');
  messageWrapper.appendChild(timestamp);

  // Add message wrapper to message container
  messageContainer.appendChild(messageWrapper);

  // Add message container to messages
  document.getElementById('messages').appendChild(messageContainer);

  // Add message container class based on user
  if (data.username !== localStorage.getItem('username')) {
    messageContainer.classList.add('received-message');
  } else {
    messageContainer.classList.add('sent-message');
  }
}





