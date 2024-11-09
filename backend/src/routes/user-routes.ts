import { Request, Response,NextFunction, Router } from "express";
import { getAllUsers, userLogin, userSignup } from "../controllers/user-controllers.js";
import validator from "../utils/validators.js";
import { userLoginSchema, userSignupSchema } from "../utils/zod-schema.js";

const userRouter = Router();

function dummyMiddleware(req: Request, res: Response, next:NextFunction) {
    console.log("I am in the dummy middleware");
    next();
}

userRouter.get("/", getAllUsers);
userRouter.post("/signup", dummyMiddleware, validator(userSignupSchema), userSignup);
userRouter.post("/login", validator(userLoginSchema), userLogin);

export default userRouter;