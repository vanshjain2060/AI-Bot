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
console.log(fullPrompt);

        // Initialize Google Generative AI client
        const genAI = new GoogleGenerativeAI(process.env.OPEN_AI_SECRET);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Generate response using the chat history and current message
        const result = await model.generateContent(fullPrompt);
        const botReply = result.response.text();
console.log(botReply);
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


export const getChatHistory = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ chats: user.chats }); // Send previous chats
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
};

export const deleteChat = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //ts-ignore
        user.chats = [] as any;
        await user.save();

        res.status(200).json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.error('Error deleting chat history:', error);
        res.status(500).json({ error: 'Failed to delete chat history' });
    }
};
