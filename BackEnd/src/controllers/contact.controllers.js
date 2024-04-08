import mongoose  from "mongoose";
import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const adduserTOcontact = asyncHandler(async (req, res) => {
    const { name,userContactNo } = req.body;

    const user = await User.findOne({ contactNo: userContactNo });
    if (!user) {
        throw new ApiError(500, "User doesn't exist");
    }
    if(!name){
        name = user.name
    }

    let contact = await Contact.findOne({ userId: req.user?._id });

    if (!contact) {
        if (name && user) {  // Check if name and user are defined
            contact = await Contact.create({
                userId: req.user?._id,
                userList: [{
                    userName: name,
                    userContactId: user._id
                }]
            });
            return res.status(200).json(new ApiResponse("200", contact, "Your contact is created and the user is added"));
        } else {
            return res.status(400).json(new ApiResponse("400", null, "Name and user are required"));
        }
    } else {
        const updatedContact = await Contact.findByIdAndUpdate(
            contact._id,
            {
                $addToSet: {
                    userList: {
                        userName: name || null,
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
                    userName: { $arrayElemAt: ['$userList.userName', 0] }, // Get the first userName value from the array
                    email: '$contactUserInfo.email',
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