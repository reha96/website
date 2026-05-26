"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";

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
    <div className="blog-content text-gray-700 leading-relaxed space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeSlug]}
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
          // Inline code
          code: ({ className, children, ...props }) => {
            // Highlight.js adds a class like "language-python" to code blocks
            // Inline code won't have a language class
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-pink-600" {...props}>
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
              <table className="min-w-full border-collapse border border-gray-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 px-4 py-2 bg-gray-50 text-left text-sm font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 px-4 py-2 text-sm">{children}</td>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="rounded-lg my-4 max-w-full" loading="lazy" />
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-orange-400 bg-orange-50 px-4 py-2 my-4 italic text-gray-700">
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
