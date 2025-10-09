"use client";

import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useMemo } from "react";

const PostInteraction = ({
  postId,
  likes = [],
  commentNumber = 0,
  onToggleLike,
}) => {
  const { currentUser } = useUser();

  // compute isLiked based on likes prop (pure)
  const isLiked = useMemo(
    () => (currentUser ? likes.includes(currentUser.id) : false),
    [likes, currentUser]
  );

  return (
    <div className="flex items-center justify-between my-4 text-sm">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl">
          {/* wrap click in button for reliability */}
          <button onClick={onToggleLike} className="p-0 m-0">
            <Image
              src={isLiked ? "/img/liked.png" : "/img/like.png"}
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
          </button>

          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {likes.length}
            <span className="hidden md:inline"> Likes</span>
          </span>
        </div>

        <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl">
          <Image
            src="/img/comment.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            {commentNumber}
            <span className="hidden md:inline"> Comments</span>
          </span>
        </div>
      </div>

      <div className="">
        <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl">
          <Image
            src="/img/share.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">
            <span className="hidden md:inline"> Share</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
