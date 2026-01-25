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
    <div className="flex flex-col fill-screen items-center justify-center">
      <Title>
        Welcome, <span className="text-red-500">{username}</span>!
      </Title>
      <div className="flex flex-col justify-center">
      <h2 className="text-2xl font-semibold text-gray-300 my-5">
        Explore Topics
      </h2>
      {Topics.map((topic) => (
        <Link href={topic.link} key={topic.id}>
            <button className="cursor-pointer w-80 text-gray-200 border-2 border-red-500/50 hover:border-red-500 hover:bg-red-500/10 font-medium rounded-xl text-lg py-4 mb-3 text-center transition-all duration-200">
                {topic.label}
            </button>
        </Link>
        ))}
      </div>
    </div>
    )
}