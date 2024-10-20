import mongoose from "mongoose";
import { userSchema } from "./userModel";

const chatSchema = new mongoose.Schema({
  isGroupChat: Boolean,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  chatName: {
    type: String,
    trim: true,
    required: [true, "Please provide a chat name"],
  },
  latestMessage: {
    type:mongoose.Schema.Types.ObjectId;
    ref:"Message",
  },
  groupAdmin: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  
},{
    timestamps:true
});

const Chats = new mongoose.model("chat", chatSchema);

export { chatSchema, Chats };
