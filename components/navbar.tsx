"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Newspaper, Briefcase, User, LogIn } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Posts", icon: Newspaper, href: "/" },
  { label: "Jobs", icon: Briefcase, href: "/jobs" },
  { label: "Profile", icon: User, href: "/profile" },
]

export function Navbar() {
  const pathname = usePathname()

  const isAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold">
          Classe Certa
        </Link>
        <nav className="flex items-center gap-1">
          {isAuthPage ? (
            <Link
              href="/"
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors",
                "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Newspaper className="size-5" />
              <span>Posts</span>
            </Link>
          ) : (
            navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-xs transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })
          )}
          {!isAuthPage && (
            <Link
              href="/login"
              className="ml-2 flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/80"
            >
              <LogIn className="size-4" />
              <span>Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
