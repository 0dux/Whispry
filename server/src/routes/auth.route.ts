import { Router } from "express";
import {
  logInUser,
  logOutUser,
  registerUser,
  updateProfile,
  verifyUser,
} from "../controllers/auth.controller.js";
import protect from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcjet.middleware.js";

const authRouter = Router();

authRouter.use(arcjetProtection);
authRouter.post("/register", registerUser);
authRouter.post("/login", logInUser);
authRouter.post("/logout", logOutUser);
authRouter.put("/update-profile", protect, updateProfile);
authRouter.get("/verify", protect, verifyUser);

export default authRouter;
