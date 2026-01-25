import { getPostsByTopic } from "@/api/posts";
import { Title } from "@/components/title";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { CreatePostButton } from "@/components/topic/create-post-button";
import { getTopic } from "@/api";
import { formatDateShort } from "@/lib/date-utils";
import type { Metadata } from "next";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ topic_id: string }> }): Promise<Metadata> {
  const { topic_id } = await params;
  const topic = await getTopic(topic_id);
  
  return {
    title: topic.name,
  };
}

export default async function TopicPage({ params }: { params: Promise<{ topic_id: string }> }) {
  const { topic_id } = await params;

  const topic = await getTopic(topic_id);

  const posts = await getPostsByTopic(topic_id);

  // reorder posts by datePosted descending
  //posts.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return (
    <div className="flex flex-col justify-center mt-10 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <div className="flex flex-row justify-between items-baseline">
          <Title>{topic.name}</Title>
          <CreatePostButton topicId={topic_id} />
        </div>

        <hr className="h-px my-6 bg-[#2a2a2a] border-0"></hr>

        
        <div className="flex flex-col gap-4 justify-center mb-10">
          {posts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No posts yet. Be the first to create one!</p>
          ) : (
            posts.map((post) => (
              <Link key={post.id} href={`/topic/${topic_id}/${post.id}`}>
                <Card className="cursor-pointer bg-[#1a1a1a] border-[#2a2a2a] hover:bg-[#222222] hover:border-[#3a3a3a] transition-all duration-200 w-full">
                  <CardHeader>
                    <CardTitle className="text-gray-100">{post.title}</CardTitle>
                    <CardAction className="text-gray-500 text-sm">{formatDateShort(post.createdAt)}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 md:line-clamp-3 text-gray-400">{post.content}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
          
        </div>
    </div>
  );
}
