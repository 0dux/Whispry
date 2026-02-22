import { Router } from "express";
import {
  getAllChats,
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import protect from "../middlewares/auth.middleware.js";

const messageRouter = Router();

messageRouter.get("/contacts", protect, getAllContacts);
messageRouter.post("/send/:id", protect, sendMessage);
messageRouter.get("/chats", protect, getAllChats);
messageRouter.get("/:id", protect, getMessagesByUserId);

export default messageRouter;
