
import Link from "next/link"
import { Title } from "@/components/title"
import { getTopics } from "@/api"

export const dynamic = 'force-dynamic';

export default async function TopicsHome() {
  const topics = await getTopics();

  return (
    <div className="flex fill-screen flex-col items-center justify-center gap-6 px-6 py-12">
      <Title>All Topics</Title>

      <div className="flex flex-col items-center gap-3 w-full max-w-md">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/topic/${topic.id}`} className="w-full">
            <button className="cursor-pointer w-full text-gray-200 border-2 border-red-500/50 hover:border-red-500 hover:bg-red-500/10 font-medium rounded-xl text-lg py-4 text-center transition-all duration-200">
              {topic.name}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}