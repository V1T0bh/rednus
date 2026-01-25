'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Title } from "@/components/title";
import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  const { isAuthenticated, username, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSignOut = () => {
    logout();
    router.push('/sign-in');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col fill-screen items-center justify-center pt-10">
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="flex flex-col fill-screen items-start justify-center pt-10 px-8 md:px-16 max-w-4xl mx-auto">
        <Title>Profile</Title>
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] w-full mb-6">
          <p className="text-gray-400 text-sm mb-1">Username</p>
          <p className="text-gray-100 text-xl font-medium">{username}</p>
        </div>
        <button 
            onClick={handleSignOut}
            className="cursor-pointer px-8 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
            >
          Sign Out
        </button>
    </div>
  );
}