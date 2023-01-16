const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{cors:{origin:'*'}});
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('send', (message) => {
    io.emit('chat', {message ,id:socket.id});
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
