"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getTopics, Topic } from "@/api/topics";
import { useAuth } from "@/lib/auth";

export function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const { isAdmin } = useAuth();

  useEffect(() => {
    async function fetchTopics() {
      try {
        const allTopics = await getTopics();
        // Get top 3 topics as "recommended"
        setTopics(allTopics.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch topics:", error);
      }
    }
    fetchTopics();
  }, []);

  return (
    <aside
      className={`bg-[#171717] border-r border-[#2a2a2a] transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Toggle Button */}
      <div className="p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-full bg-[#262626] border border-[#3a3a3a] flex items-center justify-center hover:bg-[#333333] transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>
      <nav className="p-4">
        {/* Navigation Links */}
        <div className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#262626] hover:text-white transition-colors"
            title="Home"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {isOpen && <span className="font-medium whitespace-nowrap">Home</span>}
          </Link>

          <Link
            href="/topic"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#262626] hover:text-white transition-colors"
            title="Topics"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {isOpen && <span className="font-medium whitespace-nowrap">Topics</span>}
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-[#262626] hover:text-white transition-colors"
            title="Profile"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {isOpen && <span className="font-medium whitespace-nowrap">Profile</span>}
          </Link>

          {/* Admin Developer Link - Only visible to admins */}
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-yellow-400 hover:bg-[#262626] hover:text-yellow-300 transition-colors"
              title="Developer"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              {isOpen && <span className="font-medium whitespace-nowrap">Developer</span>}
            </Link>
          )}
        </div>

        {/* Divider */}
        {isOpen && <div className="my-6 border-t border-[#2a2a2a]" />}

        {/* Recommended Topics */}
        {isOpen && (
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Recommended Topics
            </h3>
            <div className="space-y-1">
              {topics.length > 0 ? (
                topics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/topic/${topic.id}`}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-[#262626] hover:text-gray-200 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                    <span className="text-sm truncate">{topic.name}</span>
                  </Link>
                ))
              ) : (
                <p className="px-4 text-sm text-gray-500">Loading...</p>
              )}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}
