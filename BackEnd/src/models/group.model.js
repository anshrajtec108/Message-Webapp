import mongoose, { Schema } from "mongoose";

const groupSchema=new Schema(
    {
        groupTitle:{
            type:String,
            required:true,
        },
        groupDescription:{
            type: String,
            required: true,
        },
        userList:[
            {
                type:Schema.Types.ObjectId,
                ref:"User"
            }
        ],
        groupAvatar: {
            type: String,// cloudinary url 
        },
        groupAdmin: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        adminMessage:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    }
)

export const Group = mongoose.model("Group",groupSchema)