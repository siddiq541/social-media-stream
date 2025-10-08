import React from "react";
import Image from "next/image";
import Comments from "@/components/Feed/Comments";
import { useState, useRef } from "react";
import useClickOutside from "@/hooks/useClickOutside";
const Post = ({ post, onDelete }) => {
  if (!post) return null;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  useClickOutside(menuRef, () => setShowMenu(false));

  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {post.author && post.author.avatar ? (
            <Image
              src={post.author.avatar}
              alt={post.author.name || "User avatar"}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
          )}
          <span className="font-medium">
            {post.author?.name || "Unknown User"}
          </span>
        </div>
        <div className="relative" ref={menuRef}>
          <Image
            src="/img/more.png"
            alt="More"
            width={16}
            height={16}
            className="cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 z-10 w-20 overflow-hidden bg-white rounded-md shadow-lg ">
              <button
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 focus:outline-none"
                onClick={() => onDelete(post.id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full min-h-96">
          {post.image ? (
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover rounded-md"
            />
          ) : null}
        </div>
        <p>{post.content}</p>
      </div>
      {/* INTERACTIONS */}
      <div className="flex items-center justify-between my-4 text-sm">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl">
            <Image
              src="/img/like.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {post.likes}
              <span className="hidden md:inline"> Likes</span>
            </span>
          </div>
          <div className="flex items-center gap-4 p-2 bg-slate-100 rounded-xl">
            <Image
              src="/img/comment.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {post.comments.length}
              <span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-4 p-2 bg-slate-100 rounded-xl">
            <Image
              src="/img/share.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {post.shares}
              <span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
