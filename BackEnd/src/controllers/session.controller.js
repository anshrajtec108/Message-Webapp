import { UserStatus } from "../models/userStatus.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { getSingleMessageNotification } from "./notification.controllers.js";


const entrySession=asyncHandler(async(req,res)=>{
    const { status }=req.body
    const userId =req.user?._id

    if (!status || !userId){
        throw new ApiError(500,"the userID and status is required ")
    }
    await UserStatus.create({
        userId,
        status
    })
    const SingleMessageNotification= await getSingleMessageNotification(userId)
    console.log('session is created ');
    return res.status(200)
        .json(new ApiResponse("200", {SingleMessageNotification:SingleMessageNotification,},"the user is online"))
})

const endSession=asyncHandler(async(req,res)=>{
    // const { userId }=req.body
    const  userId =req?.user?._id

    if (!userId) {
        throw new ApiError(500, "the userID is required ")
    }
    const userStatusId = await UserStatus.find({ userId: userId })

    if (!userStatusId) {
        throw new ApiError(500, "the userID not resister in userStaus document  ")
    }

    const deleteUserStatus=await UserStatus.findByIdAndDelete(userStatusId)

    // if (!deleteUserStatus) {
    //     throw new ApiError(500, "something want wrong  while delete user status ")
    // }
    console.log('session is deleted ');
    return res.status(200)
        .json(new ApiResponse("200", [], "the user is offline"))
})

export{
    entrySession,
    endSession,

}