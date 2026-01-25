import { Divider } from "@/components/divider";
import { Title } from "@/components/title";
import { getPost } from "@/api/posts";
import { CommentsSection } from "@/components/comments-section";
import Link from "next/link";
import { formatDate } from "@/lib/date-utils";
import { DeletePostButton } from "@/components/post/delete-post-button";
import { EditPostButton } from "@/components/post/edit-post-button";

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: Promise<{ topic_id: string, post_id: string }> }) {
  const { topic_id, post_id } = await params;

  const post = await getPost(post_id);

  return (
    <div className="flex flex-col max-w-4xl mx-auto px-6 py-12">
        <div className="flex flex-row justify-center items-center gap-4">
          <Link href={`/topic/${topic_id}`} className="text-red-500 hover:text-red-400 mr-auto transition-colors">
            ← Back to Topic
          </Link>
          <EditPostButton postId={post_id} topicId={topic_id} authorName={post.authorName} />
          <DeletePostButton postId={post_id} topicId={topic_id} authorName={post.authorName} />
        </div>

        <div className="flex flex-row justify-between items-baseline">
          <Title>{post.title}</Title>
          
        </div>
        <div className="flex flex-row justify-between items-center mb-4">
          {post.authorName && (
              <p className="text-sm text-gray-400">Posted by <span className="font-medium text-gray-300">{post.authorName}</span></p>
            )}
            <h2 className="text-sm text-gray-500">{formatDate(post.createdAt)}</h2>
            
          </div>

        <Divider className="mb-8"/>

        <div className="bg-[#1a1a1a] rounded-xl border border-[#2a2a2a] p-8">
          <p className="text-lg text-gray-300 whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </div>

        <CommentsSection postId={post_id} />
    </div>
  );
}
