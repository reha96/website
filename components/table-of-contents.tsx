"use client";

import { useEffect, useState } from "react";

export interface TocHeading {
  text: string;
  id: string;
  level: number; // 2 = ##, 3 = ###
}

interface TableOfContentsProps {
  headings: TocHeading[];
}

/**
 * Left sidebar showing a table of contents with scroll-spy.
 * Highlights the currently visible heading as the user scrolls.
 * Visible on xl screens and above.
 * Uses native anchor links for reliable navigation.
 */
export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const aIdx = headingElements.indexOf(a.target as HTMLElement);
            const bIdx = headingElements.indexOf(b.target as HTMLElement);
            return aIdx - bIdx;
          });

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      className="hidden xl:block w-64 shrink-0"
      aria-label="Table of contents"
    >
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          On this page
        </h4>
        <ul className="space-y-0.5 border-l border-gray-200">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const indent = heading.level === 3 ? "pl-4" : "pl-3";

            return (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  title={heading.text}
                  className={[
                    "block py-1 text-sm transition-colors leading-snug truncate",
                    "border-l-2 -ml-px",
                    indent,
                    isActive
                      ? "border-blue-500 text-blue-700 font-medium"
                      : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300",
                  ].join(" ")}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
