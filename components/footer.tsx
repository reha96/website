import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-300 dark:border-charcoal-700 mt-16">
      <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-center gap-x-5 text-sm text-gray-500 dark:text-gray-400">
        <Link
          href="/about#disclosures"
          className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          Disclosures
        </Link>
        <span aria-hidden="true">·</span>
        <Link
          href="/about#about-this-site"
          className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          About this site
        </Link>
        <span aria-hidden="true">·</span>
        <span>&copy; {new Date().getFullYear()} Reha Tuncer</span>
      </div>
    </footer>
  );
}
