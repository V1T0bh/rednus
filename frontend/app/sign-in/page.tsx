import Link from "next/link";
import { Title } from "@/components/title";
import { Subtitle } from "@/components/subtitle";

export default function SignIn() {
    return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50">
      <Subtitle>
        Sign In
      </Subtitle>
      <div className="flex flex-col justify-center mb-5">
        <input type="text" placeholder="Username" className="border-2 border-slate-400 rounded-lg mb-4 w-110 text-xl p-4"/>
      </div>
      <Link href="/sign-in">
      <button className="cursor-pointer text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-2xl w-110 py-5 text-center leading-5">
          SIGN IN
        </button>
      </Link>
    </div>
    )
}