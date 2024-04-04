import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser,
         logoutUser,
         registerUser
    } from "../controllers/user.controller.js";


const router = Router()
router.route("/register").post(upload.single("avatar") ,registerUser)
router.route("/login").post(loginUser)

//secured router
router.route("/logout").post(verifyJWT,logoutUser)

export default router