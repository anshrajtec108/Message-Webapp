import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


//import
import userRouter from "./routers/user.router.js"
import singleChat from "./routers/singleMessage.router.js"
import group from './routers/group.router.js'
import groupChart from './routers/groupMessage.router.js'
import contact from './routers/contact.router.js'
import session from './routers/session.router.js'

app.use("/api/v1/users",userRouter)
app.use("/api/v1/chatmessage",singleChat)
app.use("/api/v1/group",group)
app.use("/api/v1/groupChart", groupChart)
app.use("/api/v1/contact", contact)
app.use('/api/v1/session',session)

export{app}