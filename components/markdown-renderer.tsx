"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import type { Schema } from "hast-util-sanitize";
import "katex/dist/katex.min.css";

const schema: Schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [["className", /^language-./, "math-inline", "math-display"]],
  },
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="blog-content text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, schema], rehypeKatex, rehypeHighlight, rehypeSlug]}
        components={{
          a: ({ href, title, children }) => {
            const isExternal = href && (href.startsWith("http://") || href.startsWith("https://"));
            return (
              <a
                href={href}
                title={title}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                {children}
              </a>
            );
          },
          code: ({ className, children }) => (
            <code className={className}>{children}</code>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table>{children}</table>
            </div>
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt} className="rounded-lg my-4 max-w-full" loading="lazy" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
