'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Title } from "@/components/title";
import { useAuth } from "@/lib/auth";
import { changePassword } from "@/api/auth";

export default function ProfilePage() {
  const { isAuthenticated, username, isLoading, logout } = useAuth();
  const router = useRouter();
  
  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    document.title = "Profile | RedNUS";
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSignOut = () => {
    logout();
    router.push('/sign-in');
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!currentPassword) {
      setPasswordError('Please enter your current password');
      return;
    }
    if (!newPassword) {
      setPasswordError('Please enter a new password');
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setIsChangingPassword(true);

    try {
      await changePassword(currentPassword, newPassword);
      setPasswordSuccess('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
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
        
        {/* Username display */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] w-full mb-6">
          <p className="text-gray-400 text-sm mb-1">Username</p>
          <p className="text-gray-100 text-xl font-medium">{username}</p>
        </div>

        {/* Password change section */}
        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-[#2a2a2a] w-full mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Password</p>
              <p className="text-gray-100">••••••••</p>
            </div>
            <button
              onClick={() => {
                setShowPasswordForm(!showPasswordForm);
                setPasswordError('');
                setPasswordSuccess('');
              }}
              className="text-red-500 hover:text-red-400 font-medium transition-colors text-sm"
            >
              {showPasswordForm ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {passwordSuccess && (
            <p className="text-emerald-400 text-sm mb-4">{passwordSuccess}</p>
          )}

          {showPasswordForm && (
            <form onSubmit={handlePasswordChange} className="space-y-4 mt-4 pt-4 border-t border-[#2a2a2a]">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
                disabled={isChangingPassword}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
                disabled={isChangingPassword}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#0f0f0f] border border-[#3a3a3a] rounded-lg p-3 text-gray-200 placeholder-gray-500 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
                disabled={isChangingPassword}
              />

              {passwordError && (
                <p className="text-red-400 text-sm">{passwordError}</p>
              )}

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? 'Changing Password...' : 'Update Password'}
              </button>
            </form>
          )}
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