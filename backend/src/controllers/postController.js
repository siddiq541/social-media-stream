import { AppDataSource } from "../config/data-source.js";

const postRepository = AppDataSource.getRepository("Post");

const formatPost = (post) => ({
  id: post.id,
  userId: post.user.id,

  author: {
    id: post.user.id,
    name: post.user.name,
    username: post.user.username,
    avatar: post.user.avatar,
  },

  description: post.description,
  image: post.image,
  shares: post.shares,
  timestamp: post.createdAt,

  likes: post.likes?.map((like) => like.user?.id) || [],

  comments:
    post.comments?.map((comment) => ({
      id: comment.id,
      description: comment.description,
      user: {
        id: comment.user.id,
        name: comment.user.name,
        username: comment.user.username,
        avatar: comment.user.avatar,
      },
      likes: [],
    })) || [],
});

export const createPost = async (req, res) => {
  try {
    const { description, image } = req.body;

    if (!description && !image) {
      return res.status(400).json({
        message: "Post must have description or image",
      });
    }

    const newPost = postRepository.create({
      description,
      image,
      user: req.user,
    });

    const savedPost = await postRepository.save(newPost);

    const postWithRelations = await postRepository.findOne({
      where: { id: savedPost.id },
      relations: {
        user: true,
        comments: {
          user: true,
        },
        likes: {
          user: true,
        },
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: formatPost(postWithRelations),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const posts = await postRepository.find({
      relations: {
        user: true,
        comments: {
          user: true,
        },
        likes: {
          user: true,
        },
      },
      order: {
        createdAt: "DESC",
      },
      skip,
      take: limit,
    });

    const formattedPosts = posts.map(formatPost);

    // pagination info
    res.json({
      posts: formattedPosts,
      currentPage: page,
      nextPage: formattedPosts.length === limit ? page + 1 : null,
      hasMore: formattedPosts.length === limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);

    // find post
    const post = await postRepository.findOne({
      where: { id: postId },
      relations: ["user"],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ownership check
    if (post.user.id !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this post",
      });
    }

    await postRepository.remove(post);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = parseInt(req.params.id);
    const { description, image } = req.body;

    // find post
    const post = await postRepository.findOne({
      where: { id: postId },
      relations: ["user"],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ownership check
    if (post.user.id !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this post",
      });
    }

    // update fields
    if (description !== undefined) post.description = description;
    if (image !== undefined) post.image = image;

    const updatedPost = await postRepository.save(post);

    res.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
