import express from 'express';
import { saveSinglechatMessage, getSingleChatMessage, deleteSingleChatMessage } from '../controllers/singleChat.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';


const router = express.Router();

router.use(verifyJWT)
router.post('/save', saveSinglechatMessage);

router.post('/get', getSingleChatMessage);

router.delete('/delete', deleteSingleChatMessage);

export default router;
