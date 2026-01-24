import Link from "next/link";
import { Title } from "../title";

const User = "user123"; // Placeholder for user authentication status
const Topics = [
    { id: 1, label: "Topic 1" , link : "/topics/1" },
    { id: 2, label: "Topic 2" , link : "/topics/2" },
    { id: 3, label: "Topic 3", link : "/topics/3" },
]; // Placeholder for user topics

export const AuthedHome = () => {
    return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] items-center justify-center bg-zinc-50">
      <Title>
        Welcome, {User}!
      </Title>
      <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-zinc-800 my-5">
        Explore Topics
      </h2>
      {Topics.map((topic) => (
        <Link href={topic.link} key={topic.id}>
            <button className="cursor-pointer w-110 text-black border-solid border-4 border-orange-400 hover:border-orange-700 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-2xl py-5 mb-4 text-center leading-5">
                {topic.label}
            </button>
        </Link>
        ))}
      </div>
    </div>
    )
}