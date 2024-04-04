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

messageSchema.index({ createdAt: -1 });

export const Message = mongoose.model("Message",messageSchema)