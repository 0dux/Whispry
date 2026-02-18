import type { Request, Response } from "express";

export const sendMessage = async (req: Request, res: Response) => {
    res.send("Send message working")
}