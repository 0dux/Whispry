import bcrypt from "bcrypt";
import "dotenv/config";
import type { Request, Response } from "express";
import zod from "zod";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { HttpStatusCode } from "../enums/http-status.enum.js";
import { ENV } from "../lib/env.js";
import { prisma } from "../configs/prisma.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../configs/cloudinary.js";

//Register new user----------------------------------------------------
const registerUserSchema = zod.object({
  name: zod.string().trim().min(1),
  email: zod.email().trim(),
  password: zod.string().trim().min(8).max(72),
});
export const registerUser = async (req: Request, res: Response) => {
  try {
    const result = registerUserSchema.safeParse(req.body);
    if (!result.success) {
      console.error("Zod error :::", result.error.message);

      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Invalid inputs passed",
      });
    }

    const { name, email, password } = result.data;

    //check if the email is already in use
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (user) {
      return res.status(HttpStatusCode.CONFLICT).json({
        message: "User with this email already exists",
      });
    }

    //hash the password
    const hash = await bcrypt.hash(password, parseInt(ENV.SALT_ROUNDS));

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
      },
    });

    if (!newUser) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        message: "User creation failed.",
      });
    }

    generateToken(newUser.id, res);
    res.status(HttpStatusCode.CREATED).json({
      message: "User created successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        pfp: newUser.profilePicture,
      },
    });
    sendWelcomeEmail(newUser.name, newUser.email, ENV.CLIENT_URL).catch(
      (error) => {
        console.error("Failed to send welcome email:", error);
      },
    );
  } catch (error: any) {
    console.error("Error during signing up ::", error?.message || error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

//Login user-----------------------------------------------------------
const loginUserSchema = zod.object({
  email: zod.email().trim(),
  password: zod.string().trim().min(8).max(72),
});
export const logInUser = async (req: Request, res: Response) => {
  try {
    const result = loginUserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Invalid inputs passed",
      });
    }

    const { email, password } = result.data;

    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userFound) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Invalid credentials passed",
      });
    }

    if (!userFound.password) {
      return res.status(HttpStatusCode.CONFLICT).json({
        message:
          "This account uses social authentication. Please log in with your social provider.",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.password,
    );

    if (!isPasswordCorrect) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Invalid credentials passed",
      });
    }
    generateToken(userFound.id, res);
    return res.json({
      message: "Logged-in successfully",
      user: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        pfp: userFound.profilePicture,
      },
    });
  } catch (error: any) {
    console.error("Some error has occured during login controller::", error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

//Logout user----------------------------------------------------------
export const logOutUser = async (req: Request, res: Response) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.json({
    message: "Logged-out successfully",
  });
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { profilePicture } = req.body;
    if (!profilePicture) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Profile Picture is required",
      });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture, {
      folder: "Whispry",
    });
    const { user } = req;
    if (!user) {
      return res.status(HttpStatusCode.UNAUTHORIZED).json({
        message: "Unauthorized - user failed protect authentication",
      });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        profilePicture: uploadResponse.secure_url,
      },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
      },
    });

    return res.json({
      message: "Profile picture updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Error updating profile ::", error?.message || error);
    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
    });
  }
};

export const verifyUser = (req: Request, res: Response) => {
  const { user } = req;
  res.json({
    message: "User verified",
    user,
  });
};
