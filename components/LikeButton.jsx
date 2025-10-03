'use client';

import { useState } from 'react';

export default function LikeButton({ likes }) {
  const [count, setCount] = useState(likes);

  return (
    <button onClick={() => setCount(count + 1)} className="flex items-center gap-2 text-purple-600 hover:text-purple-800">
      <span>👍</span>
      <span>{count}</span>
    </button>
  );
}