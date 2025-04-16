const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('✅ A user connected');

    socket.on('chat message', (msg) => {
        console.log('💬 Message received:', msg);
        io.emit('chat message', msg); // broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('❌ A user disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
