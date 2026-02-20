import { Response } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = async (userId: string, res: Response) => {
    try {
        const token = jwt.sign({ userId: userId }, ENV.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "strict",
            secure: ENV.NODE_ENV === "production"
        })

        return token;
    } catch (error: any) {
        console.error("Error occurred during signing jwt:", error.message || error);
        throw error;
    }
}

