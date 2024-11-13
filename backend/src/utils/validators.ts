import { Request, Response, NextFunction } from "express";
import { z, ZodSchema } from "zod";

// Reusable validator function
export const validator = (schema: ZodSchema) => {
    console.log("inside the validator function");
    
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body); // Validate request body with provided schema
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json(error.errors); // Send validation errors
            }
        }
    };
};


