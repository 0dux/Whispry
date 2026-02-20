// Require the cloudinary library
import { v2 as cloudinary } from "cloudinary";
import { ENV } from "../lib/env.js";

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
