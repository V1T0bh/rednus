import { Title } from "@/components/title";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] items-start justify-center pt-10 px-50">
        <Title>Username: {"User123"}</Title>
        <button 
            className="cursor-pointer text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-2xl px-50 py-5 text-center leading-5"
            >
          SIGN OUT
        </button>
    </div>
  );
}