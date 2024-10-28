import express from "express";
import {
  sendMessage,
  getAllMessages,
} from "../controllers/messageControllers.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatID").get(protect, getAllMessages);

export default router;
