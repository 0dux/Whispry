import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import "dotenv/config";
import express from "express";
import { app, server } from "./configs/socket.js";
import { ENV } from "./lib/env.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const port = parseInt(ENV.PORT);
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

//configure cors
const options: CorsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080"],
  credentials: true,
};
app.use(cors(options));

app.get("/", (req, res) => {
  res.json({
    message: "Server is working",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

server.listen(port, () => {
  console.log(
    `Server is listening on port :: ${port}\nhttp://localhost:${port}`,
  );
});
