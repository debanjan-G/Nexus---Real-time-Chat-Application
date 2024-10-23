import expressAsyncHandler from "express-async-handler";
import Chat from "../models/chatModel.js";
import User from "../models/userModel.js";

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  //    userId represents the ID of the user you want to chat with.

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false, // we are looking for only 1-to-1 chats
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } }, // the current user(client)
      { users: { $elemMatch: { $eq: userId } } }, // the user with which client wanna talk
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).json(FullChat);
  }
});

const fetchChats = expressAsyncHandler(async (req, res) => {
  const userID = req.user._id;

  if (!userID) {
    res.status(400);
    throw new Error("Invalid user ID provided!");
  }

  const chats = await Chat.find({ users: userID })
    .populate("users", "-password")
    .populate("latestMessage")
    .populate("groupAdmin", "-password")
    .sort({ updatedAt: -1 }); // sorting in desc order of updatedAt ( From Latest to Oldest)

  if (chats.length > 0) {
    res.status(200).json({ success: true, chatCount: chats.length, chats });
  } else {
    res.status(200).json({ success: true, message: "User has no chats" });
  }
});

export { accessChat, fetchChats };
