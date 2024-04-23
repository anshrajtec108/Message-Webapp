import mongoose from "mongoose";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createMessage, deleteMessage } from "./message.controllers.js";
import { UserStatus } from "../models/userStatus.model.js";
import { createSingelMessageRelay } from "./relay.controllers.js";
import { check_Single_User_Online } from "./helper.js";

const saveSinglechatMessage=asyncHandler(async(req,res)=>{
    const { content, sendToContactNo}=req.body
    console.log('content, sendToContactNo', content, sendToContactNo);
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
    const userStatus = await UserStatus.findOne({ userId: sendToId }, { status :1})

    if(!userStatus){
        await createSingelMessageRelay(chat?._id, sendToId)
        console.log("the relay is create because the use is offline ", chat?._id);
    }
    // console.log(chat);
    return res.status(200)
        .json(new ApiResponse(200, chat ,"the chat is saved"))
})


const getSingleChatMessage=asyncHandler(async(req,res)=>{
    const { sendToContactNo,page, }=req.body
    console.log(sendToContactNo, page);
    let limit=15
    let sendTot = await User.findOne({ contactNo: parseInt(sendToContactNo) })
    let userId = req.user?._id
    // let userId ="660d82533407bb6f8f863d29"
    if (!sendTot) {
        throw new ApiError(400, "the send-TO user not found ")
    }
    
    const data = await Chat.aggregate([
        {
            $match: {
                $or: [
                    {
                        $and: [
                            { sendBy: new mongoose.Types.ObjectId(userId) },
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
            $sort: { createdAt :-1}
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
        { $unwind: '$messageData' },
        {
            $project: {
                sendBYthem: {
                    $cond: { if: { $ne: ["$sendBy", new mongoose.Types.ObjectId(req.user?._id)] }, then: true, else: false }
                },
                message: '$messageData'
            }
        },
        // Sort by updatedAt in descending order (latest first)
        {
            $sort: { 'message.createdAt': -1 }
        }
    ]);

    // console.log(data);
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

const userSingleOnline=asyncHandler(async(req,res)=>{
    const {userId}=req.body 
    const respone=await check_Single_User_Online(userId)
    return res.status(200)
    .json(new ApiResponse(200,respone,"the user Status online//offilne"))
})

export{
    saveSinglechatMessage,
    getSingleChatMessage,
    deleteSingleChatMessage,
    userSingleOnline

}