const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());

io.on('connection', (socket) => {
    console.log('A user connected');

    // Simulate signal strength data
    setInterval(() => {
        let signalStrength = Math.random() * 100; // Random signal strength
        socket.emit('signalData', { strength: signalStrength });
    }, 2000);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(5000, () => console.log('Server running on port 5000'));
