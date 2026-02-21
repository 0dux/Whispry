import type { Request, Response } from "express";
import cloudinary from "../configs/cloudinary.js";
import { prisma } from "../configs/prisma.js";
import { HttpStatusCode } from "../enums/http-status.enum.js";

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const { id: myId } = req.user!;
    const filteredUsers = await prisma.user.findMany({
      where: {
        id: { not: myId },
      },
      select: {
        id: true,
        name: true,
        profilePicture: true,
      },
    });

    return res.json({
      message: "Contacts found",
      contacts: filteredUsers,
    });
  } catch (error: any) {
    console.error("Error during fetching contacts ::", error.message || error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const getMessagesByUserId = async (req: Request, res: Response) => {
  try {
    const { id: myId } = req.user!;
    const receiverId = req.params.id as string;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: myId, receiverId: receiverId },
          {
            senderId: receiverId,
            receiverId: myId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.json({
      message: "Messages fetched successfully",
      messages,
    });
  } catch (error: any) {
    console.error("Error during fetching chat messages::", error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error",
    });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { id: myId } = req.user!;
    const { text, image } = req.body;
    const receiverId = req.params.id as string;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "Whispry",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await prisma.message.create({
      data: {
        text,
        image: imageUrl,
        senderId: myId,
        receiverId: receiverId,
      },
    });

    return res.json({
      message: "Message sent successfully",
      newMessage,
    });
    //to-do: send message to user in real time - using socket.io
  } catch (error: any) {
    console.error("Error during sending messages::", error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error",
    });
  }
};

export const getAllChats = async (req: Request, res: Response) => {
  try {

  } catch (error: any) {
    console.error("Error during sending messages::", error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error",
    });
  }
};
