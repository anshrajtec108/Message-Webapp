import mongoose, { Schema } from "mongoose";

const userStatusSchema=new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            required: true,
            // unique: true,
            index: true
        },
        status:{
            type: Boolean,
            default: true
        }
    },
    {
        timestamps:true
    }
)


export const UserStatus = mongoose.model("UserStatus",userStatusSchema)