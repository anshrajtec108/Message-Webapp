import express from 'express';
import { saveSinglechatMessage, getSingleChatMessage, deleteSingleChatMessage, userSingleOnline } from '../controllers/singleChat.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.use(verifyJWT)
router.post('/save', saveSinglechatMessage);

router.post('/get', getSingleChatMessage);

router.delete('/delete', deleteSingleChatMessage);

router.post('/single/Status',userSingleOnline)

export default router;
