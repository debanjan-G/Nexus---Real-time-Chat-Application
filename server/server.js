import express from "express";
import { chats } from "./data/chats.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import messageRoutes from "./routes/messageRoutes.js";
import http from "http";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Nexus API" });
});

// app.get("/api/chats", (req, res) => {
//   res.send(chats);
// });

// app.get("/api/chats/:chatID", (req, res) => {
//   const { chatID } = req.params;
//   const requiredChat = chats.filter((chat) => chat._id === chatID);

//   res.send(requiredChat);
// });

app.use(errorHandler); //error-handling middleware

import { Server } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

const PORT = process.env.PORT || 8080;
io.on("connection", (socket) => {
  console.log(`Client with ID ${socket.id} connected.`);

  socket.on("join-room", (roomID) => {
    socket.join(roomID);
    console.log(`Client with ID ${socket.id} joined room ${roomID}`);

    socket.on("send-message", (msg) => {
      socket.to(roomID).emit("new-message", msg);
    });
  });

  socket.on("disconnect", () => {
    console.log(`Client with ID ${socket.id} disconnected.`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
