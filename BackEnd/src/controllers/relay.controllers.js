import { Relay } from "../models/relay.model.js"
import { ApiError } from "../utils/ApiError.js"



const createSingelMessageRelay = async (chatId, sendTo)=>{
    try {
        if (!chatId){
            throw new ApiError(500,"the chatId not define in createSingelMessageRelay ")
        }
        const createRelay = await Relay.create({
            sendTo,
            chatId
        })
        if(!createRelay){
            throw new ApiError(500,"something want wrong  while create single chart relay message ")
        }
        return "the relay is create because the use is offline"
    } catch (error) {
        throw new ApiError(500, "something want wrong  while create single chart relay message")
    }
}


const createGrouplMessageRelay=async (userList,messageId)=>{
    try {
        if(userList.lenght===0){
            throw new ApiError(500,"the userList is empty from createGrouplMessageRelay ")
        }
        const createGroupRelay= await Relay.create({
            groupUserId:[...userList],
            messageId: messageId
        })
        if (!createGroupRelay) {
            throw new ApiError(500, "something want wrong  while create Group chart relay message ")
        }
        return "the relay is create because the users are offline"
    } catch (error) {
        throw new ApiError(500, "something want wrong  while create Group chart relay message")

    }
}
export {
    createSingelMessageRelay,
    createGrouplMessageRelay,
}