import type { Metadata } from "next";
import { fetchAllAbstracts } from "@/lib/tex-fetch";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "Academic — Reha Tuncer",
  description: "Research papers and publications in behavioral and experimental economics",
};

export default async function AcademicPage() {
  try {
    const abstracts = await fetchAllAbstracts();
    return <HomePage abstracts={abstracts} />;
  } catch (error) {
    console.error("Failed to fetch abstracts:", error);
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Failed to load academic data. Please try again later.</p>
      </main>
    );
  }
}
