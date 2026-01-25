'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deletePost } from '@/api/posts';
import { useAuth } from '@/lib/auth';

interface DeletePostButtonProps {
  postId: string;
  topicId: string;
  authorName?: string;
}

export function DeletePostButton({ postId, topicId, authorName }: DeletePostButtonProps) {
  const { username, isAdmin } = useAuth();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Only show if user is the author or an admin
  const isAuthor = username && authorName && username.toLowerCase() === authorName.toLowerCase();
  if (!isAuthor && !isAdmin) {
    return null;
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePost(postId);
      router.push(`/topic/${topicId}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. You may not have permission to delete this post.');
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
    >
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </button>
  );
}
