import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: 4,
      maxLength: 20,
    },
    avatar: {
      type: String,
      trim: true,
      default:
        "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export { User, userSchema };
