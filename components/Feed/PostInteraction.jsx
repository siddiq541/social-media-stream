// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useUser } from "@/context/UserContext";

// const PostInteraction = ({ postId, likes = [], commentNumber = 0 }) => {
//   const { currentUser } = useUser();

//   const [likeState, setLikeState] = useState({
//     likeCount: likes.length,
//     isLiked: currentUser ? likes.includes(currentUser.id) : false,
//   });
//   const [commentCount, setCommentCount] = useState(0);
//   // ✅ Update likeState whenever likes or currentUser changes
//   useEffect(() => {
//     const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
//     const post = storedPosts.find((p) => p.id === postId);
//     if (!post) return;
//     if (post) setCommentCount(post.comments?.length || 0);
//     setLikeState({
//       likeCount: post.likes.length,
//       isLiked: currentUser ? post.likes.includes(currentUser.id) : false,
//     });
//   }, [postId, currentUser, likes, commentCount]); // listens to user switch and likes changes

//   const togglePostLike = () => {
//     if (!currentUser) return;

//     const storedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
//     const post = storedPosts.find((p) => p.id === postId);
//     if (!post) return;

//     let newLikes;
//     let isLikedNow;

//     if (post.likes.includes(currentUser.id)) {
//       newLikes = post.likes.filter((id) => id !== currentUser.id);
//       isLikedNow = false;
//     } else {
//       newLikes = [...post.likes, currentUser.id];
//       isLikedNow = true;
//     }

//     // Update local state
//     setLikeState({
//       likeCount: newLikes.length,
//       isLiked: isLikedNow,
//     });

//     // Update localStorage immediately
//     const updatedPosts = storedPosts.map((p) =>
//       p.id === postId ? { ...p, likes: newLikes } : p
//     );
//     localStorage.setItem("posts", JSON.stringify(updatedPosts));
//   };
//   return (
//     <div className="flex items-center justify-between my-4 text-sm">
//       <div className="flex gap-8">
//         <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl">
//           <Image
//             src={likeState.isLiked ? "/img/liked.png" : "/img/like.png"}
//             width={16}
//             height={16}
//             alt=""
//             className="cursor-pointer"
//             onClick={togglePostLike}
//           />

//           <span className="text-gray-300">|</span>
//           <span className="text-gray-500">
//             {likeState.likeCount}
//             <span className="hidden md:inline"> Likes</span>
//           </span>
//         </div>
//         <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl">
//           <Image
//             src="/img/comment.png"
//             width={16}
//             height={16}
//             alt=""
//             className="cursor-pointer"
//           />
//           <span className="text-gray-300">|</span>
//           <span className="text-gray-500">
//             {commentNumber}
//             <span className="hidden md:inline"> Comments</span>
//           </span>
//         </div>
//       </div>
//       <div className="">
//         <div className="flex items-center gap-4 p-2 bg-slate-50 rounded-xl">
//           <Image
//             src="/img/share.png"
//             width={16}
//             height={16}
//             alt=""
//             className="cursor-pointer"
//           />
//           <span className="text-gray-300">|</span>
//           <span className="text-gray-500">
//             <span className="hidden md:inline"> Share</span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostInteraction;
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
