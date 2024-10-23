import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../config/generateToken.js";

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide valid Email and Password.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("email not registered");
  }

  //verify password
  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Incorrect Password");
  }

  // return token
  res.status(200).json({
    success: true,
    user: {
      name: user.username,
      email: user.email,
      avatar: user.avatar,
    },
    token: generateToken({ email }),
  });
});

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, picture } = req.body;
  console.log(req.body);

  console.log("received picture on server-side: ", picture);

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
    avatar: picture,
  });
  await newUser.save();

  res.status(201).json({
    msg: "User created successfully",
    user: {
      name: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
    },
    token: generateToken({ name, email }),
  });
});

export { registerUser, loginUser };
