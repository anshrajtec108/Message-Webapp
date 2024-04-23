import { createServer } from "http";
import { Server } from "socket.io";


const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection',(socket)=>{
    console.log("socket.id",socket.id)
    socket.on('sendMegSingle',(data)=>{
        console.log(data)
        // io.to(data?.sendToContactNo).emit("getMsgSingle", data.content)
        io.emit("getMsgSingle", data.content)
    })
})

export{httpServer}