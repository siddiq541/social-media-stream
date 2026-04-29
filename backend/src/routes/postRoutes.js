import express from "express";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);
router.delete("/:id", protect, deletePost);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);

export default router;
