'use client';

import { useAuth } from "@/lib/auth";
import { UnauthedHome } from "../components/home/unauthed_home";
import { AuthedHome } from "../components/home/authed_home";

export default function Home() {
  const { isAuthenticated, username, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <p className="text-xl text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      {isAuthenticated ? <AuthedHome username={username!} /> : <UnauthedHome />}
    </div>
  );
}
