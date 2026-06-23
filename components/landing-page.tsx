import Image from "next/image";
import Link from "next/link";

const RESEARCH_INTERESTS = [
  {
    title: "Screen Time & Design",
    description:
      "Studying how autoplay and infinite scroll affect user behavior and attention.",
    href: "/academic#paper3",
  },
  {
    title: "E-commerce UX",
    description:
      "How scarcity cues and time pressure shape decision-making and trust.",
    href: "/academic#paper2",
  },
  {
    title: "Social Networks",
    description:
      "Understanding class bias and segregation in referral systems.",
    href: "/academic#paper5",
  },
] as const;

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* ── Hero Section ── */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 mb-20">
          {/* Photo */}
          <div className="w-full md:w-2/5 shrink-0">
            <Image
              src="/new_pp.png"
              alt="Reha Tuncer"
              width={400}
              height={400}
              className="w-full max-w-sm rounded-2xl shadow-lg"
              priority
            />
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold leading-tight text-gray-800 dark:text-[var(--color-text)] mb-4">
              I&apos;m an economist
              <br />
              who got hooked
              <br />
              on why we can&apos;t log off.
            </h1>
            <p className="text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed mb-6">
              For my PhD, I taught myself web development to study user behavior
              through online experiments. Today, I train reinforcement learning
              algorithms to fly drones on weekends and transform NGO websites
              during the week.
            </p>
            <p className="text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed">
              I chase what makes people click and stay, while also trying to
              create meaningful digital experiences for them.
            </p>
          </div>
        </div>

        {/* ── What I'm Curious About ── */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 dark:text-[var(--color-text)] mb-6">
            What I&apos;m curious about
          </h2>
          <p className="text-gray-600 dark:text-[var(--color-text-secondary)] mb-8 max-w-2xl">
            My research sits at the intersection of behavioral economics and
            digital technology, exploring how design choices influence human
            behavior online.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RESEARCH_INTERESTS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-5 rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.03] card-hover block"
                style={{ backgroundColor: "var(--color-bg-secondary)" }}
              >
                <h3 className="font-serif text-lg font-medium text-gray-800 dark:text-[var(--color-text)] mb-2 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Explore ── */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl font-semibold text-gray-800 dark:text-[var(--color-text)] mb-6">
            Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/blog"
              className="group p-5 rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.03] card-hover block"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <h3 className="font-serif text-lg font-medium text-gray-800 dark:text-[var(--color-text)] mb-2 group-hover:text-white transition-colors duration-300">
                Blog
              </h3>
              <p className="text-sm text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                Learning notes from various courses: machine learning, Python
                programming, and AI.
              </p>
            </Link>
            <Link
              href="/til"
              className="group p-5 rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.03] card-hover block"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <h3 className="font-serif text-lg font-medium text-gray-800 dark:text-[var(--color-text)] mb-2 group-hover:text-white transition-colors duration-300">
                TIL
              </h3>
              <p className="text-sm text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                Today I Learned: Short notes on things I&apos;ve discovered
                while coding and researching.
              </p>
            </Link>
            <div
              className="group p-5 rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.03] card-hover"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <h3 className="font-serif text-lg font-medium text-gray-800 dark:text-[var(--color-text)] mb-2 group-hover:text-white transition-colors duration-300">
                Projects
              </h3>
              <p className="text-sm text-gray-600 dark:text-[var(--color-text-secondary)] leading-relaxed mb-3 group-hover:text-white/90 transition-colors duration-300">
                RL drones, NGO websites, and experiments at the intersection of
                economics and code.
              </p>
              <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-gray-200 dark:bg-charcoal-600 text-gray-500 dark:text-gray-400 group-hover:bg-white/20 group-hover:text-white/80 transition-colors duration-300">
                Coming soon
              </span>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <div className="mb-16">
          <a
            href="mailto:reha.tuncer@gmail.com"
            className="inline-flex items-center px-6 py-3 font-medium rounded-xl transition-all duration-300 hover:scale-[1.03]"
            style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Get in touch
          </a>
        </div>

        {/* ── Footer ── */}
        <div className="border-t border-gray-200 dark:border-charcoal-700 pt-6 text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Reha Tuncer. All rights reserved.
        </div>
      </div>
    </main>
  );
}
