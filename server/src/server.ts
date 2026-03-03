import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";
import "dotenv/config";
import express, { type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { app, server } from "./configs/socket.js";
import { ENV } from "./lib/env.js";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";

const port = parseInt(ENV.PORT);
const isProduction = ENV.NODE_ENV === "production";

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

const options: CorsOptions = {
  origin: isProduction
    ? [ENV.CLIENT_URL]
    : ["http://localhost:3000", "http://localhost:8080"],
  credentials: true,
};
app.use(cors(options));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

if (isProduction) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const clientDistDir = path.join(__dirname, "../../client/.next/standalone");
  const clientStaticDir = path.join(__dirname, "../../client/.next/static");
  const clientPublicDir = path.join(__dirname, "../../client/public");

  app.use("/_next/static", express.static(clientStaticDir));

  app.use(express.static(clientPublicDir));

  const initNextHandler = async () => {
    try {
      const nextModule = await import("next");
      const createNextApp = nextModule.default as unknown as (
        opts: Record<string, unknown>,
      ) => { prepare: () => Promise<void>; getRequestHandler: () => Function };

      const nextApp = createNextApp({
        dev: false,
        dir: clientDistDir,
        conf: {
          distDir: ".next",
        },
      });

      await nextApp.prepare();
      const nextHandler = nextApp.getRequestHandler();

      app.all("/{*path}", (req: Request, res: Response) => {
        return nextHandler(req, res);
      });

      console.log("✅ Next.js handler initialized (production mode)");
    } catch (error) {
      console.error("❌ Failed to initialize Next.js handler:", error);

      app.get("/", (_req: Request, res: Response) => {
        res.json({ message: "Server is working, but client failed to load" });
      });
    }
  };

  initNextHandler();
} else {
  app.get("/", (_req: Request, res: Response) => {
    res.json({
      message: "Server is working",
    });
  });
}

server.listen(port, () => {
  console.log(
    `Server is listening on port :: ${port}\nhttp://localhost:${port}`,
  );
});
