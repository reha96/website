import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import MarkdownRenderer from "@/components/markdown-renderer";

export const metadata: Metadata = {
  title: "About — Reha Tuncer",
  description: "Disclosures and information about this site",
};

export default function AboutPage() {
  try {
    const filePath = path.join(process.cwd(), "content", "about.md");
    const raw = fs.readFileSync(filePath, "utf-8");
    const content = raw.replace(/^---[\s\S]*?---\n/, "");

    return (
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <MarkdownRenderer content={content} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Failed to read about page:", error);
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Page content unavailable.</p>
      </main>
    );
  }
}
