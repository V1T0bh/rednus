"use client";

import Link from "next/link";
import { Title } from "../title";
import { useEffect, useState } from "react";
import { getPosts, Post } from "@/api/posts";
import { getTopics, Topic } from "@/api/topics";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDateShort } from "@/lib/date-utils";

interface AuthedHomeProps {
  username: string;
}

export const AuthedHome = ({ username }: AuthedHomeProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, topicsData] = await Promise.all([
          getPosts(),
          getTopics(),
        ]);
        // Sort posts by createdAt descending (most recent first)
        const sortedPosts = postsData.sort((a, b) => 
          (a.createdAt && b.createdAt) ? (a.createdAt < b.createdAt ? 1 : -1) : 0
        );
        setPosts(sortedPosts);
        setTopics(topicsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTopicName = (topicId: string) => {
    const topic = topics.find((t) => t.id === topicId);
    return topic?.name ?? "Unknown Topic";
  };

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMorePosts = visibleCount < posts.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="flex flex-col justify-center mt-10 px-4 md:px-8 lg:px-16 max-w-6xl mx-auto">
      <div className="flex flex-row justify-between items-baseline">
        <Title>
          Welcome, <span className="text-red-500">{username}</span>!
        </Title>
        <Link href="/topic">
          <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 transition-all duration-200">
            Explore Topics
          </button>
        </Link>
      </div>

      <hr className="h-px my-6 bg-[#2a2a2a] border-0"></hr>

      <h2 className="text-xl font-semibold text-gray-300 mb-4">Recent Posts</h2>

      <div className="flex flex-col gap-4 justify-center mb-10">
        {loading ? (
          <p className="text-gray-400 text-center py-8">Loading posts...</p>
        ) : visiblePosts.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No posts yet. Explore topics and be the first to create one!
          </p>
        ) : (
          <>
            {visiblePosts.map((post) => (
              <Link key={post.id} href={`/topic/${post.topicId}/${post.id}`}>
                <Card className="cursor-pointer bg-[#1a1a1a] border-[#2a2a2a] hover:bg-[#222222] hover:border-[#3a3a3a] transition-all duration-200 w-full">
                  <CardHeader>
                    <CardTitle className="text-gray-100">
                      <span className="text-red-400 font-normal">
                        {getTopicName(post.topicId)}
                      </span>
                      <span className="text-gray-500 mx-2">•</span>
                      {post.title}
                    </CardTitle>
                    <CardAction className="text-gray-500 text-sm">
                      {formatDateShort(post.createdAt)}
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 md:line-clamp-3 text-gray-400">
                      {post.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}

            <div className="flex justify-center mt-4">
              {hasMorePosts ? (
                <button
                  onClick={handleShowMore}
                  className="cursor-pointer text-red-400 hover:text-red-300 font-medium transition-all duration-200"
                >
                  Show more...
                </button>
              ) : posts.length > 0 ? (
                <p className="text-gray-500 italic">More cool posts coming!</p>
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
};