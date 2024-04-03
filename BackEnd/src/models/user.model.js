import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        email:{
            type: String,
            required: true,
            unique: true,
            index: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        About:{
            type: String,
        },
        contactNo:{
            type: Number,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,// cloudinary url 
        },
    },
    {
        timestamps:true
    }
)

export const User=mongoose.model("User",userSchema)