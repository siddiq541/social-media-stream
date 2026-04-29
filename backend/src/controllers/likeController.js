import { AppDataSource } from "../config/data-source.js";

const likeRepository = AppDataSource.getRepository("Like");
const postRepository = AppDataSource.getRepository("Post");

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;

    // validation
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    // check post exists
    const post = await postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check if already liked
    const existingLike = await likeRepository.findOne({
      where: {
        user: { id: req.user.id },
        post: { id: postId },
      },
      relations: ["user", "post"],
    });

    if (existingLike) {
      // unlike
      await likeRepository.remove(existingLike);

      return res.json({
        message: "Post unliked",
        liked: false,
      });
    }

    // like
    const newLike = likeRepository.create({
      user: req.user,
      post: post,
    });

    await likeRepository.save(newLike);

    res.json({
      message: "Post liked",
      liked: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
