import { Router } from "express";
import { logInUser, logOutUser, registerUser, updateProfile } from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", logInUser);
authRouter.post("/logout", logOutUser);
authRouter.put("/update-profile", protect, updateProfile);

export default authRouter;