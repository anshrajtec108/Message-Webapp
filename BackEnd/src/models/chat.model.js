import mongoose, { Schema } from "mongoose";

const chatSchema=new Schema(
    {
        sendBy:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sendTo:{
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        sendToGroup:{
            type: Schema.Types.ObjectId,
            ref: "Group"
        },
        status:{
            type:String,
            index: true,
            default: false,
        },
        messageId:{
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
    },
    {
        timestamps:true
    }
)

export const Chat=mongoose.model("Chat",chatSchema)