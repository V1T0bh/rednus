'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Subtitle } from "@/components/subtitle";
import { signIn } from "@/api/auth";

export default function SignIn() {
    const [username, setUsername] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim()) {
            setError('Please enter a username');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await signIn(username, rememberMe);
            router.push('/');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to sign in');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
    <div className="flex flex-col fill-screen items-center justify-center pt-10">
      <Subtitle>
        Sign In
      </Subtitle>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center mb-5 w-full max-w-md px-4">
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl mb-4 text-lg p-4 text-gray-200 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
          disabled={isSubmitting}
        />
        
        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input 
            type="checkbox" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-5 h-5 accent-red-500 rounded"
            disabled={isSubmitting}
          />
          <span className="text-gray-400">Remember me</span>
        </label>

        {error && (
          <p className="text-red-400 mb-4 text-center text-sm">{error}</p>
        )}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-lg transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-600"
        >
          {isSubmitting ? 'SIGNING IN...' : 'SIGN IN'}
        </button>
      </form>
    </div>
    )
}