import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Reha Tuncer",
  description: "DLH learning projects — machine learning, Python programming, AI academy notes",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
