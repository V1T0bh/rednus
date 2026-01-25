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
            <NavigationMenuList className="flex w-screen items-center px-10 py-5 bg-white shadow-md gap-6">

                {/* Left side - Sign Out (if authenticated) or Sign In */}
                <NavigationMenuItem className="mr-auto">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">RedNUS</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <div className="flex flex-1 justify-center gap-6">
                  <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/">Home</Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/topic">Topics</Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>

                  {isAuthenticated && (
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/profile">Profile</Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </div>

                {/* Right side - Brand */}
                <NavigationMenuItem className="ml-auto">
                    {!isLoading && (
                      isAuthenticated ? (
                        <button
                          onClick={handleSignOut}
                          className={`${navigationMenuTriggerStyle()} cursor-pointer text-red-600 hover:text-red-700`}
                        >
                          Sign Out
                        </button>
                      ) : (
                        <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
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