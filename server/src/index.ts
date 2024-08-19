import { Server } from 'socket.io';
import { createServer } from 'http';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Send a welcome message to the newly connected client
 // socket.emit('message', { data: 'Welcome to the chat', id: 'Server' });

  // Broadcast the message to all clients when received from a client
  socket.on('sendMessage', (message, isUser) => {
    io.emit('message', { data: message, isUser:isUser, id: socket.id });
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});

server.listen(5000, () => console.log('Server is running on http://localhost:5000'));
