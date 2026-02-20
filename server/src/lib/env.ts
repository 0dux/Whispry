import "dotenv/config";

const requiredEnv = [
  "PORT",
  "SALT_ROUNDS",
  "DATABASE_URL",
  "NODE_ENV",
  "JWT_SECRET",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "EMAIL_FROM_NAME",
  "CLIENT_URL",
  "CLOUDINARY_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missing.join(", ")}`,
  );
}

export const ENV = {
  PORT: process.env.PORT!,
  SALT_ROUNDS: process.env.SALT_ROUNDS!,
  DATABASE_URL: process.env.DATABASE_URL!,
  NODE_ENV: process.env.NODE_ENV!,
  JWT_SECRET: process.env.JWT_SECRET!,
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  EMAIL_FROM: process.env.EMAIL_FROM!,
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME!,
  CLIENT_URL: process.env.CLIENT_URL!,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME!,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,
};
