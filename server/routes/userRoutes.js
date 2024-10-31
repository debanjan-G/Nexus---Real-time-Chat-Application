import express from "express";
import {
  getUser,
  registerUser,
  loginUser,
  getUserInfoById,
} from "../controllers/userControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/").get(protect, getUser);
router.route("/:userID").get(protect, getUserInfoById);

export default router;
