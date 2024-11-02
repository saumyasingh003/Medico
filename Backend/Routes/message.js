import express from "express";
import { CatchAsyncError } from "../Middlewares/CatchAsyncErrors.js";
import { sendMessage, viewMessage } from "../Controllers/message.js";





const router = express.Router();
router.post("/send", CatchAsyncError(sendMessage));
router.get("/view", CatchAsyncError(viewMessage));

export default router;
