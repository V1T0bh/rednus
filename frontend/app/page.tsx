import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UnauthedHome } from "../components/home/unauthed_home";
import { AuthedHome } from "../components/home/authed_home";

// Placeholder for user authentication status
const isAuthenticated = true;

export default function Home() {
  return (
    <div>
      {isAuthenticated ? <AuthedHome/> : <UnauthedHome/>}
    </div>
  );
}
