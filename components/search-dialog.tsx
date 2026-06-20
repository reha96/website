"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface SearchResult {
  url: string;
  excerpt: string;
  meta: Record<string, string>;
  sub_results?: SearchResult[];
}

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Modal search dialog triggered by ⌘K / Ctrl+K from the Navbar.
 * Uses Pagefind's JS API to search the static index built at post-build time.
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
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    // Reset state when closed
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

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const pagefind = (window as any).__pagefind;
        if (!pagefind) {
          setError("Search index not loaded yet");
          return;
        }
        const search = await pagefind.search(query.trim());
        const items: SearchResult[] = [];
        if (search?.results) {
          for (const result of search.results.slice(0, 15)) {
            const data = await result.data();
            items.push({
              url: data.url,
              excerpt: data.excerpt || "",
              meta: data.meta || {},
            });
          }
        }
        setResults(items);
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
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
      <div className="w-full max-w-lg bg-white dark:bg-glaucous-900 rounded-xl shadow-2xl border border-gray-200 dark:border-glaucous-700 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-glaucous-700">
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
          <kbd className="ml-2 px-1.5 py-0.5 text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-glaucous-800 rounded border border-gray-200 dark:border-glaucous-700">
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
              className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-glaucous-800/50 border-b border-gray-100 dark:border-glaucous-800/50 last:border-b-0 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-0.5">
                {result.meta?.title || result.url}
              </h3>
              {result.excerpt && (
                <p
                  className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: result.excerpt }}
                />
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
        <div className="px-4 py-2 border-t border-gray-200 dark:border-glaucous-700 text-xs text-gray-400 dark:text-gray-500 flex items-center justify-between">
          <span>
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-glaucous-800 rounded">↑↓</kbd> navigate{" "}
            <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-glaucous-800 rounded">↵</kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}
