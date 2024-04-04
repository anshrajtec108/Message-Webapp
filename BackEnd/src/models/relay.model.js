import { Schema } from "mongoose";

const relayShema=new Schema(
    {
        charId:{
            type:Schema.Types.ObjectId,
            ref:"Chart"
        },
        groupUserId:[
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messageId:{
            type: Schema.Types.ObjectId,
            ref: "Message"
        }
        
         
        
    },
    {
        timestamps:true
    }
)

export const Relay = mongoose.model("Relay", relayShema)