import mongoose from "mongoose";

//senderID
//messageContent
//chatID

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: [true, "Please enter a message to be sent"],
      trim: true,
      maxLength: [1000, "Message cannot exceed 1000 characters"],
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
