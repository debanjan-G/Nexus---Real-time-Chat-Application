import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateToken from "../config/generateToken.js";

const loginUser = () => {};

const registerUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);

  const { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    throw new Error("Please provide all fields!");
  }

  const user = await User.findOne({ email });

  if (user) {
    throw new Error("User with given email already exists!");
  }

  //before saving password to DB, hash it
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: name,
    email,
    password: hashedPassword,
    picture,
  });
  await newUser.save();

  res.status(201).json({
    msg: "User created successfully",
    newUser,
    token: generateToken({ name, email }),
  });
});

export { registerUser, loginUser };
