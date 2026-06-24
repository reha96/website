"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import ThemeToggle from "./theme-toggle";
import SearchDialog from "./search-dialog";

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/academic", label: "Academic" },
    { href: "/blog", label: "Blog" },
    { href: "/til", label: "TIL" },
    { href: "/tags", label: "Tags" },
    { href: "#", label: "Projects", disabled: true },
  ];

  const isActive = useCallback((href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }, [pathname]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-charcoal-900/90 backdrop-blur border-b border-gray-100 dark:border-charcoal-700">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo / Name — text hidden on mobile, visible md+ */}
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-medium text-gray-800 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
            >
              <Image
                src="/favicon.ico"
                alt=""
                width={24}
                height={24}
                className="w-5 h-5 rounded"
              />
              <span className="hidden md:inline">Reha Tuncer</span>
            </Link>

            {/* Desktop Nav Links (md+) */}
            <div className="hidden md:flex items-center space-x-0.5">
              {navItems.map((item) => {
                const active = isActive(item.href);
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
                    className={`relative px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 nav-link ${
                      active
                        ? "text-glaucous-700 dark:text-coral-400 nav-link-active"
                        : "text-gray-600 dark:text-gray-400 hover:text-glaucous-700 dark:hover:text-coral-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Search trigger */}
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

            {/* Mobile controls (below md) */}
            <div className="flex md:hidden items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-charcoal-700 text-gray-600 dark:text-gray-400"
                aria-label="Search (⌘K)"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <ThemeToggle />
              {/* Hamburger button */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-charcoal-700 text-gray-600 dark:text-gray-400"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden mobile-menu ${mobileMenuOpen ? "mobile-menu-open" : ""}`}
        >
          <div className="max-w-4xl mx-auto px-4 py-3 space-y-1 border-t border-gray-100 dark:border-charcoal-700 bg-white/95 dark:bg-charcoal-900/95 backdrop-blur">
            {navItems.map((item) => {
              const active = isActive(item.href);
              if (item.disabled) {
                return (
                  <span
                    key={item.label}
                    className="block px-3 py-2.5 text-sm text-gray-300 dark:text-gray-600 rounded-md"
                  >
                    {item.label}
                    <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">— coming soon</span>
                  </span>
                );
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                    active
                      ? "bg-glaucous-50 dark:bg-charcoal-700 text-glaucous-700 dark:text-coral-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-charcoal-700"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-14 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
