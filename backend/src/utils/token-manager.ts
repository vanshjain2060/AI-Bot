import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "./cookies-manager.js";
import { log } from "console";
export const createToken = (id: string, email: string, expiresIn: string) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn }); 
    // it's syntax is like that jwt.sign({payload object}, secret string, {other extras things in this object})
    return token;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    console.log("inside the verify token middleware");
    const token = req.signedCookies[COOKIE_NAME];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "token not recieved" });
    }
    return new Promise<void>((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
        if (err) {
            reject(err);
            return res.status(401).json({message: "token expired"})
        } else {
            console.log("token verification successful");
            resolve();
            console.log(success , "success");
            res.locals.jwtData = success;
            return next();
        }
        });
    });
}