import mongoose  from "mongoose";
import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const adduserTOcontact = asyncHandler(async (req, res) => {
    const {userContactNo } = req.body;

    const user = await User.findOne({ contactNo: userContactNo });
    if (!user) {
        throw new ApiError(500, "User doesn't exist");
    }

    let contact = await Contact.findOne({ userId: req.user?._id });

    if (!contact) {
        contact = await Contact.create({
            userId: req.user?._id,
            userList: [{
                userContactId: user._id
            }]
        });
          return res.status(200).json(new ApiResponse("200", contact, "Your contact is created and the user is added")); 
    } else {
        const updatedContact = await Contact.findByIdAndUpdate(
            contact._id,
            {
                $addToSet: {
                    userList: {
                        userContactId: user._id
                    }
                }
            },
            { new: true }
        );
        return res.status(200).json(new ApiResponse("200", updatedContact, "User added to contact"));
    }
});

const deleteUserForContact = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    const contact = await Contact.findOne({ userId: req.user?._id });

    if (!contact) {
        throw new ApiError(404, "Contact not found for the current user");
    }

    // Find the index of the object to remove in the userList array
    const indexToRemove = contact.userList.findIndex(user => user.userContactId.toString() === userId.toString());

    if (indexToRemove === -1) {
        throw new ApiError(404, "User not found in contact list");
    }

    // Use findOneAndUpdate with $pull to remove the specific object from userList
    await Contact.findOneAndUpdate(
        { userId: req.user?._id },
        { $pull: { userList: contact.userList[indexToRemove] } },
        { new: true }
    );


    // Respond with success message or updated contact details
    return res.status(200).json(new ApiResponse("200", null, "User removed from contact"));

})

const getAllContact = asyncHandler(async(req,res)=>{
    const userId=req.user?._id
    // const userId ='660d82533407bb6f8f863d29'
    if(!userId){
        throw new ApiError(500,"the userID is required ")
    }
    const contactInfo = await Contact.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userList.userContactId',
                foreignField: '_id',
                as: 'contactUserInfo'
            }
        },
        { $unwind: '$contactUserInfo' },
        {
            $addFields: {
                userContactInfo: {
                    userName:'$contactUserInfo.name' , // Get the first userName value from the array
                    email: '$contactUserInfo.email',
                    avatar:'$contactUserInfo.avatar',
                    about: '$contactUserInfo.about',
                    contactNo: '$contactUserInfo.contactNo'
                }
            }
        },
        {
            $project: {
                _id: 1,
                userId: 1,
                userContactInfo: 1
            }
        }
    ]);

    return res.status(200).json(new ApiResponse("200", contactInfo, "get all contact of user "));
})
export{
    adduserTOcontact,
    deleteUserForContact,
    getAllContact
}