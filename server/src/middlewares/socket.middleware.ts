import jwt from "jsonwebtoken";
import { Socket } from "socket.io";
import { prisma } from "../configs/prisma.js";
import { ENV } from "../lib/env.js";

const socketAuth = async (socket: Socket, next: (err?: any) => void) => {
  try {
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("Socket connection rejected: No token provided");
      return next(new Error("Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { userId: string };
    if (!decoded) {
      console.log("Socket connection rejected: Invalid token");
      return next(new Error("Unauthorized - token invalid"));
    }
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        profilePicture: true,
      },
    });

    if (!user) {
      console.log("Socket connection rejected: User not found");
      return next(new Error("Unauthorized - user not found"));
    }
    socket.user = user;

    console.log(`Socket authenticated for user: ${user.name} (${user.id})`);

    next();
  } catch (error: any) {
    console.error("Error in socket authentication:: ", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};

export default socketAuth;
