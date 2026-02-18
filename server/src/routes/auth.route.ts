import { Router } from "express";
import { logInUser, logOutUser, registerUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logInUser);
authRouter.post("/logout", logOutUser);

export default authRouter;