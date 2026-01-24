import Link from "next/link";
import { Title } from "../title";

export const UnauthedHome = () => {
    return (
    <div className="flex flex-col fill-screen items-center justify-center pt-10">
      <Title>
        Welcome to <em className="hover:bg-red-400">REDnus</em>!
      </Title>
      <Link href="/sign-in">
      <button className="cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-2xl px-50 py-5 text-center leading-5">
          START
        </button>
      </Link>
    </div>
    )
}