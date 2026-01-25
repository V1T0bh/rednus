'use client';

import { useState, useEffect } from 'react';
import { getCommentsByPost, createComment, type Comment } from '@/api/comments';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { formatDate } from '@/lib/date-utils';

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isAuthenticated, username, isLoading: authLoading } = useAuth();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const data = await getCommentsByPost(postId);
      setComments(data);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const comment = await createComment(postId, { content: newComment });
      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Failed to create comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8 text-gray-400">Loading comments...</div>;
  }

  return (
    <div className="mt-12 border-t border-[#2a2a2a] pt-8">
      <h2 className="text-2xl font-semibold text-gray-200 mb-6">Comments ({comments.length})</h2>

      {/* Only show comment form if authenticated */}
      {!authLoading && isAuthenticated ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl text-gray-200 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors resize-y"
            rows={3}
          />
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="mt-3 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : !authLoading ? (
        <div className="mb-8 p-4 bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] text-center">
          <p className="text-gray-400">
            <Link href="/sign-in" className="text-red-500 hover:text-red-400 font-medium transition-colors">
              Sign in
            </Link>
            {' '}to leave a comment
          </p>
        </div>
      ) : null}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a]">
            <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
            <div className="mt-2 text-sm text-gray-500">
              <span className="text-gray-400">{comment.authorName || `User ${comment.userId}`}</span> • {formatDate(comment.createdAt)}
            </div>
          </div>
        ))}
        
        {comments.length === 0 && (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
