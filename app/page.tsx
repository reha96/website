import { fetchAllAbstracts } from "@/lib/tex-fetch";
import HomePage from "@/components/home-page";

export default async function Page() {
  const abstracts = await fetchAllAbstracts();
  return <HomePage abstracts={abstracts} />;
}
