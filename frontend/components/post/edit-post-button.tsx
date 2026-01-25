'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

interface EditPostButtonProps {
  postId: string;
  topicId: string;
  authorName?: string;
}

export function EditPostButton({ postId, topicId, authorName }: EditPostButtonProps) {
  const { username } = useAuth();
  const router = useRouter();

  // Only show if user is the author
  if (!username || !authorName || username.toLowerCase() !== authorName.toLowerCase()) {
    return null;
  }

  const handleEdit = () => {
    router.push(`/topic/${topicId}/${postId}/edit`);
  };

  return (
    <button
      onClick={handleEdit}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 text-sm"
    >
      Edit Post
    </button>
  );
}
