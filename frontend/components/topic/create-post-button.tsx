'use client';

import Link from "next/link";
import { useAuth } from "@/lib/auth";

interface CreatePostButtonProps {
  topicId: string;
}

export function CreatePostButton({ topicId }: CreatePostButtonProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Don't show button while loading or if not authenticated
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <Link href={`/topic/${topicId}/create-post`}>
      <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 text-sm">
        + Create Post
      </button>
    </Link>
  );
}
