import expressAsyncHandler from "express-async-handler";
import Message from "../models/messageModel.js";
import Chat from "../models/chatModel.js";

const getAllMessages = expressAsyncHandler(async (req, res) => {
  const { chatID } = req.params;

  if (!chatID) {
    return res
      .status(400)
      .json({ success: false, message: "chatID not provided!" });
  }

  const messages = await Message.find({ chat: chatID })
    .populate("sender", "-password")
    .populate({
      path: "chat", // Populate the 'chat' field in 'Message'
      populate: {
        path: "users", // Populate the 'users' array inside 'chat'
        select: "-password", // Optionally, exclude sensitive fields like 'password'
      },
    });

  if (!messages) {
    return res
      .status(400)
      .json({ success: false, message: "No messages found!" });
  }

  res
    .status(200)
    .json({ success: true, messageCount: messages.length, messages });
});

// Controller to send a message
const sendMessage = expressAsyncHandler(async (req, res) => {
  console.log("request body = ", req.body);
  const { message, chatID } = req.body;
  const senderID = req.user._id;

  if (!message || !chatID) {
    res
      .status(400)
      .json({ success: false, message: "All required fields not provided" });
  }

  const newMessage = new Message({
    sender: senderID,
    content: message,
    chat: chatID,
  });

  const savedMessage = await newMessage.save();

  // Populate fields after saving using a separate query
  const populatedMessage = await Message.findById(savedMessage._id)
    .populate("sender", "-password")
    .populate({
      path: "chat",
      populate: {
        path: "users", // Populate the 'users' field inside the 'chat'
        select: "-password", // Exclude password field from populated users
      },
    });

  //update latestMessage of Chat model by this message
  const updatedChat = await Chat.findByIdAndUpdate(chatID, {
    latestMessage: savedMessage._id,
  });

  res.status(201).json({ success: true, populatedMessage, updatedChat });
});

export { getAllMessages, sendMessage };
