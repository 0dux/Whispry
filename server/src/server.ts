import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import "dotenv/config";
import express from "express";
import { ENV } from "./lib/env.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
const app = express();

const port = parseInt(ENV.PORT);
app.use(express.json());
app.use(cookieParser());

//configure cors
const options: CorsOptions = {};
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Server is working",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(port, () => {
  console.log(
    `Server is listening on port :: ${port}\nhttp://localhost:${port}`,
  );
});
