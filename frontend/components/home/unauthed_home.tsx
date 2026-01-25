import Link from "next/link";
import { Title } from "../title";

export const UnauthedHome = () => {
    return (
    <div className="flex flex-col fill-screen items-center justify-center pt-10">
      <Title>
        Welcome to <span className="text-red-500 hover:text-red-400 transition-colors">RedNUS</span>!
      </Title>
      <Link href="/sign-in">
        <button className="cursor-pointer px-12 py-4 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:scale-105">
          GET STARTED
        </button>
      </Link>
    </div>
    )
}