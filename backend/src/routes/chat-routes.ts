import { Router } from "express";
import { validator } from "../utils/validators.js";
import { chatCompletionValidator } from "../utils/zod-schema.js";
import { verifyToken } from "../utils/token-manager.js";
import { generateChatCompletion, getChatHistory } from "../controllers/chat-controllers.js";

const charRoutes = Router();

charRoutes.post("/new", validator(chatCompletionValidator), verifyToken, generateChatCompletion);
charRoutes.get("/history", verifyToken, getChatHistory);

export default charRoutes;