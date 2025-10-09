"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import AddPostButton from "./AddPostButton";
import useClickOutside from "@/hooks/useClickOutside";
import ImageUploadCard from "./ImageUploadCard";
import { useUser } from "@/context/UserContext";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const PostForm = ({ onPostSubmit }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const emojis = ["😊", "😂", "❤️", "👍", "🔥"];
  const emojiRef = useRef(null);
  const { currentUser, switchUser } = useUser();

  // Close emoji picker when clicking outside
  useClickOutside(emojiRef, () => setShowEmojis(false));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !selectedImage) {
      alert("Please enter content or select an image");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageData = null;

      if (selectedImage) {
        imageData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read image"));
          reader.readAsDataURL(selectedImage);
        });
      }

      const newPost = {
        id: Date.now(),
        userId: currentUser.id, // ✅ needed for filtering
        author: {
          id: currentUser.id,
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar,
        },
        content: content.trim(),
        timestamp: new Date().toISOString(),
        likes: [],
        comments: [],
        shares: 0,
        image: imageData,
      };

      try {
        if (onPostSubmit) await onPostSubmit(newPost);
      } catch (err) {
        console.error("Post submission failed:", err);
        alert("Failed to submit post.");
      }

      // Reset form
      setContent("");
      setSelectedImage(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-between gap-4 p-4 text-sm bg-white rounded-lg shadow-md md:mx-auto md:w-3/4 xl:w-[60%] xl:mx-auto">
      {/* User Avatar */}
      <Image
        src={currentUser?.avatar || "/img/profile.png"}
        alt={currentUser?.name || "User avatar"}
        width={48}
        height={48}
        onClick={switchUser}
        className="object-cover w-12 h-12 rounded-full cursor-pointer"
      />

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
        {/* Textarea + Emoji */}
        <div className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-slate-100"
          />
          <div className="relative">
            <Image
              src="/img/emoji.png"
              alt=""
              width={20}
              height={20}
              onClick={() => setShowEmojis(!showEmojis)}
              className="w-5 h-5 cursor-pointer"
            />
            {showEmojis && (
              <div
                ref={emojiRef}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 z-10 flex gap-2 p-2 mb-2 bg-white border bottom-full rounded-xl shadow-l"
              >
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setContent((prev) => prev + emoji)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
            {/* Submit Button */}
            <div className="flex justify-end">
              <AddPostButton isSubmitting={isSubmitting} />
            </div>
          </div>
        </div>

        {/* Post Options */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-400">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-blue-500">
                <Image src="/img/addImage.png" alt="" width={20} height={20} />
                Photo
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-2 w-60">
              <ImageUploadCard onSelect={(file) => setSelectedImage(file)} />
            </PopoverContent>
          </Popover>
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
      </form>
    </div>
  );
};

export default PostForm;
