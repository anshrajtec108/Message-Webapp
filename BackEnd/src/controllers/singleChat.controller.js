import mongoose from "mongoose";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createMessage, deleteMessage } from "./message.controllers.js";

const saveSinglechatMessage=asyncHandler(async(req,res)=>{
    const { content, sendToContactNo}=req.body
    let sendTo = await User.findOne({ contactNo: sendToContactNo });

    if (sendTo.length===0) {
        throw new ApiError(400, "the send-TO user not found ")
    }
    let sendToId= sendTo?._id
    let sendById=req.user?._id

    const message=await createMessage(content)
    const chat=await Chat.create({
        sendBy: sendById,
        sendTo: sendToId,
        messageId: message
    })
    if(!chat){
        throw new ApiError(500," the chat is not saved  ")
    }
    return res.status(200)
    .json(new ApiResponse(200,[],"the chat is saved"))
})


const getSingleChatMessage=asyncHandler(async(req,res)=>{
    const { sendToContactNo,page, }=req.body
    let limit=30
    let sendTot = await User.findOne({ contactNo: sendToContactNo })

    if (!sendTot) {
        throw new ApiError(400, "the send-TO user not found ")
    }
    
    const data = await Chat.aggregate([
        {
            $match: {
                $or: [
                    {
                        $and: [
                            { sendBy: new mongoose.Types.ObjectId(req.user?._id) },
                            { sendTo: new mongoose.Types.ObjectId(sendTot?._id) }
                        ]
                    },
                    {
                        $and: [
                            { sendBy: new mongoose.Types.ObjectId(sendTot?._id) },
                            { sendTo: new mongoose.Types.ObjectId(req.user?._id) }
                        ]
                    }
                ]
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: parseInt(limit)
        },
        {
            $lookup: {
                from: "messages",
                localField: "messageId",
                foreignField: "_id",
                as: "messageData"
            }
        },
        {
            $project: {
                sendBYme: {
                    $cond: { if: { $eq: ["$sendBy", new mongoose.Types.ObjectId(req.user?._id)] }, then: true, else: false }
                },
                sendBYthem: {
                    $cond: { if: { $ne: ["$sendBy", new mongoose.Types.ObjectId(req.user?._id)] }, then: true, else: false }
                },
                message: '$messageData'
            }
        }
    ]);
    return res.status(200)
    .json(new ApiResponse(200,data,"get all messages "))
})

const deleteSingleChatMessage =asyncHandler(async(req,res)=>{
    const {chatId}=req.body
    const chat=await Chat.findById(chatId)
    if(!chat){
        throw new ApiError(400, "the chat not found ")
    }
   await deleteMessage(chat?.messageId)
    await Chat.findByIdAndDelete(chat?._id)

    return res.status(200)
    .json(new ApiResponse(200,[],"the chat and message deleted"))
})


export{
    saveSinglechatMessage,
    getSingleChatMessage,
    deleteSingleChatMessage

}