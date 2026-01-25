
import Link from "next/link"
import { Title } from "@/components/title"

interface Topic {
  id: number
  label: string
}

async function fetchTopics(): Promise<Topic[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not set")
  }

  const res = await fetch(`${apiUrl}/topics`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error(`Failed to fetch topics: ${res.status}`)
  }

  const data = await res.json()
  const rawTopics = Array.isArray(data?.topics) ? data.topics : Array.isArray(data) ? data : []

  return rawTopics.map((t: any) => ({
    id: t.id ?? t.ID ?? 0,
    label: t.label ?? t.Label ?? "UNDEFINED TOPIC",
  }))
}

export default async function TopicsHome() {
  const topics = await fetchTopics()

  return (
    <div className="flex fill-screen flex-col items-center justify-center gap-6 bg-white px-6 py-12">
      <Title>List of Topics</Title>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        {topics.map((topic) => (
          <Link key={topic.id} href={`/topic/${topic.id}`} className="w-full">
            <button className="cursor-pointer w-110 text-black border-solid border-4 border-orange-400 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-2xl py-5 mb-4 text-center leading-5">
              {topic.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
