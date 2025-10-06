"use client";

import { react, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import AddPost from "@/app/Add-Post/page";

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
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/img/feed.png"
              alt="Feed"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Feed</span>
          </Link>
          <Link href="/Add-Post" className="flex items-center gap-2">
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
    // <nav className="px-6 py-4 text-white bg-purple-700">
    //   <div className="flex items-center justify-between">
    //     <Link href="/" className="text-xl font-bold hover:underline">
    //       Social Stream
    //     </Link>
    //     <button
    //       type="button"
    //       className="flex items-center px-3 py-2 text-white border border-white rounded lg:hidden hover:bg-purple-600"
    //       onClick={() => setIsMenuOpen(!isMenuOpen)}
    //       aria-label="Toggle menu"
    //       aria-expanded={isMenuOpen}
    //     >
    //       <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
    //         <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    //       </svg>
    //     </button>
    //   </div>

    //   <div className=""/*{`/*mt-4 lg:mt-0 ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center`}*/>
    //   <MobileMenu/>
    //   </div>
    // </nav>
  );
}
