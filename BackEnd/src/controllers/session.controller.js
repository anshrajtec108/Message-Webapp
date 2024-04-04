import { UserStatus } from "../models/userStatus.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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
    return res.status(200)
    .json(new ApiResponse("200",[],"the user is online"))
})

const endSession=asyncHandler(async(req,res)=>{
    const { userId }=req.body

    if (!userId) {
        throw new ApiError(500, "the userID is required ")
    }
    await UserStatus.findByIdAndDelete(userId)

    return res.status(200)
        .json(new ApiResponse("200", [], "the user is offline"))
})




export{
    entrySession,
    endSession,

}