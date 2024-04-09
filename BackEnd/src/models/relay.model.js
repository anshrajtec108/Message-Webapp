import mongoose ,{ Schema } from "mongoose";

const relayShema=new Schema(
    {   
        sendTo:{
        type: Schema.Types.ObjectId,
        ref: "user"
        },
        chatId:{
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
        //the groupUserId and messageId is not requiered single user char 
         
        
    },
    {
        timestamps:true
    }
)

export const Relay = mongoose.model("Relay", relayShema)