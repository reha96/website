"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "./theme-toggle";
import SearchDialog from "./search-dialog";

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K to toggle search dialog
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/blog", label: "Blog" },
    { href: "/til", label: "TIL" },
    { href: "/tags", label: "Tags" },
    { href: "#", label: "Projects", disabled: true },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur border-b border-gray-100 dark:border-charcoal-700">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo / Name */}
            <Link
              href="/"
              className="text-lg font-medium text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              Reha Tuncer
            </Link>

            {/* Nav Links + Search + Theme Toggle */}
            <div className="flex items-center space-x-0.5">
              {navItems.map((item) => {
                const isActive = item.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(item.href);

                if (item.disabled) {
                  return (
                    <span
                      key={item.label}
                      className="px-2.5 py-1.5 text-sm text-gray-300 dark:text-gray-600 cursor-not-allowed rounded-md"
                      title="Coming soon"
                    >
                      {item.label}
                    </span>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-gray-100 dark:bg-charcoal-700 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-charcoal-700/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Search trigger button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-charcoal-700 text-gray-600 dark:text-gray-400"
                aria-label="Search (⌘K)"
                title="Search (⌘K)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
