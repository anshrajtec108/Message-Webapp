import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { adduserTOcontact, deleteUserForContact } from "../controllers/contact.controllers.js";


const router = Router()
router.use(verifyJWT)

router.route("/save").post(adduserTOcontact)
router.route('/delete').delete(deleteUserForContact)
export default router