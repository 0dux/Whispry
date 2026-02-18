import type { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
    res.json({
        message: "Sign-up route"
    })
}

export const logInUser = async (req: Request, res: Response) => {
    res.json({
        message: "Log-in route"
    })
}

export const logOutUser = async (req: Request, res: Response) => {
    res.json({
        message: "Log-out route"
    })
}