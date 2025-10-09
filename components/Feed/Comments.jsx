"use client";

import CommentList from "./CommentList";
import { SamplePosts } from "@/lib/posts";

const Comments = ({ postId, onUpdateComments }) => {
  // Get comments for this post from SamplePosts
  const post = SamplePosts.find((p) => p.id === postId);
  const comments = post?.comments || [];

  return (
    <div className="">
      <CommentList
        comments={comments}
        postId={postId}
        onUpdateComments={onUpdateComments}
      />
    </div>
  );
};

export default Comments;
