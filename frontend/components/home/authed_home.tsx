import Link from "next/link";
import { Title } from "../title";

const Topics = [
    { id: 1, label: "Topic 1" , link : "/topic/1" },
    { id: 2, label: "Topic 2" , link : "/topic/2" },
    { id: 3, label: "Topic 3", link : "/topic/3" },
]; // Placeholder for user topics

interface AuthedHomeProps {
    username: string;
}

export const AuthedHome = ({ username }: AuthedHomeProps) => {
    return (
    <div className="flex flex-col fill-screen items-center justify-center bg-zinc-50">
      <Title>
        Welcome, {username}!
      </Title>
      <div className="flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-zinc-800 my-5">
        Explore Topics
      </h2>
      {Topics.map((topic) => (
        <Link href={topic.link} key={topic.id}>
            <button className="cursor-pointer w-110 text-black border-solid border-4 border-orange-400 hover:bg-orange-200 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-2xl py-5 mb-4 text-center leading-5">
                {topic.label}
            </button>
        </Link>
        ))}
      </div>
    </div>
    )
}