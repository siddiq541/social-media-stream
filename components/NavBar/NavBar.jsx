'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-purple-700 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:underline">
          Social Stream
        </Link>
        <button
          type="button"
          className="lg:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:bg-purple-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div className={`mt-4 lg:mt-0 ${isMenuOpen ? 'block' : 'hidden'} lg:flex lg:items-center`}>
        <Link href="/" legacyBehavior>
          <a
            className="block lg:inline-block text-white hover:underline mr-6"
            onClick={() => setIsMenuOpen(false)}
          >
            Feed
          </a>
        </Link>
        <Link href="/add-post" legacyBehavior>
          <a
            className="block lg:inline-block text-white hover:underline"
            onClick={() => setIsMenuOpen(false)}
          >
            Add Post
          </a>
        </Link>
      </div>
    </nav>
  );
}