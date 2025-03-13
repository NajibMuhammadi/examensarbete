import express from 'express';
import http from "http";
import { Server } from 'socket.io';
const PORT = 8088;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

const messages = [];

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Skicka tidigare meddelanden till den nya användaren
    socket.emit('previousMessages', messages);

    // Lyssna på 'sendMessage' från klienten
    socket.on('sendMessage', (data) => {
        const { text, userName, image } = data;
        const message = { text, userName, image, timestamp: Date.now() };
        messages.push(message);
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

server.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
    