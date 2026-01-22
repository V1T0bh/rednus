import { Title } from "@/components/title";

const topic = {
    id: 1,
    label: "Topic X"
}

const posts = [
    { id: 1, title: "Post 1", description: "This is my first post.", datePosted: "2024-01-01"},
    { id: 2, title: "Post 2", description: "This is my second post.", datePosted: "2024-01-02"},
    { id: 3, title: "Post 3", description: "This is my third post.", datePosted: "2024-01-03"},
]

export default function TopicPage() {
  return (
    <div className="flex flex-col justify-center mt-10 px-10">
        <Title>{topic.label}</Title>

        <hr class="h-px my-8 bg-gray-800 border-0"></hr>

        
        <p>Topics x Page</p>
    </div>
  );
}
