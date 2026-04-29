import { AppDataSource } from "../config/data-source.js";

const commentRepository = AppDataSource.getRepository("Comment");
const postRepository = AppDataSource.getRepository("Post");

export const createComment = async (req, res) => {
  try {
    const { description, postId } = req.body;

    // validation
    if (!description || !postId) {
      return res.status(400).json({
        message: "Description and postId are required",
      });
    }

    // check post exists
    const post = await postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = commentRepository.create({
      description,
      user: req.user, //  logged-in user
      post: post, //  attach to post
    });

    const savedComment = await commentRepository.save(newComment);

    const commentWithUser = await commentRepository.findOne({
      where: { id: savedComment.id },
      relations: ["user"],
    });

    res.status(201).json({
      message: "Comment added",
      comment: commentWithUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);

    // find comment
    const comment = await commentRepository.findOne({
      where: { id: commentId },
      relations: ["user"],
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // ownership check
    if (comment.user.id !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this comment",
      });
    }

    await commentRepository.remove(comment);

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);
    const { description } = req.body;

    // validation
    if (!description) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    // find comment
    const comment = await commentRepository.findOne({
      where: { id: commentId },
      relations: ["user"],
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    // ownership check
    if (comment.user.id !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this comment",
      });
    }

    // update
    comment.description = description;

    const updatedComment = await commentRepository.save(comment);

    res.json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
