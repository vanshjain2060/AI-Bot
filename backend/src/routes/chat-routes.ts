import { Router } from "express";
import { validator } from "../utils/validators.js";
import { chatCompletionValidator } from "../utils/zod-schema.js";
import { verifyToken } from "../utils/token-manager.js";
import { deleteChat, generateChatCompletion, getChatHistory } from "../controllers/chat-controllers.js";

const charRoutes = Router();

charRoutes.post("/new", validator(chatCompletionValidator), verifyToken, generateChatCompletion);
charRoutes.get("/history", verifyToken, getChatHistory);
charRoutes.delete("/delete", verifyToken, deleteChat);

export default charRoutes;