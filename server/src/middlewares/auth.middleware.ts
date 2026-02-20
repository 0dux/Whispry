import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatusCode } from "../enums/http-status.enum.js";
import { ENV } from "../lib/env.js";
import { prisma } from "../configs/prisma.js";

interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  profilePicture: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET) as { userId: string };

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "User not found",
      });
    }
    req.user = user as IUser;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized - Token expired",
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized - Invalid token",
      });
    }
    console.error("Error auth middleware", error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export default protect;
