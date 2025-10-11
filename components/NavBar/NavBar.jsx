"use client";

import { react, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between h-24 md:mx-auto md:w-3/4 xl:w-[60%] xl:mx-auto">
      {/* Left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="text-xl font-bold text-blue-600 uppercase">
          Social Stream
        </Link>
      </div>
      {/* Center */}
      <div className="hidden md:flex w-[50%] text-sm items-center justify-between">
        {/* Links*/}
        <div className="flex gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/home.png"
              alt="Home"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Home</span>
          </Link>
          <Link href="/feed" className="flex items-center gap-2">
            <Image
              src="/img/feed.png"
              alt="Feed"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Feed</span>
          </Link>
          <Link href="/add-post" className="flex items-center gap-2">
            <Image
              src="/img/addPost.png"
              alt="Add Post"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Add Post</span>
          </Link>
        </div>
      </div>
      {/* Right */}
      <div className="w-[40%] flex items-center gap-4 xl:gap-8 justify-end">
        {/* Search */}
        <div className="items-center hidden p-2 xl:flex bg-slate-100 rounded-xl">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
          <Image src="/img/search.png" alt="Search" width={14} height={14} />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
}
