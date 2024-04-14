import { Contact } from "../models/contact.model.js";
import { Group } from "../models/group.model.js";
import { UserStatus } from "../models/userStatus.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const check_admin = async (groupId, adminId)=>{
    try {
        const group = await Group.findById(groupId);

        if (group.length === 0) {
            throw new ApiError(404, "Group not found");
        }

        const isAdmin = group.groupAdmin.includes(adminId);

        return isAdmin;
    } catch (error) {
        console.error('Error check_admin message:', error);
        throw new ApiError(500, "Internal server error");
    }
}

const check_user_present_in_Contact=async (userId)=>{
    try {
        const contact = await Contact.find({ userId: req.user?._id })

        if (contact.length===0){
            throw new ApiError(404, "contact not found");
        }

        const inContact = contact.userList.includes(userId);
        return inContact;     
    } catch (error) {
        console.error('Error check_admin message:', error);
        throw new ApiError(500, "Internal server error");
    }
}

const check_user_is_online_groups=async(userIdList)=>{
    let usersOffline =[]
    for (const userId of userIdList) {
        const status = await UserStatus.findOne({ userId });
        if (!status) {
            usersOffline.push(userId);
        }
    }
    return usersOffline
}
const check_Single_User_Online=async(userId)=>{
    let res= false
    const status = await UserStatus.findOne({userId:userId})
    if(status){
       res= true
    }
    return res

}
export{
    check_admin,
    check_user_present_in_Contact,
    check_user_is_online_groups,
    check_Single_User_Online

}