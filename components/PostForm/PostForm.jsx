"use client";

import { useState } from "react";
import Image from "next/image";
import AddPostButton from "./AddPostButton";
const PostForm = ({ onPostSubmit }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please enter some content for your post");
      return;
    }

    setIsSubmitting(true);

    // Create new post object
    const newPost = {
      id: Date.now(), // Simple ID generation
      author: {
        name: "Current User",
        username: "@currentuser",
        avatar: "/avatars/default.jpg",
      },
      content: content.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      image: null,
    };

    // Call the parent component's callback to add the post
    if (onPostSubmit) {
      onPostSubmit(newPost);
    }

    // Reset form
    setContent("");
    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-between gap-4 p-4 text-sm bg-white rounded-lg shadow-md md:mx-auto md:w-3/4 xl:w-[60%] xl:mx-auto">
      {/* AVATAR */}
      <Image
        src="https://images.pexels.com/photos/33435611/pexels-photo-33435611.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
        width={48}
        height={48}
        className="object-cover w-12 h-12 rounded-full"
      />
      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <div className="flex gap-4">
          <textarea
            name=""
            id=""
            placeholder="What's on your mind?"
            className="flex-1 p-2 rounded-lg bg-slate-100"
          ></textarea>
          <Image
            src="/img/emoji.png"
            alt=""
            width={20}
            height={20}
            className="self-end w-5 h-5 cursor-pointer"
          />
          <AddPostButton />
        </div>
        {/* POST OPTIONS */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400">
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/addImage.png" alt="" width={20} height={20} />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/addVideo.png" alt="" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/img/addEvent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

// <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
//   <h2 className="mb-4 text-xl font-bold text-gray-800">Create a New Post</h2>

//   <form onSubmit={handleSubmit}>
//     <div className="mb-4">
//       <textarea
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="What's on your mind?"
//         className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//         rows="4"
//         maxLength="500"
//       />
//       <div className="mt-1 text-sm text-right text-gray-500">
//         {content.length}/500 characters
//       </div>
//     </div>

//     <div className="flex items-center justify-between">
//       <div className="text-sm text-gray-500">
//         Share your thoughts with the community
//       </div>

//       <button
//         type="submit"
//         disabled={isSubmitting || !content.trim()}
//         className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//           isSubmitting || !content.trim()
//             ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             : 'bg-blue-500 text-white hover:bg-blue-600'
//         }`}
//       >
//         {isSubmitting ? 'Posting...' : 'Post'}
//       </button>
//     </div>
//   </form>
// </div>
export default PostForm;
