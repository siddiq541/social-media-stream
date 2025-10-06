import React from "react";
import Image from "next/image";
import Comments from "@/components/Feed/Comments";
const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Jane Doe</span>
        </div>
        <Image
          src="/img/more.png"
          alt=""
          width={16}
          height={16}
          className="cursor-pointer"
        />
      </div>
      {/* DESC */}
      <div className="flex flex-col gap-4">
        <div className="relative w-full min-h-96">
          <Image
            src="https://images.pexels.com/photos/730256/pexels-photo-730256.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit hic eum
          iure cupiditate eos magnam ratione natus quisquam tenetur. Distinctio
          iusto possimus nihil sapiente blanditiis error quod nesciunt beatae
          dolorum?
        </p>
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
              123<span className="hidden md:inline"> Likes</span>
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
              123<span className="hidden md:inline"> Comments</span>
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
              123<span className="hidden md:inline"> Shares</span>
            </span>
          </div>
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default Post;
