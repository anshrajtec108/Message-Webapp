import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { endSession, entrySession } from '../controllers/session.controller.js';


const router = express.Router();

router.use(verifyJWT)

router.post('/entrysession',entrySession)
router.delete('/endsession', endSession)

export default router