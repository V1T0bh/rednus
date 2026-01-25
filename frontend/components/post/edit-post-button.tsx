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
      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm"
    >
      Edit Post
    </button>
  );
}
