import { z } from "zod";

export const userSignupSchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email format").trim(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const chatCompletionValidator = z.object({
    message: z.string().min(1, "Message is required").trim(),
});
