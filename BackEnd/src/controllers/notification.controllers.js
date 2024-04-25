import mongoose  from "mongoose"
import { Relay } from "../models/relay.model.js"
import { ApiError } from "../utils/ApiError.js"


const getSingleMessageNotification=async(userId)=>{
try {
        if(!userId){
            throw new ApiError(500,"userId not define in  getSingleMessageNotification")
        }
        const getdata=await Relay.aggregate([
            {
                $match:{
                    sendTo: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup:{
                    from:'chats',
                    localField:"chatId",
                    foreignField:"_id",
                    as:'chats',
                    pipeline:[
                        {
                            $lookup:{
                                from:'messages',
                                localField: 'messageId',
                                foreignField:'_id',
                                as:"messagesdetail",
                                pipeline:[
                                    {
                                        $project:{
                                            _id:1,
                                            content:1,
                                            updatedAt:1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $project:{
                                _id:1,
                                sendBy:1,
                                status:1,
                                messagesdetail:1
                            }
                        }
                    ]
                }
            },
            
            {
                $project:{
                    chats:1
                }
            },
            {
                $unwind: "$chats" // Unwind to access individual chat documents
            },
            {
                $lookup: {
                    from: 'users',
                    localField: "chats.sendBy",
                    foreignField: '_id',
                    as: 'sendByUserDetail',
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                about:1,
                                avatar: 1,
                                contactNo: 1
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: "$chats.sendBy",
                    sendByUserDetail: { $addToSet: "$sendByUserDetail" }, // Use $addToSet to accumulate sendByUserDetail
                    relayId: { $push: "$_id" },
                    chats: { $push: "$chats" }
                }
            }


        ])
        if(!getdata){
           return "there no data update"
        }
        return getdata
} catch (error) {
    throw new ApiError(500, `something want wrong  while getting single chart message notification ${error}`)
}
}

const deleteNotificationSeen=async(relayIdArr)=>{
    // const objectIdArray = idsArray.map(id => mongoose.Types.ObjectId(id));
  try {
      if(relayIdArr > 1 ){
          const idArr = relayIdArr.map(id => mongoose.Types.ObjectId(id));
  
          const deleteResult = await Relay.deleteMany({ _id: { $in: idArr } });
          return deleteResult;
  
      }else{
            const deleteResult=await Relay.findByIdAndDelete(relayIdArr)
          return deleteResult;
      }
  } catch (error) {
      throw new ApiError(500, `something want wrong  while deleting single chart message notification ${error}`)

  }
}
export { 
    getSingleMessageNotification,
    deleteNotificationSeen,//tesing is pending

}