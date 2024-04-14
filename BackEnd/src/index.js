import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { httpServer } from "./socketConnection.js";


dotenv.config({
    path: './env'
});

connectDB()
    .then(() => {
         app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at PORT ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection failed:", err);
    });


const SOCKETPORT = process.env.SOCKET_PORT || 3000; 
httpServer.listen(SOCKETPORT, () => {
    console.log(`Socket.IO server is running on port ${SOCKETPORT}`);
});




