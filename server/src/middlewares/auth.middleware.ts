import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../configs/prisma.js";
import { HttpStatusCode } from "../enums/http-status.enum.js";
import { ENV } from "../lib/env.js";
import { IUser } from "../types/types.js";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized - No token provided",
        success: false,
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
        profilePicture: true,
      },
    });

    if (!user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "User not found",
        success: false,
      });
    }
    req.user = user as IUser;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized - Token expired",
        success: false,
      });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized - Invalid token",
        success: false,
      });
    }
    console.error("Error auth middleware", error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export default protect;
