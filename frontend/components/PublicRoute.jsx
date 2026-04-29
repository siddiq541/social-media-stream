"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function PublicRoute({ children }) {
  const { token, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && token) {
      router.push("/");
    }
  }, [token, authLoading, router]);

  if (authLoading) return <p>Loading...</p>;

  return children;
}
