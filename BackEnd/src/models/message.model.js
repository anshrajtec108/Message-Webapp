import mongoose, { Schema } from "mongoose";

const messageSchema= new Schema(
    {
        content: {
            type: String,// cloudinary url 
            required: true
        },
    },
    {
        timestamps:true
    }
)

export const Message = mongoose.model("Message",messageSchema)