import { Title } from "@/components/title";

export default async function TopicPage({ params }: { params: { topic_id: string, post_id: string } }) {
  const { topic_id, post_id } = await params;

  return (
    <div className="flex flex-col justify-center mt-10 px-10">
        <Title>Post {post_id}, Topic {topic_id}</Title>
    </div>
  );
}
