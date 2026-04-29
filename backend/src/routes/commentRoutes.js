import express from "express";
import {
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComment);
router.delete("/:id", protect, deleteComment);
router.put("/:id", protect, updateComment);

export default router;
