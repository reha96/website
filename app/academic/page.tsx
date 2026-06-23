import type { Metadata } from "next";
import { fetchAllAbstracts } from "@/lib/tex-fetch";
import HomePage from "@/components/home-page";

export const metadata: Metadata = {
  title: "Academic — Reha Tuncer",
  description: "Research papers and publications in behavioral and experimental economics",
};

export default async function AcademicPage() {
  const abstracts = await fetchAllAbstracts();
  return <HomePage abstracts={abstracts} />;
}
