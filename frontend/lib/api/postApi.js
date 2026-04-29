import api from "./axios";

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data;
};

export const createPost = async (postData) => {
  const res = await api.post("/posts", postData);
  return res.data;
};

export const deletePost = async (postId) => {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
};

export const toggleLike = async (postId) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/likes",
    { postId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const createComment = async (description, postId) => {
  const res = await api.post("/comments", {
    description,
    postId,
  });

  return res.data.comment;
};

export const deleteComment = async (commentId) => {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
};
