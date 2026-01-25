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
      <button className="bg-orange-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 text-lg">
        + Create Post
      </button>
    </Link>
  );
}
