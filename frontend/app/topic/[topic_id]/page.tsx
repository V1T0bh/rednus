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

const posts = [
    { id: 1, title: "Post 1", 
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      , datePosted: "2024-01-01"},
    { id: 2, title: "Post 2", description: "This is my second post.", datePosted: "2024-01-02"},
    { id: 3, title: "Post 3", description: "This is my third post.", datePosted: "2024-01-03"},
]

export default async function TopicPage({ params }: { params: { topic_id: string } }) {
  const { topic_id } = await params;

  // reorder posts by datePosted descending
  posts.sort((a, b) => (a.datePosted < b.datePosted ? 1 : -1));

  return (
    <div className="flex flex-col justify-center mt-10 px-10">
        <Title>{`Topic ${topic_id}`}</Title>

        <hr className="h-px my-8 bg-gray-800 border-0"></hr>

        
        <div className="flex flex-col gap-4 justify-center mb-10">
          {
            posts.map((post) => (
              <Link key={post.id} href={`/topic/${topic_id}/${post.id}`}>
                <Card className="cursor-pointer hover:bg-gray-200 w-full h-35 md:h-45">
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardAction>{post.datePosted}</CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 md:line-clamp-3">{post.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          )
          }
          
        </div>
    </div>
  );
}
