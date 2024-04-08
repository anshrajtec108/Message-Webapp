import mongoose, { Schema } from "mongoose";


const userSUB_Schema = new Schema({
    userName: {
        type: String,
    },
    userContactId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { _id: false }); // Exclude _id from userSchema



const contactSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    userList: [userSUB_Schema] // Apply the userSchema as the sub-schema for userList
});

export const Contact = mongoose.model("Contact", contactSchema);
