import mongoose from "mongoose"
import { Chat } from "../models/chat.model.js"
import { Group } from "../models/group.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { check_admin, check_user_is_online_groups } from "./helper.js"
import { createMessage, deleteMessage } from "./message.controllers.js"
import { createGrouplMessageRelay } from "./relay.controllers.js"

const saveGroupchatMessage = asyncHandler(async (req, res) => {
    const { content, groupId} = req.body
    let sendById=req.user?._id
    const group =await Group.findById(groupId)
    if (!group ||group.lenght===0){
        throw new ApiError(400,"the group is not exist ")
    }
    if(group?.adminMessage){
       if (check_admin(groupId, sendById)){
            const message =await createMessage(content)
            const chat=await Chat.create({
                sendBy: sendById,
                sendToGroup: groupId,
                messageId:message
       })
       if(!chat){
        throw new ApiError(500,"the chat message is not saved")
       }
           const checkStatuslist = await check_user_is_online_groups(group.userList)
           console.log(checkStatuslist);
           if (!checkStatuslist.length < 0 ){
                await createGrouplMessageRelay(checkStatuslist,message)
               console.log("the Group relay is create because the users are offline ", checkStatuslist);
           }
       return res.status(200)
       .json(new ApiResponse(200,[]," the group message is saved"))
       }else{
        throw new ApiError(400,"admin can only message")
       }
    }else{
        const message = await createMessage(content)
        const chat = await Chat.create({
            sendBy: sendById,
            sendToGroup: groupId,
            messageId: message
        })
        if (!chat) {
            throw new ApiError(500, "the chat message is not saved")
        }
        const checkStatuslist = await check_user_is_online_groups(group.userList)
        // console.log("checkStatuslist",checkStatuslist);

        if (checkStatuslist) {
            const createRelayG = await createGrouplMessageRelay(checkStatuslist, message)
            // console.log("createRelayG",createRelayG);
            console.log("the Group relay is create because the users are offline ", checkStatuslist);
        }
        return res.status(200)
            .json(new ApiResponse(200, [], " the group message is saved"))
    }
})

const getGroupChatMessage = asyncHandler(async (req, res) => {
    const { groupId, page } = req.body
    let limit = 30

    const data = await Chat.aggregate([
        {
            $match: {
                $or:[
                    {
                        sendBy: new mongoose.Types.ObjectId(groupId)
                    },
                    {
                        sendToGroup: new mongoose.Types.ObjectId(groupId)
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
                    $cond: { if: { $eq: ["$sendByMe", new mongoose.Types.ObjectId(req.user?._id)] }, then: true, else: false }
                },
                message: '$messageData'
            }
        }
    ]);
    return res.status(200)
        .json(new ApiResponse(200, data, "get all group messages "))
})

const deleteGroupChatMessage = asyncHandler(async (req, res) => {
    const { chatId } = req.body
    const chat = await Chat.findById(chatId)
    if (!chat) {
        throw new ApiError(400, "the chat not found ")
    }
    await deleteMessage(chat?.messageId)
    await Chat.findByIdAndDelete(chat?._id)

    return res.status(200)
        .json(new ApiResponse(200, [], "the chat and message deleted"))
})

export{
    saveGroupchatMessage,
    getGroupChatMessage,
    deleteGroupChatMessage

}