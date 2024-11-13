import { Request, Response,NextFunction, Router } from "express";
import { getAllUsers, userLogin, userSignup, verfiyUser } from "../controllers/user-controllers.js";
import { validator } from "../utils/validators.js";
import { userLoginSchema, userSignupSchema } from "../utils/zod-schema.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

function dummyMiddleware(req: Request, res: Response, next:NextFunction) {
    console.log("I am in the dummy middleware");
    next();
}

userRouter.get("/", getAllUsers);
userRouter.post("/signup", dummyMiddleware, validator(userSignupSchema), userSignup);
userRouter.post("/login", validator(userLoginSchema), userLogin);
userRouter.get("/auth-status", verifyToken, verfiyUser);

export default userRouter;