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

//configure cors
const options: CorsOptions = {
  origin: isProduction
    ? [ENV.CLIENT_URL]
    : ["http://localhost:3000", "http://localhost:8080"],
  credentials: true,
};
app.use(cors(options));

// API routes
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

// --- Serve Next.js client in production ---
if (isProduction) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Path to the standalone Next.js build output
  // From server/dist/server.js → ../../client/.next/standalone/client
  const clientDistDir = path.join(
    __dirname,
    "../../client/.next/standalone/client",
  );
  const clientStaticDir = path.join(__dirname, "../../client/.next/static");
  const clientPublicDir = path.join(__dirname, "../../client/public");

  // Serve Next.js static chunks (_next/static)
  app.use("/_next/static", express.static(clientStaticDir));

  // Serve files from the public folder
  app.use(express.static(clientPublicDir));

  const initNextHandler = async () => {
    try {
      // Use Next.js programmatic API
      // The default export of "next" is callable at runtime but its types
      // declare it as a namespace, so we cast it to a function.
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

      // Catch-all: serve Next.js pages for anything that isn't an API route
      app.all("/{*path}", (req: Request, res: Response) => {
        return nextHandler(req, res);
      });

      console.log("✅ Next.js handler initialized (production mode)");
    } catch (error) {
      console.error("❌ Failed to initialize Next.js handler:", error);

      // Fallback: serve a simple message if Next.js fails to load
      app.get("/", (_req: Request, res: Response) => {
        res.json({ message: "Server is working, but client failed to load" });
      });
    }
  };

  initNextHandler();
} else {
  // Dev mode: simple health check endpoint
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
