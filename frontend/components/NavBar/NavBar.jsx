"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, authLoading } = useAuth();

  return (
    <nav className="flex items-center justify-between h-24">
      {/* Left */}
      <div className="md:hidden lg:block w-[30%]">
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
        {/* Search */}
        <div className="items-center hidden p-2 bg-slate-100 xl:flex rounded-xl">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none"
          />
          <Image src="/img/search.png" alt="Search" width={14} height={14} />
        </div>
      </div>
      {/* Right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        {authLoading && (
          <div className="inline-block w-4 h-4 border-2 border-gray-500 rounded-full animate-spin border-e-transparent" />
        )}

        {!authLoading && (
          <>
            {/* Icons ONLY when logged in */}
            {/* {user && (
              <>
                <div className="cursor-pointer">
                  <Image src="/img/people.png" alt="" width={24} height={24} />
                </div>
                <div className="cursor-pointer">
                  <Image
                    src="/img/messages.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <div className="cursor-pointer">
                  <Image
                    src="/img/notifications.png"
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
              </>
            )} */}

            {/* Auth UI */}
            {!user ? (
              <div className="flex items-center gap-2 text-sm">
                <Image src="/img/login.png" alt="" width={20} height={20} />
                <Link href="/login">Login/Register</Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-sm">
                <span className="font-semibold text-gray-700">
                  {user.name || user.username}
                </span>

                <button
                  onClick={logout}
                  className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}

        <MobileMenu />
      </div>
    </nav>
  );
}
