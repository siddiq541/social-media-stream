import React from "react";
import Post from "@/components/Feed/Post";
const Feed = () => {
  return (
    <div className="flex flex-col gap-12 p-4 md:mx-auto bg-white rounded-lg shadow-md md:w-3/4 xl:w-[60%] xl:mx-auto">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
