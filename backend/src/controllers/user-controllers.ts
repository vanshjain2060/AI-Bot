import {Request, Response, NextFunction } from "express"; // in typescript we have to define the type to remove the warnings
import { User } from "../models/User.js";
import { hash, compare } from "bcrypt";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    console.log("inside the get all users controller");
    
    try {
        // get all users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(200).json(({message: "ERROR", cause:error.message}))
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    console.log("inside the user signup controller");
    try {
        // user body
        const { name, email, password } = req.body;

        // checking is the user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(401).json({ message: "User already registered" });

        // Creating new user and saving it to the database
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword }); 
        await user.save();

        return res.status(201).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(500).json(({message: "ERROR", cause:error.message}))
    }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    console.log("inside the user login controller");
    try {
        // user body
        const { email, password } = req.body;

        // finding the user
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "No registered user found on this email" });

        // verifying the user's password
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) return res.status(403).json({ message: "Incorrect Password" });

        return res.status(201).json({ message: "OK", id: user._id.toString() });

    } catch (error) {
        console.log(error);
        return res.status(500).json(({ message: "ERROR", cause: error.message }))
    }
}