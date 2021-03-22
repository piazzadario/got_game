const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();
// app.use(express.static('../client/build'))
const server = app.listen(3001,()=> console.log('Server listening on port 3001'));


// socket configuration
const io  = socket(server,{
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected: ID = ',socket.id);

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });

    socket.on('faction_selection', (faction) =>     {
        socket.broadcast.emit('faction_selection', faction );   
    });
});

