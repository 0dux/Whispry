import { NextFunction, Request, Response } from "express";
import aj from "../configs/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const decision = await aj.protect(req);
    // console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Too Many Requests" }));
      } else if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "No bots allowed" }));
      } else {
        res.writeHead(403, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: "Forbidden" }));
      }
    } else if (decision.results.some(isSpoofedBot)) {
      res.writeHead(403, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Forbidden" }));
    } else {
      next();
    }
  } catch (error: any) {
    console.error("Arcjet protection error :: ", error);
    next();
  }
};
