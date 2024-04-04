import { Router } from "express"
import { addUserToGroup, createGroup, removeUserFromGroup, userExitFromGroup } from "../controllers/group.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()
router.use(verifyJWT)
router.route("/create/Group").post(upload.single("groupAvatar"), createGroup)
router.route("/add/user").put(addUserToGroup)
router.route("remove/user").put(removeUserFromGroup)
router.route("/exit/user").put(userExitFromGroup)

export default router;