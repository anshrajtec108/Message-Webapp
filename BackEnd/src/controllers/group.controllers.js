import { Group } from "../models/group.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { check_admin } from "./helper.js";


const createGroup=asyncHandler(async(req,res)=>{
    const { groupTitle, groupDescription } = req.body
    //TODO the img is not uploded
    let groupAvatarLocalPath = req.file?.path;
    console.log("avatarLocalPath", groupAvatarLocalPath);

    let groupAvatar = await uploadOnCloudinary(groupAvatarLocalPath)

    const group=await Group.create({
        groupTitle,
        groupDescription,
        groupAvatar,
        groupAdmin:req.user?._id
    })
    return res.status(200)
    .json(new ApiResponse(200,group,"the group is created"))
})

const addUserToGroup=asyncHandler(async(req,res)=>{
    const {userArray,groupId}=req.body
    //TODO check the user all reday exist in group or check admin as the contact save of user 
    const data = await Group.findByIdAndUpdate(
        groupId, 
        { $addToSet: { userList: { $each: userArray } } }, 
        { new: true },
        )
    
    return res.status(200)
    .json(new ApiResponse(200,data,"the user are added to group"))
})

const removeUserFromGroup=asyncHandler(async(req,res)=>{

    const { adminId,userId, groupId } = req.body;
    const checkAdmin = await check_admin(groupId,adminId) 
    if(checkAdmin){
    const group = await Group.findById(groupId);

    const tempArray = group.userList.slice(); 
    
    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] === userId) {
            tempArray.splice(i, 1); 
            i--; // Decrement i to correctly iterate over the modified array
            break; 
        }
    }

  
    const data = await Group.findByIdAndUpdate(
        groupId,
        { userList: tempArray }, 
        { new: true }
    );

    return res.status(200).json(new ApiResponse(200, data, "The user is removed from the group"));
    }else{
        throw new ApiError(400,"your are not admin")
    }
})

const userExitFromGroup=asyncHandler(async(req,res)=>{
    const {groupId } = req.body;
    let userId=req.user?._id;
    const group = await Group.findById(groupId);

    const tempArray = group.userList.slice();

    for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i] === userId) {
            tempArray.splice(i, 1);
            i--; // Decrement i to correctly iterate over the modified array
            break;
        }
    }

    // Update the group with the modified userList
    const data = await Group.findByIdAndUpdate(
        groupId,
        { userList: tempArray },
        { new: true }
    );
    return res.status(200).json(new ApiResponse(200, data, "The user is removed from the group"));

})

// const updateGroup=asyncHandler(async(req,res)=>{
// })

export{
    createGroup,
    addUserToGroup,
    removeUserFromGroup,
    userExitFromGroup,
    // updateGroup,

}