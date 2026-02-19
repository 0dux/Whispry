import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = async (userId: string, res: Response) => {
    try {
        const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET as string, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "PRODUCTION" ? true : false
        })

        return token;
    } catch (error: any) {
        console.error("Error occured during signing jwt:", error.message || error);
        process.exit(1)
    }
}   