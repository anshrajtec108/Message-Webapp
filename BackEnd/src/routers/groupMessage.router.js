import { Router } from "express";
import { deleteGroupChatMessage, getGroupChatMessage, saveGroupchatMessage } from "../controllers/groupChat.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router= Router()
router.use(verifyJWT)

router.route("/save").post(saveGroupchatMessage)
router.route("/get").post(getGroupChatMessage)
router.route("/delete").delete(deleteGroupChatMessage)

export default router