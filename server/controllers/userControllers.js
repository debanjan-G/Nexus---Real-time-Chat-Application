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
    token: generateToken({ id: user._id, email }),
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
    token: generateToken({ id: newUser._id, name, email }),
  });
});

// /api/user?search=Debanjan
// controller to get all users (except the connected client's account)
const getUser = expressAsyncHandler(async (req, res) => {
  // Construct the search keyword based on the query parameter
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // This query will select all documents in the collection where either the username field or the email field matches the query parameter.

  // Find users based on the keyword and exclude the current user
  const searchedUsers = await User.find({ ...keyword }).find({
    _id: {
      $ne: req.user._id,
    },
  });

  // Check if no users are found
  if (!searchedUsers.length) {
    return res.status(404).json({ success: false, msg: "No users found" });
  }

  // Return the found users
  res.status(200).json({
    success: true,
    userCount: searchedUsers.length,
    users: searchedUsers,
  });
});

export { registerUser, loginUser, getUser };
