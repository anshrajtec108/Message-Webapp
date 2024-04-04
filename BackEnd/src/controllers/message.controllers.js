import { Message } from "../models/message.model.js";
import { ApiError } from "../utils/ApiError.js";


const createMessage = async (content) => {
    try {
        if (!content) {
            throw new ApiError(400, "The content is required for creating a message document");
        }

        const message = await Message.create({ content });

        if (message.length === 0) {
            throw new ApiError(500, "Failed to create the message document");
        }

        return message._id;
    } catch (error) {
        console.error('Error creating message:', error);
        throw new ApiError(500, "Internal server error");
    }
};

const deleteMessage = async (messageId) => {
    try {
        if (!messageId) {
            throw new ApiError(400, "The messageID is empty in deleteMessage function");
        }
        await Message.findByIdAndDelete(messageId);

        return "The message has been deleted";
        
    } catch (error) {
        console.error('Error deleting message:', error);
        throw new ApiError(500, "Internal server error");
    }
}


export{
    createMessage,
    deleteMessage,
}