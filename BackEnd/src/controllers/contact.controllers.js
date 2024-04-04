import { Contact } from "../models/contact.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const adduserTOcontact = asyncHandler(async (req, res) => {
    const { userContactNo } = req.body;

    const users = await User.findOne({ contactNo: userContactNo });
    if (users.length === 0) {
        throw new ApiError(500, "User doesn't exist");
    }
    const user = users[0];

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
