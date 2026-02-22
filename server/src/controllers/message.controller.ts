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

    if (!receiverId) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Receiver ID is required",
      });
    }

    const MAX_LIMIT = 100;
    const parsedLimit = parseInt(req.query.limit as string, 10) || 50;
    const limit = Math.min(Math.max(1, parsedLimit), MAX_LIMIT);
    const cursor = req.query.cursor as string | undefined;
    
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
      take: limit,
      ...(cursor && { cursor: { id: cursor }, skip: 1 }),
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
// Allowed image MIME types and max size (~5MB in base64 chars)
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_IMAGE_BASE64_LENGTH = 5 * 1024 * 1024 * (4 / 3); // ~6.67M chars

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { id: myId } = req.user!;
    const { text, image } = req.body;
    const receiverId = req.params.id as string;

    // 1. At least one of text or image must be present
    const hasText = typeof text === "string" && text.trim().length > 0;
    const hasImage = typeof image === "string" && image.length > 0;
    if (!hasText && !hasImage) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Message must contain text or an image",
      });
    }

    // 2. Verify receiver exists
    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });
    if (!receiver) {
      return res.status(HttpStatusCode.NOT_FOUND).json({
        message: "Receiver not found",
      });
    }

    // 3. Validate image before uploading
    let imageUrl: string | undefined;
    if (hasImage) {
      // base64 data URIs look like: "data:image/png;base64,iVBORw..."
      const mimeMatch = image.match(
        /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9+.-]+);base64,/,
      );
      const mimeType = mimeMatch?.[1];

      if (!mimeType || !ALLOWED_IMAGE_TYPES.includes(mimeType)) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          message: `Invalid image type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
        });
      }

      if (image.length > MAX_IMAGE_BASE64_LENGTH) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          message: "Image exceeds the 5MB size limit",
        });
      }

      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "Whispry",
        allowed_formats: ["jpg", "png", "webp", "gif"],
      });
      imageUrl = uploadResponse.secure_url;
    }

    // 4. All checks passed — create the message
    const newMessage = await prisma.message.create({
      data: {
        text: hasText ? text.trim() : undefined,
        image: imageUrl,
        senderId: myId,
        receiverId,
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
    const { id: myId } = req.user!;
    const receiverId = req.params.id as string;
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: myId,
          },
          {
            receiverId: myId,
          },
        ],
      },
    });

    const chatPartnersIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId === myId ? msg.receiverId : msg.senderId,
        ),
      ),
    ];
    const chatPartners = await prisma.user.findMany({
      where: {
        id: { in: chatPartnersIds },
      },
      select: {
        id: true,
        name: true,
        profilePicture: true,
      },
    });

    return res.json({
      message: "Chat partners fetched successfully",
      chatPartners,
    });
  } catch (error: any) {
    console.error("Error during fetching chats::", error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server error",
    });
  }
};
