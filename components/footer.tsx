import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-500 dark:border-charcoal-400 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-center gap-x-5 text-sm text-gray-600 dark:text-gray-400">
        <Link
          href="/about#disclosures"
          className="underline underline-offset-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          Disclosures
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          href="/about#about-this-site"
          className="underline underline-offset-2 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          About this site
        </Link>
        <span aria-hidden="true">·</span>
        <span>&copy; {new Date().getFullYear()} Reha Tuncer</span>
      </div>
    </footer>
  );
}
