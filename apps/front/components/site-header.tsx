import Link from "next/link"
import { Menu, Plus } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { SignInButton } from "@/components/auth"
import { MainNav } from "@/components/main-nav"

import MobileNav from "./mobile-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <nav className="flex items-center space-x-1">
            <Link href={"/create"} className={buttonVariants()}>
              <Plus size={15} strokeWidth={3} />
              <span className="ml-1">Signaler</span>
              <span className="ml-1 hidden lg:inline-block"> un danger</span>
            </Link>
            <SignInButton />
            {/* <ThemeToggle /> */}
          </nav>
        </div>
        <MobileNav items={siteConfig.mainNav} />
      </div>
    </header>
  )
}
