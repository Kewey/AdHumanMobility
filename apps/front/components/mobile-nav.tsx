"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, Plus, X } from "lucide-react"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { SignInButton } from "@/components/auth"

interface MainNavProps {
  items?: NavItem[]
}

export default function MobileNav({ items }: MainNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-1 justify-end md:hidden">
      <Button variant={"outline"} onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X /> : <Menu />}
      </Button>
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "absolute left-0 top-full mt-[1px] w-full  overflow-hidden bg-foreground/50  transition-all",
          isOpen
            ? "h-[calc(100vh-64px)] backdrop-blur-sm"
            : "h-0 backdrop-blur-0"
        )}
      >
        <div
          data-state={isOpen ? "open" : "closed"}
          className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        >
          <div className="container flex flex-col space-y-4 border-b bg-background pb-8 pt-4">
            {items?.length ? (
              <>
                <nav className="space-y-4">
                  {items.map(
                    (item, index) =>
                      item.href && (
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            "flex items-center font-semibold text-muted-foreground"
                          )}
                        >
                          {item.title}
                        </Link>
                      )
                  )}
                </nav>
                <nav className="flex flex-col space-y-2">
                  <SignInButton />
                  <Link href={"/create"} className={buttonVariants()}>
                    <Plus size={15} strokeWidth={3} />
                    <span className="ml-1">Signaler un danger</span>
                  </Link>
                  {/* <ThemeToggle /> */}
                </nav>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
