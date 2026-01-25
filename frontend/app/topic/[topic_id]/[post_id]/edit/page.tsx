'use client';

import { useState, use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPost, updatePost } from '@/api/posts';
import { Title } from '@/components/title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';

export default function EditPostPage({ params }: { params: Promise<{ topic_id: string, post_id: string }> }) {
  const { topic_id, post_id } = use(params);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { isAuthenticated, username, isLoading: authLoading } = useAuth();

  useEffect(() => {
    document.title = "Edit Post | RedNUS";
  }, []);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await getPost(post_id);
        
        // Check if user is the author
        if (!username || post.authorName?.toLowerCase() !== username.toLowerCase()) {
          alert('You can only edit your own posts');
          router.push(`/topic/${topic_id}/${post_id}`);
          return;
        }
        
        setTitle(post.title);
        setContent(post.content);
      } catch (error) {
        console.error('Error loading post:', error);
        alert('Failed to load post');
        router.push(`/topic/${topic_id}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      if (!isAuthenticated) {
        router.push('/sign-in');
      } else {
        loadPost();
      }
    }
  }, [post_id, topic_id, router, isAuthenticated, authLoading, username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updatePost(post_id, { title, content });
      router.push(`/topic/${topic_id}/${post_id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex flex-col justify-center items-center mt-10">
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center mt-10 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto">
      <Title>Edit Post</Title>

      <Card className="mt-4 bg-[#1a1a1a] border-[#2a2a2a]">
        <CardHeader>
          <CardTitle className="text-gray-200">Edit Your Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-medium text-gray-300">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="bg-[#0f0f0f] border border-[#3a3a3a] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="font-medium text-gray-300">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content..."
                className="bg-[#0f0f0f] border border-[#3a3a3a] rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-y"
                rows={10}
                required
              />
            </div>

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="bg-[#262626] hover:bg-[#333333] text-gray-300 px-6 py-2.5 rounded-xl font-medium transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
