"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import "katex/dist/katex.min.css";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Client-side markdown renderer with:
 * - GitHub Flavored Markdown (tables, strikethrough, task lists)
 * - Syntax highlighting via highlight.js
 * - Heading anchor IDs
 * - Custom component styling for links, images, code
 */
export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="blog-content text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeHighlight, rehypeSlug, rehypeRaw]}
        components={{
          a: ({ href, children, ...props }) => {
            const isExternal = href && (href.startsWith("http://") || href.startsWith("https://"));
            return (
              <a
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                {...props}
              >
                {children}
              </a>
            );
          },
          // Inline code — uses CSS variables from globals.css
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // Wrap tables for horizontal scroll on mobile
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table>{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th>{children}</th>
          ),
          td: ({ children }) => (
            <td>{children}</td>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="rounded-lg my-4 max-w-full" loading="lazy" />
          ),
          blockquote: ({ children }) => (
            <blockquote>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
