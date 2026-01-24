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

export const Navbar = () => {
 return (
    <div>
        <NavigationMenu>
            <NavigationMenuList className="flex w-screen items-center px-10 py-5 bg-white shadow-md gap-6">

                <NavigationMenuItem className="mr-auto">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/">RedNUS</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                <div className="flex flex-1 justify-center gap-6">
                  <NavigationMenuItem className="relative">
                      <NavigationMenuTrigger>Topics</NavigationMenuTrigger>
                      <NavigationMenuContent className="absolute left-0 top-full mt-2">
                          <NavigationMenuLink href="/topic/1">Topic 1</NavigationMenuLink>
                      </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                          <Link href="/profile">Profile</Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>
                </div>

                <NavigationMenuItem className="ml-auto">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/profile">Sign Out</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                
            </NavigationMenuList>
        </NavigationMenu>
    </div>
 )
}