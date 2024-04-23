import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
   
    socket.on('joinRoom', (roomId) => {
        socket.join(roomId);
        console.log("roomId",roomId)
    });

    
    socket.on('sendMessage', (roomId, message) => {
        // console.log('roomId, message', roomId, message);
        io.to(roomId).emit('Receivemessage', message); // Emit message to everyone in the room
    });

    
    socket.on('leaveRoom', (roomId) => {
        socket.leave(roomId);
    });
});

export{httpServer}