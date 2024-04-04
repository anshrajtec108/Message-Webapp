import mongoose, { Schema } from "mongoose";

const contactSchema =new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        userList: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
    }
)

export const Contact = mongoose.model("Contact",contactSchema)