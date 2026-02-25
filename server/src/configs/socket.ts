import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { ENV } from "../lib/env.js";
import socketAuth from "../middlewares/socket.middleware.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL],
    credentials: true,
  },
});

//socket connection authentication middleware
io.use(socketAuth);

const userSocketMap: Record<string, string> = {};

export const getReceiverSocketId = (userId: string) => {
  return userSocketMap[userId];
};

io.on("connection", (socket: Socket) => {
  console.log("A user connected::", socket.user?.name);

  const userId = socket.user?.id;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected::", socket.user?.name);
    if (userId) {
      delete userSocketMap[userId];
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
