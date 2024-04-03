import mongoose, { Schema } from "mongoose";

const chartSchema=new Schema(
    {
        sendBy:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sendTo:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        sendToGroup:{
            type: Schema.Types.ObjectId,
            ref: "Group"
        },
        status:{
            type:String,
            index: true,
            required: true,
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

export const Chart=mongoose.model("Chart",chartSchema)