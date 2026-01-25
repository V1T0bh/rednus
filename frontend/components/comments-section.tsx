'use client';

import { useState, useEffect } from 'react';
import { getCommentsByPost, createComment, updateComment, deleteComment, type Comment } from '@/api/comments';
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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const { isAuthenticated, username, isAdmin, isLoading: authLoading } = useAuth();

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

  const handleEditClick = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent('');
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return;

    try {
      const updatedComment = await updateComment(commentId, { content: editContent });
      setComments(comments.map(c => c.id === commentId ? updatedComment : c));
      setEditingCommentId(null);
      setEditContent('');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
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
        {comments.map((comment) => {
          const isAuthor = username && comment.authorName && username.toLowerCase() === comment.authorName.toLowerCase();
          const canModify = isAuthor || isAdmin;
          const isEditing = editingCommentId === comment.id;

          return (
            <div key={comment.id} className="bg-[#1a1a1a] rounded-xl p-4 border border-[#2a2a2a] relative">
              {/* Edit and Delete icons */}
              {canModify && !isEditing && (
                <div className="absolute top-4 right-4 flex gap-2">
                  {/* Edit icon */}
                  <button
                    onClick={() => handleEditClick(comment)}
                    className="text-blue-400/60 hover:text-blue-400 transition-colors"
                    title="Edit comment"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  {/* Delete icon */}
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-400/60 hover:text-red-400 transition-colors"
                    title="Delete comment"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}

              {isEditing ? (
                <div className="pr-20">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#3a3a3a] rounded-xl text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-y"
                    rows={3}
                  />
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleSaveEdit(comment.id)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-[#262626] hover:bg-[#333333] text-gray-300 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-gray-300 whitespace-pre-wrap pr-20">{comment.content}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="text-gray-400">{comment.authorName || `User ${comment.userId}`}</span> • {formatDate(comment.createdAt)}
                  </div>
                </>
              )}
            </div>
          );
        })}
        
        {comments.length === 0 && (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}
