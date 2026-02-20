import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.js";
import { ENV } from "./env.js";

const connectionString = ENV.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

