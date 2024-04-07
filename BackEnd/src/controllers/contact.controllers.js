import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const adduserTOcontact = asyncHandler(async (req, res) => {
    const { userContactNo } = req.body;

    const user = await User.findOne({ contactNo: userContactNo });
    if (!user) {
        throw new ApiError(500, "User doesn't exist");
    }

    let contact = await Contact.findOne({ userId: req.user?._id });

    if (!contact) {
        contact = await Contact.create({
            userId: req.user?._id,
            userList: [user._id] 
        });
        return res.status(200).json(new ApiResponse("200", contact, "Your contact is created and the user is added"));
    } else {
        const updatedContact = await Contact.findByIdAndUpdate(
            contact._id,
            { $addToSet: { userList: user._id } },
            { new: true }
        );
        return res.status(200).json(new ApiResponse("200", updatedContact, "User added to contact"));
    }
});

const deleteUserForContact = asyncHandler(async (req, res) => {
    const { userContactNo }=req.body
    const contact = await Contact.findOne({ userId: req.user?._id });

    if (!contact) {
        throw new ApiError(404, "Contact not found for the current user");
    }

    const contactToDelete = await User.findOne({ contactNo: userContactNo });
    if (!contactToDelete) {
        throw new ApiError(404, "User not found in contact list");
    }

    // Remove the userContactNo ObjectId from the userList array
    contact.userList.pull(contactToDelete._id);
    await contact.save();


    // Respond with success message or updated contact details
    res.status(200).json({ message: "User removed from contact list", contact });

})

const getAllContact = asyncHandler(async(req,res)=>{
    
})
export{
    adduserTOcontact,
    deleteUserForContact
}