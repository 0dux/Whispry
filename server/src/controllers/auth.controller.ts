import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import zod from "zod";
import { HttpStatusCode } from "../enums/http-status.enum.js";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../lib/utils.js";

const registerUserSchema = zod.object({
    name: zod.string().trim().min(1),
    email: zod.email().trim(),
    password: zod.string().trim().min(8).max(72),
})
type TRegisterUser = zod.infer<typeof registerUserSchema>;




export const registerUser = async (req: Request, res: Response) => {
    try {
        const result = registerUserSchema.safeParse(req.body);
        if (!result.success) {
            console.error("Zod error :::", result.error.message);

            return res.status(HttpStatusCode.BAD_REQUEST).json({
                message: "Invalid inputs passed"
            })
        }

        const { name, email, password } = result.data;

        //check if the email is already in use
        const user = await prisma.user.findFirst({
            where: { email }
        })
        if (user) {
            return res.status(HttpStatusCode.CONFLICT).json({
                message: "User with this email already exists"
            })
        }

        //hash the password
        const saltRounds = parseInt(process.env.SALT_ROUNDS ?? "10", 10)
        if (isNaN(saltRounds) || saltRounds < 1) {
            throw new Error("Invalid SALT_ROUND configuration");
        }
        const hash = await bcrypt.hash(password, saltRounds)

        const newUser = await prisma.user.create({
            data: {
                name, email, password: hash
            },
            select: {
                id: true,
                name: true,
                email: true,
                profilePicture: true,
            }
        })

        if (!newUser) {
            return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
                message: "User creation failed."
            })
        }

        generateToken(newUser.id, res)
        return res.status(HttpStatusCode.CREATED).json({
            message: "User created successfully.",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                pfp: newUser.profilePicture,
            }
        })
    } catch (error: any) {
        console.error("Error during signing up ::", error?.message || error);
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
            message: "Internal server error"
        })
    }
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