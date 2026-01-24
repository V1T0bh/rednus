import { Divider } from "@/components/divider";
import { Title } from "@/components/title";

const posts = [
    { id: 1, title: "Post 1", 
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      , datePosted: "2024-01-01"},
    { id: 2, title: "Post 2", description: "This is my second post.", datePosted: "2024-01-02"},
    { id: 3, title: "Post 3", description: "This is my third post.", datePosted: "2024-01-03"},
]

const post = posts[0];

export default async function PostPage({ params }: { params: { topic_id: string, post_id: string } }) {
  const { topic_id, post_id } = await params;

  return (
    <div className="flex flex-col justify-center mt-10 px-100">
        <div className="flex flex-row justify-between items-baseline">
          <Title>Post {post_id}, Topic {topic_id}</Title>
          <h2>{post.datePosted}</h2>
        </div>

        <Divider className="mb-8"/>

        <p>{post.description}</p>

        <Divider className="my-8"/>
        <textarea placeholder="Add comments..." className="border-0 rounded-lg text-md p-4 w-full resize-y" rows={1}/>
        <Divider className="my-8"/>

    </div>
  );
}
