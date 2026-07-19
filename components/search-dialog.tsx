"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SearchResult {
  url: string;
  excerpt: string;
  meta: Record<string, string>;
}

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Fetches the static search index JSON (generated at build time)
 * and caches the promise so it only loads once.
 */
interface SearchEntry {
  title: string;
  url: string;
  excerpt: string;
  date: string;
  tags: string[];
  type: "blog" | "til";
}

let cachedIndex: Promise<SearchEntry[]> | null = null;

function fetchIndex(): Promise<SearchEntry[]> {
  if (cachedIndex) return cachedIndex;
  cachedIndex = fetch("/search-index.json").then((r) => {
    if (!r.ok) throw new Error("Failed to load search index");
    return r.json();
  });
  return cachedIndex;
}

/** Simple relevance scoring — title matches weighted highest. */
function score(entry: SearchEntry, query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/);
  let s = 0;
  const title = entry.title.toLowerCase();
  const excerpt = entry.excerpt.toLowerCase();
  for (const w of words) {
    if (!w) continue;
    if (title.includes(w)) s += 10;
    else if (excerpt.includes(w)) s += 3;
    for (const t of entry.tags) if (t.toLowerCase().includes(w)) s += 5;
  }
  if (title.startsWith(q)) s += 20;
  return s;
}

/**
 * Modal search dialog triggered by ⌘K / Ctrl+K from the Navbar.
 * Uses a static JSON search index for fast client-side filtering.
 */
export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // ESC to close
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [open, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setQuery("");
      setResults([]);
      setError(null);
    }
  }, [open]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const entries = await fetchIndex();
        if (cancelled) return;
        const q = query.trim();
        const results = entries
          .map((e) => ({ entry: e, s: score(e, q) }))
          .filter((e) => e.s > 0)
          .sort((a, b) => b.s - a.s)
          .slice(0, 15);
        if (cancelled) return;
        setResults(
          results.map((r) => ({
            url: r.entry.url,
            excerpt: r.entry.excerpt,
            meta: {
              title: r.entry.title,
              date: r.entry.date,
              type: r.entry.type,
            },
          }))
        );
      } catch {
        if (!cancelled) setError("Search failed. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  // Close on outside click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="w-full max-w-lg bg-white dark:bg-charcoal-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-charcoal-600 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-charcoal-600">
          <svg
            className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-3 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, TILs..."
            className="flex-1 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 outline-none text-base"
          />
          <kbd className="ml-2 px-1.5 py-0.5 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-charcoal-700 rounded border border-gray-200 dark:border-charcoal-600">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {loading && (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              Searching...
            </div>
          )}

          {error && (
            <div className="px-4 py-8 text-center text-red-500 dark:text-red-400 text-sm">
              {error}
              <p className="mt-2 text-gray-400 dark:text-gray-500">
                Try using the{" "}
                <a href="/search" className="underline">
                  search page
                </a>{" "}
                instead.
              </p>
            </div>
          )}

          {!loading && !error && query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400 text-sm">
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {!query && (
            <div className="px-4 py-8 text-center text-gray-400 dark:text-gray-500 text-sm">
              Start typing to search...
            </div>
          )}

          {results.map((result, i) => (
            <a
              key={i}
              href={result.url}
              onClick={onClose}
              className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-charcoal-700/50 border-b border-gray-100 dark:border-charcoal-700/50 last:border-b-0 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5">
                {result.meta?.title || result.url}
              </h3>
              {result.excerpt && (
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                  {result.excerpt}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                {result.meta?.date && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">{result.meta.date}</span>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-gray-200 dark:border-charcoal-600 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-between">
          <span>
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-charcoal-700 rounded">↑↓</kbd> navigate{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-charcoal-700 rounded">↵</kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}
