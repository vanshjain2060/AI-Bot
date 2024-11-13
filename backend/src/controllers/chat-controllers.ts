import { Request, Response, NextFunction } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/User.js"; // Adjust the path if necessary

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const {  message } = req.body;
    try {
        // Find the user by ID and retrieve their chat history
        const user = await User.findById(res.locals.jwtData.id);

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Prepare the context using the last 10 messages for brevity
        const chatContext = user.chats
            .slice(-10)
            .map(chat => `${chat.role}: ${chat.content}`)
            .join('\n');
        const fullPrompt = `${chatContext}\nuser: ${message}\nassistant:`;

        // Initialize Google Generative AI client
        const genAI = new GoogleGenerativeAI(process.env.OPEN_AI_SECRET);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate response using the chat history and current message
        const result = await model.generateContent(fullPrompt);
        const botReply = result.response.text();

        // Update user's chat history
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "bot", content: botReply });
        await user.save();

        return res.status(200).json({ chats: user.chats });
        // return res.status(200).json({ reply: botReply });
    } catch (error) {
        console.error("Error generating chat completion:", error);
        return res.status(500).json({ error: "Failed to generate response" });
    }
};
