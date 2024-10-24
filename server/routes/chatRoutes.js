import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupChat,
  addPeopleToGroup,
  removePeopleFromGroup,
} from "../controllers/chatControllers.js";

const router = express.Router();

router.route("/").get(protect, fetchChats);
router.route("/").post(protect, accessChat);
router.route("/group").post(protect, createGroupChat);
router.route("/rename-group").put(protect, renameGroupChat);
router.route("/group-add-people").put(protect, addPeopleToGroup);
router.route("/group-remove-people").put(protect, removePeopleFromGroup);

export default router;
