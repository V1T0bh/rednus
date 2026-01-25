'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

export const Navbar = () => {
  const { isAuthenticated, username, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push('/sign-in');
  };

  return (
    <div className="relative z-50">
        <NavigationMenu>
            <NavigationMenuList className="flex w-screen items-center px-10 py-4 bg-[#171717] border-b border-[#2a2a2a] gap-6">

                {/* Left side - Brand */}
                <NavigationMenuItem className="mr-auto">
                    <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-red-500 font-bold text-lg hover:text-red-400`}>
                        <Link href="/">RedNUS</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <div className="flex flex-1 justify-center gap-6">
                  <NavigationMenuItem>
                      <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-gray-300 hover:text-white`}>
                          <Link href="/">Home</Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                      <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-gray-300 hover:text-white`}>
                          <Link href="/topic">Topics</Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>

                  {isAuthenticated && (
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-gray-300 hover:text-white`}>
                            <Link href="/profile">Profile</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </div>

                {/* Right side - Auth */}
                <NavigationMenuItem className="ml-auto">
                    {!isLoading && (
                      isAuthenticated ? (
                        <button
                          onClick={handleSignOut}
                          className={`${navigationMenuTriggerStyle()} cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10`}
                        >
                          Sign Out
                        </button>
                      ) : (
                        <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} text-gray-300 hover:text-white`}>
                          <Link href="/sign-in">Sign In</Link>
                        </NavigationMenuLink>
                      )
                    )}
                </NavigationMenuItem>
                
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  )
}