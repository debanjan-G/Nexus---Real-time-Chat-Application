import express from "express";
import { chats } from "./data/chats.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Nexus API" });
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chats/:chatID", (req, res) => {
  const { chatID } = req.params;
  const requiredChat = chats.filter((chat) => chat._id === chatID);

  res.send(requiredChat);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
