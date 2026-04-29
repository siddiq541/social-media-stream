"use client";

//import { usePosts } from "@/hooks/usePosts";
import PostForm from "@/components/PostForm/PostForm";
import Feed from "@/components/Feed/Feed";
import LeftMenu from "@/components/LeftMenu/LeftMenu";

export default function Home() {
  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden lg:block w-[20%] sticky top-20 h-fit">
        <LeftMenu type="home" />
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-6 ">
          <PostForm />
          <Feed />
        </div>
      </div>
    </div>
  );
}
